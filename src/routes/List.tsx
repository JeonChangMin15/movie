import { Poster } from "@src/component/List/Poster";
import { useFetchList } from "@src/hooks/useFetchList";

export const List = () => {
  const { data } = useFetchList();

  return (
    <div className="pt-5 px-5 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:px-20 lg:gap-9">
      {data?.results.map(({ title, poster_path, vote_average }) => {
        return (
          <Poster
            key={title}
            title={title}
            vote_average={vote_average}
            poster_path={poster_path}
          />
        );
      })}
    </div>
  );
};
