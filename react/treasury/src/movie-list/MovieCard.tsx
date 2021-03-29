type Movie = {
  title: string;
};

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return <div>{movie.title}</div>;
}
