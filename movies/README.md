# Assignment 1 - ReactJS app.

Name: Zhenyang Wan
Number： 20109227

## Overview.

[A brief statement on the content of this repository.]

This repository is a ReactJS application that allows users to explore, rate, and manage their favorite movies and the movies they want to watch using data from the TMDb API. Also users can  view detailed information about movies and actors. It includes authentication through third-party services, allowing users to log in, manage their movie ratings, add movies to their favorite list and watchlist. The app also provides user interface with Material UI components.

### Features.

[ A bullet-point list of the __new features__ you added to the Movies Fan app (and any modifications to existing features) .]

+ add actor list into movie details
+ click actor and jump to actor details
+ jump from actorDetail page to movieDetail page
+ login and logout by third-party authentication
+ add avatar into siteHeader where shows the user's avatar
+ get favourite page and watchlist page only after login and get movies from TMDB api
+ add rating function and rating icon
+ add some icons into movieDetail page 
+ accomplish the pagination feature
+ add filter by rating into filter card
+ add sort to filter card
+ use some new components in Material UI
  + accordion and some relate to it
  + arrow downward icon
  + bookmark add icon
  + dialog and some relate to it 
  + alert
  + drawer
  + pagination
  + select
  + slice


## Setup requirements.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## API endpoints.

[ List the __additional__ TMDB endpoints used, giving the description and pathname for each one.] 

+ Upcoming movies - movie/upcoming
+ Now playing movies - movie/nowplaying
+ Popular movies - movie/popular
+ Actor Details  - actor/:id
+ Actor image  - actor/:id/image
+ Actor movie credits  - actor/:id/movielist
+ Request token - authentication/token
+ Create session - authentication/session
+ Account details - account
+ Favourite movies - account/favourite
+ Watchlist movies - account/watchlist
+ Toggle favorite - account/favourite(POST)
+ Toggle watchlist - account/watchlist(POST)
+ Add rating - movie/:id/rating(POST)


## Routing.

[ List the __new routes__ supported by your app and state the associated page.]

+ /movies/favourite - displays all the movies added in favourite list - require authentication
+ /movies/nowplaying - displays all now playing movies. - public
+ /actors/:id - displays an actor's detail - public
+ /movies/upcoming - displays all upcoming movies - public
+ /movies/popular - displays all popular movies - public
+ /login - displays a login form - public
+ /movies/watchlist - displays all the movies added in watchlist - require authentication



## Independent learning (If relevant).

I learned to use sessionStorage to storage data in frontend. After the user login, the session id should be storaged and clear until logout.https://blog.csdn.net/weixin_53877433/article/details/117911670 

I learned about the progress of third-party authentication.https://developer.themoviedb.org/reference/intro/authentication