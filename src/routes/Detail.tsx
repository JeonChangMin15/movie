import { useParams } from "react-router-dom";

import { useFetchDetail } from "@src/hooks/useFetchDetail";
import { Info } from "@src/component/Detail/Info";
import { useState } from "react";
import { useMutateComment } from "@src/hooks/useMutateComment";

const Detail = () => {
  const { movieId } = useParams();
  const { data } = useFetchDetail(movieId);
  const [comment, setComment] = useState("");
  const { mutate } = useMutateComment();

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleButton = () => {
    const nickName = localStorage.getItem("nickName") || "";
    mutate({ info: { nickName, comment }, movieId });
  };

  return (
    <div>
      <Info data={data} />
      <div className="px-4 sm:px-28 lg:px-44 py-5">
        <p className="text-2xl">코멘트</p>
        <div className="flex items-center justify-center my-5 h-40 sm:h-60 w-full bg-gray-200 sm:text-2xl">
          코멘트가 없습니다. 첫 코멘트를 남겨주세요!
        </div>
        <textarea
          onChange={handleComment}
          className="outline-0 border-[1px]	border-gray-400	w-full h-20 resize-none"
        ></textarea>
        <div className="flex justify-end mt-3">
          <button
            onClick={handleButton}
            className="px-4 py-2 text-white	bg-blue-400	hover:bg-blue-600 active:bg-blue-400"
          >
            댓글달기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
