import {createSelector} from 'reselect';
import NameSpace from './../reducers/name-spaces.js';

import {DEFAULT_GENRE, MAX_RELATED_CARDS_COUNT} from '../constants/constants.js';

const getMovieCards = (state) => state[NameSpace.MOVIES].movieCards;
const getPromoCard = (state) => state[NameSpace.MOVIES].promoCard;
const getActiveCardById = (state, id) => state[NameSpace.MOVIES].movieCards.find((card) => card.id === parseInt(id, 10));
const getGenre = (state) => state[NameSpace.GENRE].genre;
const getDisplayCount = (state) => state[NameSpace.DISPLAY_COUNT].displayCount;
const getUserData = (state) => state[NameSpace.AUTH].userData;
const getReviews = (state) => state[NameSpace.REVIEWS].reviews
    .sort((reviewCurrent, reviewNext) => Date.parse(reviewNext.date) - Date.parse(reviewCurrent.date));
const getRelatedMovies = (state, activeCard) => state[NameSpace.MOVIES].movieCards.filter((movie) => movie.genre === activeCard.genre && movie.id !== activeCard.id).slice(0, MAX_RELATED_CARDS_COUNT);
const getFavoriteCards = (state) => state[NameSpace.MOVIES].movieCards.filter((card) => card.isFavorite);

const getAuthStatus = createSelector(
    [getUserData],
    (userData) => Object.keys(userData).length > 0
);

const getActiveGenreCards = createSelector(
    [getMovieCards, getGenre],
    (movies, genre) => movies
    .filter((movie) => movie.genre === genre || genre === DEFAULT_GENRE)
);

const getGenresList = createSelector(
    [getMovieCards],
    (movies) => [DEFAULT_GENRE, ...new Set(movies.map((movie) => movie.genre))]
);

const getCatalogCards = createSelector(
    [getMovieCards, getGenre, getDisplayCount],
    (movies, genre, count) => movies
    .filter((movie) => movie.genre === genre || genre === DEFAULT_GENRE)
    .slice(0, count)
);

const Selectors = {
  getGenre,
  getMovieCards,
  getUserData,
  getDisplayCount,
  getActiveCardById,
  getReviews,
  getFavoriteCards,
  getPromoCard,
  getRelatedMovies,
  getAuthStatus,
  getGenresList,
  getCatalogCards,
  getActiveGenreCards
};

export default Selectors;

