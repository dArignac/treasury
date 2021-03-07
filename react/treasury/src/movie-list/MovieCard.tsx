import { TMovie } from "./Movie";

type MovieCardProps = {
  movie: TMovie;
};

export default function MovieCard(props: MovieCardProps) {
  return <div>{props.movie.title}</div>;
}
