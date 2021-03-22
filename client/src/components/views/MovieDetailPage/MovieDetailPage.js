import React, { useEffect, useState } from "react";

import { Descriptions, Button, Row } from "antd";

import { API_URL, API_KEY, IMAGE_URL } from "../../Config";

import MainImage from "../LandingPage/Sections/MainImage";
import GridCard from "../LandingPage/Sections/GridCard";

function MovieDetailPage(props) {
  const [Movie, setMovie] = useState([]);
  const [Crews, setCrews] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    const movieId = props.match.params.movieId;

    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);

        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            setCrews(response.cast);
          })
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleClick = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/* Movie Main Image Component */}
      {Movie && (
        <MainImage
          image={`${IMAGE_URL}w1280${
            Movie.backdrop_path && Movie.backdrop_path
          }`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      )}

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button> Add Movie To Favourites</Button>
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
          <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>
          <Descriptions.Item label="popularity">
            {Movie.popularity} Views
          </Descriptions.Item>
        </Descriptions>

        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClick}> Toggle Actor View</Button>
        </div>
        {/* Grid Cards for Crews */}
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Crews &&
              Crews.map((crew, index) => (
                <React.Fragment key={index}>
                  {crew.profile_path && (
                    <GridCard
                      actor
                      image={`${IMAGE_URL}w1500${crew.profile_path}`}
                    />
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
