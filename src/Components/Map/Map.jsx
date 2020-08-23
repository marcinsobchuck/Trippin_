import React, { useState, useCallback, useRef } from "react";
import "../../reset/reset.scss";
import mapStyles from "./mapStyles";
import Search from "../Search/Search";
import { InfoWindowBox } from "../InfoWindowBox/InfoWindowBox";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

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

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=en`,
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [startCoordinates, setStartCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [destCoordinates, setDestCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");

  const handleButtonClick = useCallback(() => {
    setMarkers([]);
    fetch(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${destination}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        res.Places.map((el) => {
          return geocodeByAddress(el.PlaceName)
            .then((res) => {
              return getLatLng(res[0]);
            })
            .then((latlong) => {
              console.log(latlong);
              console.log(markers);
              setMarkers((prevState) => [...prevState, latlong]);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [markers, destination]);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";
  console.log(markers);
  return (
    <>
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={5}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          <Search
            setStartCoordinates={setStartCoordinates}
            setDestCoordinates={setDestCoordinates}
            handleButtonClick={handleButtonClick}
            start={start}
            setStart={setStart}
            destination={destination}
            setDestination={setDestination}
          />
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url:
                  "https://infare.com/wp-content/uploads/2019/11/Airport-Icon-GreenWhite-e1574266744400.png",
                scaledSize: new window.google.maps.Size(24, 24),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(22.5, 22.5),
              }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          ))}
          {selected ? (
            <InfoWindowBox selected={selected} setSelected={setSelected} />
          ) : null}
        </GoogleMap>
      </div>
    </>
  );
};

export default Map;
