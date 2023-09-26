import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { MovieList } from "@src/types/query";
import { ContentT } from "@src/types/state";

export const useInfiniteScroll = (
  data: MovieList | undefined,
  setPage: Dispatch<SetStateAction<number>>
) => {
  const [content, setContent] = useState<ContentT[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    const MAX_PAGE = 10;

    if (entry.isIntersecting) {
      setPage((prevPage) => (prevPage < MAX_PAGE ? prevPage + 1 : MAX_PAGE));
    }
  };

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer: IntersectionObserver = new IntersectionObserver(
      handleIntersection,
      options
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  useEffect(() => {
    if (!data?.page) return;

    const info = data.results.map(
      ({ title, poster_path, vote_average, genre_ids, id }) => ({
        title,
        poster_path,
        vote_average,
        genre_ids,
        id,
      })
    );

    setContent((prev) => [...prev, ...info]);
  }, [data?.page]);

  return { content, ref };
};
