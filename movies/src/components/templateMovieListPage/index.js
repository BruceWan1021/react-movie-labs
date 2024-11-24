import React, { useState } from "react"; 
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState("");
  const [sortFilter, setSortFilter] = useState(""); 

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return ratingFilter ? m.vote_average >= ratingFilter : true;
    });

  if (sortFilter === "name") {
    displayedMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortFilter === "rating") {
    displayedMovies.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortFilter === "release_date") {
    displayedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "sort") setSortFilter(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
            sortFilter={sortFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies} />
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
