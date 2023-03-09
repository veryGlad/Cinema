import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Box, Container } from "@mui/material";
import Search from "@/components/Search";
import MovieCard from "@/components/MovieCard";
import { useAppSelector } from "@/store/Store";
import { IMovies, IMoviesData } from "@/store/moviesCardSlice/moviesCardSlice";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { moviesCard } = useAppSelector((state) => {
    return {
      moviesCard: state.moviesCardSliceReducer.data,
    };
  });

  return (
    <Container maxWidth={"lg"}>
      <Search />
      {moviesCard?.Search.map((card: IMoviesData) => (
        <MovieCard
          key={card.imdbID}
          Poster={card.Poster}
          Title={card.Title}
          Year={card.Year}
        />
      ))}
    </Container>
  );
}
