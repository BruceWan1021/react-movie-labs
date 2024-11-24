// import React, { useState, useEffect } from "react";  
// import Grid from "@mui/material/Grid2";
// import MovieList from "../components/movieList";
// import Header from "../components/headerMovieList";
// import FilterCard from "../components/filterMoviesCard";

// const HomePage = (props) => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     fetch(
//        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1`
//     )
//       .then((res) => res.json())
//       .then((json) => {
//         return json.results;
//       })
//       .then((movies) => {
//         setMovies(movies)
//       });
//   }, []);

//   const [nameFilter, setNameFilter] = useState("");
//   const [genreFilter, setGenreFilter] = useState("0");

//   const genreId = Number(genreFilter);

//   let displayedMovies = movies
//     .filter((m) => {
//       return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
//     })
//     .filter((m) => {
//       return genreId > 0 ? m.genre_ids.includes(genreId) : true;
//     });

//   const handleChange = (type, value) => {
//     if (type === "name") setNameFilter(value);
//     else setGenreFilter(value);
//   };

//   const addToFavorites = (movieId) => {
//     const updatedMovies = movies.map((m) =>
//       m.id === movieId ? { ...m, favorite: true } : m
//     );
//     setMovies(updatedMovies);
//   };
    
//   return (
//   <Grid container>
//       <Grid size={12}>
//           <Header title={"HomePage"} />
//       </Grid>
//       <Grid container sx={{flex: "500px 1 0"}}>
//         <Grid key="find" size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} sx={{padding: "20px"}}>
//         <FilterCard
//           onUserInput={handleChange}
//           titleFilter={nameFilter}
//           genreFilter={genreFilter}
//         />
//         </Grid>
//         <MovieList movies={displayedMovies} selectFavorite={addToFavorites} />
//       </Grid>
//     </Grid>
//   );
// };
// export default HomePage;

// import React, { useState, useEffect } from "react";
// import PageTemplate from '../components/templateMovieListPage';
// import { getMovies } from "../api/tmdb-api";

// const HomePage = (props) => {
//   const [movies, setMovies] = useState([]);
//   const favorites = movies.filter(m => m.favorite)
//   localStorage.setItem('favorites', JSON.stringify(favorites))

//   const addToFavorites = (movieId) => {
//     const updatedMovies = movies.map((m) =>
//       m.id === movieId ? { ...m, favorite: true } : m
//     );
//     setMovies(updatedMovies);
//   };

  // useEffect(() => {
  //   fetch(
  //     `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1`
  //   )
  //     .then((res) => res.json())
  //     .then((json) => {
  //       return json.results;
  //     })
  //     .then((movies) => {
  //       setMovies(movies);
  //     });
  // }, []);

//   useEffect(() => {
//     getMovies().then(movies => {
//       setMovies(movies);
//     });
//   }, []);

//   return (
//     <PageTemplate
//       title='Discover Movies'
//       movies={movies}
//       selectFavorite={addToFavorites}
//     />
//   );
// };
// export default HomePage;

import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';
import Pagination from '@mui/material/Pagination'; 
import Box from '@mui/material/Box'; 

const HomePage = () => {
  const [page, setPage] = useState(1); 
  const { data, error, isLoading, isError } = useQuery(
    ['discover', page],
    getMovies,
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const totalPages = data.total_pages; 

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => (
          <>
            <AddToFavoritesIcon movie={movie} />
            <AddToPlaylistIcon movie={movie} />
          </>
        )}
      />
      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Box>
    </Box>
  );
};

export default HomePage;
