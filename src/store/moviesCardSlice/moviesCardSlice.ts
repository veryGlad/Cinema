import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

type SliceState = {
  loadingMoviesInfo: boolean;
  data?: IMovies;
  pageNumber: number;
  searchValue: string;
};

const initialState: SliceState = {
  loadingMoviesInfo: false,
  pageNumber: 1,
  searchValue: "",
};

export const moviesCardSlice = createSlice({
  name: "moviesData",
  initialState: initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loadingMoviesInfo = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingMoviesInfo = false;
      });
  },
});

export interface IMovies {
  Response: string;
  totalResults?: string;
  Search: IMoviesData[];
  Error?: string;
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
    const response = await axios.get(
      `/?s=${args.searchValue}&page=${args.pageNumber}&apikey=8c997e09`
    );
    return response.data as IMovies;
  }
);

export const { setSearchValue } = moviesCardSlice.actions;

export default moviesCardSlice.reducer;
