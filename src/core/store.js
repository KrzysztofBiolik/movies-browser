import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import movieListReducer from "../features/movies/MovieList/movieListSlice";
import movieReducer from "../features/movies/MovieDetails/movieSlice";
import searchReducer from "../common/Navigation/SearchBar/searchSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        movieList: movieListReducer,
        movie: movieReducer,
        search: searchReducer,
    },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
