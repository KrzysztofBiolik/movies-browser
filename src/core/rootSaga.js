import { all } from "redux-saga/effects";
import { movieSaga } from "../features/movies/MovieDetails/movieSaga";
import { searchSaga } from "../common/Navigation/SearchBar/searchSaga";

export default function* rootSaga() {
    yield all([
        movieSaga(),
        searchSaga(),
    ]);
};