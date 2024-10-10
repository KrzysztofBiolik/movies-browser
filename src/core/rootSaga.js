import { all } from "redux-saga/effects";
import { movieListSaga } from "../features/movies/MovieList/movieListSaga";
import { movieSaga } from "../features/movies/MovieDetails/movieSaga";
import { searchSaga } from "../common/Navigation/SearchBar/searchSaga";

export default function* rootSaga() {
    yield all([
        movieListSaga(),
        movieSaga(),
        searchSaga(),
    ]);
};