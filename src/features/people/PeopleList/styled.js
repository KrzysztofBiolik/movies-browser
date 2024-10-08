import { Link } from "react-router-dom/cjs/react-router-dom";
import styled from "styled-components";

export const List = styled.ul`
	display: grid;
	grid-template-columns: repeat(6, minmax(150px, 1fr));
	grid-gap: 24px;
	margin: 24px auto 0;
	padding: 0;
	list-style: none;

	@media (max-width: ${({ theme }) => theme.breakpoints.desktopSmall}px) {
		grid-template-columns: repeat(5, minmax(150px, 1fr));
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.tabletSmall}px) {
		grid-template-columns: repeat(4, minmax(150px, 1fr));
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.mobileLarge}px) {
		grid-template-columns: repeat(3, minmax(120px, 1fr));
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}px) {
		margin: 12px auto 0;
		grid-template-columns: repeat(2, minmax(120px, 1fr));
		grid-gap: 16px;
	}
`;

export const ListItem = styled.li`
`;

export const StyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;
