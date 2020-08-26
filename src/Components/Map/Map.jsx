import React, { useState, useCallback, useRef, useEffect } from "react";
import "../../reset/reset.scss";
import mapStyles from "./mapStyles";
import mapStylesDark from "./mapStylesDark";
import Search from "../Search/Search";
import { getQuote } from "../../api";
import { getAirportCode } from "../../utils";

import "./Map.scss";

import { InfoWindowBox } from "../InfoWindowBox/InfoWindowBox";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};
const center = {
  lat: 52.229675,
  lng: 21.01223,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const optionsDarkMode = {
  styles: mapStylesDark,
  disabledDefaultUI: true,
  zoomControl: true,
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=en`,
    libraries,
  });

  const [selected, setSelected] = useState(null);

  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [chosenStartPlace, setChosenStartPlace] = useState();
  const [chosenDestPlace, setChosenDestPlace] = useState();
  const [destPlaces, setDestPlaces] = useState();
  const [startPlaces, setStartPlaces] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startData, setStartData] = useState();
  const [destData, setDestData] = useState();
  const [startMarker, setStartMarker] = useState();
  const [destMarker, setDestMarker] = useState();

  const [darkMode, setDarkMode] = useState(false);

  const handleClickDarkMode = () => {
    if (darkMode === false) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  };

  const handleButtonClick = () => {
    const startAirportCode = getAirportCode(chosenStartPlace);
    const destAirportCode = getAirportCode(chosenDestPlace);

    geocodeByAddress(chosenStartPlace)
      .then((res) => getLatLng(res[0]))
      .then((res) => setStartMarker(res));

    geocodeByAddress(chosenDestPlace)
      .then((res) => getLatLng(res[0]))
      .then((res) => setDestMarker(res));

    getQuote(startAirportCode, destAirportCode, startDate.format("YYYY-MM-DD"))
      .then((response) => response.json())
      .then((data) => setStartData(data))
      .catch((err) => {
        console.log(err);
      });

    getQuote(destAirportCode, startAirportCode, endDate.format("YYYY-MM-DD"))
      .then((response) => response.json())
      .then((data) => setDestData(data))
      .then((res) =>
        setTimeout(() => {
          console.log(destMarker);
        }, 3000)
      )
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setSelected(destMarker);
  }, [destMarker]);

  // useEffect(() => {
  //   if (selected) {
  //     setSelected(destMarker);
  //   }
  // }, [selected, destMarker]);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  const path = [startMarker, destMarker];

  const optionsPolyline = {
    strokeColor: "limegreen",
    strokeOpacity: 1,
    strokeWeight: 3,
    fillColor: "limegreen",
    fillOpacity: 0.5,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [startMarker, destMarker],
    zIndex: 1,
  };

  const buttonStyle = {
    width: "200px",
    height: "100px",
    backgroundColor: "gold",
    position: "absolute",
    right: "60px",
    top: "60px",
  };

  return (
    <>
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={5}
          center={center}
          options={darkMode === false ? options : optionsDarkMode}
          onLoad={onMapLoad}
        >
          <Search
            handleButtonClick={handleButtonClick}
            start={start}
            setStart={setStart}
            destination={destination}
            setDestination={setDestination}
            chosenStartPlace={chosenStartPlace}
            setChosenStartPlace={setChosenStartPlace}
            chosenDestPlace={chosenDestPlace}
            setChosenDestPlace={setChosenDestPlace}
            destPlaces={destPlaces}
            setDestPlaces={setDestPlaces}
            startPlaces={startPlaces}
            setStartPlaces={setStartPlaces}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />

          {startMarker ? (
            <Marker
              position={{ lat: startMarker.lat, lng: startMarker.lng }}
              icon={{
                url: "https://image.flaticon.com/icons/svg/201/201623.svg",
                scaledSize: new window.google.maps.Size(32, 32),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(22.5, 22.5),
              }}
              onClick={() => {
                setSelected(startMarker);
              }}
            />
          ) : null}
          {destMarker ? (
            <Marker
              position={{ lat: destMarker.lat, lng: destMarker.lng }}
              icon={{
                url: "https://image.flaticon.com/icons/svg/201/201623.svg",
                scaledSize: new window.google.maps.Size(32, 32),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(22.5, 22.5),
              }}
              onClick={() => {
                setSelected(destMarker);
              }}
            />
          ) : null}
          {selected ? (
            <InfoWindowBox
              chosenStartPlace={chosenStartPlace}
              chosenDestPlace={chosenDestPlace}
              startData={startData}
              destData={destData}
              startDate={startDate}
              endDate={endDate}
              selected={selected}
              setSelected={setSelected}
            />
          ) : null}
          {destData ? <Polyline path={path} options={optionsPolyline} /> : null}

          {darkMode === false ? (
            <div className="emojiBox">
              <span
                onClick={handleClickDarkMode}
                className="emoji"
                role="img"
                aria-label="smile"
              >
                😊
              </span>
            </div>
          ) : (
            <div className="emojiBox">
              <span
                onClick={handleClickDarkMode}
                className="emoji"
                role="img"
                aria-label="sunglasses"
              >
                😎
              </span>
            </div>
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default Map;