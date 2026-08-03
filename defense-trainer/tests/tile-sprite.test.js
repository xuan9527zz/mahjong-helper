import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { TILE_IMAGE_URLS, tileImageUrl } from "../js/tile-images.js";
import { ALL_TILES } from "../js/tiles.js";

test("34张牌全部映射到独立PNG资源", () => {
  assert.equal(ALL_TILES.length, 34);
  assert.equal(Object.keys(TILE_IMAGE_URLS).length, 34);

  const urls = ALL_TILES.map(tileImageUrl);
  assert.equal(new Set(urls).size, 34);
  assert.ok(urls.every((url) => /^assets\/tiles\/[\w-]+\.png$/.test(url)));

  for (const url of urls) {
    const image = readFileSync(new URL(`../${url}`, import.meta.url));
    assert.deepEqual([...image.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    assert.equal(image.readUInt32BE(16), 260);
    assert.equal(image.readUInt32BE(20), 360);
  }
});

test("字牌与白板映射正确", () => {
  assert.equal(tileImageUrl("E"), "assets/tiles/01-E-east.png");
  assert.equal(tileImageUrl("P"), "assets/tiles/05-P-white-dragon.png");
  assert.equal(tileImageUrl("F"), "assets/tiles/06-F-green-dragon.png");
  assert.equal(tileImageUrl("C"), "assets/tiles/07-C-red-dragon.png");
});
