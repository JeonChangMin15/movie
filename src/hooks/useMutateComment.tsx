import { useMutation, MutationKey, useQueryClient } from "react-query";
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";

import { db } from "@src/Firebase";

interface Info {
  nickName: string;
  comment: string;
  photoURL?: string;
}

interface MutationProps {
  info: Info;
  movieId?: string;
}

export const useMutateComment = (movieId: string | undefined = "") => {
  const addComment = async (info: Info, movieId: string | undefined = "") => {
    const docRef = doc(db, "movie_comment", movieId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        data: arrayUnion(info),
      });
    } else {
      await setDoc(docRef, { data: [info] });
    }
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation<
    void,
    unknown,
    MutationProps,
    MutationKey
  >({
    mutationFn: ({ info, movieId }: MutationProps) => addComment(info, movieId),
    onSuccess: () => queryClient.invalidateQueries(["comment", movieId]),
  });

  return { mutate, isLoading };
};
