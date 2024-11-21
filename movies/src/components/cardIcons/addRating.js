import React, { useContext, useState } from "react";
import { MoviesContext } from "../../context/moviesContext";
import IconButton from "@mui/material/IconButton";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [rating, setRating] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRating(""); 
  };

  const handleAddRating = () => {
    if (!rating) {
      alert("Please enter a rating before submitting!");
      return;
    }
    context.addToRating(movie, rating);
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-label="add rating"
        onClick={handleOpen} >
        <BookmarkAddIcon color="primary" fontSize="large" />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Rating</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter Rating"
            variant="outlined"
            size="small"
            type="number"
            fullWidth
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddRating} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddToFavoritesIcon;
