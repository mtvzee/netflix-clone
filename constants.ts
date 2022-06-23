const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=ja-JP`,
  fetchAdventure: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ja-JP&with_genres=12`,
  fetchAnimation: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ja-JP&with_genres=16`,
  fetchComedy: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ja-JP&with_genres=35`,
  fetchDocumentary: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ja-JP&with_genres=99`,
  fetchRomance: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ja-JP&with_genres=10749`,
  fetchSF: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ja-JP&with_genres=878`,
};
