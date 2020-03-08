const MAX_CATALOG_CARDS = 8;
const SHOW_MORE_STEP = 20;
const MAX_RELATED_CARDS_COUNT = 4;
const SMALL_MOVIE_CARD_MOUSE_ENTER_DELAY = 1000;
const DEFAULT_GENRE = `All genres`;

const Url = {
  BASE: `http://localhost:5000`,
  WEBINARS: `/webinars`
};

const GRID_LAYOUT = [
  [1, 1, 1],
  [1, 2, 0],
  [1, 1, 1]
];

export {
  GRID_LAYOUT,
  MAX_CATALOG_CARDS,
  MAX_RELATED_CARDS_COUNT,
  SHOW_MORE_STEP,
  SMALL_MOVIE_CARD_MOUSE_ENTER_DELAY,
  DEFAULT_GENRE,
  Url
};
