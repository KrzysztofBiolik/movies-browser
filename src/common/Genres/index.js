import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "./fetchGenres";

export const useGenres = () => {
    const { data } = useQuery({
        queryKey: ["genres"],
        queryFn: fetchGenres,
    });
    return data;
}
