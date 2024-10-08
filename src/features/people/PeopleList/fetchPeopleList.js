import { APIbaseURL, AuthorizationAndLanguage } from "../../../API/APIdata";

export const fetchPeopleList = async ({ queryKey }) => {
    const [_, params] = queryKey;
    const searchParams = new URLSearchParams(params);

    const response = await fetch(
        `${APIbaseURL}person/popular${AuthorizationAndLanguage}&${searchParams}`
    );

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const responseJson = await response.json();
    return responseJson.results;
}
