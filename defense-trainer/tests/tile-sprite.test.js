import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { TILE_SPRITE_URL, tileSpritePosition } from "../js/tile-sprite.js";
import { ALL_TILES } from "../js/tiles.js";

test("牌面精灵图使用原始图片资源并覆盖全部34张牌", () => {
  assert.equal(TILE_SPRITE_URL, "assets/mahjong-tiles-source.jpg");
  const sourceImage = readFileSync(new URL("../assets/mahjong-tiles-source.jpg", import.meta.url));
  assert.ok(sourceImage.length > 10_000);
  assert.deepEqual([...sourceImage.subarray(0, 2)], [0xff, 0xd8]);
  assert.equal(ALL_TILES.length, 34);

  const positions = ALL_TILES.map(tileSpritePosition);
  assert.equal(new Set(positions).size, 34);
  assert.ok(positions.every((position) => /^\d+(?:\.\d+)?% \d+(?:\.\d+)?%$/.test(position)));
});

test("字牌按原图顺序映射，白板使用空白牌面", () => {
  assert.equal(tileSpritePosition("E"), "3.7102% 9.2857%");
  assert.equal(tileSpritePosition("P"), "50.0000% 9.2857%");
  assert.equal(tileSpritePosition("F"), "61.4841% 9.2857%");
  assert.equal(tileSpritePosition("C"), "73.1449% 9.2857%");
});
