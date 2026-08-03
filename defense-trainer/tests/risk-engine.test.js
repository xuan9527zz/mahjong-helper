import test from "node:test";
import assert from "node:assert/strict";

import { questions } from "../js/questions.js";
import { rankCandidates, riskAgainstOpponent, validateQuestion } from "../js/risk-engine.js";

test("有效过胡窗口把该玩家对同张牌的风险锁定为零", () => {
  const opponent = {
    label: "上家",
    threat: "mixedFlush",
    focusSuit: "p",
    readyLikelihood: 0.9,
    valueWeight: 8,
    openCount: 9,
    river: [],
    passedTiles: [{ tile: "4m", active: true }],
  };

  const result = riskAgainstOpponent("4m", opponent);
  assert.equal(result.probability, 0);
  assert.equal(result.expectedLoss, 0);
});

test("自己打过的牌不会被当成永久安全", () => {
  const opponent = {
    label: "对家",
    threat: "chicken",
    focusSuit: "unknown",
    readyLikelihood: 0.8,
    valueWeight: 2,
    openCount: 0,
    river: ["5m"],
    passedTiles: [],
  };

  assert.ok(riskAgainstOpponent("5m", opponent).probability > 0);
});

test("9张落地后的高价值方向会放大预期损失", () => {
  const opponent = {
    label: "上家",
    threat: "honors",
    focusSuit: "z",
    readyLikelihood: 0.85,
    valueWeight: 8,
    openCount: 9,
    river: [],
    passedTiles: [],
  };

  const honor = riskAgainstOpponent("E", opponent);
  const suited = riskAgainstOpponent("7s", opponent);
  assert.ok(honor.liabilityMultiplier > 1);
  assert.equal(suited.liabilityMultiplier, 1);
  assert.ok(honor.expectedLoss > suited.expectedLoss * 5);
});

for (const question of questions) {
  test(`题目数据与模型答案一致：${question.id}`, () => {
    assert.deepEqual(validateQuestion(question), []);
    const results = rankCandidates(question.candidates, question.opponents, {
      candidateModifiers: question.candidateModifiers,
      candidateOverrides: question.candidateOverrides,
    });
    assert.equal(results[0].tile, question.answerTile);
  });
}

test("自然晚巡V2十题完整替换原有练习题", () => {
  assert.equal(questions.length, 10);
  assert.deepEqual(
    questions.map((question) => question.id),
    Array.from({ length: 10 }, (_, index) => `V2Q${String(index + 1).padStart(3, "0")}`),
  );
  for (const question of questions) {
    assert.equal(question.source.bank, "广东麻将自然晚巡防点炮题库V2.json");
    assert.equal(question.source.gradingBasis, "PUBLIC_INFORMATION_ONLY");
    assert.equal(question.source.truthUsedForGrading, false);
    assert.deepEqual(
      question.reasonableTiles.filter((tile) => !question.candidates.includes(tile)),
      [],
    );
    for (const tile of question.candidates) assert.ok(question.candidateOverrides?.[tile]);
  }

  assert.deepEqual(questions[0].candidates, ["1p", "1m", "9p", "E"]);
  assert.deepEqual(questions[0].reasonableTiles, ["1p", "9p"]);
  assert.equal(questions[0].candidateOverrides["1m"].expectedLoss, 0.7902587976707678);
  assert.equal(questions[0].self.hand[questions[0].self.drawnIndex], "4s");
  assert.equal(questions[3].self.hand.length, 8);
  assert.equal(questions[3].self.melds.length, 2);
});
