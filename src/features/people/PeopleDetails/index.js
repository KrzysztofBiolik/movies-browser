import { useParams } from "react-router-dom";
import { Loading } from "../../../common/Loading";
import { Error } from "../../../common/Error";
import { Section } from "./styled";
import { SectionTitle } from "../../../common/Section";
import { toMovieDetails } from "../../../core/routes";
import { PeopleDetailsTile, MovieTile } from "../../../common/Tile";
import { StyledMain as Main } from "../../../common/Main/styled";
import { List, StyledLink } from "../../movies/MovieList/styled";
import { bigProfileURL } from "../../../API/APIdata";
import { useEffect } from "react";
import { SearchPage } from "../../search";
import { useQueryParameter } from "../../../common/Navigation/SearchBar/useQueryParameters";
import pageParamName from "../../../paginationParam";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import queryParamName from "../../../queryParamName";
import { useQueries } from "@tanstack/react-query";
import { fetchPeopleCredits, fetchPeopleDetails } from "./fetchPeopleDetails";
import { useGenres } from "../../../common/Genres";
import { processPeopleCredits } from "../../../API/processAPIData";

export const PeopleDetails = () => {
	const location = useLocation();
	const history = useHistory();
	const searchParams = new URLSearchParams(location.search);

	const query = useQueryParameter(queryParamName);
	const params = useParams();
	const personId = params.id;

	useEffect(() => {

		if (!query) {
			searchParams.delete(pageParamName);
			history.replace(`${location.pathname}?${searchParams.toString()}`);
		}
	}, [query]);


	const [personDetails, personCredits] = useQueries({
		queries: [
			{
				queryKey: ["peopleDetails", personId],
				queryFn: fetchPeopleDetails,
			},
			{
				queryKey: ["peopleCredits", personId],
				queryFn: fetchPeopleCredits,
			},
		],
	});

	const { isLoading: detailsLoading, error: detailsError, data: detailsData } = personDetails;
	const { isLoading: creditsLoading, error: creditsError, data: creditsData } = personCredits;
	const genresData = useGenres();

	const moviesCast = processPeopleCredits(creditsData?.cast, genresData)
	const moviesCrew = processPeopleCredits(creditsData?.crew, genresData)

	if (query) { return < SearchPage /> };
	if (detailsLoading && creditsLoading) return <Loading />;
	if (detailsError && creditsError) return <Error />

	return (
		<Main>
			<Section>
				<PeopleDetailsTile
					picturePersonDetails={detailsData?.profile_path
						? `${bigProfileURL}${detailsData?.profile_path}`
						: ""}
					name={detailsData?.name || "Unknown"}
					date={
						detailsData?.birthday
							? new Date(detailsData?.birthday).toLocaleDateString()
							: "Unknown"
					}
					place={detailsData?.place_of_birth || "Unknown"}
					description={detailsData?.biography || "No biography available."}
				/>
			</Section>
			<Section>
				<SectionTitle>Movies - Cast ({moviesCast?.length})</SectionTitle>
				<List>
					{moviesCast?.map(
						({
							id,
							creditId,
							title,
							rating,
							vote_count,
							date,
							namedGenres,
							poster,
						}) => (
							<li key={creditId}>
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
			<Section>
				<SectionTitle>Movies - Crew ({moviesCrew?.length})</SectionTitle>
				<List>
					{moviesCrew?.map(
						({
							id,
							creditId,
							title,
							rating,
							vote_count,
							date,
							namedGenres,
							poster,
						}) => (
							<li key={creditId}>
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
		</Main>
	);
};
