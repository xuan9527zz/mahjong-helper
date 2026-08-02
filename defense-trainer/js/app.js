import { questions, SUIT_LABELS, THREAT_LABELS } from "./questions.js";
import { formatPercent, rankCandidates, summarizeCandidate, validateQuestion } from "./risk-engine.js";
import { ALL_TILES, sortTiles, tileGlyph, tileName } from "./tiles.js";

const state = {
  mode: "practice",
  questionIndex: 0,
  selectedAnswer: null,
  answered: false,
  liveState: null,
  liveCandidates: new Set(),
};

const elements = {
  modeButtons: [...document.querySelectorAll(".mode-button")],
  questionIndex: document.querySelector("#questionIndex"),
  questionTitle: document.querySelector("#questionTitle"),
  questionMeta: document.querySelector("#questionMeta"),
  roundMark: document.querySelector("#roundMark"),
  wallRemaining: document.querySelector("#wallRemaining"),
  turnNotice: document.querySelector("#turnNotice"),
  selfHand: document.querySelector("#selfHand"),
  evidenceBar: document.querySelector("#evidenceBar"),
  promptText: document.querySelector("#promptText"),
  promptHint: document.querySelector("#promptHint"),
  candidateGrid: document.querySelector("#candidateGrid"),
  submitAnswer: document.querySelector("#submitAnswer"),
  feedbackCard: document.querySelector("#feedbackCard"),
  nextQuestion: document.querySelector("#nextQuestion"),
  practicePanel: document.querySelector("#practicePanel"),
  livePanel: document.querySelector("#livePanel"),
  liveCandidateList: document.querySelector("#liveCandidateList"),
  opponentControls: document.querySelector("#opponentControls"),
  editTarget: document.querySelector("#editTarget"),
  tilePalette: document.querySelector("#tilePalette"),
  undoTarget: document.querySelector("#undoTarget"),
  clearTarget: document.querySelector("#clearTarget"),
  runLiveAnalysis: document.querySelector("#runLiveAnalysis"),
  liveResults: document.querySelector("#liveResults"),
  resetLive: document.querySelector("#resetLive"),
  helpDialog: document.querySelector("#helpDialog"),
  openHelp: document.querySelector("#openHelp"),
  closeHelp: document.querySelector("#closeHelp"),
};

const clone = (value) => JSON.parse(JSON.stringify(value));

function currentQuestion() {
  return questions[state.questionIndex];
}

function tileElement(tile, options = {}) {
  const element = document.createElement(options.button ? "button" : "span");
  if (options.button) element.type = "button";
  element.className = `tile-card ${options.className ?? ""}`.trim();
  element.dataset.tile = tile;
  element.title = options.title ?? tileName(tile);
  element.setAttribute("aria-label", options.ariaLabel ?? tileName(tile));

  const glyph = document.createElement("span");
  glyph.className = "tile-glyph";
  glyph.setAttribute("aria-hidden", "true");
  glyph.textContent = tileGlyph(tile);
  element.append(glyph);

  if (options.onClick) element.addEventListener("click", options.onClick);
  return element;
}

function chip(text, className = "meta-chip") {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  return span;
}

