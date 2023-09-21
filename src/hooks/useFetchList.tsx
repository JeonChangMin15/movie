import axios from "axios";
import { useQuery } from "react-query";

import { MovieList } from "@src/types/query";
import { movieOpenApiUrl } from "@src/constants/api";

const fetchList = async (page: number) => {
  const { data } = await axios.get(movieOpenApiUrl, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      Accept: "application/json",
    },
    params: {
      language: "ko-KR",
      country: "KR",
      page,
    },
  });

  return data;
};

export const useFetchList = (page: number) => {
  const { data, isLoading } = useQuery<MovieList>(["list", page], () =>
    fetchList(page)
  );

  return { data, isLoading };
};
