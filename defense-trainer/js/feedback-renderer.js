import { formatPercent, summarizeCandidate } from "./risk-engine.js";
import { tileName } from "./tiles.js";
import { candidateRecords, explanationPayload } from "./explanation-model.js";

function chip(text, className = "meta-chip") {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  return span;
}

function renderLegacyRiskRows(results) {
  const list = document.createElement("div");
  list.className = "risk-list";
  results.forEach((result) => {
    const row = document.createElement("div");
    row.className = "risk-row";
    const name = document.createElement("span");
    name.textContent = tileName(result.tile);
    const bar = document.createElement("span");
    bar.className = "risk-bar";
    const fill = document.createElement("i");
    fill.style.width = `${Math.max(3, result.riskScore)}%`;
    bar.append(fill);
    const number = document.createElement("strong");
    number.textContent = formatPercent(result.probability);
    const detail = document.createElement("span");
    detail.className = "risk-detail";
    detail.textContent = `${result.overrideSummary ?? summarizeCandidate(result)}；相对损失 ${result.expectedLoss.toFixed(3)}`;
    row.append(name, bar, number, detail);
    list.append(row);
  });
  return list;
}

const FIELD_LABELS = {
  sameTurnFollow: "同巡跟打",
  pastTurnSafety: "过巡安全",
  furiten: "振听／过胡",
  chi: "上家吃牌",
  pong: "碰牌",
  kong: "杠牌",
  shantenAfter: "舍后向听",
  ukeire: "受入",
  scoreRoute: "得分路线",
  summary: "说明",
  actualOutcome: "真实结果",
};

const SEAT_LABELS = {
  self: "自家",
  left: "上家",
  top: "对家",
  right: "下家",
  east: "东家",
  south: "南家",
  west: "西家",
  north: "北家",
};

function values(value) {
  if (value === undefined || value === null || value === "") return [];
  return Array.isArray(value) ? value.filter((item) => item !== undefined && item !== null && item !== "") : [value];
}

function readableValue(value) {
  if (typeof value === "boolean") return value ? "是" : "否";
  if (Array.isArray(value)) return value.join("、");
  return String(value);
}

function formatLoss(value) {
  return Number.isFinite(value) ? Number(value).toFixed(3) : "—";
}

function formatProbability(value) {
  return Number.isFinite(value) ? formatPercent(value) : "—";
}

function judgementClass(judgement = "") {
  if (judgement.includes("不合理")) return "judgement-danger";
  if (judgement.includes("冒险")) return "judgement-caution";
  if (judgement.includes("最合理")) return "judgement-best";
  if (judgement.includes("合理")) return "judgement-good";
  return "judgement-neutral";
}

function appendStructuredGroup(parent, title, value, className = "") {
  if (!values(value).length) return;
  const group = document.createElement("section");
  group.className = `explanation-group ${className}`.trim();
  const heading = document.createElement("h4");
  heading.textContent = title;
  group.append(heading);

  if (Array.isArray(value)) {
    const list = document.createElement("ul");
    value.forEach((item) => {
      const entry = document.createElement("li");
      entry.textContent = readableValue(item);
      list.append(entry);
    });
    group.append(list);
  } else if (typeof value === "object") {
    const list = document.createElement("dl");
    Object.entries(value).forEach(([key, item]) => {
      if (!values(item).length) return;
      const term = document.createElement("dt");
      term.textContent = FIELD_LABELS[key] ?? key;
      const description = document.createElement("dd");
      description.textContent = readableValue(item);
      list.append(term, description);
    });
    group.append(list);
  } else {
    const paragraph = document.createElement("p");
    paragraph.textContent = String(value);
    group.append(paragraph);
  }
  parent.append(group);
}

