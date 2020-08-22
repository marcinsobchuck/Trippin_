import React from "react";

import { InfoWindow } from "@react-google-maps/api";

export const InfoWindowBox = ({ selected, setSelected }) => {
  return (
    <InfoWindow
      position={{ lat: selected.lat, lng: selected.lng }}
      onCloseClick={() => {
        setSelected(null);
      }}
    >
      <div>
        <h2>Cena biletu: ileś</h2>
      </div>
    </InfoWindow>
  );
};
