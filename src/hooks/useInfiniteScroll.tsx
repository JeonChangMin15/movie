import { useEffect, useRef } from "react";

import { addPage, selectPage } from "@src/redux/feature/poster/pageSlice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import {
  fetchPosterByPage,
  selectThunkPoster,
  selectThunkIsState,
} from "@src/redux/feature/poster/thunkposterSlice";

export const useInfiniteScroll = () => {
  const currentPage = useAppSelector(selectPage);
  const thunkPoster = useAppSelector(selectThunkPoster);
  const thunkIsState = useAppSelector(selectThunkIsState);
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
    if (currentPage * 20 !== thunkPoster.length) {
      dispatch(fetchPosterByPage(currentPage));
    }
  }, [currentPage]);

  return { ref, thunkIsState, thunkPoster };
};
