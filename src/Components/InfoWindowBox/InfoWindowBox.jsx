import React from "react";

import { InfoWindow } from "@react-google-maps/api";

import "./InfoWindowBox.scss";

export const InfoWindowBox = ({
  selected,
  setSelected,
  startData,
  destData,
  startDate,
  endDate,
  chosenStartPlace,
  chosenDestPlace,
}) => {
  const InfoWindowPopUp = () => {
    if (startData && destData && selected) {
      return (
        <InfoWindow
          options={{
            pixelOffset: new window.google.maps.Size(200, 200),
          }}
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div className="color">
            <h2>
              To: {chosenDestPlace} from: {chosenStartPlace} {}
            </h2>
            <h2>Lowest price: {startData.Quotes[0].MinPrice}$</h2>
            <h2>Carrier: {startData.Carriers[0].Name}</h2>
            <h2>Departure date: {startDate.format("YYYY-MM-DD")}</h2>
            <h2>
              To: {chosenStartPlace} from: {chosenDestPlace}
            </h2>
            <h2>Lowest price: {destData.Quotes[0].MinPrice}$</h2>
            <h2>Carrier: {destData.Carriers[0].Name}</h2>
            <h2>Departure date: {endDate.format("YYYY-MM-DD")}</h2>
          </div>
        </InfoWindow>
      );
    } else return null;
  };
  return InfoWindowPopUp();
};
