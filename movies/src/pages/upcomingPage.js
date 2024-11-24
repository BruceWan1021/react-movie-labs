import React, {useState} from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToPalylist from '../components/cardIcons/addToPlaylist';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import Pagination from '@mui/material/Pagination'; 
import Box from '@mui/material/Box'; 

const UpcomingPage = (props) => {
    const [page, setPage] = useState(1); 
    const { data, error, isLoading, isError } = useQuery(
        ['upcoming', page],
        getUpcomingMovies,
        { keepPreviousData: true }
    )

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const upcomings = data.results;

    const mustWatchs = upcomings.filter(m => m.mustWatch)
    localStorage.setItem('must watch', JSON.stringify(mustWatchs))
    console.log(mustWatchs)
    
    const totalPages = data.total_pages; 

  const handlePageChange = (event, value) => {
    setPage(value);
  };


    return (
        <Box>
            <PageTemplate
            title='Upcoming Movies'
            movies={upcomings}
            action={(movie) => {
                return (
                    <>
                    <AddToFavoritesIcon movie={movie} />
                    <AddToPalylist movie={movie}/>
                    </>
                )
               
            }}>
        </PageTemplate>
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
        
    )
}

export default UpcomingPage;
