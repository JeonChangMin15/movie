import { useQuery } from "react-query";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@src/Firebase";

interface Comment {
  nickName: string;
  comment: string;
}

const fetchComment = async (id: string | undefined = "") => {
  const docRef = doc(db, "movie_comment", id);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const documentData = docSnap.data();

    return documentData.data;
  } else {
    return [];
  }
};

export const useFetchComment = (movieId: string | undefined) => {
  const { data } = useQuery<Comment[]>(["comment", movieId], () =>
    fetchComment(movieId)
  );

  return { data };
};
