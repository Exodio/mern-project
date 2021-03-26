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
        .post("/api/favorite/getFavorites", movieFormData)
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
        .post("/api/favorite/removeFromFavorite", movieForm)
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
              "We are sorry, this movie does not have an image added to display, yet!"
            )}
          </div>
        );
        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime} minutes</td>
            <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></td>
        </tr>
    });

    return (
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <Title level={2}>My Favorite Movies List <Icon type="star"/></Title>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Movie Length</th>
              <td>Movie Actions</td>
            </tr>
          </thead>
          <tbody>{renderMovieCards}</tbody>
        </table>
      </div>
    );
}

export default FavoritePage;