import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { questions } from "../js/trial-questions.js";
import { rankCandidates, validateQuestion } from "../js/risk-engine.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const app = readFileSync(resolve(root, "js/app.js"), "utf8");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const trialData = ["trial-questions-data-1.js", "trial-questions-data-2.js"]
  .map((name) => readFileSync(resolve(root, "js", name), "utf8"))
  .join("\n");

test("V3 试用题库完整导入 10 题", () => {
  assert.equal(questions.length, 10);
  assert.deepEqual(
    questions.map((question) => question.id),
    Array.from({ length: 10 }, (_, index) => `V3Q${String(index + 1).padStart(3, "0")}`),
  );
  assert.deepEqual(questions[0].candidates, ["7p", "6s", "5p", "2s"]);
  assert.equal(questions[0].source.bank, "广东麻将防点炮题库V3_网站导入版10题.json");
  assert.ok(questions.every((question) => question.detailedExplanation?.schemaVersion === "DETAILED-EXPLANATION-V1"));
});

test("试用题目的答案和公开风险数据保持一致", () => {
  for (const question of questions) {
    assert.deepEqual(validateQuestion(question), []);
    const ranked = rankCandidates(question.candidates, question.opponents, {
      candidateOverrides: question.candidateOverrides,
    });
    assert.equal(ranked[0].tile, question.answerTile);
  }
});

test("V3 公开解析与事后真相在结构上隔离", () => {
  assert.match(trialData, /\"detailedExplanation\"/);
  for (const question of questions) {
    const publicJson = JSON.stringify(question.detailedExplanation.publicAnalysis);
    assert.doesNotMatch(publicJson, /hiddenHand|winningTiles|actualOutcome|actualReady|gradingAllowed/);
    assert.ok(question.detailedExplanation.truthReview);
  }
});

test("V3 试用入口启用详细解析并保留缺失解析时的安全回退", () => {
  assert.match(app, /TRIAL_MODE = TRIAL_VARIANT === "v3"/);
  assert.match(app, /renderTrialFeedback/);
  assert.match(app, /试用版仅核对答案，暂不展示风险数值或解析。/);
  assert.match(app, /!TRIAL_MODE && !hasDetailedExplanation/);
  assert.match(app, /TRIAL_MODE && !hasDetailedExplanation/);
  assert.match(app, /含详细解析/);
  assert.match(app, /QUESTION_SET_SIZE/);
  assert.match(app, /state\.setCorrect \+= 1/);
  assert.match(app, /elements\.nextQuestion\.textContent = state\.setComplete \? "显示结果" : "下一题"/);
  assert.match(app, /renderSetResults/);
  assert.match(app, /题目号/);
  assert.match(app, /result\.isCorrect \? "✅" : "❌"/);
  assert.match(app, /练习错题/);
  assert.match(app, /练习下一套/);
  assert.match(app, /startWrongPractice/);
  assert.match(app, /startNextSet/);
  assert.doesNotMatch(app, /content\.prepend\(renderSetSummary/);
  assert.match(app, /liveModeButton\.hidden = true/);
  assert.match(html, /id="setResultCard"/);
  assert.match(html, /app\.js\?v=0\.1\.20/);
});
