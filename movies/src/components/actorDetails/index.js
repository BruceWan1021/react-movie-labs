import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import { getActorCredits } from "../../api/tmdb-api";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { ImageList, ImageListItem } from "@mui/material";
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {Link} from "react-router-dom"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const ActorDetails = ({ actor }) => { 
    const { data , error, isLoading, isError } = useQuery(
        ["images", { id: actor.id }],
        getActorCredits
      );

    const [expanded, setExpanded] = useState(false); 
    const toggleExpanded = () => setExpanded(!expanded);

    if (isLoading) {
      return <p>Loading...</p>
    }

    if (isError) {
      return <p>{error.message}</p>
    }
    
    const images = data.cast
  
    return (
      <>
      <Grid container spacing={1}   style={{ paddingBottom: "15px" }}>
        
        <Grid item >
            <Typography variant="h3" component="h3" sx={{paddingBottom: 2}}>
            {actor.name}
            </Typography>
            
            <Paper
                sx={{
                    padding: 2,          
                    backgroundColor: '#f5f5f5',  
                    borderRadius: 2,     
                    boxShadow: 3,   
                    display: "flex",    
                    flexDirection: "column"
                }}>
                <Typography variant="h4" component="h3">
                    Biography
                </Typography>
                <Typography
                variant="body1"
                component="span"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: expanded ? "none" : 5, 
                  textOverflow: "ellipsis",
                }}
              >
                {actor.biography}
              </Typography>
              
                <Box
                    sx={{
                    position: "relative",
                    bottom: 8,
                    left: 960,
                    }}
                >
                    <Button
                        variant="text"
                        color="primary"
                        onClick={toggleExpanded}
                        size="small"
                    >
                        {expanded ? "Show Less" : "Show More"}
                    </Button>
                </Box>
            </Paper>
        </Grid>
        <Grid>
            <div sx={{
                 display: "flex",
                 flexWrap: "wrap",
                 justifyContent: "space-around",
            }}>
                <ImageList sx={{
                    height: "38vh",
                }}
                cols={6}
                >
                    {images.slice(0,30).map((image) => (
                        <ImageListItem key={image.poster_path}>
                            <Link to={`/movies/${image.id}`}> 
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${image.poster_path}`}
                                alt={image.original_title} 
                                style={{ width: "175px"}}
                            />
                            </Link>
                             <ImageListItemBar
                                title={image.original_title}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </Grid>
        <Grid>
            <Typography variant="h4" component="h3">
                Acting
            </Typography>
        </Grid>
        <Grid>
            {images.map((image) => (
                <Accordion>
                <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="overview"
                id={image.original_title}
                >
                    <div >
                        <Typography variant="h6" component="h2">
                            {image.original_title}
                        </Typography>
                        <Typography style={{marginLeft: "15px"}}>
                            <span style={{color:"grey"}}>as </span>{image.character}
                        </Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {image.overview}
                    </Typography>
                </AccordionDetails>
                </Accordion>
            ))}
            
        </Grid>
      </Grid>
        </>
    );
  };
  export default ActorDetails ;