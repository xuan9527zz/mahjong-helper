import assert from "node:assert/strict";
import test from "node:test";

import { QUESTION_SET_SIZE, scoreSummary, setWindow } from "../js/set-progress.js";

test("默认每10题划分为一套", () => {
  assert.equal(QUESTION_SET_SIZE, 10);
  assert.deepEqual(setWindow(0, 10), {
    setIndex: 0,
    setNumber: 1,
    setCount: 1,
    start: 0,
    end: 10,
    length: 10,
    position: 1,
    isLastQuestion: false,
    hasNextSet: false,
  });
  assert.equal(setWindow(9, 10).isLastQuestion, true);
});

test("多套题库在每10题处结束并进入下一套", () => {
  const firstEnd = setWindow(9, 24);
  assert.equal(firstEnd.isLastQuestion, true);
  assert.equal(firstEnd.hasNextSet, true);
  assert.equal(firstEnd.end, 10);

  const secondStart = setWindow(10, 24);
  assert.equal(secondStart.setNumber, 2);
  assert.equal(secondStart.position, 1);
  assert.equal(secondStart.length, 10);

  const finalStart = setWindow(20, 24);
  assert.equal(finalStart.setNumber, 3);
  assert.equal(finalStart.length, 4);
});

test("正确率按答对题数计算并四舍五入为整数百分比", () => {
  assert.deepEqual(scoreSummary(7, 10), {
    correctAnswers: 7,
    answeredQuestions: 10,
    accuracy: 70,
  });
  assert.equal(scoreSummary(2, 3).accuracy, 67);
});
