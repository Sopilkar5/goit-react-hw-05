import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setError(null);
        const data = await fetchMovies('/movie/popular');
        setMovies(data.results || []);
      } catch (error) {
        setError('Failed to fetch popular movies. Please try again later.');
        console.error('Error fetching data: ', error);
      }
    };
    loadPopularMovies();
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MovieList movies={movies} showNoResults={true} />
    </div>
  );
};

export default HomePage;