import React, { useEffect, useState } from "react";

import axios from "axios";

import { Button, Icon } from "antd";


function Favourite(props) {
    const [FavouriteNumber, setFavouriteNumber] = useState(0);
    const [Favourited, setFavourited] = useState(false);

    const favouriteData = {
      userForm: props.userForm,
      movieId: props.movieId,
      movieTitle: props.movieInfo.original_title,
      movieImage: props.movieInfo.backdrop_path,
      movieRunTime: props.movieInfo.runtime,
    };

    useEffect(() => {

    axios
      .post("/api/favourite/favouriteNumber", favouriteData)
      .then((response) => {

        if (response.data.success) {
            setFavouriteNumber(response.data.favouriteNumber);
        } else {
          alert("Failed to get the Favourite movie number");
        }
      })
      .catch((error) => console.error("Error:", error));


      axios
      .post("/api/favourite/favourited", favouriteData)
      .then((response) => {

        if (response.data.success) {
            setFavourited(response.data.favourited);
        } else {
          alert("Failed to get Favourited movie information");
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const onClickFavourite = () => {     
    if (Favourited) {
      axios
        .post("/api/favourite/removeFromFavourite", favouriteData)
        .then((response) => {
          if (response.data.success) {
            setFavouriteNumber(FavouriteNumber - 1);
            setFavourited(!Favourited);
          } else {
            alert("Failed to remove movie from Favourite");
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      axios
        .post("/api/favourite/addToFavourite", favouriteData)
        .then((response) => {
          if (response.data.success) {
            setFavouriteNumber(FavouriteNumber + 1);
            setFavourited(!Favourited);
          } else {
            alert("Failed to add movie to Favourite");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <div>
      <Button onClick={onClickFavourite}>{Favourited ? "Remove from Favourites List" : "Add to Favourites List"} {FavouriteNumber} <Icon type="heart"/></Button>
    </div>
  );
}

export default Favourite;
