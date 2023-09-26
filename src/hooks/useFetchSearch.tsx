import axios from "axios";
import { useQuery } from "react-query";

import { MovieList } from "@src/types/query";
import { movieSearchOpenApiUrl } from "@src/constants/api";

const fetchSearch = async (keyword: string | undefined) => {
  const { data } = await axios.get(movieSearchOpenApiUrl, {
    params: {
      language: "ko-KR",
      query: keyword,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      Accept: "application/json",
    },
  });

  return data;
};

export const useFetchSearch = (keyword: string | undefined) => {
  const { data } = useQuery<MovieList>(["search", keyword], () =>
    fetchSearch(keyword)
  );

  return { data };
};
