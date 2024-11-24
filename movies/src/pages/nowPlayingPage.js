import React, {useState} from "react";
import { getNowPlaying } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToPalylist from '../components/cardIcons/addToPlaylist';
import Pagination from '@mui/material/Pagination'; 
import Box from '@mui/material/Box'; 

const NowPlayingPage = (props) => {
  const [page, setPage] = useState(1); 
  const { data, error, isLoading, isError } = useQuery(
    ['discover', page],
    getNowPlaying,
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  
  const totalPages = data.total_pages; 

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <PageTemplate
        title='Now Playing Movies'
        movies={movies}
        action={(movie) => {
          return (
            <>
            <AddToFavoritesIcon movie={movie} />
            <AddToPalylist movie={movie}/>
            </>
          )
        }}
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
export default NowPlayingPage;