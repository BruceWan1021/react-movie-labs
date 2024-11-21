import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToPalylist from '../components/cardIcons/addToPlaylist';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'


const UpcomingPage = (props) => {
    const { data, error, isLoading, isError } = useQuery('upcoming', getUpcomingMovies)

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
    

    return (
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
    )
}

export default UpcomingPage;
