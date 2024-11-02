import React from "react";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

const TemplateMoviePage = ({ actor, children }) => {
    
  
    return (
      <>
      <Grid container spacing={1} direction="row" style={{ padding: "20px" }}>
      <Grid item size={{xs:3}}>
        <div>
          <img
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={actor.name}
              style={{ width: "300px", borderRadius: "10px" }}
          />
        </div>
        <div style={{marginTop:"15px"}}>
          <Typography variant="h4" component="h2">
            Personal Info
          </Typography>
          <Typography variant="h6" component="h2">
            Known For
          </Typography>
          <Typography variant="body1" component="span">
            {actor.known_for_department}
          </Typography>
          </div>
          <div style={{marginTop:"15px"}}>
          <Typography variant="h6" component="h2">
           Gender
          </Typography>
          <Typography>
          {actor.gender === 1 ? "Female" : "Male"}
          </Typography>
        </div>
          <div style={{marginTop:"15px"}}>
          <Typography variant="h6" component="h2">
           Birthday
          </Typography>
          <Typography variant="body1" component="span">
            {actor.birthday}
          </Typography>
        </div>
        <div style={{marginTop:"15px"}}>
          <Typography variant="h6" component="h2">
           Place of Birth
          </Typography>
          <Typography variant="body1" component="span">
            {actor.place_of_birth}
          </Typography>
        </div>
        <div style={{marginTop:"15px"}}>
          <Typography variant="h6" component="h2">
           Also Known As
          </Typography>
          {actor.also_known_as.map((known, index) => (
            <Typography key={index} variant="body1" component="span" style={{ display: "block" }}>
            {known}
            </Typography>
          ))}
        </div>
        </Grid>
        <Grid item size={{xs:9}}>
          {children}
        </Grid>
      </Grid>
        
      </>
    );
  };
  
  export default TemplateMoviePage;