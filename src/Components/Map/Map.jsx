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

  const [selected, setSelected] = useState();
  const [start, setStart] = useState();
  const [destination, setDestination] = useState();
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

  const [showError, setShowError] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const handleClickDarkMode = () => {
    if (!darkMode) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  };

  const searchEl = document.querySelector(".searchBoxPosition");
  const resetBtn = document.querySelector(".menuBtn");

  const handleButtonClick = () => {
    const startAirportCode = getAirportCode(chosenStartPlace);
    const destAirportCode = getAirportCode(chosenDestPlace);

    geocodeByAddress(chosenStartPlace)
      .then((res) => getLatLng(res[0]))
      .then((res) => {
        getQuote(
          startAirportCode,
          destAirportCode,
          startDate.format("YYYY-MM-DD")
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (!data.Quotes.length) {
              setStartMarker();
              setDestMarker();
              setShowError(true);
            } else {
              setStartMarker(res);
            }
            return setStartData(data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    geocodeByAddress(chosenDestPlace)
      .then((res) => getLatLng(res[0]))
      .then((res) => {
        getQuote(
          destAirportCode,
          startAirportCode,
          endDate.format("YYYY-MM-DD")
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (!data.Quotes.length) {
              setStartMarker();
              setDestMarker();
            } else {
              setDestMarker(res);
            }
            return setDestData(data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    searchEl.classList.add("hidden");
    resetBtn.classList.remove("hidden");
  };

  const handleMenuButtonClick = () => {
    resetBtn.classList.add("hidden");
    searchEl.classList.remove("hidden");
    resetStates();
  };

  useEffect(() => {
    setSelected(destMarker);
  }, [destMarker]);

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

  const resetStates = () => {
    setStart();
    setDestination();
    setChosenStartPlace();
    setChosenDestPlace();
    setDestPlaces();
    setStartPlaces();
    setStartDate();
    setEndDate();
    setStartData();
    setDestData();
    setStartMarker();
    setDestMarker();
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

          <div onClick={handleMenuButtonClick} className="menuBtn hidden">
            NEW SEARCH
          </div>

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
            <div onClick={handleClickDarkMode} className="emojiBox">
              <span className="emoji moon" role="img" aria-label="moon">
                🌙
              </span>
            </div>
          ) : (
            <div onClick={handleClickDarkMode} className="emojiBox">
              <span className="emoji sun" role="img" aria-label="sun">
                ☀️
              </span>
            </div>
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default Map;
