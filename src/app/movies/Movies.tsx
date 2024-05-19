import MovieCard from "../ui/movie-card/Movie-card";
import styles from "./Movies.module.scss";


export default function Movies() {
  return <div className={styles.movies}>Movies
    <MovieCard></MovieCard>
  </div>;
}
