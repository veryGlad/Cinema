import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { fetchMovieInfo } from "@/store/moviePageSlice/moviePageSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Image from "next/image";
import Error from "next/error";

const MoviePage = () => {
  const router = useRouter();
  const { imdbID } = router.query;
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(imdbID);
    dispatch(fetchMovieInfo({ imdbID: imdbID as string }));
  }, [dispatch, imdbID]);

  const { movieInfo, isLoading } = useAppSelector((state) => ({
    movieInfo: state.moviePageSliceReducer.data,
    isLoading: state.moviePageSliceReducer.loadingMovieInfo,
  }));

  const getMovieCard = () => {
    return !!movieInfo?.Poster && !!movieInfo.Title ? (
      <Box
        display={"flex"}
        flexDirection={"column"}
        textAlign={"center"}
        justifyContent={"center"}
        marginTop={5}
      >
        {movieInfo?.Poster && (
          <Image
            width={380}
            height={500}
            src={movieInfo?.Poster}
            alt="Movie Poster"
          />
        )}
        <Box marginLeft={6}>
          <Typography variant={"h3"}>Название: {movieInfo?.Title} </Typography>
          <Typography>Год выхода: {movieInfo?.Year}</Typography>
          <Typography>Сюжет: {movieInfo?.Plot} </Typography>
          <Typography>Актеры: {movieInfo?.Actors}</Typography>
          <Typography>Рейтинг: {movieInfo?.imdbRating}</Typography>
        </Box>
      </Box>
    ) : (
      <Typography>Error on load data! Try to reload, please!</Typography>
    );
  };

  return !isLoading ? getMovieCard() : null;
};

export default MoviePage;
