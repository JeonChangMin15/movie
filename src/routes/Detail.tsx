import { useParams } from "react-router-dom";

import { useFetchDetail } from "@src/hooks/useFetchDetail";
import { getRunningTime } from "@src/utils/time";

export const Detail = () => {
  const { movieId } = useParams();
  const { data } = useFetchDetail(movieId);

  return (
    <div>
      <div className="flex flex-col relative h-[500px] lg:h-[600px]">
        <img
          src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
          className="h-full"
        />
        <div className="px-4  sm:px-40 lg:px-80 absolute bottom-8 z-3 text-white">
          <p className="text-5xl font-semibold mb-2">{data?.title}</p>
          <p className="mb-1">{data?.original_title}</p>
          <div className="flex flex-row gap-x-1 mb-1">
            <span>{data?.release_date.slice(0, 4)}</span>
            <span>&middot;</span>
            {data?.genres.map(({ name }) => (
              <span key={name}>{name}</span>
            ))}
          </div>
          <span>{getRunningTime(data?.runtime)}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="h-[2px] bg-slate-300 w-full my-3"></div>
        <div className="flex flex-row gap-x-3 justify-center items-center">
          <span className="text-sm text-gray-500	">평균별점</span>
          <span className="text-3xl text-gray-500	">
            {data?.vote_average.toFixed(1)}
          </span>
        </div>
        <div className="h-[2px] bg-slate-300 w-full my-3"></div>
        <div className="px-4 sm:px-40 lg:px-80 text-zinc-500 font-semibold">
          {data?.overview}
        </div>
      </div>
    </div>
  );
};
