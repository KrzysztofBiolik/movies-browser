import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import searchReducer from "../common/Navigation/SearchBar/searchSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        search: searchReducer, 
    },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
