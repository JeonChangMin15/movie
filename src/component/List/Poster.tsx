import React from "react";
import { forwardRef } from "react";

interface PosterProps {
  title: string;
  vote_average: number;
  poster_path: string;
}

export const Poster = forwardRef(
  (
    { title, vote_average, poster_path }: PosterProps,
    ref: React.ForwardedRef<React.Dispatch<React.SetStateAction<null>>>
  ) => {
    return (
      <div
        ref={ref as React.LegacyRef<HTMLDivElement> | undefined}
        className="flex flex-col gap-y-2"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          className="w-full h-60 rounded-md	"
        />

        <div className="flex flex-row justify-between items-center">
          <span>{title}</span>
          <span className="font-semibold text-zinc-400">{vote_average}</span>
        </div>
      </div>
    );
  }
);