function renderSeat(seatKey, opponent) {
  const seat = document.querySelector(`[data-seat="${seatKey}"]`);
  const heading = seat.querySelector(".seat-heading");
  heading.replaceChildren();

  const identity = document.createElement("div");
  const wind = document.createElement("span");
  wind.className = "seat-wind";
  wind.textContent = tileName(opponent.wind);
  const label = document.createElement("strong");
  label.textContent = opponent.label;
  identity.append(wind, label);

  const threat = document.createElement("span");
  threat.className = "threat-tag";
  threat.textContent = THREAT_LABELS[opponent.threat] ?? THREAT_LABELS.unknown;
  heading.append(identity, threat);

  const river = seat.querySelector(".river");
  river.replaceChildren();
  opponent.river.forEach((tile, index) => {
    river.append(
      tileElement(tile, {
        className: index === opponent.river.length - 1 ? "discard-recent" : "",
        title: `${opponent.label}第${index + 1}张舍牌：${tileName(tile)}`,
      }),
    );
  });

  const meldZone = seat.querySelector(".meld-zone");
  meldZone.replaceChildren();
  (opponent.melds ?? []).forEach((meldData) => {
    const meld = document.createElement("div");
    meld.className = "meld";
    meld.title = `${meldData.type} ${meldData.tiles.map(tileName).join(" ")}`;
    meldData.tiles.forEach((tile) => meld.append(tileElement(tile)));
    meldZone.append(meld);
  });
}

function renderSelf(self) {
  const heading = document.querySelector(".self-heading");
  heading.querySelector(".seat-wind").textContent = tileName(self.wind);
  elements.selfHand.replaceChildren();

  self.hand.forEach((tile, index) => {
    const isSelected = state.mode === "live" && state.liveCandidates.has(tile);
    const classes = [index === self.drawnIndex ? "drawn-tile" : "", isSelected ? "selected-candidate" : ""]
      .filter(Boolean)
      .join(" ");

    elements.selfHand.append(
      tileElement(tile, {
        button: state.mode === "live",
        className: classes,
        title:
          state.mode === "live"
            ? `${tileName(tile)}：点击${isSelected ? "移出" : "加入"}候选`
            : tileName(tile),
        onClick: state.mode === "live" ? () => toggleLiveCandidate(tile) : undefined,
      }),
    );
  });
}

function renderTable(boardState) {
  elements.roundMark.textContent = boardState.round;
  elements.wallRemaining.textContent = boardState.wallRemaining;
  elements.turnNotice.textContent = state.mode === "practice" ? "轮到你出牌" : "实战编辑中";

  for (const seatKey of ["left", "top", "right"]) {
    renderSeat(seatKey, boardState.opponents[seatKey]);
  }
  renderSelf(boardState.self);
}

function renderEvidence(question) {
  elements.evidenceBar.replaceChildren();
  question.evidence.forEach((item) => {
    const span = document.createElement("span");
    span.className = "signal-chip";
    const label = document.createElement("strong");
    label.textContent = `${item.label}：`;
    span.append(label, document.createTextNode(item.text));
    elements.evidenceBar.append(span);
  });
}

function selectAnswer(tile) {
  if (state.answered) return;
  state.selectedAnswer = tile;
  elements.submitAnswer.disabled = false;
  [...elements.candidateGrid.querySelectorAll(".candidate-button")].forEach((button) => {
    button.classList.toggle("active", button.dataset.tile === tile);
    button.setAttribute("aria-pressed", String(button.dataset.tile === tile));
  });
}

function renderCandidates(question) {
  elements.candidateGrid.replaceChildren();
  question.candidates.forEach((tile, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "candidate-button";
    button.dataset.tile = tile;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => selectAnswer(tile));

    const letter = document.createElement("span");
    letter.className = "candidate-letter";
    letter.textContent = String.fromCharCode(65 + index);
    const copy = document.createElement("span");
    copy.className = "candidate-copy";
    const name = document.createElement("strong");
    name.textContent = tileName(tile);
    const note = document.createElement("small");
    note.textContent = "候选弃牌";
    copy.append(name, note);
    button.append(letter, tileElement(tile), copy);
    elements.candidateGrid.append(button);
  });
}

function renderRiskRows(results) {
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
    detail.textContent = `${summarizeCandidate(result)}；相对损失 ${result.expectedLoss.toFixed(2)}`;
    row.append(name, bar, number, detail);
    list.append(row);
  });
  return list;
}

