import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "@src/Firebase";
import { RootState } from "@src/redux/store";
import { MovieList } from "@src/types/query";
import { ContentT } from "@src/types/state";
import { doc, getDoc } from "firebase/firestore";

export const fetchPosterByPage = createAsyncThunk(
  "thunkPoster/fetchPosterByPage",
  async (page: number) => {
    const docRef = doc(db, "movie_data", `list_${page}`);

    const docSnap = await getDoc(docRef);
    const documentData = docSnap.data();

    return documentData?.data;
  }
);

interface PosterState {
  list: ContentT[];
  isState: "idle" | "loading" | "success" | "fail";
}

const initialState: PosterState = {
  list: [],
  isState: "idle",
};

const thunkPosterSlice = createSlice({
  name: "thunkPoster",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPosterByPage.fulfilled,
      (state, action: PayloadAction<MovieList>) => {
        const info = action.payload.results.map(
          ({ title, poster_path, vote_average, genre_ids, id }) => ({
            title,
            poster_path,
            vote_average,
            genre_ids,
            id,
          })
        );
        state.list = [...state.list, ...info];
        state.isState = "idle";
      }
    ),
      builder.addCase(fetchPosterByPage.pending, (state) => {
        state.isState = "loading";
      }),
      builder.addCase(fetchPosterByPage.rejected, (state) => {
        state.isState = "fail";
      });
  },
});

export default thunkPosterSlice.reducer;

export const selectThunkIsState = (state: RootState) =>
  state.thunkPoster.isState;

export const selectThunkPoster = (state: RootState) => state.thunkPoster.list;
