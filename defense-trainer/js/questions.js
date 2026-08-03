import { questionSet1 } from "./questions-data-1.js?v=0.1.14";
import { questionSet2 } from "./questions-data-2.js?v=0.1.14";

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

export const questions = [...questionSet1, ...questionSet2];
