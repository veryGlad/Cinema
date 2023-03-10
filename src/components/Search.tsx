import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { ChangeEventHandler } from "react";
import {
  fetchMovies,
  setSearchValue,
} from "@/store/moviesCardSlice/moviesCardSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";

export default function Search() {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => ({
    searchValue: state.moviesCardSliceReducer.searchValue,
  }));

  const searchInputChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch(setSearchValue(event.target.value));
  };

  const onSearchHandler = () => {
    dispatch(fetchMovies({ searchValue: searchValue }));
  };

  return (
    <Box display={"flex"} marginTop={3}>
      <Box marginRight={2} width={"100%"}>
        <TextField
          onChange={searchInputChangeHandler}
          value={searchValue}
          fullWidth
          label="Movie name"
          id="fullWidth"
        />
      </Box>
      <Button onClick={onSearchHandler} variant="contained">
        Search
      </Button>
    </Box>
  );
}
