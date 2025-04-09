import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../../api';
import { BeatLoader } from 'react-spinners';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setError(null);
        setLoading(true);
        const id = Number(movieId);
        const data = await fetchMovies(`/movie/${id}/reviews`);
        setReviews(data.results || []);
      } catch (error) {
        setError('Не вдалося завантажити відгуки. Можливо, вони недоступні для цього фільму.');
        console.error('Помилка завантаження відгуків:', error);
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, [movieId]);

  if (loading) return <div className={styles.loader}><BeatLoader color="#007bff" /></div>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.reviewsContainer}>
      <h3>Відгуки</h3>
      {reviews && reviews.length > 0 ? (
        <ul className={styles.reviewsList}>
          {reviews.map(review => (
            <li key={review.id} className={styles.reviewItem}>
              <p className={styles.reviewContent}>{review.content}</p>
              <p className={styles.reviewAuthor}>– {review.author}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Відгуки відсутні.</p>
      )}
    </div>
  );
};

export default MovieReviews;