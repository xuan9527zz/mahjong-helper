import { isHonor, isTerminal, tileName, tileNumber, tileSuit } from "./tiles.js";

const BASE_WAIT_SHARE = 0.17;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function passIsActive(opponent, tile) {
  return (opponent.passedTiles ?? []).some((entry) => entry.tile === tile && entry.active);
}

function profileCompatibility(tile, opponent) {
  const suit = tileSuit(tile);
  const focusSuit = opponent.focusSuit ?? "unknown";
  const threat = opponent.threat ?? "unknown";

  switch (threat) {
    case "chicken":
      if (isHonor(tile)) return 0.8;
      if (isTerminal(tile)) return 0.92;
      return tileNumber(tile) >= 3 && tileNumber(tile) <= 7 ? 1.15 : 1;
    case "mixedFlush":
      if (suit === focusSuit) return 1.8;
      if (isHonor(tile)) return 1.28;
      return 0.36;
    case "pureFlush":
      return suit === focusSuit ? 2.05 : 0.18;
    case "triplets":
      if (isHonor(tile)) return 1.35;
      if (isTerminal(tile)) return 1.18;
      return 1;
    case "honors":
      return isHonor(tile) ? 2.55 : 0.24;
    default:
      return isHonor(tile) ? 0.86 : 1;
  }
}

function profileMatchesHighValueDirection(tile, opponent) {
  const suit = tileSuit(tile);
  switch (opponent.threat) {
    case "mixedFlush":
      return suit === opponent.focusSuit || isHonor(tile);
    case "pureFlush":
      return suit === opponent.focusSuit;
    case "honors":
      return isHonor(tile);
    case "triplets":
      return isHonor(tile) || isTerminal(tile);
    default:
      return false;
  }
}

function ownRiverModifier(tile, opponent) {
  const occurrences = (opponent.river ?? []).filter((riverTile) => riverTile === tile).length;
  if (!occurrences) return 1;

  // 广东规则不存在永久振听。自己打过只作为“较不像仍在等”的软证据，绝不归零。
  return Math.max(0.46, 0.62 ** occurrences);
}

function openHandModifier(opponent) {
  if (opponent.openCount >= 12) return 1.14;
  if (opponent.openCount >= 9) return 1.1;
  if (opponent.openCount >= 6) return 1.05;
  return 1;
}

function liabilityMultiplier(tile, opponent) {
  if (opponent.openCount < 9 || !profileMatchesHighValueDirection(tile, opponent)) return 1;
  if (opponent.openCount >= 12) return 2.5;
  return 1.85;
}

function buildReasons(tile, opponent, { activePass, riverModifier, liability }) {
  const reasons = [];
  if (activePass) {
    reasons.push("有效过胡窗口：该玩家摸牌前不能胡这张");
    return reasons;
  }

  if (riverModifier < 1) reasons.push("该玩家打过同张，只降低风险，不构成永久安全");

  if (opponent.threat === "mixedFlush" || opponent.threat === "pureFlush") {
    if (tileSuit(tile) === opponent.focusSuit) reasons.push("进入其主色牌方向");
    else if (isHonor(tile) && opponent.threat === "mixedFlush") reasons.push("字牌仍可参与混一色");
    else reasons.push("远离其主色牌方向");
  }

  if (opponent.threat === "honors") {
    reasons.push(isHonor(tile) ? "吻合字牌大牌方向" : "不吻合字牌大牌方向");
  }

  if (opponent.threat === "triplets" && (isHonor(tile) || isTerminal(tile))) {
    reasons.push("幺九字牌与对对胡保留牌更相容");
  }

  if (opponent.threat === "chicken" || opponent.threat === "unknown") {
    reasons.push("保留普通鸡胡等待的基础风险");
  }

  if (liability > 1) reasons.push("已9张以上落地，高番／包三家代价被放大");
  return reasons;
}

export function riskAgainstOpponent(tile, opponent, options = {}) {
  const activePass = passIsActive(opponent, tile);
  if (activePass) {
    return {
      probability: 0,
      expectedLoss: 0,
      liabilityMultiplier: 1,
      reasons: buildReasons(tile, opponent, { activePass: true, riverModifier: 1, liability: 1 }),
    };
  }

  const readyLikelihood = clamp(opponent.readyLikelihood ?? 0.35, 0, 1);
  const compatibility = profileCompatibility(tile, opponent);
  const riverModifier = ownRiverModifier(tile, opponent);
  const exposureModifier = openHandModifier(opponent);
  const authorModifier = options.modifier ?? 1;
  const probability = clamp(
    readyLikelihood * BASE_WAIT_SHARE * compatibility * riverModifier * exposureModifier * authorModifier,
    0.004,
    0.42,
  );
  const liability = liabilityMultiplier(tile, opponent);
  const valueWeight = opponent.valueWeight ?? 2;

  return {
    probability,
    expectedLoss: probability * valueWeight * liability,
    liabilityMultiplier: liability,
    reasons: buildReasons(tile, opponent, { activePass: false, riverModifier, liability }),
  };
}

