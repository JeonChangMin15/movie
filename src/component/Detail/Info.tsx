import { MovieInfo } from "@src/types/query";
import { getRunningTime } from "@src/utils/time";

interface InfoProps {
  data?: MovieInfo;
}

export const Info = ({ data }: InfoProps) => {
  return (
    <>
      <div className="flex flex-col relative h-[500px] lg:h-[600px]">
        <img
          src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
          className="h-full"
        />
        <div className="px-4 sm:px-32 lg:px-60 absolute bottom-8 z-3 text-white">
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
        <div className="flex flex-col gap-y-8 sm:flex-row-reverse sm:justify-center sm:px-20 lg:px-40">
          <div className="px-4 sm:px-10 sm:w-3/5 lg:w-3/4 text-zinc-500 font-semibold">
            {data?.overview}
          </div>
          <div className="flex justify-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
              className="w-[380px] h-[300px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};
