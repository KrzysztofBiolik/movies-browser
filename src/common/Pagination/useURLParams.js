import { useDispatch } from "react-redux"
import { pageNumberFromURL } from "../Navigation/SearchBar/searchSlice";

export const useUpdatePageFromURL = () => {

    const dispatch = useDispatch();
    return ({ key, value }) => {

        if (key === "search") {
            dispatch(pageNumberFromURL(value))
        }
    }
};