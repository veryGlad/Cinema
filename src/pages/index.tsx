import { Box, Container, Pagination } from "@mui/material";
import Search from "@/components/Search";
import MovieCard from "@/components/MovieCard";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import {
  fetchMovies,
  IMoviesData,
} from "@/store/moviesCardSlice/moviesCardSlice";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import React, { useMemo, useState } from "react";
import Stack from "@mui/material/Stack";

export default function Home() {
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useAppDispatch();

  const { moviesData, searchValue } = useAppSelector((state) => {
    return {
      moviesData: state.moviesCardSliceReducer.data,
      searchValue: state.moviesCardSliceReducer.searchValue,
    };
  });

  const numberOfPages = moviesData?.totalResults
    ? +moviesData.totalResults / 10
    : 1;

  let responseStatus = (response: string) => {
    return response?.toLowerCase() === "true";
  };

  const hasCorrectResult =
    moviesData?.Response && responseStatus(moviesData?.Response);

  const moviesItems = useMemo(
    () => (
      <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} columnGap={"20px"}>
        {moviesData?.Search?.map((card: IMoviesData) => (
          <>
            <Link key={card.imdbID} href={`/MoviePage/${card.imdbID}`}>
              <MovieCard
                key={card.imdbID}
                Poster={card.Poster}
                Title={card.Title}
                Year={card.Year}
              />
            </Link>
          </>
        ))}
      </Box>
    ),
    [moviesData]
  );

  const responseErrorElement = (
    <Box display={"flex"} justifyContent={"center"} marginTop={6}>
      <Typography variant={"h4"} color={"gray"}>
        {moviesData?.Error}
      </Typography>
    </Box>
  );

  const onPageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
    dispatch(fetchMovies({ searchValue, pageNumber: page }));
  };

  return (
    <Container maxWidth={"lg"}>
      <Search />
      {hasCorrectResult ? moviesItems : responseErrorElement}
      {moviesData?.totalResults && (
        <Box
          marginTop={3}
          marginBottom={2}
          display={"flex"}
          justifyContent={"center"}
        >
          <Stack spacing={2}>
            <Pagination
              count={Math.round(numberOfPages)}
              color="primary"
              page={pageNumber}
              onChange={onPageChange}
            />
          </Stack>
        </Box>
      )}
    </Container>
  );
}
