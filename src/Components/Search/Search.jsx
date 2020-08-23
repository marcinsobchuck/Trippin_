import React, { useState } from "react";

import { DateRangePicker } from "react-dates";
import moment from "moment";
import { AutoComplete } from "./AutoComplete";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

import "./Search.scss";

const today = moment();

const Search = ({
  setDestCoordinates,
  setStartCoordinates,
  handleButtonClick,
  start,
  setStart,
  destination,
  setDestination,
}) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isFocused, setIsFocused] = useState();

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const onFocusChange = (isFocused) => {
    setIsFocused(isFocused);
  };

  return (
    <>
      <div className="searchBoxPosition">
        <h1>
          TRIPPIN<i className="fas fa-globe-europe"></i>
        </h1>
        <AutoComplete
          address={start}
          setAddress={setStart}
          setCoordinates={setStartCoordinates}
          placeholder="Start"
          customClass="auto_complete"
        />
        <AutoComplete
          address={destination}
          setAddress={setDestination}
          setCoordinates={setDestCoordinates}
          placeholder="Destination"
          customClass="auto_complete"
        />

        <DateRangePicker
          startDateId="1"
          endDateId="2"
          onDatesChange={onDatesChange}
          onFocusChange={onFocusChange}
          focusedInput={isFocused}
          startDate={startDate}
          noBorder
          showClearDates
          endDate={endDate}
          daySize={36}
          hideKeyboardShortcutsPanel
          displayFormat="DD/MM/YYYY"
          minDate={today}
          maxDate={moment().add(2, "months").endOf("month")}
        />
        <AwesomeButton
          onPress={handleButtonClick}
          type="primary"
          className="aws-btn"
        >
          Search
        </AwesomeButton>
      </div>
    </>
  );
};

export default Search;
