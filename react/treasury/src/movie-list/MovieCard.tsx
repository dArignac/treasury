import { makeStyles } from "@material-ui/core/styles";
import { getPosterUrl } from "../tmdb/tmdb";
import { Movie } from "../tmdb/types";

type MovieCardProps = {
  movie: Movie;
};

const useStyles = makeStyles({
  movie: {
    textAlign: "center",
  },
  progress: {
    margin: "0.5em",
  },
});

export default function MovieCard({ movie }: MovieCardProps) {
  const classes = useStyles();

  return (
    <div className={classes.movie}>
      <img
        src={getPosterUrl("w154") + "/" + movie.poster_path}
        alt={movie.id + ": " + movie.title}
      />
    </div>
  );
}
