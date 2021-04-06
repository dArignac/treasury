import { makeStyles } from "@material-ui/core/styles";
import { getPosterUrl } from "../tmdb/tmdb";
import { Movie } from "../tmdb/types";
import Button from "@material-ui/core/Button";

type MovieCardProps = {
  movie: Movie;
  removeMovieHandler: (movieId: number) => void;
};

const useStyles = makeStyles((theme) => ({
  movie: {
    textAlign: "center",
    position: "relative",
  },
  overlay: {
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
  },
  progress: {
    margin: "0.5em",
  },
}));

export default function MovieCard({
  movie,
  removeMovieHandler,
}: MovieCardProps) {
  const classes = useStyles();

  return (
    <div className={classes.movie}>
      <div className={classes.overlay}>
        <p>{movie.title}</p>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => removeMovieHandler(movie.id)}
        >
          Remove
        </Button>
      </div>
      <img
        src={getPosterUrl("w154") + "/" + movie.poster_path}
        alt={movie.id + ": " + movie.title}
      />
    </div>
  );
}
