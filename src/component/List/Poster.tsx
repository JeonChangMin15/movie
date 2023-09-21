import { Star } from "../icon/Star";

interface PosterProps {
  title: string;
  vote_average: number;
  poster_path: string;
}

export const Poster = ({ title, vote_average, poster_path }: PosterProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        className="w-full h-60 rounded-md	"
      />

      <div className="flex flex-row justify-between items-center">
        <span className="font-medium">{title}</span>
        <div className="flex gap-x-1 justify-center items-center">
          <Star />
          <span className="font-semibold text-zinc-500">{vote_average}</span>
        </div>
      </div>
    </div>
  );
};
