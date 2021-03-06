import React, { useState, useRef, useCallback } from "react";

import { Link } from "react-router-dom";

import MapGL, { GeolocateControl, NavigationControl, FullscreenControl } from "react-map-gl";

import Geocoder from "react-map-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import { Typography, Icon } from "antd";

import { useSelector } from "react-redux";

const config = require("../../../config/key");

const { Title } = Typography;

const mapStyle = {
  width: "100%",
  height: 500,
};

const geolocateControlStyle = {
  left: 8,
  top: 35,
};

const fullscreenControlStyle = {
  left: 8,
  top: 182,
};

function LocationPage() {
  const user = useSelector(state => state.user);

  const [Viewport, setViewport] = useState({
    latitude: 42.6978634,
    longitude: 23.3221789,
    zoom: 12,
  });

  const geocoderContainerRef = useRef();
  const mapRef = useRef();

  const handleViewportChange = useCallback(
  (newViewport) => setViewport(newViewport), []);

  return (
    <div>
      <Title
        level={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#19adf4",
          fontFamily: "sans-serif",
        }}
      >
        <Icon type="eye" /> Navigate Yourself The Nearest Cinema Center
      </Title>
      <hr />
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
          <div
            ref={geocoderContainerRef}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "blue",
              marginBottom: "10px",
            }}
          />
          <MapGL
            ref={mapRef}
            {...Viewport}
            {...mapStyle}
            mapStyle="mapbox://styles/exodio/ckmyowl6f20ec17o803gqtxh7"
            onViewportChange={handleViewportChange}
            mapboxApiAccessToken={config.mapboxAPI}
          >
            <Geocoder
              mapRef={mapRef}
              containerRef={geocoderContainerRef}
              onViewportChange={handleViewportChange}
              mapboxApiAccessToken={config.mapboxAPI}
              position="bottom-left"
            />
            <GeolocateControl
              style={geolocateControlStyle}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              auto
            />
            <FullscreenControl style={fullscreenControlStyle} />
            <NavigationControl
              style={{
                top: "80px",
                left: "8px",
                cursor: "pointer",
              }}
            />
          </MapGL>
        </React.Fragment>
      )}
    </div>
  );
};

export default LocationPage;