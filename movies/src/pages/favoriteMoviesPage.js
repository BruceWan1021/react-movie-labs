// import React from "react";

// const FavoriteMoviesPage = () => {
//     return <h2>Favorite Movies</h2>
// }

// export default FavoriteMoviesPage

import React from "react";
import PageTemplate from "../components/templateMovieListPage";

const FavoriteMoviesPage = (props) => {
  const toDo = () => true;
  // Get movies from local storage.
  const movies = JSON.parse(localStorage.getItem("favorites")); 

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={movies}
      selectFavorite={toDo}
    />
  );
};

export default FavoriteMoviesPage;