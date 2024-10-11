import { useEffect } from "react";
import { StyledMain as Main } from "../../../common/Main/styled";
import { Section, SectionTitle } from "../../../common/Section";
import { Pagination } from "../../../common/Pagination";
import { PeopleTile } from "../../../common/Tile";
import { toPeopleDetails } from "../../../core/routes";
import { List, ListItem, StyledLink } from "./styled";
import { Loading } from "../../../common/Loading";
import { Error } from "../../../common/Error";
import pageParamName from "../../../paginationParam";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import { SearchPage } from "../../search";
import queryParamName from "../../../queryParamName";
import { useQuery } from "@tanstack/react-query";
import { fetchPeopleList } from "./fetchPeopleList";

export const PeopleList = () => {
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

	const { isPending, isError, data } = useQuery({
		queryKey: ["people", {page: pageParam}],
		queryFn: fetchPeopleList,
	});

	if (query) { return < SearchPage /> };
	if (isPending) return <Loading />;
	if (isError) return <Error />

	return (
		<Main>
			<Section>
				<SectionTitle>Popular people</SectionTitle>
				<List>
					{data.map(({ id, profile_path, name }) => (
						<ListItem key={id}>
							<StyledLink to={toPeopleDetails({ id: id })}>
								<PeopleTile
									profilePath={profile_path}
									name={name} />
							</StyledLink>
						</ListItem>
					))}
				</List>
			</Section>
			<Pagination />
		</Main>
	);
};
