import React, { useEffect, useState } from "react"

import { Typography, Popover, Button, Icon } from "antd";

import axios from "axios";

import { IMAGE_URL, POSTER_SIZE } from "../../Config";

import "./FavoritePage.css";

const { Title } = Typography;

function FavoritePage() {
    const [Favorites, setFavorites] = useState([]);    
    let movieFormData = { userFrom: localStorage.getItem("userId") };

    useEffect(() => { fetchFavoredMovie() }, []);

    const fetchFavoredMovie = () => {
      axios
        .post("/api/favorites/getFavorites", movieFormData)
        .then((response) => {
          if (response.data.success) {
            setFavorites(response.data.favorites);
          } else {
            alert("Failed to Get Favorites Movie List");
          }
        })
        .catch((error) => console.error("Error:", error));
    };

    const onClickDelete = (movieId, userFrom) => {
      const movieForm = {
        movieId: movieId,
        userFrom: userFrom,
      };

      axios
        .post("/api/favorites/removeFromFavorite", movieForm)
        .then((response) => {
          if (response.data.success) {
            fetchFavoredMovie();
          } else {
            alert("Failed to Remove Movie From Favorites List");
          }
        })
        .catch((error) => console.error("Error:", error));
    };

    const renderMovieCards = Favorites.map((favorite, index) => {
      const content = (
        <div>
            {favorite.moviePost ? (
              <img src={`${IMAGE_URL}${POSTER_SIZE}${favorite.moviePost}`} alt="poster-logo"/>
            ) : (
              "We are sorry, but this movie does not have an image to be display, yet!"
            )}
          </div>
        );

        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime} minutes</td>
            <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove<Icon type="delete"/></Button></td>
        </tr>
    });

    return (
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <Title level={2} style={{ color:"#19adf4", fontFamily: "serif" }}><Icon type="star" />View My Favorite Movies List</Title>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Movie Length</th>
            </tr>
          </thead>
          <tbody>{Favorites.length === 0 ? <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "150px", fontFamily: "cursive" }}>Sorry but your list is empty and there is nothing to display.. <Icon type="frown"/></h3> : renderMovieCards}</tbody>
        </table>
      </div>
    );
};

export default FavoritePage;