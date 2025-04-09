import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../../api';
import { BeatLoader } from 'react-spinners';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCast = async () => {
      try {
        setError(null);
        setLoading(true);
        const id = Number(movieId);
        const data = await fetchMovies(`/movie/${id}/credits`);
        setCast(data.cast || []);
      } catch (error) {
        setError('Не вдалося завантажити інформацію про акторів. Можливо, вона недоступна для цього фільму.');
        console.error('Помилка:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCast();
  }, [movieId]);

  if (loading) return <div className={styles.loader}><BeatLoader color="#f3eeeee4" /></div>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.castContainer}>
      <h3>Актори</h3>
      {cast && cast.length > 0 ? (
        <div className={styles.castGrid}>
          {cast.map(actor => (
            <div key={actor.id} className={styles.castCard}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w154${actor.profile_path}`
                    : 'https://placehold.co/154x231?text=Немає+Фото'
                }
                alt={actor.name}
                className={styles.actorImage}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://dummyimage.com/154x231/gray/fff&text=Немає+Фото';
                }}
              />
              <p className={styles.actorName}>{actor.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Інформація про акторів відсутня.</p>
      )}
    </div>
  );
};

export default MovieCast;