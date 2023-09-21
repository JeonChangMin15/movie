import { useState } from "react";

import { Poster } from "@src/component/List/Poster";
import { useFetchList } from "@src/hooks/useFetchList";
import { useInfiniteScroll } from "@src/hooks/useInfiniteScroll";

export const List = () => {
  const [page, setPage] = useState(1);

  const { data } = useFetchList(page);
  const { content, setRef } = useInfiniteScroll(data, setPage);

  return (
    <div className="pt-5 px-5 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:px-20 lg:gap-9">
      {content.length > 0 &&
        content.map(({ title, poster_path, vote_average }, index) => {
          return (
            <Poster
              key={title + index}
              title={title}
              vote_average={vote_average}
              poster_path={poster_path}
              ref={content.length - 1 === index ? setRef : null}
            />
          );
        })}
    </div>
  );
};
