import { Detail, MovieList } from "@src/types/query";
import { JSONSchemaType } from "ajv";

const detailSchema: JSONSchemaType<Detail> = {
  type: "object",
  properties: {
    adult: { type: "boolean" },
    backdrop_path: { type: "string" },
    genre_ids: { type: "array", items: { type: "number" } },
    id: { type: "number" },
    original_language: { type: "string" },
    original_title: { type: "string" },
    overview: { type: "string" },
    popularity: { type: "number" },
    poster_path: { type: "string" },
    release_date: { type: "string" },
    title: { type: "string" },
    video: { type: "boolean" },
    vote_average: { type: "number" },
    vote_count: { type: "number" },
  },
  required: [
    "adult",
    "backdrop_path",
    "genre_ids",
    "id",
    "original_language",
    "original_title",
    "overview",
    "popularity",
    "poster_path",
    "release_date",
    "title",
    "video",
    "vote_average",
    "vote_count",
  ],
};

export const movieListSchema: JSONSchemaType<MovieList> = {
  type: "object",
  properties: {
    page: { type: "number" },
    results: { type: "array", items: detailSchema },
  },
  required: ["page", "results"],
};

export const genreSchema: JSONSchemaType<{ genre_ids: number }> = {
  type: "object",
  properties: {
    genre_ids: {
      type: "number",
      enum: [
        28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878,
        10770, 53, 10752, 37,
      ],
    },
  },
  required: ["genre_ids"],
};
