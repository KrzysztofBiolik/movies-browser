import { SearchMovieList } from "./searchMovieListPage";
import { Loading } from "../../common/Loading";
import { NoResults } from "../../common/NoResults";
import { SearchPeopleList } from "./searchPeopleList";
import { Error } from "../../common/Error";
import moviesPathName from "../../moviePathName";
import peoplePathName from "../../personPathName";
import { Section, SectionTitle } from "../../common/Section";
import { StyledMain } from "../../common/Main/styled";
import { useQueryParameter } from "../../common/Navigation/SearchBar/useQueryParameters";
import queryParamName from "../../queryParamName";
import { useQuery } from "@tanstack/react-query";
import paginationParam from "../../paginationParam";
import { fetchSearch } from "./fetchSearchData";
import { useLocation } from "react-router-dom";
import { processSearchResults } from "../../API/processAPIData";
import { useGenres } from "../../common/Genres";

export const SearchPage = () => {
	const location = useLocation();

	const pageParam = useQueryParameter(paginationParam)
	const query = useQueryParameter(queryParamName);
	const path = location.pathname.startsWith("/movies") ? "movie" : "person";

	const { isPending, isError, data } = useQuery({
		queryKey: ["search", { path, query, page: pageParam }],
		queryFn: fetchSearch,
	});

	const genresData = useGenres();

	const searchResults = processSearchResults(data, genresData, path);
	const totalPages = data?.total_pages;
	const searchTotalResults = data?.total_results;

	if (!isPending && !searchResults.length) {
		return <NoResults searchQuery={query} />;
	}
	if (isPending) return (
		<StyledMain>
			<Section>
				<SectionTitle>Search results for {`"${query}"`}</SectionTitle>
				<Loading />
			</Section>
		</StyledMain>
	);
	if (isError) return <Error />
	if (path === moviesPathName) {
		return (
			<SearchMovieList
				searchQuery={query}
				searchResults={searchResults}
				searchTotalResults={searchTotalResults}
				totalPages={totalPages}
			/>
		);
	}
	if (path === peoplePathName) {
		return (
			<SearchPeopleList
				searchQuery={query}
				searchResults={searchResults}
				searchTotalResults={searchTotalResults}
				totalPages={totalPages}
			/>
		)
	}
};
