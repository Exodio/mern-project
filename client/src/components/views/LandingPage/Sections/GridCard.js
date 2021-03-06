//Movie Landing Page Grid Cards Component
import React from "react";

import { Link } from "react-router-dom";

import { Col } from "antd";

import { IMAGE_URL } from "../../../Config";

function GridCards(props) {
  const POSTER_SIZE = "w154";
  let { actor, key, image, movieId, movieName, characterName } = props;

  if (actor) {
    return (
      <Col key={key} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            src={`${IMAGE_URL}${POSTER_SIZE}${image}`}
            alt={characterName}
          />
        </div>
      </Col>
    );
  } else {
    return (
      <Col key={key} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <Link to={`/movie/${movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              src={image}
              alt={movieName}
            />
          </Link>
        </div>
      </Col>
    );
  }
};

export default GridCards;