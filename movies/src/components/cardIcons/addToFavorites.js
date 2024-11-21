import React, { useContext } from "react";
import { MoviesContext } from "../../context/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(movie);
  };

  const handleRemoveFromFavourites = (e) => {
    e.preventDefault();
    context.removeFromFavorites(movie);
  }

  return (

    <Avatar>
      {movie.favorite ? (
        <Avatar sx={{ backgroundColor: 'red' }}>
          <FavoriteIcon onClick={handleRemoveFromFavourites}/>
        </Avatar>
      ) : (
        <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
          <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
      )}
    </Avatar>
    
  );
};

export default AddToFavoritesIcon;