import { SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { doc, setDoc } from "firebase/firestore";
import { useSnackbar } from "notistack";
import { getFirestoreUserPath } from "../firebase";
import { FirebaseStore, TSettings } from "../store";

// FIXME use https://developers.themoviedb.org/3/configuration/get-countries as selection options
export default function TmdbRegion() {
  const { db, settings, userId } = FirebaseStore.useState((s) => ({
    db: s.firestore,
    settings: s.settings,
    userId: s.user!.uid,
  }));
  const { enqueueSnackbar } = useSnackbar();
  const lblTmdbRegion = "TMDB region";

  const updateRegion = async (userId: string, region: string) => {
    if (db) {
      const newSettings: TSettings = {
        ...settings,
        tmdbRegion: region,
      } as TSettings;
      const docRef = doc(db, getFirestoreUserPath(userId));
      await setDoc(docRef, newSettings);

      const r = region === "DE" ? "Germany" : "No specific region";
      enqueueSnackbar(`${lblTmdbRegion} has been changed to "${r}".`, {
        autoHideDuration: 3000,
        variant: "success",
      });
    }
  };

  const regionChanged = (event: SelectChangeEvent<"EN" | "DE">) => {
    const region = event.target.value;
    updateRegion(userId, region).catch(() =>
      enqueueSnackbar(`Error while saving ${lblTmdbRegion}`, {
        autoHideDuration: 5000,
        variant: "error",
      })
    );
  };

  return (
    <div>
      <h3>{lblTmdbRegion}</h3>
      <p>Release dates are shown for the selected region.</p>
      <FormControl variant="outlined" sx={{ width: "25em" }}>
        <Select onChange={regionChanged} value={settings.tmdbRegion}>
          <MenuItem value="EN">No specific region</MenuItem>
          <MenuItem value="DE">Germany</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
