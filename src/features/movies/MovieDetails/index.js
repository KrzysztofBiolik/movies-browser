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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
	selectMovie,
	selectMovieCast,
	selectMovieCrew,
	setMovieId,
	selectMovieStatus,
} from "./movieSlice";
import queryParamName from "../../../queryParamName";
import { SearchPage } from "../../search";
import { useQueryParameter } from "../../../common/Navigation/SearchBar/useQueryParameters";
import pageParamName from "../../../paginationParam";


export const MovieDetails = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();

	const searchParams = new URLSearchParams(location.search);

	const query = useQueryParameter(queryParamName);

	useEffect(() => {
		dispatch(setMovieId(params.id));

		if (!query) {
			searchParams.delete(pageParamName);
			history.replace(`${location.pathname}?${searchParams.toString()}`);
		}
	}, [params.id, query]);

	const movie = useSelector(selectMovie);
	const cast = useSelector(selectMovieCast);
	const crew = useSelector(selectMovieCrew);
	const status = useSelector(selectMovieStatus);

	if (query) {
		return <SearchPage />;
	}

	switch (status) {
		case "loading":
			return <Loading />;
		case "error":
			return <Error />;
		default:
			return (
				<>
					{movie.backdrop ?
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
						:
						("")
					}
					<Main>
						<Section>
							<MovieDetailsTile
								poster={movie.poster}
								ratingValue={movie.rating}
								voteAmount={movie.voteCount}
								title={movie.title}
								year={movie.releaseYear}
								production={movie.production}
								productionShort={movie.productionShort}
								date={
									movie.releaseDate
										? new Date(movie.releaseDate).toLocaleDateString()
										: "Unknown"
								}
								tags={movie.genres}
								description={movie.description}
							/>
						</Section>
						<Section>
							<SectionTitle>Cast</SectionTitle>
							{cast && (
								<List>
									{cast.map(({ cast_id, name, character, profile_path }) => (
										<ListItem key={cast_id}>
											<StyledLink to={toPeopleDetails({ id: cast_id })}>
												<PeopleTile
													profilePath={profile_path}
													name={name}
													character={character}
												/>
											</StyledLink>
										</ListItem>
									))}
								</List>
							)}
						</Section>
						<Section>
							<SectionTitle>Crew</SectionTitle>
							{crew && (
								<List>
									{crew.map(({ credit_id, name, profile_path, job }) => (
										<ListItem key={credit_id}>
											<StyledLink to={toPeopleDetails({ id: credit_id })}>
												<PeopleTile
													profilePath={profile_path}
													name={name}
													role={job}
												/>
											</StyledLink>
										</ListItem>
									))}
								</List>
							)}
						</Section>
					</Main>
				</>
			);
	}
};
