export const SUITS = {
  m: "万",
  p: "筒",
  s: "条",
  z: "字",
};

const HONORS = [
  ["E", "东", "🀀"],
  ["S", "南", "🀁"],
  ["W", "西", "🀂"],
  ["N", "北", "🀃"],
  ["C", "中", "🀄"],
  ["F", "发", "🀅"],
  ["P", "白", "🀆"],
];

const GLYPH_START = {
  m: 0x1f007,
  s: 0x1f010,
  p: 0x1f019,
};

export const ALL_TILES = [
  ...Array.from({ length: 9 }, (_, index) => `${index + 1}m`),
  ...Array.from({ length: 9 }, (_, index) => `${index + 1}p`),
  ...Array.from({ length: 9 }, (_, index) => `${index + 1}s`),
  ...HONORS.map(([id]) => id),
];

export function tileSuit(tile) {
  if (HONORS.some(([id]) => id === tile)) return "z";
  return tile?.slice(-1) || "z";
}

export function tileNumber(tile) {
  const value = Number.parseInt(tile, 10);
  return Number.isNaN(value) ? null : value;
}

export function tileName(tile) {
  const honor = HONORS.find(([id]) => id === tile);
  if (honor) return honor[1];
  const suit = tileSuit(tile);
  return `${tileNumber(tile)}${SUITS[suit] ?? ""}`;
}

export function tileGlyph(tile) {
  const honor = HONORS.find(([id]) => id === tile);
  if (honor) return honor[2];
  const suit = tileSuit(tile);
  const number = tileNumber(tile);
  const start = GLYPH_START[suit];
  if (!start || !number) return "?";
  return String.fromCodePoint(start + number - 1);
}

export function isHonor(tile) {
  return tileSuit(tile) === "z";
}

export function isTerminal(tile) {
  const number = tileNumber(tile);
  return number === 1 || number === 9;
}

export function sortTiles(tiles) {
  const order = new Map(ALL_TILES.map((tile, index) => [tile, index]));
  return [...tiles].sort((a, b) => (order.get(a) ?? 99) - (order.get(b) ?? 99));
}

export function countTiles(tiles) {
  return tiles.reduce((counts, tile) => {
    counts[tile] = (counts[tile] ?? 0) + 1;
    return counts;
  }, {});
}
