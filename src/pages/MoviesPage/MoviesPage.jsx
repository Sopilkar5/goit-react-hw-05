import React, { useState } from 'react';
import { fetchMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    try {
      setError(null);
      setSearched(true);
      const data = await fetchMovies(`/search/movie?query=${query}&language=en-US&page=1`);
      setMovies(data.results || []);
    } catch (error) {
      setError('Failed to fetch movies. Please try again later.');
      console.error('Error fetching movies:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.moviesPage}>
      <div className={styles.searchContainer}>
        <div className={styles.searchRow}>
          <input 
            type="text" 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            onKeyDown={handleKeyDown}
            placeholder="Search movies"
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>Search</button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {searched && movies.length === 0 && <p className={styles.noResults}>No movies found</p>}
      </div>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;