//Movie Landing Page Component
import React from "react";
import { useState, useEffect } from "react";

import { Typography, Row } from "antd";

import { API_URL, API_KEY, IMAGE_URL } from "../../Config";

import MainImage from "./Sections/MainImage";
import GridCard from "./Sections/GridCard";

const { Title } = Typography;


function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);
  
  useEffect(() => {
    fetch(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));

    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (path) => {
    fetch(path)
      .then((response) => response.json())
      .then((response) => {
        setMovies([...Movies, ...response.results]);
        setCurrentPage(response.page);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleClick = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;

    fetchMovies(endpoint);
  };

  return (
    <div style={{ width: "100%", margin: 0 }}>
      {/* Movie Main Image Component */}
      {Movies[0] && (
        <MainImage
          image={`${IMAGE_URL}w1280${Movies[0].backdrop_path && Movies[0].backdrop_path}`}
          title={Movies[0].original_title}
          text={Movies[0].overview}
        />
      )}

      {/* Movie Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Title level={2}> Movies listing by the latest</Title>
        <hr />

        {/* Movie Info for Table */}
        <Row gutter={[16, 16]}>
          {Movies
          && Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCard
                  image={movie.poster_path
                    && `${IMAGE_URL}w500${movie.poster_path}`}
                  movieId={movie.id}
                />
              </React.Fragment>
            ))}
        </Row>

        {/* Load More Button Functionality */}
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={handleClick}>Load More Movies</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;