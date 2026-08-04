import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const app = readFileSync(resolve(root, "js/app.js"), "utf8");
const css = readFileSync(resolve(root, "styles.css"), "utf8");
const feedbackRenderer = readFileSync(resolve(root, "js/feedback-renderer.js"), "utf8");
const feedbackCss = readFileSync(resolve(root, "styles-feedback.css"), "utf8");

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
  assert.match(html, /id="selfMeldZone"/);
  assert.match(app, /renderMelds\(elements\.selfMeldZone, self\.melds\)/);
  assert.match(css, /\.seat-self \.self-meld-zone/);
});

test("练习题已完整替换为自然晚巡V2十题题库", () => {
  const questionsSource = ["questions.js", "questions-data-1.js", "questions-data-2.js"]
    .map((file) => readFileSync(resolve(root, "js", file), "utf8"))
    .join("\n");
  assert.match(questionsSource, /"bank"\s*:\s*"广东麻将自然晚巡防点炮题库V2\.json"/);
  assert.match(questionsSource, /"id"\s*:\s*"V2Q010"/);
  assert.match(questionsSource, /"reasonableTiles"/);
  assert.doesNotMatch(questionsSource, /"id": "pass-window"|"id": "messy-river"|"id": "liability-loss"/);
  assert.match(app, /reasonableTiles\.includes\(state\.selectedAnswer\)/);
  assert.match(feedbackRenderer, /判断合理/);
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

test("任意牌可点击查找同牌且番数表采用指定口径", () => {
  assert.match(app, /function focusTableTile\(tile\)/);
  assert.match(app, /button: true,[\s\S]*onClick: \(\) => focusTableTile\(tile\)/);
  assert.match(app, /state\.practiceFocusedTile = tile/);
  assert.match(css, /\.tile-card\.tile-match::before/);

  const fanValues = [
    ["鸡胡", 2], ["对对胡", 4], ["混一色", 4], ["七小对", 8], ["豪七", 12],
    ["双豪七", 24], ["三豪", 36], ["清一色", 8], ["幺九", 12], ["清幺九", 16],
    ["四暗刻", 24], ["十三幺", 20], ["十八罗汉", 36], ["小三元", 12], ["大三元", 16],
    ["小四喜", 16], ["大四喜", 20], ["字一色", 16], ["地胡", 25], ["天胡", 50],
  ];
  for (const [name, fan] of fanValues) {
    const label = name === "鸡胡" ? "鸡胡（只能自摸）" : name;
    assert.match(html, new RegExp(`<strong role="cell">${label}</strong><span role="cell">${fan} 分</span>`));
  }
  assert.match(html, /鸡胡（只能自摸）<\/strong><span role="cell">2 分/);
  assert.doesNotMatch(html, /\d+ 番/);
});

test("模拟练习支持导入题附带的候选结果覆盖", () => {
  assert.match(app, /candidateOverrides: question\.candidateOverrides/);
  assert.match(app, /result\.overrideSummary \?\? summarizeCandidate\(result\)/);
});

test("新版反馈卡支持结构化详细解析且不在前端重算答案", () => {
  assert.match(feedbackRenderer, /explanationPayload\(question\)/);
  assert.match(feedbackRenderer, /payload\.mode === "detailed"/);
  assert.match(feedbackRenderer, /renderConclusionSummary/);
  assert.match(feedbackRenderer, /renderWhyBest/);
  assert.match(feedbackRenderer, /renderCandidateComparison/);
  assert.match(app, /hasDetailedExplanation = Boolean\(question\.detailedExplanation\)/);
  assert.match(app, /state\.selectedAnswer === question\.answerTile/);
  assert.doesNotMatch(app, /answerTile\s*=\s*rankCandidates/);
});

test("用户所选候选默认展开、答错时标出首选且真相复盘默认折叠", () => {
  assert.match(feedbackRenderer, /disclosure\.open = candidate\.tile === selectedTile/);
  assert.match(feedbackRenderer, /candidate\.tile === answerTile\) disclosure\.classList\.add\("is-best"\)/);
  assert.match(feedbackRenderer, /事后真相不参与事前评分，仅用于复盘。/);
  assert.doesNotMatch(feedbackRenderer, /truth-review[\s\S]*?\.open\s*=\s*true/);
});

test("旧题继续回退到简版解析", () => {
  assert.match(feedbackRenderer, /renderLegacyExplanation/);
  assert.match(feedbackRenderer, /else \{[\s\S]*?renderLegacyExplanation/);
  assert.ok(existsSync(resolve(root, "js/explanation-model.js")));
  assert.ok(existsSync(resolve(root, "docs/detailed-explanation-example.json")));
});

test("详细解析采用手机端单列折叠卡且禁止横向溢出", () => {
  assert.match(css, /\.feedback-card\s*{[\s\S]*?overflow:\s*hidden/);
  assert.match(feedbackCss, /\.feedback-disclosure > summary/);
  assert.match(feedbackCss, /\.candidate-detail-card/);
  assert.match(feedbackCss, /@media \(max-width: 650px\)[\s\S]*?\.candidate-metric-list,[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\)/);
  assert.match(feedbackCss, /overflow-wrap:\s*anywhere/);
});
