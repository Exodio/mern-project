import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Row, Collapse, Button, Icon } from "antd";

import axios from "axios";

import { API_KEY, API_URL, IMAGE_URL, IMAGE_SIZE } from "../../Config";

import { useSelector } from "react-redux";

import MainImage from "../../views/LandingPage/Sections/MainImage";
import GridCard from "../../views/LandingPage/Sections/GridCard";

import MovieDetail from "./Sections/MovieDetail";
import Favorite from "./Sections/Favorite";

import Comments from "./Sections/Comments";
import LikesDislikes from "./Sections/LikesDislikes";

function MovieDetailPage(props) {
  const user = useSelector(state => state.user);

  const movieId = props.match.params.movieId;
  
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);

  const [CommentLists, setCommentLists] = useState([]);

  const [LoadingForMovie, setLoadingForMovie] = useState(true);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);

  const [ActorToggle, setActorToggle] = useState(false);
  const [VotesToggle, setVotesToggle] = useState(false);


  const movieData = { movieId: movieId };

  useEffect(() => {
    let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetchDetailInfo(endpointForMovieInfo);

    axios
      .post("/api/comments/getComments", movieData)
      .then((response) => {
        if (response.data.success) {
          setCommentLists(response.data.comments);
        } else {
          alert("Failed to Get Comments Information");
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  const fetchDetailInfo = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovie(result);
        setLoadingForMovie(false);

        let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        fetch(endpointForCasts)
          .then((result) => result.json())
          .then((result) => {
            setCasts(result.cast);
          })
          .catch((error) => console.error("Error:", error));

        setLoadingForCasts(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  const toggleVotesView = () => {
    setVotesToggle(!VotesToggle);
  };

  return (
    <div>
      {user.userData && !user.userData.isAuth ? (
        <div
          style={{
            width: "100%",
            fontSize: "2rem",
            height: "350px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>
            Please <Link to="/login"> Sign In <Icon type="login" /></Link> first in order to proceed...<Icon type="warning" />
          </p>
        </div>
      ) : (
        <React.Fragment>
          {/* Movie Main Image Component */}
          {!LoadingForMovie ? (
            <MainImage
              image={`${IMAGE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
              title={Movie.original_title}
              text={Movie.overview}
            />
          ) : (
            <div>Loading...</div>
          )}
          {/* Movie Body */}
          <div style={{ width: "85%", margin: "1rem auto" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Favorite
                userFrom={localStorage.getItem("userId")}
                movieInfo={Movie}
                movieId={movieId}
              />
            </div>
            {/* Likes and Dislikes */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={toggleVotesView}>
                Toggle Vote View
                <Icon type="right" />
              </Button>
              {VotesToggle && (
                <Collapse style={{ margin: "5px" }}>
                  <LikesDislikes
                    movie
                    movieId={movieId}
                    userId={localStorage.getItem("userId")}
                  />
                </Collapse>
              )}
            </div>
            {/* Movie Details */}
            {!LoadingForMovie ? (
              <MovieDetail movie={Movie} />
            ) : (
              <div>Loading...</div>
            )}
            {/* Grid Cards for Cast */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
              }}
            >
              <Button onClick={toggleActorView}>
                Toggle Actor View
                <Icon type="down" />
              </Button>
            </div>
            {ActorToggle && (
              <Row gutter={[16, 16]}>
                {!LoadingForCasts ? (
                  Casts.map(
                    (cast) =>
                      cast.profile_path && (
                        <GridCard
                          actor
                          image={cast.profile_path}
                          characterName={cast.characterName}
                        />
                      )
                  )
                ) : (
                  <div>Loading...</div>
                )}
              </Row>
            )}
            <br />
            {/* Comments Section */}
            <Comments
              movieTitle={Movie.original_title}
              CommentLists={CommentLists}
              postId={movieId}
              refreshFunction={updateComment}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default MovieDetailPage;