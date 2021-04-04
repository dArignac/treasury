import {
  Button,
  Card,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { IMovieSearchResult } from "../tmdb/types";

const useStyles = makeStyles({
  actions: {
    padding: "0.25em",
  },
  content: {
    padding: "0.5em",
    "& > h6": {
      lineHeight: "1.25",
    },
  },
  contentGrid: {
    display: "grid",
    gap: "0 0",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr min-content",
  },
  media: {
    maxHeight: "130px",
    width: "92px",
  },
  noPoster: {
    textAlign: "center",
    "& > span": {
      lineHeight: "130px",
    },
  },
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 92px",
    minHeight: "130px",
    maxWidth: "25em",
  },
});

interface MovieResultProps {
  addMovie: () => void;
  movie: IMovieSearchResult;
}

const imgBaseURL = "https://image.tmdb.org/t/p/w92";

export default function MovieResult({ addMovie, movie }: MovieResultProps) {
  const classes = useStyles();

  return (
    <Card key={movie.id} className={classes.root}>
      <div className={classes.contentGrid}>
        <div className={classes.content}>
          <Typography variant="subtitle1">{movie.title}</Typography>
          <Typography variant="body2">{movie.release_date}</Typography>
        </div>
        <div className={classes.actions}>
          <Button color="primary" onClick={() => addMovie()} size="small">
            Add Movie
          </Button>
        </div>
      </div>
      {movie.poster_path == null && (
        <div className={classes.noPoster}>
          <Typography variant="overline">No poster</Typography>
        </div>
      )}
      {movie.poster_path != null && (
        <CardMedia
          className={classes.media}
          component="img"
          alt={movie.title}
          image={imgBaseURL + movie.poster_path}
          title={movie.title}
        />
      )}
    </Card>
  );
}
