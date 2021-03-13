import { makeStyles } from "@material-ui/core";
import { IMovie } from "../movie-list/Movie";

const useStyles = makeStyles({
  root: {
    border: "1px solid red",
  },
});

interface MovieSearchResultProps {
  movie: IMovie;
}

export default function MovieSearchResult({ movie }: MovieSearchResultProps) {
  const classes = useStyles();
  return (
    <div key={movie.id} className={classes.root}>
      {movie.title}
    </div>
  );
}
