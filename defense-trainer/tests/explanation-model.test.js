import test from "node:test";
import assert from "node:assert/strict";

import { candidateRecords, explanationPayload } from "../js/explanation-model.js";

test("新版详细解析把公开分析与事后真相严格隔离", () => {
  const question = {
    detailedExplanation: {
      publicAnalysis: {
        summary: "只含公开信息",
        candidates: [{ tile: "1p", judgement: "最合理" }],
      },
      truthReview: {
        summary: "SECRET_HIDDEN_HAND",
        hiddenHand: ["1m", "1m"],
      },
    },
  };

  const payload = explanationPayload(question);
  assert.equal(payload.mode, "detailed");
  assert.equal(JSON.stringify(payload.publicAnalysis).includes("SECRET_HIDDEN_HAND"), false);
  assert.equal(JSON.stringify(payload.truthReview).includes("SECRET_HIDDEN_HAND"), true);
  assert.deepEqual(candidateRecords(payload), [{ tile: "1p", judgement: "最合理" }]);
});

test("扁平版detailedExplanation也只提取允许公开的字段", () => {
  const payload = explanationPayload({
    detailedExplanation: {
      summary: "公开摘要",
      candidates: [],
      truthReview: { summary: "事后信息" },
      accidentalHiddenField: "不得显示",
    },
  });

  assert.deepEqual(payload.publicAnalysis, { summary: "公开摘要", candidates: [] });
  assert.deepEqual(payload.truthReview, { summary: "事后信息" });
});

test("旧题回退到publicExplanation、publicDecision与truthExplanation", () => {
  const question = {
    publicExplanation: "旧题公开解析",
    publicDecision: { candidates: [{ tile: "9p" }] },
    truthExplanation: "旧题事后复盘",
  };
  const payload = explanationPayload(question);

  assert.equal(payload.mode, "legacy");
  assert.equal(payload.publicExplanation, "旧题公开解析");
  assert.equal(payload.truthReview, "旧题事后复盘");
  assert.deepEqual(candidateRecords(payload), [{ tile: "9p" }]);
});

test("更旧题目仍可使用explanation字段", () => {
  const payload = explanationPayload({ explanation: "最早版本解析" });
  assert.equal(payload.mode, "legacy");
  assert.equal(payload.publicExplanation, "最早版本解析");
  assert.equal(payload.publicDecision, null);
  assert.equal(payload.truthReview, null);
});
