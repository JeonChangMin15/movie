import axios from "axios";
import { useQuery } from "react-query";

import { MovieInfo } from "@src/types/query";
import { movieDetailInfoOpenApiUrl } from "@src/constants/api";

const fetchDetail = async (id: string | undefined) => {
  const { data } = await axios.get(`${movieDetailInfoOpenApiUrl}/${id}`, {
    params: {
      language: "ko-KR",
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      Accept: "application/json",
    },
  });

  return data;
};

export const useFetchDetail = (id: string | undefined) => {
  const { data } = useQuery<MovieInfo>(["detail", id], () => fetchDetail(id));

  return { data };
};