function normalizeCandidateModels(question, payload, results) {
  const records = candidateRecords(payload);
  return question.candidates.map((tile) => {
    const record = records.find((item) => item.tile === tile) ?? {};
    const result = results.find((item) => item.tile === tile);
    const override = question.candidateOverrides?.[tile] ?? {};
    return {
      ...record,
      tile,
      judgement:
        record.judgement ??
        override.judgement ??
        (tile === question.answerTile
          ? "最合理"
          : (question.reasonableTiles ?? []).includes(tile)
            ? "合理"
            : "候选"),
      isBest: record.isBest ?? tile === question.answerTile,
      ronProbability: record.ronProbability ?? record.probability ?? override.probability ?? result?.probability,
      expectedRonLoss:
        record.expectedRonLoss ?? record.expectedLoss ?? override.expectedLoss ?? result?.expectedLoss,
      summary: record.summary ?? record.publicReason ?? override.summary ?? result?.overrideSummary,
    };
  });
}

function renderCandidateMetrics(candidates, selectedTile, answerTile) {
  const list = document.createElement("div");
  list.className = "candidate-metric-list";
  candidates.forEach((candidate) => {
    const card = document.createElement("article");
    card.className = "candidate-metric-card";
    if (candidate.tile === selectedTile) card.classList.add("is-selected");
    if (candidate.tile === answerTile) card.classList.add("is-best");

    const heading = document.createElement("div");
    heading.className = "candidate-metric-heading";
    const name = document.createElement("strong");
    name.textContent = tileName(candidate.tile);
    const judgement = document.createElement("span");
    judgement.className = `judgement-tag ${judgementClass(candidate.judgement)}`;
    judgement.textContent = candidate.judgement;
    heading.append(name, judgement);

    const metrics = document.createElement("div");
    metrics.className = "candidate-metric-values";
    const probability = document.createElement("span");
    probability.innerHTML = `<small>公开点炮率</small><strong>${formatProbability(candidate.ronProbability)}</strong>`;
    const loss = document.createElement("span");
    loss.innerHTML = `<small>预期损失</small><strong>${formatLoss(candidate.expectedRonLoss)}</strong>`;
    metrics.append(probability, loss);
    card.append(heading, metrics);
    list.append(card);
  });
  return list;
}

function renderConclusionSummary(question, candidates, selectedTile, isRecommended, isCorrect) {
  const section = document.createElement("section");
  section.className = "feedback-section conclusion-summary";
  const head = document.createElement("div");
  head.className = "feedback-head";
  const verdict = document.createElement("strong");
  verdict.className = `feedback-verdict ${isCorrect ? "correct" : "wrong"}`;
  verdict.textContent = isRecommended ? "判断正确" : isCorrect ? "判断合理" : "判断错误";
  head.append(verdict);

  const choices = document.createElement("div");
  choices.className = "answer-comparison-strip";
  choices.append(chip(`你选择：${tileName(selectedTile)}`, "answer-chip selected-answer"));
  choices.append(chip(`题库首选：${tileName(question.answerTile)}`, "answer-chip best-answer"));
  section.append(head, choices, renderCandidateMetrics(candidates, selectedTile, question.answerTile));
  return section;
}

function renderThreatOverview(threats = []) {
  if (!threats.length) return null;
  const section = document.createElement("section");
  section.className = "explanation-group";
  const heading = document.createElement("h4");
  heading.textContent = "对手威胁概览";
  const list = document.createElement("div");
  list.className = "threat-overview-list";
  threats.forEach((threat) => {
    const card = document.createElement("article");
    const title = document.createElement("strong");
    title.textContent = threat.seatLabel ?? SEAT_LABELS[threat.seat] ?? threat.seat;
    const route = document.createElement("span");
    route.textContent = [threat.route, threat.threatLevel ? `威胁${threat.threatLevel}` : ""].filter(Boolean).join(" · ");
    card.append(title, route);
    if (values(threat.evidence).length) {
      const evidence = document.createElement("ul");
      values(threat.evidence).forEach((item) => {
        const li = document.createElement("li");
        li.textContent = readableValue(item);
        evidence.append(li);
      });
      card.append(evidence);
    }
    list.append(card);
  });
  section.append(heading, list);
  return section;
}

