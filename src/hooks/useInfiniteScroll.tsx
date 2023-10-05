import { useEffect, useRef } from "react";

import { MovieList } from "@src/types/query";
import {
  addPage,
  selectContent,
  addPoster,
} from "@src/redux/feature/poster/posterSlice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";

export const useInfiniteScroll = (data: MovieList | undefined) => {
  const currentContent = useAppSelector(selectContent);
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;

    if (entry.isIntersecting) {
      dispatch(addPage());
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

    if (data.page * 20 !== currentContent.length) {
      dispatch(addPoster(info));
    }
  }, [data?.page]);

  return { ref, currentContent };
};
