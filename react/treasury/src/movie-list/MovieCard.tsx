import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FirebaseStore } from "../store";
import { Movie } from "./Movie";
import { useGetMovie } from "./useGetMovie";

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

const urlPoster = "https://image.tmdb.org/t/p/w154";

export default function MovieCard({ movie }: MovieCardProps) {
  const classes = useStyles();
  const { settings } = FirebaseStore.useState((s) => ({
    settings: s.settings,
  }));
  const { status, data } = useGetMovie(movie.id, settings);

  return (
    <div className={classes.movie}>
      {status === "loading" ? (
        <CircularProgress className={classes.progress} />
      ) : status === "error" ? (
        <CircularProgress color="secondary" className={classes.progress} />
      ) : (
        <>
          <img src={urlPoster + data?.poster_path} alt="{data.title}" />
        </>
      )}
    </div>
  );
}
