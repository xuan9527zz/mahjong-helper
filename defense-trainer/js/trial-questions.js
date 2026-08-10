import { trialQuestionSet01 } from "./trial-questions-set-01.js?v=0.1.21";
import { trialQuestionSet02 } from "./trial-questions-set-02.js?v=0.1.21";
import { trialQuestionSet03 } from "./trial-questions-set-03.js?v=0.1.21";
import { trialQuestionSet04 } from "./trial-questions-set-04.js?v=0.1.21";
import { trialQuestionSet05 } from "./trial-questions-set-05.js?v=0.1.21";
import { trialQuestionSet06 } from "./trial-questions-set-06.js?v=0.1.21";
import { trialQuestionSet07 } from "./trial-questions-set-07.js?v=0.1.21";
import { trialQuestionSet08 } from "./trial-questions-set-08.js?v=0.1.21";
import { trialQuestionSet09 } from "./trial-questions-set-09.js?v=0.1.21";
import { trialQuestionSet10 } from "./trial-questions-set-10.js?v=0.1.21";

export const THREAT_LABELS = {
  "unknown": "信息不足",
  "chicken": "鸡胡／普通牌型",
  "mixedFlush": "混一色倾向",
  "pureFlush": "清一色倾向",
  "triplets": "对对胡倾向",
  "honors": "字牌大牌倾向"
};

export const SUIT_LABELS = {
  "unknown": "未判断",
  "m": "万子",
  "p": "筒子",
  "s": "条子",
  "z": "字牌"
};

export const TRIAL_SET_COUNT = 10;
export const questions = [...trialQuestionSet01, ...trialQuestionSet02, ...trialQuestionSet03, ...trialQuestionSet04, ...trialQuestionSet05, ...trialQuestionSet06, ...trialQuestionSet07, ...trialQuestionSet08, ...trialQuestionSet09, ...trialQuestionSet10];
