import { makeStyles } from "@material-ui/core/styles";
import { Movie } from "../tmdb/types";

type MovieCardProps = {
  movie: Movie;
};

const useStyles = makeStyles({});

export default function MovieCard({ movie }: MovieCardProps) {
  const classes = useStyles();

  return <div>{movie.title}</div>;
}
