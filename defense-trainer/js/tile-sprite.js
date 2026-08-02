export const TILE_SPRITE_URL = "assets/mahjong-tiles-source.jpg";

const TILE_WIDTH = 44;
const TILE_HEIGHT = 60;
const X_LEFTS = [21, 86, 152, 217, 283, 348, 414, 479, 545];
const Y_TOPS = [26, 102, 178, 254];

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

export function tileSpriteCoordinates(tile) {
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
    return null;
  }

  return {
    left: `${(-100 * X_LEFTS[column] / TILE_WIDTH).toFixed(4)}%`,
    top: `${(-100 * Y_TOPS[row] / TILE_HEIGHT).toFixed(4)}%`,
  };
}