function submitAnswer() {
  if (!state.selectedAnswer || state.answered) return;
  const question = currentQuestion();
  const results = rankCandidates(question.candidates, question.opponents, {
    candidateModifiers: question.candidateModifiers,
  });
  const isCorrect = state.selectedAnswer === question.answerTile;
  state.answered = true;

  const head = document.createElement("div");
  head.className = "feedback-head";
  const verdict = document.createElement("strong");
  verdict.className = `feedback-verdict ${isCorrect ? "correct" : "wrong"}`;
  verdict.textContent = isCorrect ? "判断正确" : `更稳的是 ${tileName(question.answerTile)}`;
  const badge = chip(`你选择了 ${tileName(state.selectedAnswer)}`);
  head.append(verdict, badge);

  const explanation = document.createElement("p");
  explanation.textContent = question.explanation;
  elements.feedbackCard.replaceChildren(head, explanation, renderRiskRows(results));
  elements.feedbackCard.classList.remove("hidden");
  elements.nextQuestion.classList.remove("hidden");
  elements.submitAnswer.disabled = true;

  [...elements.candidateGrid.querySelectorAll(".candidate-button")].forEach((button) => {
    button.disabled = true;
  });
}

function renderQuestion() {
  const question = currentQuestion();
  state.selectedAnswer = null;
  state.answered = false;
  state.liveState = clone(question);
  state.liveCandidates = new Set(question.candidates);

  elements.questionIndex.textContent = `第 ${state.questionIndex + 1} / ${questions.length} 题`;
  elements.questionTitle.textContent = question.title;
  elements.questionMeta.replaceChildren(
    chip(question.round),
    chip(`牌墙 ${question.wallRemaining} 张`),
    chip("深圳常用规则"),
  );
  elements.promptText.textContent = question.prompt;
  elements.promptHint.textContent = question.hint;
  elements.feedbackCard.classList.add("hidden");
  elements.nextQuestion.classList.add("hidden");
  elements.submitAnswer.disabled = true;
  renderCandidates(question);
  renderEvidence(question);
  renderTable(state.mode === "live" ? state.liveState : question);
  renderLiveCandidateList();
  renderOpponentControls();
  elements.liveResults.classList.add("hidden");
}

function nextQuestion() {
  state.questionIndex = (state.questionIndex + 1) % questions.length;
  renderQuestion();
  document.querySelector("#workspace").scrollIntoView({ behavior: "smooth", block: "start" });
}

function switchMode(mode) {
  state.mode = mode;
  elements.modeButtons.forEach((button) => button.classList.toggle("active", button.dataset.mode === mode));
  elements.practicePanel.classList.toggle("hidden", mode !== "practice");
  elements.livePanel.classList.toggle("hidden", mode !== "live");
  renderTable(mode === "live" ? state.liveState : currentQuestion());
}

function toggleLiveCandidate(tile) {
  if (state.liveCandidates.has(tile)) {
    state.liveCandidates.delete(tile);
  } else if (state.liveCandidates.size >= 4) {
    window.alert("最多选择四种候选牌。请先移出一张。");
    return;
  } else {
    state.liveCandidates.add(tile);
  }
  renderSelf(state.liveState.self);
  renderLiveCandidateList();
}

function renderLiveCandidateList() {
  elements.liveCandidateList.replaceChildren();
  if (!state.liveCandidates.size) {
    const empty = document.createElement("small");
    empty.textContent = "尚未选择";
    elements.liveCandidateList.append(empty);
    return;
  }
  sortTiles([...state.liveCandidates]).forEach((tile) => {
    elements.liveCandidateList.append(
      tileElement(tile, {
        button: true,
        title: `移出${tileName(tile)}`,
        ariaLabel: `移出候选${tileName(tile)}`,
        onClick: () => toggleLiveCandidate(tile),
      }),
    );
  });
}

function option(value, text, selectedValue) {
  const element = document.createElement("option");
  element.value = value;
  element.textContent = text;
  element.selected = value === selectedValue;
  return element;
}

