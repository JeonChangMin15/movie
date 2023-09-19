import { useFetchList } from "@src/hooks/useFetchList";

export const List = () => {
  const { data } = useFetchList();

  return <div className="text-2xl">List</div>;
};
