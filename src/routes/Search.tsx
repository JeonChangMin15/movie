import { useParams } from "react-router-dom";
import { FcQuestions } from "react-icons/fc";

import { Poster } from "@src/component/List/Poster";
import { useFetchSearch } from "@src/hooks/useFetchSearch";
import { validateSearchResult } from "@src/utils/validate";

const Search = () => {
  const { keyword } = useParams();
  const { data } = useFetchSearch(keyword);

  const list = validateSearchResult(data);

  if (data?.results.length === 0) {
    return (
      <div className="bg-slate-100 px-5 lg:px-20">
        <div className="flex items-center pt-5 text-xl font-semibold">
          <span>"{keyword}"의 검색결과</span>
        </div>

        <div className="flex justify-center items-center flex-col gap-y-1 min-h-screen">
          <div className="-translate-y-20">
            <FcQuestions size={120} />
          </div>
          <div className="flex -translate-y-20">
            <span className="font-bold">{keyword}</span>
            <span>의 검색결과가 없습니다</span>
          </div>
          <div className="-translate-y-20">다른 키워드로 검색해보세요.</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="px-5 lg:px-20">
        <div className="flex items-center pt-5 text-xl font-semibold">
          <span>"{keyword}"의 검색결과</span>
        </div>
        <div className="pt-5 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:gap-9">
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
    </>
  );
};

export default Search;