function renderOpponentControls() {
  elements.opponentControls.replaceChildren();
  const boardState = state.liveState;

  for (const seatKey of ["left", "top", "right"]) {
    const opponent = boardState.opponents[seatKey];
    const card = document.createElement("section");
    card.className = "opponent-control";
    const title = document.createElement("h3");
    title.textContent = `${opponent.label} · 风险信号`;
    const grid = document.createElement("div");
    grid.className = "control-grid";

    const threatLabel = document.createElement("label");
    threatLabel.append(document.createTextNode("推测牌型"));
    const threatSelect = document.createElement("select");
    Object.entries(THREAT_LABELS).forEach(([value, text]) => threatSelect.append(option(value, text, opponent.threat)));
    threatSelect.addEventListener("change", () => {
      opponent.threat = threatSelect.value;
      renderTable(state.liveState);
    });
    threatLabel.append(threatSelect);

    const suitLabel = document.createElement("label");
    suitLabel.append(document.createTextNode("主色判断"));
    const suitSelect = document.createElement("select");
    Object.entries(SUIT_LABELS).forEach(([value, text]) => suitSelect.append(option(value, text, opponent.focusSuit)));
    suitSelect.addEventListener("change", () => {
      opponent.focusSuit = suitSelect.value;
    });
    suitLabel.append(suitSelect);

    const openLabel = document.createElement("label");
    openLabel.append(document.createTextNode("落地张数"));
    const openSelect = document.createElement("select");
    [0, 3, 6, 9, 12].forEach((value) => openSelect.append(option(String(value), `${value} 张`, String(opponent.openCount))));
    openSelect.addEventListener("change", () => {
      opponent.openCount = Number(openSelect.value);
    });
    openLabel.append(openSelect);

    const readyLabel = document.createElement("label");
    const readyTitle = document.createElement("span");
    const readyOutput = document.createElement("span");
    readyOutput.className = "ready-output";
    readyOutput.textContent = `${Math.round(opponent.readyLikelihood * 100)}%`;
    readyTitle.append("听牌可能 ", readyOutput);
    const readyInput = document.createElement("input");
    readyInput.type = "range";
    readyInput.min = "5";
    readyInput.max = "95";
    readyInput.step = "1";
    readyInput.value = String(Math.round(opponent.readyLikelihood * 100));
    readyInput.addEventListener("input", () => {
      opponent.readyLikelihood = Number(readyInput.value) / 100;
      readyOutput.textContent = `${readyInput.value}%`;
    });
    readyLabel.append(readyTitle, readyInput);

    const passLabel = document.createElement("label");
    passLabel.append(document.createTextNode("本轮过胡牌"));
    const passSelect = document.createElement("select");
    const activePass = (opponent.passedTiles ?? []).find((entry) => entry.active)?.tile ?? "";
    passSelect.append(option("", "无／已失效", activePass));
    ALL_TILES.forEach((tile) => passSelect.append(option(tile, tileName(tile), activePass)));
    passSelect.addEventListener("change", () => {
      opponent.passedTiles = passSelect.value ? [{ tile: passSelect.value, active: true }] : [];
    });
    passLabel.append(passSelect);

    grid.append(threatLabel, suitLabel, openLabel, readyLabel, passLabel);
    card.append(title, grid);
    elements.opponentControls.append(card);
  }
}

function visibleTileCount(tile) {
  let total = state.liveState.self.hand.filter((item) => item === tile).length;
  for (const opponent of Object.values(state.liveState.opponents)) {
    total += opponent.river.filter((item) => item === tile).length;
    for (const meld of opponent.melds ?? []) total += meld.tiles.filter((item) => item === tile).length;
  }
  return total;
}

function targetTiles() {
  const target = elements.editTarget.value;
  return target === "self" ? state.liveState.self.hand : state.liveState.opponents[target].river;
}

