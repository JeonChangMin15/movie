import axios from "axios";
import { useQuery } from "react-query";

import { MovieList } from "@src/types/query";

const fetchSearch = async (keyword: string | undefined) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1",
    {
      params: {
        language: "ko-KR",
        query: keyword,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        Accept: "application/json",
      },
    }
  );

  return data;
};

export const useFetchSearch = (keyword: string | undefined) => {
  const { data } = useQuery<MovieList>(["search", keyword], () =>
    fetchSearch(keyword)
  );

  return { data };
};
