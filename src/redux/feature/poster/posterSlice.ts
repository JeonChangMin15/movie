import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@src/redux/store";

import { ContentT } from "@src/types/state";

interface PosterState {
  content: ContentT[];
  page: number;
}

const initialState: PosterState = {
  content: [],
  page: 1,
};

const MAX_PAGE = 10;

export const posterSlice = createSlice({
  name: "poster",
  initialState,
  reducers: {
    addPoster: (state, action) => {
      state.content = [...state.content, ...action.payload];
    },
    addPage: (state) => {
      state.page = state.page < MAX_PAGE ? state.page + 1 : MAX_PAGE;
    },
  },
});

export const { addPage, addPoster } = posterSlice.actions;
export const selectPage = (state: RootState) => state.poster.page;
export const selectContent = (state: RootState) => state.poster.content;

export default posterSlice.reducer;