function addTileToTarget(tile) {
  const target = elements.editTarget.value;
  const list = targetTiles();
  if (visibleTileCount(tile) >= 4) {
    window.alert(`${tileName(tile)}已有四张可见，不能继续加入。`);
    return;
  }
  if (target === "self" && list.length >= 14) {
    window.alert("自家手牌最多录入14张。可先撤销或清空。");
    return;
  }
  list.push(tile);
  if (target === "self") state.liveState.self.drawnIndex = list.length - 1;
  renderTable(state.liveState);
}

function undoTarget() {
  const target = elements.editTarget.value;
  const list = targetTiles();
  const removed = list.pop();
  if (target === "self" && removed && !list.includes(removed)) state.liveCandidates.delete(removed);
  renderTable(state.liveState);
  renderLiveCandidateList();
}

function clearTarget() {
  const target = elements.editTarget.value;
  const list = targetTiles();
  list.length = 0;
  if (target === "self") state.liveCandidates.clear();
  renderTable(state.liveState);
  renderLiveCandidateList();
}

function renderTilePalette() {
  elements.tilePalette.replaceChildren();
  ALL_TILES.forEach((tile) => {
    elements.tilePalette.append(
      tileElement(tile, {
        button: true,
        title: `加入${tileName(tile)}`,
        ariaLabel: `加入${tileName(tile)}`,
        onClick: () => addTileToTarget(tile),
      }),
    );
  });
}

function runLiveAnalysis() {
  const candidates = [...state.liveCandidates].filter((tile) => state.liveState.self.hand.includes(tile));
  if (!candidates.length) {
    window.alert("请先从自己的手牌中选择至少一张候选牌。 ");
    return;
  }
  const results = rankCandidates(candidates, state.liveState.opponents);
  const best = results[0];
  const head = document.createElement("div");
  head.className = "feedback-head";
  const verdict = document.createElement("strong");
  verdict.className = "feedback-verdict correct";
  verdict.textContent = `当前建议：${tileName(best.tile)}`;
  head.append(verdict, chip(`综合估计 ${formatPercent(best.probability)}`));
  const summary = document.createElement("p");
  summary.className = "result-summary";
  summary.textContent =
    "排序优先比较预期损失（点炮可能 × 对手牌值 × 包三家放大），下列百分比只用于同一盘面的相对比较。";
  elements.liveResults.replaceChildren(head, summary, renderRiskRows(results));
  elements.liveResults.classList.remove("hidden");
}

function resetLive() {
  state.liveState = clone(currentQuestion());
  state.liveCandidates = new Set(currentQuestion().candidates);
  renderTable(state.liveState);
  renderLiveCandidateList();
  renderOpponentControls();
  elements.liveResults.classList.add("hidden");
}

function validateData() {
  const issues = questions.flatMap((question) => validateQuestion(question).map((issue) => `${question.id}: ${issue}`));
  if (issues.length) console.warn("题目数据检查未通过", issues);
}

elements.modeButtons.forEach((button) => button.addEventListener("click", () => switchMode(button.dataset.mode)));
elements.submitAnswer.addEventListener("click", submitAnswer);
elements.nextQuestion.addEventListener("click", nextQuestion);
elements.runLiveAnalysis.addEventListener("click", runLiveAnalysis);
elements.resetLive.addEventListener("click", resetLive);
elements.undoTarget.addEventListener("click", undoTarget);
elements.clearTarget.addEventListener("click", clearTarget);
elements.openHelp.addEventListener("click", () => {
  if (typeof elements.helpDialog.showModal === "function") elements.helpDialog.showModal();
  else elements.helpDialog.setAttribute("open", "");
});
elements.closeHelp.addEventListener("click", () => elements.helpDialog.close());
elements.helpDialog.addEventListener("click", (event) => {
  if (event.target === elements.helpDialog) elements.helpDialog.close();
});

renderTilePalette();
validateData();
renderQuestion();
