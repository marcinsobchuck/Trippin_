import React, { useState, useEffect } from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "react-awesome-button/dist/styles.css";
import "./Search.scss";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import { AutoComplete } from "./AutoComplete";
import { AwesomeButton } from "react-awesome-button";
import { getPlaces } from "../../api";

const today = moment();

const Search = ({
  handleButtonClick,
  start,
  setStart,
  destination,
  setDestination,
  chosenStartPlace,
  setChosenStartPlace,
  chosenDestPlace,
  setChosenDestPlace,
  destPlaces,
  setDestPlaces,
  startPlaces,
  setStartPlaces,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [isFocused, setIsFocused] = useState();

  const isDisabled =
    !start ||
    !destination ||
    !chosenStartPlace ||
    !chosenDestPlace ||
    !startDate ||
    !endDate;

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  const onFocusChange = (isFocused) => {
    setIsFocused(isFocused);
  };

  const handleChangeStart = (event) => {
    setChosenStartPlace(event.target.value);
  };
  const handleChangeDest = (event) => {
    setChosenDestPlace(event.target.value);
  };

  useEffect(() => {
    if (!start) return;

    getPlaces(start)
      .then((response) => response.json())
      .then((res) => {
        const startPlaces = res.Places;
        setStartPlaces(startPlaces);
        return startPlaces;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setStartPlaces, start]);

  useEffect(() => {
    if (!destination) return;

    getPlaces(destination)
      .then((response) => response.json())
      .then((res) => {
        const destPlaces = res.Places;
        setDestPlaces(destPlaces);
        return destPlaces;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setDestPlaces, destination]);

  const destPlacesList = () => {
    if (destPlaces && destination !== "") {
      return (
        <FormControl className="auto_complete" variant="filled">
          <InputLabel>Destination airport</InputLabel>
          <Select value={chosenDestPlace || ""} onChange={handleChangeDest}>
            {destPlaces.map((place) => {
              return (
                <MenuItem
                  key={place.PlaceId}
                  value={`${place.PlaceName}, ${place.CountryName}, ${place.PlaceId}`}
                >
                  <span className="airport_name">{place.PlaceName}</span>,
                  <span className="airport_country">{place.CountryName},</span>
                  <span className="airport_code">{place.PlaceId}</span>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    } else return null;
  };

  const startPlacesList = () => {
    if (startPlaces && start !== "") {
      return (
        <FormControl className="auto_complete" variant="filled">
          <InputLabel>Starting airport</InputLabel>
          <Select value={chosenStartPlace || ""} onChange={handleChangeStart}>
            {startPlaces.map((place) => {
              return (
                <MenuItem
                  key={place.PlaceId}
                  value={`${place.PlaceName}, ${place.CountryName}, ${place.PlaceId}`}
                >
                  <span className="airport_name">{place.PlaceName}</span>,
                  <span className="airport_country">{place.CountryName},</span>
                  <span className="airport_code">{place.PlaceId}</span>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    } else return null;
  };

  return (
    <div className="searchBoxPosition">
      <h1 className="searchBox_title">
        TRIPPIN<i className="fas fa-globe-europe"></i>
      </h1>
      <AutoComplete
        address={start}
        setAddress={setStart}
        placeholder="Start"
        customClass="auto_complete"
      />
      {startPlacesList()}
      <AutoComplete
        address={destination}
        setAddress={setDestination}
        placeholder="Destination"
        customClass="auto_complete"
      />
      {destPlacesList()}
      <DateRangePicker
        startDateId="1"
        endDateId="2"
        onDatesChange={onDatesChange}
        onFocusChange={onFocusChange}
        focusedInput={isFocused}
        startDate={startDate}
        endDate={endDate}
        noBorder
        showClearDates
        daySize={36}
        hideKeyboardShortcutsPanel
        displayFormat="YYYY-MM-DD"
        minDate={today}
        maxDate={moment().add(2, "months").endOf("month")}
      />

      <AwesomeButton
        disabled={isDisabled}
        onPress={handleButtonClick}
        type="primary"
        className="aws-btn"
      >
        Search
      </AwesomeButton>
    </div>
  );
};

export default Search;
