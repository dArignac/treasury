import { SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { doc, setDoc } from "firebase/firestore";
import { useSnackbar } from "notistack";
import { getFirestoreUserPath } from "../firebase";
import { FirebaseStore, TSettings } from "../store";

// FIXME use https://developers.themoviedb.org/3/configuration/get-primary-translations as selection options
export default function TmdbLanguage() {
  const { db, settings, userId } = FirebaseStore.useState((s) => ({
    db: s.firestore,
    settings: s.settings,
    userId: s.user!.uid,
  }));
  const { enqueueSnackbar } = useSnackbar();
  const lblTmdbLanguage = "TMDB language";

  const updateLanguage = async (userId: string, language: string) => {
    if (db) {
      const newSettings: TSettings = {
        ...settings,
        tmdbLanguage: language,
      } as TSettings;
      const docRef = doc(db, getFirestoreUserPath(userId));
      await setDoc(docRef, newSettings);

      const languageMapping: any = {
        "de-DE": "German (de-DE)",
        "en-US": "English (en-US)",
      };
      enqueueSnackbar(
        `${lblTmdbLanguage} has been changed to ` +
          languageMapping[language] +
          ".",
        {
          autoHideDuration: 3000,
          variant: "success",
        }
      );
    }
  };

  const languageChanged = (event: SelectChangeEvent<"en-US" | "de-DE">) => {
    const lang = event.target.value;
    updateLanguage(userId, lang).catch(() =>
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
      <FormControl variant="outlined" sx={{ width: "25em" }}>
        <Select onChange={languageChanged} value={settings.tmdbLanguage}>
          <MenuItem value="en-US">English (US)</MenuItem>
          <MenuItem value="de-DE">German</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
