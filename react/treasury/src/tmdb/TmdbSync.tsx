import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { FirebaseStore } from "../store";

const useStyles = makeStyles({
  h2: {
    marginBottom: "0.5em",
    marginTop: "0",
  },
  syncContainer: {
    display: "grid",
    gap: "0.5em 0.5em",
    gridTemplateColumns: "5em 5em 5em",
    gridTemplateRows: "2em 2em",
    marginTop: "2em",
  },
});

type FirebaseCounter = {
  movies: number;
};

export default function TmdbSync() {
  const classes = useStyles();
  const [movieCount, setMovieCount] = useState<number>(0);
  const { db, userId } = FirebaseStore.useState((s) => ({
    db: s.firestore,
    userId: s.user!.uid,
  }));

  const synchronizeData = () => {};

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
      <Button variant="contained" color="secondary" onClick={synchronizeData}>
        Start synchronization
      </Button>
      <div className={classes.syncContainer}>
        <div></div>
        <div>
          <strong>Total</strong>
        </div>
        <div>
          <strong>Synchronized</strong>
        </div>

        <div>
          <strong>Movies</strong>
        </div>
        <div>{movieCount}</div>
        <div>TODO</div>
      </div>
    </>
  );
}
