import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@src/redux/store";

interface ChartState {
  isShow: boolean;
}

const initialState: ChartState = {
  isShow: false,
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    handleChart: (state) => {
      state.isShow = !state.isShow;
    },
  },
});

export const { handleChart } = chartSlice.actions;
export const selectIsShow = (state: RootState) => state.chart.isShow;

export default chartSlice.reducer;
