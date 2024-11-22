import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../context/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";
import WriteReview from "../components/cardIcons/writeReview";

const WatchListPage = () => {
  const {mustWatch: movieIds  } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const watchMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = watchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = watchMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });


  return (
    <PageTemplate
      title="Watch List"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromWatchlist movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default WatchListPage;