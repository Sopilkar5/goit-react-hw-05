import axios from 'axios';

const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2RmN2FmNTMwNjI3ZmNmZTU1Mzc4MDI0OTE4ZmI0ZiIsIm5iZiI6MTc0NDE5MjY0NC44MDgsInN1YiI6IjY3ZjY0NDg0ZDRjNDQ0YTFjYzk5MmRjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tnlmquyed56qyx89t9cBb0IqmyUcFh1WUq094RPXrDo';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`, {
    headers: { Authorization: API_KEY }
  });
  return response.data;
};