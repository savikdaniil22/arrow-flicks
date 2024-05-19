"use client";

import MovieCardBig from "@/app/ui/movie-card-big/Movie-card-big";
import styles from "./Movie.module.scss";

export default function Movie() {

  return (
    <div className={styles.movie}>
      <div className={styles.router}>
        <a href="/movies" >Movies</a>
        <p>/</p>
        <a>Film Name</a>
      </div>
      <MovieCardBig></MovieCardBig>
    </div>
  );
}
