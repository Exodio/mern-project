#

# :movie_camera: exodioMovies

#### :loudspeaker: MERN project developed during the ReactJS course at SoftUni between March and April of 2021.

The inspired exodioMovies Web App is built to assist you in keeping track and being up to date with your favorite movies.

## Application Configurations

1. :rocket: Start the project by typing in the terminal **npm run dev**, as the app is run both projects with concurrently.

2. :arrows_counterclockwise: The application is running on localhost:3000 and it will automatically load up on your browser.

3. :heavy_exclamation_mark: Remember to place your unique MongoDB key in server/config/dev.js in order to run the application accordingly.

## :bookmark_tabs: Detailed Summary

The application is similar to a movies browser website, throughout which each user can review, rate and comment different movies. Each section has the ability to display different movie and the users are allowed to participate in the rating system, express their opinions and interact in the comment section with one another. There are two implemented role types in this project, as the first one is an unsigned guest role and an already signed up user role. Depending on the role status, the user is allowed to have access to different parts and functionalities based in the perimeters of the application.

## :gem: Technology stack

- **Frontend:** ReactJS, Redux, HTML, CSS and some additional libraries/tools;
- **Backend:** NodeJS, ExpressJS;
- **Database:** MongoDB;
- **Hosting:** Heroku;

## :star: List of all featured functionalities

- Signing Up / Logging In / Signing Out;
- Review the current time in live listed in the bottom of the web application;
- View fetched movie data at the landing page / Load more movies / Search for specific movie;
- Get all the movie related information you need in one place;
- View selected movie details / Add selected movie to favorite list / Remove movie from favorite list / View movie actors cast;
- Share your experience with other users;
- Rate selected movie / Comment selected movie / Reply to selected movie comment / Rate reply comment on selected movie;
- Remove movie from favorites / Navigate to the nearest cinema center / Enable your current location;

## :pushpin: Build (**available in two main parts, fully responsive and mobile friendly with included few animations**)

1. :unlock: **Public part** - which is accessible to everyone, without the necessity of authentication. Every visitor has the ability to:

- Browse through the Landing Page, which by default lists all of the latest Movies from an API.
- Load More movies, once reviewed/or not, all of the already listed ones by navigating at the very bottom of he page, check your current time, as it is listed while you are there, as well as search for your desired movie in the search box. Don`t forget to click on the scroll icon on the right to navigate to the very to faster.
- Redirect to the Home Page, by clicking on the exodioMovies logo and in case you route to a non-existing path or user credentials required one, you will come across the special Not Found Page.

2. :lock: **Private part** - only for logged in users. After successful registration using the given (by the user) unique credentials, you can use the full functionality of the application:

- Browse through the Landing Page again, but this time click on different movies and view their Details, toggle to see the Actors participation in the desired movie;
- Favorite the Movie you Like now and later on Remove it, if you change your mind, you can always check your Favorites listed in the Menu panel and you have the option to Remove it there also, but remember add your Movies first, otherwise you will encounter a sad empty list;
- Share your experience with each and every Movie the others can also participate as well as you in the Comments section, build a community, Rate a Comment, Reply to Comment, Rate a Reply, communicate with each other and share your opinion, it`s free;
- If you are in a rush and you need to locate a movie theater fast, navigate to the Menu and visit the Location Page, where you can Search Live, Enable your Location, Zoom in, Enter Full Screen Mode and find the nearest Cinema City, which may be right next to you;
- By clicking on the Logout button you as a user have been Loged Out, and remember, that there is a Loading screen everytime, the application does important stuff.

## :wrench: Toolkit (libraries used)
