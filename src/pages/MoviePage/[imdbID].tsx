import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useAppSelector } from "@/store/Store";
import { fetchMovieInfo } from "@/store/moviePageSlice/moviePageSlice";

const MoviePageImdbID = () => {
  let id = "tt0944947";

  fetchMovieInfo({ imdbID: id });

  const { movieInfo } = useAppSelector((state) => {
    return {
      movieInfo: state.moviePageSliceReducer.data,
    };
  });

  return (
    <Box display={"flex"} justifyContent={"center"} marginTop={5}>
      <img
        src="https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg"
        alt=""
      />
      <Box marginLeft={6}>
        <Typography variant={"h3"}>Название: {movieInfo?.Title} </Typography>
        <Typography>Год выхода:</Typography>
        <Typography>Сюжет:</Typography>
        <Typography>Актеры:</Typography>
        <Typography>Рейтинг:</Typography>
      </Box>
    </Box>
  );
};

export default MoviePageImdbID;
