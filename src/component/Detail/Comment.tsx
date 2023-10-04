import { useFetchComment } from "@src/hooks/useFetchComment";
import { useMutateComment } from "@src/hooks/useMutateComment";

import React, { useState } from "react";

interface CommentProps {
  movieId?: string;
}

export const Comment = ({ movieId }: CommentProps) => {
  const [comment, setComment] = useState("");
  const { mutate, isLoading } = useMutateComment(movieId);
  const { data: comments } = useFetchComment(movieId);

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleButton = () => {
    const nickName = localStorage.getItem("nickName") || "";

    mutate({ info: { nickName, comment }, movieId });
  };

  return (
    <div className="px-4 sm:px-28 lg:px-44 py-5">
      <p className="text-2xl">코멘트</p>
      {comments?.length === 0 ? (
        <div className="flex items-center justify-center my-5 h-40 sm:h-60 w-full bg-gray-200 sm:text-xl lg:text-2xl">
          코멘트가 없습니다. 첫 코멘트를 남겨주세요!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-5 gap-4">
          {comments?.map(({ nickName, comment }, index) => (
            <div
              key={comment + index}
              className="h-40 px-3 py-3 bg-gray-100 break-words"
            >
              <p className="text-xl">{nickName}</p>
              <div className="w-full h-[1px] bg-gray-200 mt-1 mb-1"></div>
              <div>{comment.slice(0, 100)}</div>
            </div>
          ))}
        </div>
      )}

      <textarea
        onChange={handleComment}
        className="outline-0 border-[1px]	border-gray-400	w-full h-20 resize-none"
      ></textarea>
      <div className="flex justify-end mt-3">
        <button
          disabled={isLoading}
          onClick={handleButton}
          className="px-4 py-2 text-white	bg-blue-400	hover:bg-blue-600 active:bg-blue-400"
        >
          댓글달기
        </button>
      </div>
    </div>
  );
};
