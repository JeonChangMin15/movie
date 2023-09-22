import { useState } from "react";

import { useFetchList } from "@src/hooks/useFetchList";
import { useInfiniteScroll } from "@src/hooks/useInfiniteScroll";

import { Chart } from "@src/component/List/Chart";
import { Poster } from "@src/component/List/Poster";
import { Loading } from "@src/component/icon/Loading";

export const List = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useFetchList(page);
  const { content, ref } = useInfiniteScroll(data, setPage);
  console.log("page", page);
  return (
    <>
      <Chart content={content} />
      <div className="pt-5 px-5 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:px-20 lg:gap-9 min-h-screen">
        {content.length > 0 &&
          content.map(({ title, poster_path, vote_average }, index) => {
            return (
              <Poster
                key={title + index}
                title={title}
                vote_average={vote_average}
                poster_path={poster_path}
              />
            );
          })}
      </div>
      <div ref={ref}></div>
      {isLoading && <Loading />}
    </>
  );
};
