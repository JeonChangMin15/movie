import { useParams } from "react-router-dom";

import { Poster } from "@src/component/List/Poster";
import { useFetchSearch } from "@src/hooks/useFetchSearch";
import { validateSearchResult } from "@src/utils/validate";

export const Search = () => {
  const { keyword } = useParams();
  const { data } = useFetchSearch(keyword);

  const list = validateSearchResult(data);

  return (
    <div className="px-5 lg:px-20">
      <div className="flex items-center pt-5 text-xl font-semibold">
        <span>"{keyword}"의 검색결과</span>
      </div>
      <div className="pt-5 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:gap-9 min-h-screen">
        {list?.map(({ title, poster_path, vote_average, id }, index) => {
          return (
            <Poster
              key={title + index}
              title={title}
              vote_average={vote_average}
              poster_path={poster_path}
              movieId={id}
            />
          );
        })}
      </div>
    </div>
  );
};
