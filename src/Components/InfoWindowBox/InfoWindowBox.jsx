import React from "react";

import "./InfoWindowBox.scss";
import { InfoWindow } from "@react-google-maps/api";

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
    if (
      startData &&
      destData &&
      selected &&
      startData.Quotes.length >= 1 &&
      destData.Quotes.length >= 1
    ) {
      return (
        <InfoWindow
          options={{
            maxWidth: 400,
            pixelOffset: new window.google.maps.Size(-10, -50),
          }}
          position={{ lat: selected.lat, lng: selected.lng }}
        >
          <div className="infobox_wrapper">
            <button
              className="close_btn"
              onClick={() => {
                setSelected(null);
              }}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="infobox_singlebox">
              <div className="infobox_bar start">START</div>
              <div className="infobox_singlebox--content">
                <div className="infobox_singlebox--content-info">
                  <p className="infobox_text">
                    <strong>To:</strong> {chosenDestPlace}
                  </p>
                  <p className="infobox_text">
                    <strong>From:</strong> {chosenStartPlace}
                  </p>
                  <p className="infobox_text">
                    <strong>Lowest price: </strong>
                    {startData.Quotes[0].MinPrice}$
                  </p>
                  <p className="infobox_text">
                    <strong>Carrier:</strong> {startData.Carriers[0].Name}
                  </p>
                  <p className="infobox_text">
                    <strong>Departure date: </strong>
                    {startDate ? startDate.format("YYYY-MM-DD") : null}
                  </p>
                </div>
                <div className="infobox_singlebox-sidebar start">
                  <i className="fas fa-plane-departure start-icon"></i>
                </div>
              </div>
            </div>
            <div className="infobox_singlebox">
              <div className="infobox_bar return">RETURN</div>
              <div className="infobox_singlebox--content">
                <div className="infobox_singlebox--content-info">
                  <p className="infobox_text">
                    <strong>To:</strong> {chosenStartPlace}
                  </p>
                  <p className="infobox_text">
                    <strong>From:</strong> {chosenDestPlace}
                  </p>
                  <p className="infobox_text">
                    <strong>Lowest price:</strong> {destData.Quotes[0].MinPrice}
                    $
                  </p>
                  <p className="infobox_text">
                    <strong>Carrier:</strong> {destData.Carriers[0].Name}
                  </p>
                  <p className="infobox_text">
                    <strong>Departure date: </strong>
                    {endDate ? endDate.format("YYYY-MM-DD") : null}
                  </p>
                </div>
                <div className="infobox_singlebox-sidebar return">
                  <i className="fas fa-plane-departure return-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </InfoWindow>
      );
    } else return null;
  };
  return InfoWindowPopUp();
};
