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

test("自家牌河位于手牌上方并可在实战模式编辑", () => {
  assert.match(html, /id="selfRiver"[\s\S]*class="self-heading"[\s\S]*id="selfHand"/);
  assert.match(html, /option value="self-river">我的牌河<\/option>/);
  assert.match(app, /state\.liveState\.self\.river/);
  assert.match(css, /\.seat-self \.self-river/);
});

test("模拟练习与实战推测使用独立的界面信息", () => {
  assert.match(html, /id="workspace" data-mode="practice"/);
  assert.match(html, /class="question-strip practice-only"/);
  assert.match(html, /class="live-context live-only"/);
  assert.match(html, /<small class="live-only">点击手牌可加入／移出候选<\/small>/);
  assert.match(app, /threat\.className = "threat-tag live-only"/);
  assert.match(app, /elements\.workspace\.dataset\.mode = mode/);
  assert.match(css, /\.workspace\[data-mode="practice"\] \.live-only/);
  assert.match(css, /\.workspace\[data-mode="live"\] \.practice-only/);
});

test("界面精简并提供番数、同牌高亮与手摸切标记", () => {
  assert.doesNotMatch(html, /class="hero-copy"/);
  assert.doesNotMatch(html, /class="principles"/);
  assert.doesNotMatch(html, /id="roundMark"/);
  assert.doesNotMatch(html, /id="evidenceBar"/);
  assert.match(html, /id="openRules"/);
  assert.match(html, /id="rulesDialog"/);
  assert.match(html, /红点：手切/);
  assert.match(html, /无标记：摸切/);
  assert.match(app, /tile === focusedTile\(\) \? "tile-match"/);
  assert.match(app, /discardModes\[index\] === "hand" \? "discard-handcut"/);
  assert.match(css, /\.river \.tile-card\.tile-match/);
  assert.match(css, /\.tile-card\.discard-handcut::after/);
});

