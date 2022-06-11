import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import DataBackup from "./DataBackup";
import TmdbLanguage from "./TmdbLanguage";
import TmdbRegion from "./TmdbRegion";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gap: "0.5em 0.5em",
    gridTemplateColumns: "repeat(auto-fill, 28em)",
  },
  h2: {
    marginBottom: "0.5em",
    marginTop: "0",
  },
});

export default function Settings() {
  const classes = useStyles();

  return (
    <>
      <h2 className={classes.h2}>Settings</h2>
      <div className={classes.container}>
        <TmdbRegion />
        <TmdbLanguage />
        <DataBackup />
      </div>
    </>
  );
}
