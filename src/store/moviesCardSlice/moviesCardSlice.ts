import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

type SliceState = {
  loadingMoviesInfo: boolean;
  data?: IMovies;
};

const initialState: SliceState = {
  loadingMoviesInfo: false,
};

export const moviesCardSlice = createSlice({
  name: "moviesCard",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loadingMoviesInfo = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loadingMoviesInfo = false;
        state.data = action.payload;
      });
  },
});

export interface IMovies {
  totalResults: string;
  Search: IMoviesData[];
}

export interface IMoviesData {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}

export const fetchMovies = createAsyncThunk(
  "moviesCard/fetchMoviesCard",
  async (args: { searchValue: string; pageNumber?: number }) => {
    const response = await axios.get(`/?s=${args.searchValue}&apikey=8c997e09`);
    return response.data as IMovies;
  }
);

export default moviesCardSlice.reducer;
