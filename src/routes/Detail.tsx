import { useParams } from "react-router-dom";

import { Info } from "@src/component/Detail/Info";
import { Comment } from "@src/component/Detail/Comment";
import { useFetchDetail } from "@src/hooks/useFetchDetail";

const Detail = () => {
  const { movieId } = useParams();
  const { data } = useFetchDetail(movieId);

  return (
    <div>
      <Info data={data} />
      <Comment movieId={movieId} />
    </div>
  );
};

export default Detail;
