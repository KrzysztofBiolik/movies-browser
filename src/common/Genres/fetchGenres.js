import { APIbaseURL, AuthorizationAndLanguage } from "../../API/APIdata";

export const fetchGenres = async () => {
    const response = await fetch(
        `${APIbaseURL}genre/movie/list${AuthorizationAndLanguage}`
    );

    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json();
};