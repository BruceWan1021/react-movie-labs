import React, { useState, useEffect } from "react";
import { getFavouriteMovies } from '../api/tmdb-api';
import { getWatchistMovies } from '../api/tmdb-api';
import { toggleFavorite } from '../api/tmdb-api';
import { toggleWatchlist } from '../api/tmdb-api'

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [mustWatch, setMustWatch] = useState( [] )

  const addToFavorites = (movie) => {
    const sessionId = sessionStorage.getItem("sessionId");
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    setFavorites(newFavorites)
    toggleFavorite(sessionId, movie.id, true)
    .catch((error) => console.error("Error adding to favorites:", error));
  };

  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");
    const fetchFavoriteMovies = async () => {
      try {
        const data = await getFavouriteMovies(sessionId);
        const movieIds = data.results.map(movie => movie.id);
        setFavorites(movieIds);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };
    fetchFavoriteMovies();
  }, []);



  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);

  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    const sessionId = sessionStorage.getItem("sessionId");
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
    toggleFavorite(sessionId, movie.id, false)
      .catch((error) => console.error("Error removing from favourites:", error))
  };

  const addToPlaylist = (movie) => {
    const sessionId = sessionStorage.getItem("sessionId");
    let newMustWatch = [];
    if (!mustWatch.includes(movie.id)){
      newMustWatch = [...mustWatch, movie.id];
    }
    setMustWatch(newMustWatch);
    toggleWatchlist(sessionId, movie.id, true)
    .catch((error) => console.error("Error adding to watchlist:", error));
  };

  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");
    const fetchWatchlistMovies = async () => {
      try {
        const data = await getWatchistMovies(sessionId);
        const movieIds = data.results.map(movie => movie.id);
        setMustWatch(movieIds);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };
    fetchWatchlistMovies();
  }, []);

  const removeFromPlaylist = (movie) => {
    const sessionId = sessionStorage.getItem("sessionId");
    setMustWatch( favorites.filter(
      (mId) => mId !== movie.id
    ) )
    toggleWatchlist(sessionId, movie.id, false)
      .catch((error) => console.error("Error removing from watchlist:", error))
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;