import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import firebase from "firebase/app";
import { useSnackbar } from "notistack";
import { PromiseQueue, PromiseQueueItemResponse } from "promise-queue-manager";
import { useEffect, useState } from "react";
import { useGetSet } from "react-use";
import { FirebaseStore, TSettings } from "../store";
import { getFirestoreDocument, getMovieById } from "./tmdb";

type FirebaseCounter = {
  movies: number;
};

type SyncElement = {
  db: firebase.firestore.Firestore;
  movieId: string;
  settings: TSettings;
  userId: string;
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

const fetchAndUpdateMovieData = (element: SyncElement) => {
  return new Promise<SyncElement>((resolve, reject) => {
    getMovieById(element.movieId, element.settings)
      .then((movie) => {
        element.db
          .collection(`/users/${element.userId}/movies`)
          .doc(element.movieId)
          .set(getFirestoreDocument(movie))
          .then(() => resolve(element))
          .catch(() => reject());
      })
      .catch(() => reject());
    // FIXME just for testing without actually calling TMDB
    // setTimeout(() => {
    //   console.log("fetchAndUpdateMovieData", element.movieId);
    //   return resolve(element);
    // }, 2000);
  });
};

export default function TmdbSync() {
  const classes = useStyles();

  // are we actively syncing?
  const [
    isSynchronizationRunning,
    setIsSynchronizationRunning,
  ] = useState<boolean>(false);

  // total number of movies in firestore
  const [movieCount, setMovieCount] = useState<number>(0);

  // number of already synchronized movies
  const [
    getSynchronizedMoviesCounter,
    setSynchronizedMoviesCounter,
  ] = useGetSet<number>(0);

  // movie progress value for progress bar
  const [
    getMoviesSynchronizedProgress,
    setMoviesSynchronizedProgress,
  ] = useGetSet<number>(0);

  // pullstate store
  const { db, settings, userId } = FirebaseStore.useState((s) => ({
    db: s.firestore,
    settings: s.settings,
    userId: s.user!.uid,
  }));

  // have some snacks
  const { enqueueSnackbar } = useSnackbar();

  const synchronizeData = () => {
    setIsSynchronizationRunning(true);
    setSynchronizedMoviesCounter(0);
    setMoviesSynchronizedProgress(0);

    let moviesToSync: SyncElement[] = [];
    db!
      .collection("/users/" + userId + "/movies")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // FIXME we only need the id, but because of hooks and functions things are complicated
          moviesToSync.push({
            db: db!,
            movieId: doc.id,
            settings,
            userId,
          });
        });

        const queue = new PromiseQueue<SyncElement>(
          {
            promise: fetchAndUpdateMovieData,
            items: moviesToSync,
          },
          2,
          false
        );

        // FIXME if promises-queue-manager will be adjusted, we can use this and furthermore give in db and settings here instead of wrapping in SyncElement
        // const queue = new PromiseQueue<SyncElement>(
        //   {
        //     promises: moviesToSync.map((m) => () => fetchAndUpdateMovieData(m)),
        //   },
        //   1,
        //   false
        // );

        queue.on(
          PromiseQueue.EVENTS.ITEM_ERROR,
          (response: PromiseQueueItemResponse<any>) => {
            enqueueSnackbar(
              `Error while synchronizing movie with id ${response.item.movieId}`,
              {
                autoHideDuration: 10000,
                variant: "error",
              }
            );
          }
        );

        queue.on(
          PromiseQueue.EVENTS.ITEM_PROCESSED,
          (response: PromiseQueueItemResponse<any>) => {
            setSynchronizedMoviesCounter(getSynchronizedMoviesCounter() + 1);
            setMoviesSynchronizedProgress(
              (getSynchronizedMoviesCounter() / movieCount) * 100
            );
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
            value={getMoviesSynchronizedProgress()}
            color="secondary"
          />
        </div>
      </div>
    </>
  );
}
