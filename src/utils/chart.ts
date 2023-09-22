import { GenereID, GENRE } from "@src/constants/gener";
import { ContentT } from "@src/types/state";

type DataT = {
  [key: string]: number[]; // 모든 문자열 키에 대한 값의 타입을 'any'로 지정
};

export const getChartData = (content?: ContentT[]) => {
  const data: DataT = {};
  const arr = [];
  if (!content) return;
  for (const { genre_ids, vote_average } of content) {
    const id = String(genre_ids[0]) as GenereID;
    const g = GENRE[id];
    if (!g) continue;
    if (!data[g]) data[g] = [];

    data[g].push(vote_average);
  }

  for (const key in data) {
    const value = Math.round(
      data[key].reduce((prev, cur) => prev + cur, 0) / data[key].length
    );
    arr.push({ name: key, value });
  }

  return arr;
};