export function analyzeCandidate(tile, opponents, options = {}) {
  const byOpponent = Object.entries(opponents).map(([seat, opponent]) => {
    const modifier = options.candidateModifiers?.[tile]?.[seat] ?? 1;
    return {
      seat,
      label: opponent.label,
      ...riskAgainstOpponent(tile, opponent, { modifier }),
    };
  });

  const probability = 1 - byOpponent.reduce((safeProduct, item) => safeProduct * (1 - item.probability), 1);
  const expectedLoss = byOpponent.reduce((sum, item) => sum + item.expectedLoss, 0);

  return {
    tile,
    probability,
    expectedLoss,
    byOpponent,
  };
}

export function rankCandidates(candidates, opponents, options = {}) {
  const analyzed = candidates.map((tile) => {
    const item = analyzeCandidate(tile, opponents, options);
    const override = options.candidateOverrides?.[tile];
    if (!override) return item;
    return {
      ...item,
      probability: override.probability ?? item.probability,
      expectedLoss: override.expectedLoss ?? item.expectedLoss,
      decisionPriority: override.priority,
      judgement: override.judgement,
      overrideSummary: override.summary,
    };
  });
  const maxLoss = Math.max(...analyzed.map((item) => item.expectedLoss), 0.0001);
  const hasDecisionPriority = analyzed.some((item) => Number.isFinite(item.decisionPriority));

  return analyzed
    .map((item) => ({
      ...item,
      riskScore: Math.round((item.expectedLoss / maxLoss) * 100),
    }))
    .sort((a, b) => {
      if (hasDecisionPriority) {
        const priorityDifference = (a.decisionPriority ?? 99) - (b.decisionPriority ?? 99);
        if (priorityDifference) return priorityDifference;
      }
      return a.expectedLoss - b.expectedLoss || a.probability - b.probability;
    });
}

export function summarizeCandidate(result) {
  const strongest = [...result.byOpponent].sort((a, b) => b.expectedLoss - a.expectedLoss)[0];
  if (!strongest || strongest.probability === 0) return "当前三家均被有效过胡信息锁定";
  const firstReason = strongest.reasons[0] ?? "仍存在基础等待风险";
  return `${strongest.label}贡献主要风险：${firstReason}`;
}

export function formatPercent(value) {
  if (value === 0) return "0%";
  if (value < 0.01) return "<1%";
  return `${Math.round(value * 100)}%`;
}

export function validateQuestion(question) {
  const issues = [];
  if (!question.candidates.includes(question.answerTile)) issues.push("答案不在候选牌中");
  for (const tile of question.reasonableTiles ?? [question.answerTile]) {
    if (!question.candidates.includes(tile)) issues.push(`合理答案${tileName(tile)}不在候选牌中`);
  }
  for (const tile of question.candidates) {
    if (!question.self.hand.includes(tile)) issues.push(`候选${tileName(tile)}不在自家手牌中`);
  }

  const discardingPlayers = [question.self, ...Object.values(question.opponents)];
  for (const player of discardingPlayers) {
    if ((player.discardModes ?? []).length !== (player.river ?? []).length) {
      issues.push(`${player.label ?? "自家"}的手切／摸切标记数量与牌河不一致`);
    }
  }

  const visibleTiles = [...question.self.hand, ...(question.self.river ?? [])];
  for (const meld of question.self.melds ?? []) visibleTiles.push(...meld.tiles);
  for (const opponent of Object.values(question.opponents)) {
    visibleTiles.push(...opponent.river);
    for (const meld of opponent.melds ?? []) visibleTiles.push(...meld.tiles);
  }
  const visibleCounts = visibleTiles.reduce((counts, tile) => {
    counts[tile] = (counts[tile] ?? 0) + 1;
    return counts;
  }, {});
  for (const [tile, count] of Object.entries(visibleCounts)) {
    if (count > 4) issues.push(`可见的${tileName(tile)}有${count}张，超过一副牌上限`);
  }

  const ranked = rankCandidates(question.candidates, question.opponents, {
    candidateModifiers: question.candidateModifiers,
    candidateOverrides: question.candidateOverrides,
  });
  if (ranked[0]?.tile !== question.answerTile) {
    issues.push(`模型最低风险为${tileName(ranked[0]?.tile)}，但题目答案为${tileName(question.answerTile)}`);
  }
  return issues;
}
