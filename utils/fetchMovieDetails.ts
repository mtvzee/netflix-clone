export const fetchMovieDetails = async (id: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ja-JP&append_to_response=videos`
  );
  const data = await res.json();
  return data;
};