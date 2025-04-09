import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMovies } from '../../api';
import { BeatLoader } from 'react-spinners';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchMovies(`/movie/${movieId}`);
        setMovie(data);
      } catch (error) {
        setError('Failed to fetch movie details.');
        console.error('Error fetching movie details: ', error);
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [movieId]);

  const handleGoBack = () => {
    const from = location.state?.from || '/movies';
    navigate(from);
  };

  if (loading) return <div className={styles.loader}><BeatLoader color="#f3eeeee4" /></div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!movie) return null;

  return (
    <div className={styles.movieDetailsPage}>
      <button onClick={handleGoBack} className={styles.goBackButton}>Go back</button>
      <div className={styles.movieContent}>
        <div className={styles.movieImage}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className={styles.movieInfo}>
          <h2>{movie.title}</h2>
          <p className={styles.overview}>{movie.overview}</p>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.links}>
            <Link to={`/movies/${movieId}/cast`}>View Cast</Link>
            <Link to={`/movies/${movieId}/reviews`}>View Reviews</Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;