import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { FirebaseStore, TSettings } from "../store";

const useStyles = makeStyles({
  formControl: {
    width: "25em",
  },
});

// FIXME use https://developers.themoviedb.org/3/configuration/get-primary-translations as selection options
export default function TmdbLanguage() {
  const classes = useStyles();
  const { db, settings, userId } = FirebaseStore.useState((s) => ({
    db: s.firestore,
    settings: s.settings,
    userId: s.user!.uid,
  }));
  const { enqueueSnackbar } = useSnackbar();
  const lblTmdbLanguage = "TMDB language";

  const languageChanged = (event: React.ChangeEvent<{ value: unknown }>) => {
    const lang = event.target.value as string;
    const newSettings: TSettings = {
      ...settings,
      tmdbLanguage: lang,
    } as TSettings;
    db!
      .doc("/settings/" + userId)
      .set(newSettings)
      .then(() => {
        const languageMapping: any = {
          "de-DE": "German (de-DE)",
          "en-US": "English (en-US)",
        };
        enqueueSnackbar(
          `${lblTmdbLanguage} has been changed to ` +
            languageMapping[lang] +
            ".",
          {
            autoHideDuration: 3000,
            variant: "success",
          }
        );
      })
      .catch(() =>
        enqueueSnackbar(`Error while saving ${lblTmdbLanguage}`, {
          autoHideDuration: 5000,
          variant: "error",
        })
      );
  };

  return (
    <div>
      <h3>{lblTmdbLanguage}</h3>
      <p>
        This applies to the movies or tv shows you're adding - their title and
        images will be shown in the configured language.
      </p>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select onChange={languageChanged} value={settings.tmdbLanguage}>
          <MenuItem value="en-US">English (US)</MenuItem>
          <MenuItem value="de-DE">German</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
