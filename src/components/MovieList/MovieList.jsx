import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies, showTrendsTitle = false }) => {
  const location = useLocation();

  return (
    <div className={styles.movieListContainer}>
      {showTrendsTitle && <h2 className={styles.trendsTitle}>In Trends!</h2>}
      <ul className={styles.movieList}>
        {movies.map((movie, index) => (
          <li key={movie.id} className={styles.movieItem}>
            <span className={styles.movieNumber}>{index + 1}.</span>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }}
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