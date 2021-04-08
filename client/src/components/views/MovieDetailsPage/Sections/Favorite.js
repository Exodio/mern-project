import React, { useEffect, useState } from "react";

import { Button, Icon } from "antd";

import axios from "axios";

import { useSelector } from "react-redux";

function Favorite(props) {
  const user = useSelector(state => state.user);

  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const movieData = {
    movieId: movieId,
    userFrom: userFrom,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime,
  };

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const onClickFavorite = () => {

    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log In first...!");
    }

    if (Favorited) {
      axios
        .post("/api/favorites/removeFromFavorite", movieData)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber((oldRemoveFromFavoriteNumber) => oldRemoveFromFavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Failed to Remove Movie from Favorite");
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      axios
        .post("/api/favorites/addToFavorite", movieData)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber((oldAddToFavorite) => oldAddToFavorite + 1);
            setFavorited(!Favorited);
          } else {
            alert("Failed to Add Movie to Favorite");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  useEffect(() => {
    axios
    .post("/api/favorites/favoriteNumber", movieData)
    .then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("Failed to Get Favorite Movie Number");
      }
    })
    .catch((error) => console.error("Error:", error));

    axios
    .post("/api/favorites/favorited", movieData)
    .then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("Failed to get Favorite Movie Details");
      }
    })
    .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <React.Fragment>
      <Button onClick={onClickFavorite}>
      {!Favorited ? "Add to Favorites" : "Remove from Favorites List"} {FavoriteNumber}<Icon type="heart" />
      </Button>
    </React.Fragment>
  );
};

export default Favorite;