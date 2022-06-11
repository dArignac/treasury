import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { getPosterUrl } from "../tmdb/tmdb";
import { Movie } from "../tmdb/types";

type MovieCardProps = {
  movie: Movie;
  removeMovieHandler: (movieId: number) => void;
};

const DivMovie = styled("div")(({ theme }) => ({
  textAlign: "center",
  position: "relative",
}));

const DivOverlay = styled("div")(({ theme }) => ({
  backgroundColor: "rgba(28, 35, 49, 0.8)",
  bottom: 0,
  color: theme.palette.primary.contrastText,
  left: 0,
  opacity: 0,
  overflow: "hidden",
  padding: "0.25em",
  position: "absolute",
  right: 0,
  top: 0,
  transition: ".3s ease",
  wordBreak: "break-word",

  "&:hover": {
    opacity: 1,
  },
}));

export default function MovieCard({
  movie,
  removeMovieHandler,
}: MovieCardProps) {
  return (
    <DivMovie>
      <DivOverlay>
        <p>{movie.title}</p>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => removeMovieHandler(movie.id)}
        >
          Remove
        </Button>
      </DivOverlay>
      <img
        src={getPosterUrl("w154") + "/" + movie.poster_path}
        alt={movie.id + ": " + movie.title}
      />
    </DivMovie>
  );
}