function renderOpponentRisks(opponents = []) {
  if (!opponents.length) return null;
  const group = document.createElement("section");
  group.className = "explanation-group";
  const heading = document.createElement("h4");
  heading.textContent = "各座位风险";
  const list = document.createElement("div");
  list.className = "opponent-risk-list";
  opponents.forEach((opponent) => {
    const row = document.createElement("article");
    const seat = document.createElement("strong");
    seat.textContent = opponent.seatLabel ?? SEAT_LABELS[opponent.seat] ?? opponent.seat;
    const level = document.createElement("span");
    level.className = "opponent-risk-level";
    level.textContent = opponent.riskLevel ?? "—";
    const probability = document.createElement("span");
    probability.textContent = `点炮率 ${formatProbability(opponent.ronProbability)}`;
    const loss = document.createElement("span");
    loss.textContent = `损失 ${formatLoss(opponent.expectedRonLoss)}`;
    row.append(seat, level, probability, loss);
    if (values(opponent.evidence).length) {
      const evidence = document.createElement("small");
      evidence.textContent = values(opponent.evidence).map(readableValue).join("；");
      row.append(evidence);
    }
    list.append(row);
  });
  group.append(heading, list);
  return group;
}

function appendCandidateBody(parent, candidate, includeOverview = false) {
  if (candidate.summary) appendStructuredGroup(parent, "结论说明", candidate.summary);
  const evidence = document.createElement("div");
  evidence.className = "candidate-evidence-grid";
  appendStructuredGroup(evidence, "主要安全依据", candidate.safetyEvidence, "safety-evidence");
  appendStructuredGroup(evidence, "主要危险来源", candidate.dangerEvidence, "danger-evidence");
  if (evidence.childElementCount) parent.append(evidence);
  appendStructuredGroup(parent, "响应与规则判断", candidate.responseRules);
  const opponentRisks = renderOpponentRisks(candidate.byOpponent);
  if (opponentRisks) parent.append(opponentRisks);
  appendStructuredGroup(parent, "自家牌型代价", candidate.ownShapeCost);
  appendStructuredGroup(parent, includeOverview ? "为什么优于其他候选" : "与首选牌的差异", candidate.comparison);
  if (candidate.confidence || Number.isFinite(candidate.effectiveSampleSize)) {
    const confidence = document.createElement("p");
    confidence.className = "analysis-confidence";
    confidence.textContent = [
      candidate.confidence ? `置信度：${candidate.confidence}` : "",
      Number.isFinite(candidate.effectiveSampleSize)
        ? `有效样本量：${Math.round(candidate.effectiveSampleSize)}`
        : "",
    ]
      .filter(Boolean)
      .join(" · ");
    parent.append(confidence);
  }
}

function renderWhyBest(publicAnalysis, candidates, answerTile) {
  const disclosure = document.createElement("details");
  disclosure.className = "feedback-disclosure why-best";
  disclosure.open = true;
  const summary = document.createElement("summary");
  summary.textContent = `为什么首选 ${tileName(answerTile)}`;
  const body = document.createElement("div");
  body.className = "feedback-disclosure-body";
  appendStructuredGroup(body, "公开信息结论", publicAnalysis.summary);
  const overview = renderThreatOverview(publicAnalysis.threatOverview);
  if (overview) body.append(overview);
  const best = candidates.find((candidate) => candidate.isBest) ?? candidates.find((candidate) => candidate.tile === answerTile);
  if (best) appendCandidateBody(body, best, true);
  appendStructuredGroup(body, "首选牌比较结论", publicAnalysis.answerComparison);
  disclosure.append(summary, body);
  return disclosure;
}

