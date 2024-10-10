import { Section, SectionTitle } from "../../../common/Section";
import { Pagination } from "../../../common/Pagination";
import { MovieTile } from "../../../common/Tile";
import { List, StyledLink } from "./styled";
import { toMovieDetails } from "../../../core/routes";
import { StyledMain as Main } from "../../../common/Main/styled";
import { useEffect } from "react";
import { Loading } from "../../../common/Loading";
import { Error } from "../../../common/Error";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import pageParamName from "../../../paginationParam";
import { SearchPage } from "../../search";
import queryParamName from "../../../queryParamName";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "./fetchMovieList";
import { useGenres } from "../../../common/Genres";
import { processMovieListData } from "../../../API/processAPIData";

export const MovieList = () => {
	const location = useLocation();
	const history = useHistory();
	const searchParams = new URLSearchParams(location.search);
	const query = searchParams.get(queryParamName);
	const pageParam = searchParams.get(pageParamName);
	
	useEffect(() => {
		if (pageParam === null) {
			searchParams.set(pageParamName, 1);
			history.replace(`${location.pathname}?${searchParams.toString()}`);
		}

	}, [location]);

	const { isPending, isError, data: rawData } = useQuery({
		queryKey: ["movieList", { page: pageParam }],
		queryFn: fetchPopularMovies,
	});

	const rawGenres = useGenres();
	const movies = processMovieListData(rawData, rawGenres);


	if (query) { return <SearchPage /> };
	if (isPending) return <Loading />;
	if (isError) return <Error />;

	return (
		<Main>
			<Section>
				<SectionTitle>Popular movies</SectionTitle>
				<List>
					{movies?.map(
						({
							title,
							id,
							rating,
							vote_count,
							date,
							namedGenres,
							poster,
						}) => (
							<li key={id}>
								<StyledLink to={toMovieDetails({ id: id })}>
									<MovieTile
										poster={poster}
										ratingValue={rating}
										voteAmount={vote_count}
										title={title}
										year={date}
										tags={namedGenres}
									/>
								</StyledLink>
							</li>
						)
					)}
				</List>
			</Section>
			<Pagination />
		</Main>
	);
};
