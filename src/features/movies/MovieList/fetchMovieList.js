import { APIbaseURL, AuthorizationAndLanguage } from "../../../API/APIdata";

export const fetchPopularMovies = async ({ queryKey }) => {
    const [_, params] = queryKey;
    const searchParams = new URLSearchParams(params);

    const response = await fetch(
        `${APIbaseURL}movie/popular${AuthorizationAndLanguage}&${searchParams}`
    );

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const responseJson = await response.json();
    const responseResult = await responseJson;
    return responseResult;
}