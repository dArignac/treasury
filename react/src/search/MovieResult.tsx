import { Button, Card, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IMovieSearchResult } from "../tmdb/types";

const DivContentGrid = styled("div")({
  display: "grid",
  gap: "0 0",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr min-content",
});

const DivContent = styled("div")({
  padding: "0.5em",
  "& > h6": {
    lineHeight: "1.25",
  },
});

const DivActions = styled("div")({
  padding: "0.25em",
});

const DivNoPoster = styled("div")({
  textAlign: "center",
  "& > span": {
    lineHeight: "130px",
  },
});

interface MovieResultProps {
  addMovie: () => void;
  movie: IMovieSearchResult;
}

const imgBaseURL = "https://image.tmdb.org/t/p/w92";

export default function MovieResult({ addMovie, movie }: MovieResultProps) {
  return (
    <Card
      key={movie.id}
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 92px",
        minHeight: "130px",
        maxWidth: "25em",
      }}
    >
      <DivContentGrid>
        <DivContent>
          <Typography variant="subtitle1">{movie.title}</Typography>
          <Typography variant="body2">{movie.release_date}</Typography>
        </DivContent>
        <DivActions>
          <Button color="primary" onClick={() => addMovie()} size="small">
            Add Movie
          </Button>
        </DivActions>
      </DivContentGrid>
      {movie.poster_path == null && (
        <DivNoPoster>
          <Typography variant="overline">No poster</Typography>
        </DivNoPoster>
      )}
      {movie.poster_path != null && (
        <CardMedia
          sx={{
            maxHeight: "130px",
            width: "92px",
          }}
          component="img"
          alt={movie.title}
          image={imgBaseURL + movie.poster_path}
          title={movie.title}
        />
      )}
    </Card>
  );
}
