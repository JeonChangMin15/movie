import { MovieList } from "@src/types/query";

export const validateSearchResult = (data: MovieList | undefined) => {
  if (!data) return;

  const result = [];

  for (const {
    title,
    vote_average,
    poster_path,
    id,
    backdrop_path,
    overview,
  } of data.results) {
    if (
      !poster_path ||
      !backdrop_path ||
      vote_average < 1 ||
      overview.length < 5
    )
      continue;
    result.push({ title, vote_average, poster_path, id });
  }

  return result;
};
