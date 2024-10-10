import { Rating } from "../../../common/Rating";
import {
	BackgroundImage,
	Header,
	Title,
	TitleContainer,
	Vignette,
	Section,
	List,
} from "./styled";
import { Loading } from "../../../common/Loading";
import { Error } from "../../../common/Error";
import { SectionTitle } from "../../../common/Section";
import { MovieDetailsTile, PeopleTile } from "../../../common/Tile";
import { StyledMain as Main } from "../../../common/Main/styled";
import { ListItem, StyledLink } from "../../people/PeopleList/styled";
import { toPeopleDetails } from "../../../core/routes";
import {
	useHistory,
	useLocation,
	useParams,
} from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import queryParamName from "../../../queryParamName";
import { SearchPage } from "../../search";
import { useQueryParameter } from "../../../common/Navigation/SearchBar/useQueryParameters";
import pageParamName from "../../../paginationParam";
import { useQueries } from "@tanstack/react-query";
import { fetchMovieCredits, fetchMovieDetails } from "./fetchMovieDetails";
import { processMovieDetailsData } from "../../../API/processAPIData";

export const MovieDetails = () => {
	const location = useLocation();
	const history = useHistory();

	const params = useParams();
	const movieId = params.id;
	const query = useQueryParameter(queryParamName);

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);

		if (!query) {
			searchParams.delete(pageParamName);
			history.replace(`${location.pathname}?${searchParams.toString()}`);
		}
	}, [query, history, location.pathname, location.search]);

	const [movieDetails, movieCredits] = useQueries({
		queries: [
			{
				queryKey: ["movieDetails", movieId],
				queryFn: fetchMovieDetails,
			},
			{
				queryKey: ["movieCredits", movieId],
				queryFn: fetchMovieCredits,
			},
		],
	});

	const { isLoading: detailsLoading, error: detailsError, data: detailsData } = movieDetails;
	const { isLoading: creditsLoading, error: creditsError, data: creditsData } = movieCredits;

	const movie = processMovieDetailsData(detailsData);
	const cast = creditsData?.cast;
	const crew = creditsData?.crew;

	if (query) { return <SearchPage />; }
	if (detailsLoading && creditsLoading) return <Loading />;
	if (detailsError && creditsError) return <Error />

	return (
		<>
			{movie.backdrop ? (
				<Header>
					<BackgroundImage poster={movie.backdrop}>
						<Vignette />
						<TitleContainer>
							<Title>{movie.title}</Title>
							<Rating
								isOnMoviePhoto
								ratingValue={movie.rating}
								voteAmount={movie.voteCount}
							/>
						</TitleContainer>
					</BackgroundImage>
				</Header>
			) : (
				""
			)}
			<Main>
				<Section>
					<MovieDetailsTile
						poster={movie.poster}
						ratingValue={movie.rating}
						voteAmount={movie.voteCount}
						title={movie.title}
						year={movie?.releaseYear || "Unknown"}
						production={movie?.production || "Unknown"}
						productionShort={movie?.productionShort || "Unknown"}
						date={
							movie.releaseDate
								? new Date(movie.releaseDate).toLocaleDateString()
								: "Unknown"
						}
						tags={movie.genres}
						description={movie?.description || "No description available."}
					/>
				</Section>
				<Section>
					<SectionTitle>Cast ({cast?.length})</SectionTitle>
					<List>
						{cast?.map(
							({ cast_id, id, name, character, profile_path }) => (
								<ListItem key={cast_id}>
									<StyledLink to={toPeopleDetails({ id: id })}>
										<PeopleTile
											profilePath={profile_path}
											name={name}
											character={character}
										/>
									</StyledLink>
								</ListItem>
							)
						)}
					</List>
				</Section>
				<Section>
					<SectionTitle>Crew ({crew?.length})</SectionTitle>
					<List>
						{crew?.map(({ credit_id, id, name, profile_path, job }) => (
							<ListItem key={credit_id}>
								<StyledLink to={toPeopleDetails({ id: id })}>
									<PeopleTile
										profilePath={profile_path}
										name={name}
										role={job}
									/>
								</StyledLink>
							</ListItem>
						))}
					</List>
				</Section>
			</Main >
		</>
	);
};