function renderCandidateComparison(candidates, selectedTile, answerTile) {
  const section = document.createElement("section");
  section.className = "feedback-section candidate-comparison-section";
  const heading = document.createElement("h3");
  heading.textContent = "逐张比较其他选项";
  section.append(heading);
  candidates.forEach((candidate) => {
    const disclosure = document.createElement("details");
    disclosure.className = "candidate-detail-card";
    disclosure.open = candidate.tile === selectedTile;
    if (candidate.tile === selectedTile) disclosure.classList.add("is-selected");
    if (candidate.tile === answerTile) disclosure.classList.add("is-best");

    const summary = document.createElement("summary");
    const title = document.createElement("span");
    title.className = "candidate-detail-title";
    const name = document.createElement("strong");
    name.textContent = tileName(candidate.tile);
    const judgement = document.createElement("span");
    judgement.className = `judgement-tag ${judgementClass(candidate.judgement)}`;
    judgement.textContent = candidate.judgement;
    title.append(name, judgement);
    if (candidate.tile === selectedTile) title.append(chip("你的选择", "detail-marker selected-marker"));
    if (candidate.tile === answerTile) title.append(chip("题库首选", "detail-marker best-marker"));

    const metrics = document.createElement("span");
    metrics.className = "candidate-detail-metrics";
    metrics.textContent = `${formatProbability(candidate.ronProbability)} · ${formatLoss(candidate.expectedRonLoss)}`;
    summary.append(title, metrics);
    const body = document.createElement("div");
    body.className = "candidate-detail-body";
    appendCandidateBody(body, candidate);
    disclosure.append(summary, body);
    section.append(disclosure);
  });
  return section;
}

function renderTruthReview(truthReview) {
  if (!truthReview) return null;
  const disclosure = document.createElement("details");
  disclosure.className = "feedback-disclosure truth-review";
  const summary = document.createElement("summary");
  summary.textContent = "事后真相复盘";
  const body = document.createElement("div");
  body.className = "feedback-disclosure-body";
  const notice = document.createElement("p");
  notice.className = "truth-review-notice";
  notice.textContent = "事后真相不参与事前评分，仅用于复盘。";
  body.append(notice);

  if (typeof truthReview === "string") {
    appendStructuredGroup(body, "复盘结论", truthReview);
  } else {
    appendStructuredGroup(body, "复盘结论", truthReview.summary);
    appendStructuredGroup(body, "真实结果", truthReview.actualOutcome);
    if (values(truthReview.opponents).length) {
      const opponents = document.createElement("section");
      opponents.className = "explanation-group truth-opponents";
      const heading = document.createElement("h4");
      heading.textContent = "各家真实状态";
      opponents.append(heading);
      truthReview.opponents.forEach((opponent) => {
        const card = document.createElement("article");
        const title = document.createElement("strong");
        title.textContent = opponent.seatLabel ?? SEAT_LABELS[opponent.seat] ?? opponent.seat;
        card.append(title);
        appendStructuredGroup(card, "真实听牌", opponent.actualReady);
        appendStructuredGroup(card, "真实等待", values(opponent.winningTiles).map(tileName));
        appendStructuredGroup(card, "隐藏手牌", values(opponent.hiddenHand).map(tileName));
        appendStructuredGroup(card, "结果", opponent.result);
        opponents.append(card);
      });
      body.append(opponents);
    }
  }
  disclosure.append(summary, body);
  return disclosure;
}

function renderLegacyExplanation(question, payload, results) {
  const section = document.createElement("section");
  section.className = "feedback-section legacy-explanation";
  const explanation = document.createElement("p");
  explanation.textContent = payload.publicExplanation;
  section.append(explanation, renderLegacyRiskRows(results));
  return section;
}

export function renderFeedbackContent({ question, selectedTile, isRecommended, isCorrect, results = [] }) {
  const payload = explanationPayload(question);
  const candidates = normalizeCandidateModels(question, payload, results);
  const content = document.createElement("div");
  content.className = `feedback-content ${payload.mode}`;
  content.append(renderConclusionSummary(question, candidates, selectedTile, isRecommended, isCorrect));
  if (payload.mode === "detailed") {
    content.append(renderWhyBest(payload.publicAnalysis, candidates, question.answerTile));
    content.append(renderCandidateComparison(candidates, selectedTile, question.answerTile));
  } else {
    content.append(renderLegacyExplanation(question, payload, results));
  }
  const truthReview = renderTruthReview(payload.truthReview);
  if (truthReview) content.append(truthReview);
  return content;
}
