import { MovieList } from "@src/types/query";
import { ContentT } from "@src/types/state";
import { Dispatch, Ref, SetStateAction, useEffect, useState } from "react";

export const useInfiniteScroll = (
  data: MovieList | undefined,
  setPage: Dispatch<SetStateAction<number>>
) => {
  const [content, setContent] = useState<ContentT[]>([]);
  const [ref, setRef] = useState(null) as [
    null,
    Ref<Dispatch<SetStateAction<null>>> | undefined
  ];

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;

    if (entry.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    let observer: IntersectionObserver;
    if (ref) {
      observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(ref);
    }

    return () => {
      observer && observer.disconnect();
    };
  }, [ref]);

  useEffect(() => {
    if (!data?.page) return;

    const info = data.results.map(({ title, poster_path, vote_average }) => ({
      title,
      poster_path,
      vote_average,
    }));

    setContent((prev) => [...prev, ...info]);
  }, [data?.page]);

  return { content, setRef };
};
