import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const UpcomingPage = (props) => {
    const { data, error, isLoading, isError } = useQuery('discover', getUpcomingMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const upcomings = data.results;

    const favorites = upcomings.filter(m => m.favorites)
    localStorage.setItem('favourite', JSON.stringify(favorites))
    

    return (
        <PageTemplate
            title='Upcoming Movies'
            movies={upcomings}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie}/>
            }}>

        </PageTemplate>
    )
}

export default UpcomingPage;
