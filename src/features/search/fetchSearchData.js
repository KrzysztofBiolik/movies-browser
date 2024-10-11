import axios from "axios";
import { APIbaseURL, AuthorizationAndLanguage } from "../../API/APIdata";

export const fetchSearch = async ({ queryKey }) => {
    const [_, params] = queryKey;
    const { path, ...queryParams } = params;

    const searchParams = new URLSearchParams(queryParams);

    const fetchURL = `${APIbaseURL}search/${path}${AuthorizationAndLanguage}&${searchParams}`;


    const response = await axios.get(fetchURL);
    return response.data;
};
