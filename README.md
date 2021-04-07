#

# :movie_camera: exodioMovies

#### :loudspeaker: MERN project developed during the ReactJS course at SoftUni between March and April of 2021.

The inspired exodioMovies Web App is built to assist you in keeping track and being up to date with your favorite movies.

## Application Configurations

1. :rocket: Start the project by typing in the terminal **npm run dev**, as the app is run both projects with concurrently.

2. :arrows_counterclockwise: The application is running on localhost:3000 and it will automatically load up on your browser.

3. :bangbang: Remember to place your unique MongoDB key in server/config/dev.js in order to run the application accordingly(!only if it is not listed).

## :bookmark_tabs: Detailed Summary

The application is similar to a movies browser website, throughout which each user can review, rate and comment different movies. Each section has the ability to display different movie and the users are allowed to participate in the rating system, express their opinions and interact in the comment section with one another. There are two implemented role types in this project, as the first one is an unsigned guest role and an already signed up user role. Depending on the role status, the user is allowed to have access to different parts and functionalities based in the perimeters of the application.

## :electric_plug: Technology Stack

- **Frontend:** ReactJS, Redux, HTML, CSS and some additional libraries/tools;
- **Backend:** NodeJS, ExpressJS;
- **Database:** MongoDB;
- **Hosting:** Heroku;

## :star: List Of All Featured Functionalities

- Signing Up / Logging In / Signing Out;
- Review the current time in live listed in the bottom of the web application;
- View fetched movie data at the Landing page / Load more movies / Search for specific movie / View About Page in navigation Menu, change text themes;
- Get all the movies related information you need in one place;
- View selected movie Details / Add selected movie to Favorite list / Remove movie from Favorite list / View movie Actors cast;
- Share your experience with other users;
- Rate selected movie / Comment selected movie / Reply to selected movie Comment / Rate reply Comment in selected movie;
- Remove movie from Favorites / Navigate to the Nearest cinema center / Enable your current Location;

## :hammer: Build (**available in two main parts, fully responsive and mobile friendly**)

1. :unlock: **Public part** - which is accessible to everyone, without the necessity of authentication. Every visitor has the ability to:

- Browse through the Landing Page, which by default lists all of the latest Movies from an API.
- Load More movies, once reviewed/or not, all of the already listed ones, navigate at the very bottom of the page, check your Current Time, while you are there, as well as Search for your desired movie in the Search Box. Navigate to the very top by clicking on the Scroll Button.
- Redirect to the Home Page, by clicking on the Homepage Logo and in case you route to a non-existing path or to a user credentials required one, you will come across with the Not Found Page.
- Review the representive About Page located in the section of the dropdown Menu, right next to the homepage logo, click on the theme changer for better reading experience, as you understand more about the application.

2. :lock: **Private part** - only for logged in users. After successful registration using the given (by the user) unique credentials, you will be able to use the full functionality of the application:

- Browse through the Landing Page, but this time, if you click on different movies you will be able to view their Details, also you can toggle in order to see Actors participation in the desired movie, as well as the current movie Rating;
- Favorite the Movie you Like now and later on you can Remove it with one click, you can always check your Favorites listed in the Menu Panel at the very top right corner and you have the option to Remove any unwanted movie there also, but remember to add a Movies first, otherwise you will encounter a sad empty list in the Favorite Page;
- Share your experience on each and every Movie, so that the others can also participate with you via the public Comments section, build a community, Rate a Comment, Reply to Comment, Rate a Reply, communicate with each other and share your opinion;
- If you are in a rush and you need to locate a movie theater fast, navigate to the Menu Panel at the very top right corner and visit the Location Page, where you can Search Live up to date, as you Enable your Location, you can also Zoom In and Out, apply Full Screen Mode and find the nearest Cinema City, which may be right next to you;
- By clicking on the Logout button you as a user you will be Loged Out, and last but not least, there is a Loading Page Screening, everytime any route occurs changes.

# :closed_book:[Toolkit Dependencies(libraries used in the project)](https://github.com/Exodio/mern-project/blob/main/info/movie-application-dependencies-used.txt);
# :blue_book: [App Backbone Structuring(action steps followed for the boiler plate structuring)](https://github.com/Exodio/mern-project/blob/main/info/movie-application-boiler-plate.txt);
# :green_book: [App Action Planning(action plan followed during the application development)](https://github.com/Exodio/mern-project/blob/main/info/movie-application-action-plan.txt);