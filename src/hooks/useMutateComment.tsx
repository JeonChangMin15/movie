import { useMutation, MutationKey } from "react-query";
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { db } from "@src/Firebase";

interface Info {
  nickName: string;
  comment: string;
}

interface MutationProps {
  info: Info;
  movieId?: string;
}

export const useMutateComment = () => {
  const addComment = async (info: Info, movieId: string | undefined = "") => {
    const docRef = doc(db, "movie_comment", movieId);

    // Check if the document exists
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // If document exists, update the data
      await updateDoc(docRef, {
        data: arrayUnion(info),
      });
    } else {
      // If document doesn't exist, create it and set the data
      await setDoc(docRef, { data: [info] });
    }
  };

  const { mutate } = useMutation<void, unknown, MutationProps, MutationKey>({
    mutationFn: ({ info, movieId }: MutationProps) => addComment(info, movieId),
  });

  return { mutate };
};
