import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        const data = await fetchMovies('/trending/movie/day');
        setMovies(data.results || []);
      } catch (error) {
        setError('Failed to load trending movies.');
        console.error('Error:', error);
      }
    };
    loadTrendingMovies();
  }, []);

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.homePage}>
      {movies.length > 0 && <MovieList movies={movies} showTrendsTitle={true} />}
    </div>
  );
};

export default HomePage;