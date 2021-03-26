import React from "react";
import { Descriptions } from "antd";

function MovieDetails(props) {
  const { movie } = props;

  return (
    <Descriptions title="Movie Details" bordered>
      <Descriptions.Item label="title">
        {movie.original_title} 
      </Descriptions.Item>
      <Descriptions.Item label="release date">
        {movie.release_date}
      </Descriptions.Item>
      <Descriptions.Item label="ravenue">
        {movie.revenue} USD
      </Descriptions.Item>
      <Descriptions.Item label="length">
        {movie.runtime} minutes
      </Descriptions.Item>
      <Descriptions.Item label="vote rate" span={2}>
        {movie.vote_average} %
      </Descriptions.Item>
      <Descriptions.Item label="total voters">
        {movie.vote_count} votes
      </Descriptions.Item>
      <Descriptions.Item label="status">
        {movie.status}
      </Descriptions.Item>
      <Descriptions.Item label="populatiry">
        {movie.popularity} views
      </Descriptions.Item>
    </Descriptions>
  );
}

export default MovieDetails;