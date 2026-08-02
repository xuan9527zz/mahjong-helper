export const TILE_SPRITE_URL = "assets/mahjong-tiles-source.jpg";

const X_LEFTS = [21, 86, 152, 217, 283, 348, 414, 479, 545];
const Y_TOPS = [26, 102, 178, 254];
const HORIZONTAL_TRAVEL = 610 - 44;
const VERTICAL_TRAVEL = 340 - 60;

const HONOR_COLUMNS = {
  E: 0,
  S: 1,
  W: 2,
  N: 3,
  P: 4,
  F: 5,
  C: 6,
};

const SUIT_ROWS = {
  m: 1,
  p: 2,
  s: 3,
};

export function tileSpritePosition(tile) {
  let column;
  let row;

  if (Object.hasOwn(HONOR_COLUMNS, tile)) {
    column = HONOR_COLUMNS[tile];
    row = 0;
  } else {
    const suit = tile?.slice(-1);
    const number = Number.parseInt(tile, 10);
    column = number - 1;
    row = SUIT_ROWS[suit];
  }

  if (!Number.isInteger(column) || column < 0 || column > 8 || !Number.isInteger(row)) {
    return "50% 50%";
  }

  const x = (100 * X_LEFTS[column] / HORIZONTAL_TRAVEL).toFixed(4);
  const y = (100 * Y_TOPS[row] / VERTICAL_TRAVEL).toFixed(4);
  return `${x}% ${y}%`;
}
