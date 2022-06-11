import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { doc, setDoc } from "firebase/firestore";
import { useSnackbar } from "notistack";
import { getFirestoreUserPath } from "../firebase";
import { FirebaseStore, TSettings } from "../store";

const useStyles = makeStyles({
  formControl: {
    width: "25em",
  },
});

// FIXME use https://developers.themoviedb.org/3/configuration/get-countries as selection options
export default function TmdbRegion() {
  const classes = useStyles();
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

  const regionChanged = (event: React.ChangeEvent<{ value: unknown }>) => {
    const region = event.target.value as string;
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
      <FormControl variant="outlined" className={classes.formControl}>
        <Select onChange={regionChanged} value={settings.tmdbRegion}>
          <MenuItem value="EN">No specific region</MenuItem>
          <MenuItem value="DE">Germany</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
