import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const app = readFileSync(resolve(root, "js/app.js"), "utf8");
const css = readFileSync(resolve(root, "styles.css"), "utf8");

test("HTML引用的本地资源都存在", () => {
  const paths = [...html.matchAll(/(?:src|href)="(\.\/[^"?#]+)(?:[?#][^"]*)?"/g)].map((match) => match[1]);
  assert.ok(paths.length >= 2);
  for (const path of paths) assert.ok(existsSync(resolve(root, path)), `${path} 不存在`);
});

test("应用查询的ID都能在HTML中找到", () => {
  const queriedIds = [...app.matchAll(/querySelector\("#([A-Za-z][\w-]*)"\)/g)].map((match) => match[1]);
  const uniqueIds = [...new Set(queriedIds)];
  assert.ok(uniqueIds.length > 20);
  for (const id of uniqueIds) {
    assert.match(html, new RegExp(`id=["']${id}["']`), `HTML缺少 #${id}`);
  }
});

test("核心响应式断点与窄屏牌桌规则存在", () => {
  assert.match(css, /@media \(max-width: 650px\)/);
  assert.match(css, /grid-template-areas:\s*"\. top \.[\s\S]*"self self self"/);
  assert.match(css, /--tile-w:\s*20px/);
});

test("三家牌河都以每排六张围绕中央区域排列", () => {
  assert.match(css, /\.river\s*{[\s\S]*?grid-template-columns:\s*repeat\(6, var\(--tile-w\)\)/);
  assert.match(css, /\.seat-left \.river\s*{[\s\S]*?rotate\(90deg\)/);
  assert.match(css, /\.seat-right \.river\s*{[\s\S]*?rotate\(-90deg\)/);
});

test("副露位于牌河外侧并在手机端保持显示", () => {
  assert.match(css, /\.seat-left \.meld-zone\s*{[\s\S]*?left:\s*8px[\s\S]*?transform-origin:\s*bottom left/);
  assert.match(css, /\.seat-right \.meld-zone\s*{[\s\S]*?right:\s*8px[\s\S]*?transform-origin:\s*bottom right/);
  assert.doesNotMatch(css, /@media \(max-width: 650px\)[\s\S]*?\.meld-zone\s*{\s*display:\s*none/);
});
