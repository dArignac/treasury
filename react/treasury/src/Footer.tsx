import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: "rgba(255,255,255,.6)",
    "& a": {
      color: theme.palette.common.white,
    },
    height: "100%",
    padding: "1em",
    textAlign: "center",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      Treasury is an open source application. Find it at{" "}
      <a href="https://github.com/darignac/treasury">Github</a>. Created 2017 -
      2021 by <a href="https://github.com/darignac">darignac</a>.
    </footer>
  );
}
