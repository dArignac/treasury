import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { FirebaseStore } from "../store";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gap: "0.5em 0.5em",
    gridTemplateColumns: "repeat(auto-fill, 28em)",
  },
  formControl: {
    width: "25em",
  },
  h2: {
    marginBottom: "0.5em",
    marginTop: "0",
  },
});

export default function Settings() {
  const classes = useStyles();
  const { db, settings, userId } = FirebaseStore.useState((s) => ({
    db: s.firestore,
    settings: s.settings,
    userId: s.user!.uid,
  }));
  const { enqueueSnackbar } = useSnackbar();
  const lblMovieDataLanguage = "TMDB region";

  const tmdbRegionChanged = (event: React.ChangeEvent<{ value: unknown }>) => {
    const lang = event.target.value as string;
    const newSettings = {
      ...settings,
      tmdbRegion: lang,
    };
    db!
      .doc("/settings/" + userId)
      .set(newSettings)
      .then(() => {
        const ll = lang === "DE" ? "German" : "English";
        enqueueSnackbar(`${lblMovieDataLanguage} has been changed to ${ll}.`, {
          autoHideDuration: 3000,
          variant: "success",
        });
      })
      .catch(() =>
        enqueueSnackbar(`Error while saving ${lblMovieDataLanguage}`, {
          autoHideDuration: 5000,
          variant: "error",
        })
      );
  };

  return (
    <>
      <h2 className={classes.h2}>Settings</h2>
      <div className={classes.container}>
        <div>
          <h3>{lblMovieDataLanguage}</h3>
          <p>
            This applies to the movies or tv shows you're adding - their title
            and images will be saved in the configured language. It does not
            apply to currently existing items in your account. If you add an
            already added movie again after setting a new region, its values
            will be updated to the new region.
          </p>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={tmdbRegionChanged}
              value={settings.tmdbRegion}
            >
              <MenuItem value="EN">English</MenuItem>
              <MenuItem value="DE">German</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
}
