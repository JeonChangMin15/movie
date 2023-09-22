import Ajv from "ajv";

import { GenereID, GENRE } from "@src/constants/gener";
import { genreSchema } from "@src/constants/schema";
import { ContentT } from "@src/types/state";

type DataT = {
  [key: string]: number[];
};

export const getChartData = (content?: ContentT[]) => {
  if (!content) return;

  const data: DataT = {};
  const arr = [];

  const ajv = new Ajv();
  const validate = ajv.compile(genreSchema);

  for (const { genre_ids, vote_average } of content) {
    const isValid = validate({ genre_ids: genre_ids[0] });
    const id = String(genre_ids[0]) as GenereID;
    const g = GENRE[id];

    if (!isValid) continue;
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

/**
 * 막대그래프에 랜덤한 색깔을 부여하는 함수
 * @returns {string} 색깔 코드
 *
 */
export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};
