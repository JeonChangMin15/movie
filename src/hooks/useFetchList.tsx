import axios from "axios";
import { useQuery } from "react-query";

import { MovieList } from "@src/types/query";
import { movieOpenApiUrl } from "@src/constants/api";

const fetchList = async () => {
  const { data } = await axios.get(movieOpenApiUrl, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      Accept: "application/json",
    },
    params: {
      language: "ko-KR",
      country: "KR",
      page: 1,
    },
  });

  return data;
};

export const useFetchList = () => {
  const { data } = useQuery<MovieList>(["list"], () => fetchList());

  return { data };
};
