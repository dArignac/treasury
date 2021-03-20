import { makeStyles } from "@material-ui/core/styles";
import { FirebaseStore } from "../store";
import { useEffect } from "react";
import { useRef } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr",
    rowGap: "0.5rem",
  },
}));

function MovieListLoading() {
  return <div>Loading...</div>;
}

function MovieListEmpty() {
  return <div>No movies added yet.</div>;
}

export default function MovieList() {
  const classes = useStyles();
  const { db, userId } = FirebaseStore.useState((s) => ({
    db: s.firestore,
    userId: s.user!.uid,
  }));
  let content = <MovieListLoading />;

  useEffect(() => {
    // FIXME ordering
    db!
      .collection("/users/" + userId + "/movies")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          // content = <MovieListEmpty />;
          console.log("empty");
        }
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
      });
  });

  return content;
  // <FirestoreProvider firebase={firebase} {...firebaseConfig}>
  //   <FirestoreCollection
  //     path={path}
  //     orderBy={[{ field: "title", type: "asc" }]}
  //   >
  //     {(collection) => {
  //       if (collection.isLoading) return <div>Loading....</div>;
  //       if (collection.value.length === 0)
  //         return <div>No movies added yet.</div>;
  //       return (
  //         <div className={classes.root}>
  //           {collection.value.map((movie: TMovie) => (
  //             <MovieCard key={movie.id} movie={movie} />
  //           ))}
  //         </div>
  //       );
  //     }}
  //   </FirestoreCollection>
  // </FirestoreProvider>
}
