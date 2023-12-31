import { useInfiniteScroll } from "@src/hooks/useInfiniteScroll";

import { Input } from "@src/component/List/Input";
import { Chart } from "@src/component/List/Chart";
import { Poster } from "@src/component/List/Poster";
import { Loading } from "@src/component/icon/Loading";
import { useAppSelector } from "@src/redux/hooks";
import { selectIsShow } from "@src/redux/feature/chart/chartSlice";

const List = () => {
  const isShow = useAppSelector(selectIsShow);

  const { ref, thunkIsState, thunkPoster } = useInfiniteScroll();

  return (
    <>
      <Input />
      {isShow && <Chart content={thunkPoster} />}
      <div className="pt-5 px-5 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:px-20 lg:gap-9 min-h-screen">
        {thunkPoster.length > 0 &&
          thunkPoster.map(({ title, poster_path, vote_average, id }, index) => {
            return (
              <Poster
                key={title + index}
                title={title}
                vote_average={vote_average}
                poster_path={poster_path}
                movieId={id}
              />
            );
          })}
      </div>
      <div ref={ref}></div>
      {thunkIsState === "loading" && <Loading />}
    </>
  );
};

export default List;
