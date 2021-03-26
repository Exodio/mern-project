import React, { useEffect, useState } from "react";

import { Button, Row, Icon } from "antd";

import { API_URL, API_KEY, IMAGE_URL, IMAGE_SIZE } from "../../Config";

import MainImage from "../LandingPage/Sections/MainImage";
import GridCard from "../LandingPage/Sections/GridCard";

import MovieDetails from './Sections/MovieDetails';
import Favorite from './Sections/Favorite';

function MovieDetailsPage(props) {
    const movieId = props.match.params.movieId;

    const [Movie, setMovie] = useState([]);
    const [Cast, setCast] = useState([]);

    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {

        let endpointForMovieDetails = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieDetails);
    }, []);

    const toggleActorView = () => {
      setActorToggle(!ActorToggle);
    };

    const fetchDetailInfo = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setMovie(result);

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        console.log(result)
                        setCast(result.cast)
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => console.error('Error:', error));
    }

    return (
      <div>
        {/* Movie Main Image Component */}
        {<MainImage
            image={`${IMAGE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
            title={Movie.original_title}
            text={Movie.overview}
          />
        }
        {/* Movie Body */}
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Favorite
              userFrom={localStorage.getItem("userId")}
              movieId={movieId}
              movieInfo={Movie}
            />
          </div>
          {/* Movie Details */}
          {<MovieDetails movie={Movie} />}
          {/* Grid Cards for Cast */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <Button onClick={toggleActorView}>Toggle Actor View <Icon type="down"/></Button>
          </div>
          {ActorToggle && (
            <Row gutter={[16, 16]}>
              {Cast && (
              Cast.map((cast) =>
                    cast.profile_path && (
                      <GridCard
                        actor
                        image={cast.profile_path}
                        characterName={cast.characterName}
                      />
                    )
                ))}
            </Row>
          )}
          <br />
        </div>
      </div>
    );
}

export default MovieDetailsPage;