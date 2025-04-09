import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div className={styles.movieListContainer}>
      <h2 className={styles.trendsTitle}>In Trends!</h2>
      <ul className={styles.movieList}>
        {movies.map((movie, index) => (
          <li key={movie.id} className={styles.movieItem}>
            <span className={styles.movieNumber}>{index + 1}.</span>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location.pathname }}
              className={styles.movieLink}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;