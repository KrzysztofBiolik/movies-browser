import { APIbaseURL, AuthorizationAndLanguage } from "../../../API/APIdata";

export const fetchMovieDetails = async ({ queryKey }) => {
    const [_, movieId] = queryKey;

    const response = await fetch(
        `${APIbaseURL}movie/${movieId}${AuthorizationAndLanguage}`
    );

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
};

export const fetchMovieCredits = async ({ queryKey }) => {
    const [_, movieId] = queryKey;

    const response = await fetch(
        `${APIbaseURL}movie/${movieId}/credits${AuthorizationAndLanguage}`
    );

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();

};