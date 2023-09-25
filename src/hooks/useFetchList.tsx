import { useQuery } from "react-query";

import { MovieList } from "@src/types/query";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@src/Firebase";

const fetchList = async (page: number) => {
  const docRef = doc(db, "movie_data", `list_${page}`);

  const docSnap = await getDoc(docRef);
  const documentData = docSnap.data();

  return documentData?.data;
};

export const useFetchList = (page: number) => {
  const { data, isLoading } = useQuery<MovieList>(["list", page], () =>
    fetchList(page)
  );

  return { data, isLoading };
};
