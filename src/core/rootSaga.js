import { all } from "redux-saga/effects";
import { searchSaga } from "../common/Navigation/SearchBar/searchSaga";

export default function* rootSaga() {
    yield all([
        searchSaga(),
    ]);
};