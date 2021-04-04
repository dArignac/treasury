import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { FirebaseStore } from "../store";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Movie } from "./Movie";
import axios from "axios";
import { TSettings } from "../store";
import { theMovieDatabaseConfig } from "../config";
import firebase from "firebase/app";
import { PromiseQueue, PromiseQueueItemResponse } from "promise-queue-manager";

type FirebaseCounter = {
  movies: number;
};

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  h2: {
    marginBottom: "0.5em",
    marginTop: "0",
  },
  syncContainer: {
    display: "grid",
    gap: "0.5em 0.5em",
    gridTemplateColumns: "5em 5em",
    gridTemplateRows: "5em",
    marginTop: "2em",
  },
});

const getMovieById = async (
  id: string,
  settings: TSettings
): Promise<Movie> => {
  const params = new URLSearchParams({
    language: settings.tmdbLanguage,
    api_key: theMovieDatabaseConfig.apiKey,
  });
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?${params.toString()}`
  );
  return data;
};

const fetchAndUpdateMovieData = (movieId: string) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      console.log("fetchAndUpdateMovieData", movieId);
      return resolve(movieId);
    }, 2000);
  });
};

export default function TmdbSync() {
  const classes = useStyles();
  const [
    isSynchronizationRunning,
    setIsSynchronizationRunning,
  ] = useState<boolean>(false);
  // total number of movies in firestore
  const [movieCount, setMovieCount] = useState<number>(0);
  // number of already synchronized movies
  const [
    synchronizedMoviesCounter,
    setSynchronizedMoviesCounter,
  ] = useState<number>(0);
  // movie progress value for progress bar
  const [
    moviesSynchronizedProgress,
    setMoviesSynchronizedProgress,
  ] = useState<number>(0);
  const { db, settings, userId } = FirebaseStore.useState((s) => ({
    db: s.firestore,
    settings: s.settings,
    userId: s.user!.uid,
  }));

  const synchronizeData = () => {
    setIsSynchronizationRunning(true);

    let movies: string[] = [];
    db!
      .collection("/users/" + userId + "/movies")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          movies.push(doc.id);
        });

        const queue = new PromiseQueue<string>(
          {
            promise: fetchAndUpdateMovieData,
            items: movies,
          },
          1,
          false
        );

        // FIXME show error soemhow
        queue.on(
          PromiseQueue.EVENTS.ITEM_ERROR,
          (response: PromiseQueueItemResponse<any>) => {
            console.error("ITEM_ERROR", response);
          }
        );

        // FIXME handle progress indication
        queue.on(
          PromiseQueue.EVENTS.ITEM_PROCESSED,
          (response: PromiseQueueItemResponse<any>) => {
            console.log("ITEM_PROCESSED", response);
          }
        );

        queue.on(PromiseQueue.EVENTS.QUEUE_PROCESSED, () => {
          setIsSynchronizationRunning(false);
        });

        queue.start();
      });
  };

  useEffect(() => {
    db!
      .collection("/counters")
      .doc(userId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setMovieCount((doc.data() as FirebaseCounter).movies);
        }
      });
  }, [db, userId]);

  return (
    <>
      <h2 className={classes.h2}>Synchronize TMDB</h2>
      <p>
        A copy of the relevant movie/series data from TMDB is stored in the
        Firebase database. This data can get out of sync if the application was
        extended and uses new data from TMDB or if the data itself on TMDB
        changed.
      </p>
      <p>
        Therefore you can run a syn of data here. Depending on the size of your
        library, this can take a while.
      </p>
      <Button
        variant="contained"
        color="secondary"
        disabled={isSynchronizationRunning}
        onClick={synchronizeData}
      >
        Start synchronization
      </Button>
      <div className={classes.syncContainer}>
        <div>
          <strong>Movies:</strong>
        </div>
        <div>
          <CircularProgressWithLabel
            value={moviesSynchronizedProgress}
            color="secondary"
          />
        </div>
      </div>
    </>
  );
}
