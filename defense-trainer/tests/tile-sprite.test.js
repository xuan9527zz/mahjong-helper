import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { TILE_IMAGE_URLS, tileImageUrl } from "../js/tile-images.js";
import { ALL_TILES } from "../js/tiles.js";

test("34张牌全部映射到轻量WebP资源", () => {
  assert.equal(ALL_TILES.length, 34);
  assert.equal(Object.keys(TILE_IMAGE_URLS).length, 34);

  const urls = ALL_TILES.map(tileImageUrl);
  assert.equal(new Set(urls).size, 34);
  assert.ok(urls.every((url) => /^assets\/tiles-webp\/[\w-]+\.webp$/.test(url)));

  let totalBytes = 0;
  for (const url of urls) {
    const image = readFileSync(new URL(`../${url}`, import.meta.url));
    assert.equal(image.toString("ascii", 0, 4), "RIFF");
    assert.equal(image.toString("ascii", 8, 12), "WEBP");
    totalBytes += image.length;
  }
  assert.ok(totalBytes < 200_000, `牌面资源总大小过大：${totalBytes}`);
});

test("字牌与白板映射正确", () => {
  assert.equal(tileImageUrl("E"), "assets/tiles-webp/01-E-east.webp");
  assert.equal(tileImageUrl("P"), "assets/tiles-webp/05-P-white-dragon.webp");
  assert.equal(tileImageUrl("F"), "assets/tiles-webp/06-F-green-dragon.webp");
  assert.equal(tileImageUrl("C"), "assets/tiles-webp/07-C-red-dragon.webp");
});

test("隐藏牌库只在用户展开编辑器后创建", () => {
  const app = readFileSync(new URL("../js/app.js", import.meta.url), "utf8");
  assert.match(app, /boardEditor\.addEventListener\("toggle"/);
  assert.doesNotMatch(app, /renderTilePalette\(\);\s*validateData\(\)/);
});
