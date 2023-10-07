import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@src/redux/store";

interface PageState {
  page: number;
}

const initialState: PageState = {
  page: 1,
};

const MAX_PAGE = 10;

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    addPage: (state) => {
      state.page = state.page < MAX_PAGE ? state.page + 1 : MAX_PAGE;
    },
  },
});

export const { addPage } = pageSlice.actions;
export const selectPage = (state: RootState) => state.page.page;

export default pageSlice.reducer;
