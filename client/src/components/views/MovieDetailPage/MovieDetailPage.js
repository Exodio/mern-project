import React, { useEffect, useState } from "react";

import { Descriptions, Button, Row } from "antd";

import { API_URL, API_KEY, IMAGE_URL } from "../../Config";

import MainImage from "../LandingPage/Sections/MainImage";
import GridCard from "../LandingPage/Sections/GridCard";

import Favourite from "./Sections/Favourite";


function MovieDetailPage(props) {
  const [Movie, setMovie] = useState([]);
  const [Cast, setCast] = useState([]);

  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);

  const movieId = props.match.params.movieId;

  useEffect(() => {

    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
        setLoadingForMovie(false);

        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
          .then((response) => response.json())
          .then((response) => {
            setCast(response.cast);
          })
          .catch((error) => console.error("Error:", error));
          
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleClick = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div style={{ width: "100%", margin: 0 }}>
      {/* Movie Main Image Component */}
      {!LoadingForMovie ? (
        <MainImage
          image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      ) : (
        <div>Loading...</div>
      )}

      {/* Movie Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favourite
            userForm={localStorage.getItem("userId")}
            movieId={movieId}
            movieInfo={Movie}
          />
        </div>

        {/* Movie Info for Table */}
        <Descriptions title="Movie Details" bordered>
          <Descriptions.Item label="Title">
            {Movie.original_title}
          </Descriptions.Item>
          <Descriptions.Item label="release_date">
            {Movie.release_date}
          </Descriptions.Item>
          <Descriptions.Item label="revenue">
            {Movie.revenue} USD
          </Descriptions.Item>
          <Descriptions.Item label="runtime">
            {Movie.runtime} Minutes
          </Descriptions.Item>
          <Descriptions.Item label="vote_average" span={2}>
            {Movie.vote_average} %
          </Descriptions.Item>
          <Descriptions.Item label="vote_count">
            {Movie.vote_count} Votes
          </Descriptions.Item>
          <Descriptions.Item label="status">
            {Movie.status}
            </Descriptions.Item>
          <Descriptions.Item label="popularity">
            {Movie.popularity} Views
          </Descriptions.Item>
        </Descriptions>
        <br />
        <br />

        {/* Grid Cards for Cast */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClick}> Toggle Actor View</Button>
        </div>
        <br />
        <br />
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Cast &&
              Cast.map((cast, index) => (
                <React.Fragment key={index}>
                  {cast.profile_path && (
                    <GridCard actor image={`${cast.profile_path}`} />
                  )}
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage;
