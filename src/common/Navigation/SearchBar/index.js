import { Wrapper, SearchInput, SearchIcon } from "./styled";
import { useLocation } from "react-router-dom";
import {
	useQueryParameter,
	useReplaceQueryParameter,
} from "./useQueryParameters";
import queryParamName from "../../../queryParamName";

export const SearchBar = () => {

	const location = useLocation();

	const isMovies = location.pathname.startsWith("/movies");

	const query = useQueryParameter(queryParamName);
	const replaceQueryParameter = useReplaceQueryParameter();

	const onInputChange = ({ target }) => {
		replaceQueryParameter({
			key: queryParamName,
			value: target.value.trim() !== "" ? target.value : undefined,
		});
	};

	return (
		<Wrapper>
			<SearchIcon />
			<SearchInput
				value={query || ""}
				onChange={onInputChange}
				placeholder={isMovies ? "Search for movies..." : "Search for people..."}
			/>
		</Wrapper>
	);
};