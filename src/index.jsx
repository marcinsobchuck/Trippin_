import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import React from "react";
import ReactDOM from "react-dom";
import Map from "./Components/Map/Map";

ReactDOM.render(
  <React.StrictMode>
    <Map />
  </React.StrictMode>,
  document.getElementById("root")
);
