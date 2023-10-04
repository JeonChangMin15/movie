import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";

import { useFetchComment } from "@src/hooks/useFetchComment";
import { useMutateComment } from "@src/hooks/useMutateComment";

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
    const photoURL = localStorage.getItem("photoURL") || "";

    mutate(
      { info: { nickName, comment, photoURL }, movieId },
      {
        onSuccess: () => setComment(""),
      }
    );
  };

  return (
    <div className="px-4 sm:px-20 lg:px-40 py-5">
      <p className="text-2xl">코멘트</p>
      {comments?.length === 0 ? (
        <div className="flex items-center justify-center my-5 h-40 sm:h-60 w-full bg-gray-200 sm:text-xl lg:text-2xl">
          코멘트가 없습니다. 첫 코멘트를 남겨주세요!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-5 gap-4">
          {comments?.map(({ nickName, comment, photoURL }, index) => (
            <div
              key={comment + index}
              className="h-40 px-3 py-3 bg-gray-100 break-words"
            >
              <div className="flex items-center gap-x-3">
                {photoURL ? (
                  <img src={photoURL} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="flex items-center justify-center bg-gray-300 w-10 h-10 rounded-full">
                    <FaRegUser />
                  </div>
                )}

                <p className="text-xl">{nickName}</p>
              </div>
              <div className="w-full h-[1px] bg-gray-200 mt-1 mb-1"></div>
              <div>{comment.slice(0, 100)}</div>
            </div>
          ))}
        </div>
      )}

      <textarea
        onChange={handleComment}
        className="outline-0 border-[1px]	border-gray-400	w-full h-20 resize-none"
        value={comment}
        placeholder="코멘트를 입력해주세요"
      ></textarea>
      <div className="flex justify-end mt-3">
        <button
          disabled={isLoading || comment.length === 0}
          onClick={handleButton}
          className="px-4 py-2 text-white	bg-blue-500	hover:bg-blue-600 active:bg-blue-400 disabled:bg-blue-200"
        >
          댓글달기
        </button>
      </div>
    </div>
  );
};
