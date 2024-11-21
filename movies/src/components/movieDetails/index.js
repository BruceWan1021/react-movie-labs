// import React from "react";
import React, { useState, useContext } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import { useQuery } from "react-query";
import { getMovieActors } from "../../api/tmdb-api";
import {Link} from "react-router-dom"
import Grid from '@mui/material/Grid';
import AddRating from '../cardIcons/addRating'
import AddToFavoritesIcon from '../cardIcons/addToFavorites'
import AddToPalylist from '../cardIcons/addToPlaylist';
import { MoviesContext } from "../../context/moviesContext";

const root = {
    display: "flex",
    // justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };


const MovieDetails = ({ movie }) => { 

  const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

    const [drawerOpen, setDrawerOpen] = useState(false);

    const { data, error, isLoading, isError } = useQuery(
      ["movieActors", { id: movie.id}],
      getMovieActors
    )

    if (isLoading) {
      return <p>Loading...</p>
    }

    if (isError) {
      return <p>{error.message}</p>
    }

    const actors = data.cast || [];

    return (
      <>
        <Typography variant="h5" component="h3">
          Overview
        </Typography>
  
        <Typography variant="h6" component="p">
          {movie.overview}
        </Typography>

        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid item>
            <AddRating movie={movie} />
          </Grid>
          <Grid item>
            <AddToFavoritesIcon movie={movie} />
          </Grid>
          <Grid item>
            <AddToPalylist movie={movie} />
          </Grid>
        </Grid>
  
        <Paper 
          component="ul" 
          sx={{...root}}
        >
          <li>
            <Chip label="Genres" sx={{...chip}} color="primary" />
          </li>
          {movie.genres.map((g) => (
            <li key={g.name}>
              <Chip label={g.name} sx={{...chip}} />
            </li>
          ))}
        </Paper>
        <Paper component="ul" sx={{...root}}>
          <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
          <Chip
            icon={<MonetizationIcon />}
            label={`${movie.revenue.toLocaleString()}`}
          />
          <Chip
            icon={<StarRate />}
            label={`${movie.vote_average} (${movie.vote_count}`}
          />
          <Chip label={`Released: ${movie.release_date}`} />
        </Paper>
        

        <Paper
         component="ul" 
         sx={{...root}}>
          <li>
            <Chip label="Actors" sx={{...chip}} color="primary" />
          </li>
          {actors.slice(0, 10).map((actors) => (
            <li key={actors.id}>
              <Link to={`/actors/${actors.id}`}>
                <Chip label={actors.name} sx={{...chip}}/>
              </Link> 
            </li>
          ))}
        </Paper>
     
        <Paper 
          component="ul" 
          sx={{...root}}
        >
          <li>
            <Chip label="Production Countries"  sx={{...chip}} color="primary" />
          </li>
          {movie.production_countries.map((production_countries) => (
            <li key={production_countries.name}>
              <Chip label={production_countries.name} sx={{...chip}} />
            </li>
          ))}
        </Paper>
        <Fab
            color="secondary"
            variant="extended"
            onClick={() =>setDrawerOpen(true)}
            sx={{
                position: 'fixed',
                bottom: '1em',
                right: '1em'
            }}
        >
            <NavigationIcon />
                Reviews
        </Fab>
        <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <MovieReviews movie={movie} />
        </Drawer>
        </>
    );
  };
  export default MovieDetails ;