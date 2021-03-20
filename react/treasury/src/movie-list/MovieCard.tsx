import { TMovie } from "./Movie";

type MovieCardProps = {
  movie: TMovie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return <div>{movie.title}</div>;
}
