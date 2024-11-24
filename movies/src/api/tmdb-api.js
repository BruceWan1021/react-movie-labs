export const getMovies = ({ queryKey }) => {
  const [, page] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

  export const getMovie = (args) => {
    //console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error 
   });
  };
  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getUpcomingMovies = ({ queryKey }) => {
    const [, page] = queryKey;
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
        throw error
    });
  };
  
  export const getNowPlaying = ({ queryKey }) => {
    const [, page] = queryKey
    return fetch(
     `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
    ).then((response) => {
      if(!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

  export const getPopularMovie = ({}) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
      if(!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  }

  export const getMovieActors = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getActor = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getActorImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getActorCredits = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getRequestToken = () => {
    return fetch(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
              throw new Error(error.status_message || "Something went wrong while fetching the request token");
          });
        }
        return response.json();
    })
    .then((data) => {
      if (!data.request_token) {
        throw new Error("Failed to retrieve request token");
      }
      return data.request_token;
    })
    .catch((error) => {
        throw error;
    });
  };

  //Create a Session using an authorized Request Token
  export const createSession = (requestToken) => {
    return fetch(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_TMDB_KEY}`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ request_token: requestToken })
        }
      ).then((response) => {
          if (!response.ok) {
              return response.json().then((error) => {
                  throw new Error(error.status_message || "Something went wrong while creating the session");
              });
          }
          return response.json();
      }).then((data) => {
          if (!data.session_id) {
            throw new Error("Failed to retrieve session ID");
          }
          return data.session_id;
      })
      .catch((error) => {
        throw error;
      });
  };

  export const getAccountDetails = (sessionId) => {
    return fetch(
      `https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.status_message || "Something went wrong");
          });
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };

  export const getFavouriteMovies = (sessionId) => {
    return fetch(
      `https://api.themoviedb.org/3/account/me/favorite/movies?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.status_message || "Something went wrong");
          });
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };

  export const getWatchlistMovies = (sessionId) => {
    return fetch(
      `https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.status_message || "Something went wrong");
          });
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };

  export const toggleFavorite = (sessionId, movieId, isFavorite) => {
    return fetch(
      `https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          favorite: isFavorite, 
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status_code) {
          throw new Error(data.status_message || "Something went wrong");
        }
        return data;
      })
      .catch((error) => {
        console.error("Error toggling favorite:", error);
        throw error;
      });
  };
  
  export const toggleWatchlist = (sessionId, movieId, isWatchlist) => {
    return fetch(
      `https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          watchlist: isWatchlist, 
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status_code) {
          throw new Error(data.status_message || "Something went wrong");
        }
        return data;
      })
      .catch((error) => {
        console.error("Error toggling watchlist:", error);
        throw error;
      });
  };

  export const addRating = (sessionId, movieId, mark) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value : mark 
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status_code) {
          throw new Error(data.status_message || "Something went wrong");
        }
        return data;
      })
      .catch((error) => {
        console.error("Error add rating:", error);
        throw error;
      });
  };
