import { APIbaseURL, AuthorizationAndLanguage } from "../../../API/APIdata";

export const fetchPeopleDetails = async ({ queryKey }) => {
    const [_, personId] = queryKey;

    const response = await fetch(
        `${APIbaseURL}person/${personId}${AuthorizationAndLanguage}`
    );

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export const fetchPeopleCredits = async ({ queryKey }) => {
    const [_, personId] = queryKey;

    const response = await fetch(
        `${APIbaseURL}person/${personId}/movie_credits${AuthorizationAndLanguage}`
    );

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
    
};