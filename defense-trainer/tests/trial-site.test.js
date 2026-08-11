import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { questions, TRIAL_SET_COUNT } from "../js/trial-questions.js";
import { rankCandidates, validateQuestion } from "../js/risk-engine.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const app = readFileSync(resolve(root, "js/app.js"), "utf8");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const setModuleNames = Array.from(
  { length: 10 },
  (_, index) => `trial-questions-set-${String(index + 1).padStart(2, "0")}.js`,
);
const trialData = setModuleNames
  .map((name) => readFileSync(resolve(root, "js", name), "utf8"))
  .join("\n");

const expectedIds = Array.from({ length: 10 }, (_, setIndex) => {
  const ordinaryStart = setIndex * 7 + 1;
  const constrainedStart = setIndex * 2 + 1;
  return [
    ...Array.from({ length: 7 }, (_, index) => `A${String(ordinaryStart + index).padStart(2, "0")}`),
    `C${String(setIndex + 1).padStart(2, "0")}`,
    `T${String(constrainedStart).padStart(2, "0")}`,
    `T${String(constrainedStart + 1).padStart(2, "0")}`,
  ];
}).flat();

test("10 套网站题库完整导入 100 题", () => {
  assert.equal(TRIAL_SET_COUNT, 10);
  assert.equal(questions.length, 100);
  assert.deepEqual(questions.map((question) => question.id), expectedIds);
  assert.equal(new Set(questions.map((question) => question.id)).size, 100);
  assert.deepEqual(
    Array.from({ length: 10 }, (_, index) => questions[index * 10].source.setId),
    Array.from({ length: 10 }, (_, index) => `S${String(index + 1).padStart(2, "0")}`),
  );
  assert.ok(questions.every((question) => question.detailedExplanation?.schemaVersion === "DETAILED-EXPLANATION-V1"));
});

test("100 题答案位置均衡，答案与公开风险数据保持一致", () => {
  const answerPositions = [0, 0, 0, 0];
  for (const question of questions) {
    assert.deepEqual(validateQuestion(question), []);
    assert.deepEqual(question.reasonableTiles, [question.answerTile]);
    answerPositions[question.candidates.indexOf(question.answerTile)] += 1;
    const ranked = rankCandidates(question.candidates, question.opponents, {
      candidateOverrides: question.candidateOverrides,
    });
    assert.equal(ranked[0].tile, question.answerTile);
  }
  assert.deepEqual(answerPositions, [25, 25, 25, 25]);
});

test("逐张解析顺序与题面一致，公开分析和事后真相隔离", () => {
  assert.match(trialData, /"detailedExplanation"/);
  for (const question of questions) {
    assert.deepEqual(
      question.detailedExplanation.publicAnalysis.candidates.map((candidate) => candidate.tile),
      question.candidates,
    );
    const publicJson = JSON.stringify(question.detailedExplanation.publicAnalysis);
    assert.doesNotMatch(publicJson, /hiddenHand|winningTiles|actualOutcome|actualReady|gradingAllowed/);
    assert.equal(question.detailedExplanation.truthReview.gradingAllowed, false);
  }
});

test("T02 对家四组副露完整保留，包含两组条子", () => {
  const question = questions.find((item) => item.id === "T02");
  assert.ok(question);
  assert.deepEqual(
    question.opponents.top.melds.map((meld) => meld.tiles),
    [
      ["F", "F", "F"],
      ["8p", "8p", "8p"],
      ["1s", "1s", "1s"],
      ["4s", "4s", "4s"],
    ],
  );
});

test("网站入口继续使用每 10 题结算、错题练习和下一套流程", () => {
  assert.match(app, /TRIAL_MODE = TRIAL_VARIANT === "v3"/);
  assert.match(app, /trial-questions\.js\?v=0\.1\.21/);
  assert.match(app, /10 套 · 每套 10 题｜含详细解析/);
  assert.match(app, /QUESTION_SET_SIZE/);
  assert.match(app, /state\.setCorrect \+= 1/);
  assert.match(app, /state\.setComplete \? "显示结果" : "下一题"/);
  assert.match(app, /renderSetResults/);
  assert.match(app, /练习错题/);
  assert.match(app, /练习下一套/);
  assert.match(app, /startWrongPractice/);
  assert.match(app, /startNextSet/);
  assert.match(html, /id="setResultCard"/);
  assert.match(html, /app\.js\?v=0\.1\.21/);
});
