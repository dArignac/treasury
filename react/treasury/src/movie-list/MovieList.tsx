import { makeStyles } from "@material-ui/core/styles";
import {
  FirestoreCollection,
  FirestoreProvider,
} from "@react-firebase/firestore";
import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config";
import { TMovie } from "./Movie";
import MovieCard from "./MovieCard";

type MovieListProps = {
  user: any;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr",
    rowGap: "0.5rem",
  },
}));

export default function MovieList(props: MovieListProps) {
  const path = `/users/${props.user.uid}/movies`;
  const classes = useStyles();
  return (
    <FirestoreProvider firebase={firebase} {...firebaseConfig}>
      <FirestoreCollection
        path={path}
        orderBy={[{ field: "title", type: "asc" }]}
      >
        {(collection) => {
          if (collection.isLoading) return <div>Loading....</div>;
          if (collection.value.length === 0)
            return <div>No movies added yet.</div>;
          return (
            <div className={classes.root}>
              {collection.value.map((movie: TMovie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          );
        }}
      </FirestoreCollection>
    </FirestoreProvider>
  );
}
