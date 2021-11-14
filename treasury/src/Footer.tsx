import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: "rgba(255,255,255,.6)",
    "& a": {
      color: theme.palette.common.white,
    },
    display: "grid",
    gap: "0 0",
    gridTemplateColumns: "minmax(min-content, 400px)",
    gridTemplateRows: "1fr",
    height: "100%",
    justifyContent: "center",
  },
  inner: {
    textAlign: "center",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <div className={classes.inner}>
        <p>
          Treasury is an open source application. Find it at{" "}
          <a href="https://github.com/darignac/treasury">Github</a>. Created
          2017 - 2021 by <a href="https://github.com/darignac">darignac</a>.
          Version: master.
        </p>
        <p>Treasury proudly uses:</p>
        <p>
          <a href="https://www.themoviedb.org/">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
              alt="The Movie DB"
            />
          </a>
        </p>
        <p>
          <a href="https://firebase.google.com/">
            <img src="firebase.svg" alt="Built with Firebase" />
          </a>
        </p>
      </div>
    </footer>
  );
}
