import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/axios/axios";

type SliceState = {
  loadingMovieInfo: boolean;
  data?: IMovieInfo;
};

const initialState: SliceState = {
  loadingMovieInfo: false,
};

export const moviePage = createSlice({
  name: "movieInfo",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieInfo.pending, (state) => {
        state.loadingMovieInfo = true;
      })
      .addCase(fetchMovieInfo.fulfilled, (state, action) => {
        state.loadingMovieInfo = false;
        state.data = action.payload;
      });
  },
});

export interface IMovieInfo {
  Poster: string;
  Title: string;
  Plot: string;
  Year: string;
  Actors: string;
  imdbRating: string;
}

export const fetchMovieInfo = createAsyncThunk(
  "movieInfo/fetchMovieInfo",
  async (args: { imdbID: string }) => {
    const response = await axios.get(
      `/?i=${args.imdbID}&plot=full&apikey=8c997e09`
    );
    return response.data as IMovieInfo;
  }
);

export default moviePage.reducer;
