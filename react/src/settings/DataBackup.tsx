import Button from "@material-ui/core/Button";
import { saveAs } from "file-saver";
import { collection, getDocs, query } from "firebase/firestore";
import { FirebaseStore } from "../store";

export default function DataBackup() {
  const { db, userId } = FirebaseStore.useState((s) => ({
    db: s.firestore,
    userId: s.user!.uid,
  }));

  const downloadData = async () => {
    if (db) {
      const q = query(collection(db, "/users/" + userId + "/movies"));
      const querySnapshot = await getDocs(q);
      const movieIds = querySnapshot.docs.map((doc) => doc.id);
      saveAs(
        new Blob([JSON.stringify({ movies: movieIds })], {
          type: "application/json",
        }),
        "movies.json"
      );
    }
  };

  return (
    <div>
      <h3>Data backup</h3>
      <p>
        Downloads your movie data as JSON file. Maybe can be imported in a
        future version.
      </p>
      <Button variant="contained" color="primary" onClick={downloadData}>
        Download
      </Button>
    </div>
  );
}
