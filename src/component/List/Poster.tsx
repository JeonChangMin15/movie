import { Star } from "../icon/Star";
import { useNavigate } from "react-router-dom";

interface PosterProps {
  title: string;
  vote_average: number;
  poster_path: string;
  movieId: number;
}

export const Poster = ({
  title,
  vote_average,
  poster_path,
  movieId,
}: PosterProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col gap-y-2 hover:cursor-pointer active:shadow-md hover:shadow-md pb-2 rounded-md"
      onClick={() => navigate(`/detail/${movieId}`)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        className="w-full h-60 rounded-md	"
      />

      <div className="flex flex-row justify-between items-center px-1">
        <span className="font-medium">{title}</span>
        <div className="flex gap-x-1 justify-center items-center">
          <Star />
          <span className="font-semibold text-zinc-500">
            {vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};
