import React, { useState, useEffect } from "react";

import { Typography, Row, Button, Icon, Form, Input } from "antd";

import { API_URL, API_KEY, IMAGE_URL, IMAGE_SIZE, POSTER_SIZE } from "../../Config";

import MainImage from "./Sections/MainImage";
import GridCard from "./Sections/GridCard";

const { Title } = Typography;

const { Search } = Input;

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [SearchTerms, setSearchTerms] = useState("");

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

  const handleOnClickLoadMore = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  const handleOnChange = (e) => {
    setSearchTerms(e.currentTarget.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (SearchTerms) {
      fetch(`${API_URL}search/movie?api_key=${API_KEY}&query=` + SearchTerms)
        .then((response) => response.json())
        .then((response) => {
          if (response.results.length === 0) {
            alert("Movie Not Found");
          }

          setMovies(response.results);
        })
        .catch((error) => console.error("Error:", error));

      setSearchTerms("");
    }
  };

  return (
    <div style={{ width: "100%", margin: 0 }}>
      {/* Movie Main Image */}
      {Movies[0] && (
        <MainImage
          image={`${IMAGE_URL}${IMAGE_SIZE}${
            Movies[0].backdrop_path && Movies[0].backdrop_path
          }`}
          title={Movies[0].original_title}
          text={Movies[0].overview}
        />
      )}
      {/* Movie Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Title
          level={2}
          style={{ color: "#19adf4", fontFamily: "Georgia, serif" }}
        >
          <Icon type="fire" />
          Browse Through The Latest Up To Date Movies
        </Title>

        {/* Search Feature */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1rem auto",
          }}
        >
          <Form onSubmit={handleOnSubmit}>
            <Search
              value={SearchTerms}
              onChange={handleOnChange}
              placeholder="Or Search By Name..."
              enterButton
              allowClear
              />
          </Form>
        </div>

        <hr />
        {/* Movie Info for Table */}
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCard
                  image={
                    movie.poster_path &&
                    `${IMAGE_URL}${POSTER_SIZE}${movie.poster_path}`
                  }
                  movieId={movie.id}
                />
              </React.Fragment>
            ))}
        </Row>
        {/* Load More Button */}
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleOnClickLoadMore}>
            Show More
            <Icon type="loading" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
