import { makeStyles } from "@material-ui/core";
import { IMovieSearchResult } from "./useSearchMovies";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 92px",
  },
  img: {
    height: "138px",
    overflow: "hidden",
    width: "92px",
  },
}));

interface MovieSearchResultProps {
  movie: IMovieSearchResult;
}

const imgBaseURL = "https://image.tmdb.org/t/p/w92";

// FIXME try out with Card
export default function MovieSearchResult({ movie }: MovieSearchResultProps) {
  const classes = useStyles();
  return (
    <div key={movie.id} className={classes.root}>
      <div>
        <h3>{movie.title}</h3>
        {movie.release_date}
      </div>
      <div className={classes.img}>
        {movie.poster_path != null && (
          <img src={imgBaseURL + movie.poster_path} alt={movie.title} />
        )}
      </div>
    </div>
  );
}
