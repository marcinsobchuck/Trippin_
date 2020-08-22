import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import "./Search.scss";

export const AutoComplete = ({
  address,
  setAddress,
  setCoordinates,
  placeholder,
  customClass,
}) => {
  const handleSelect = (value) => {
    geocodeByAddress(value)
      .then((res) => getLatLng(res[0]))
      .then((res) => {
        setAddress(value);
        setCoordinates(res);
        console.log(res);
      });
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input className={customClass} {...getInputProps({ placeholder })} />

          <div style={{ position: "absolute", zIndex: 9999, width: "100%" }}>
            {loading ? <div>...loading</div> : null}

            {suggestions.map((suggestion, index) => {
              const style = {
                backgroundColor: suggestion.active ? "dodgerblue" : "white",
                color: suggestion.active ? "white" : "black",
              };
              return (
                <div
                  key={index}
                  {...getSuggestionItemProps(suggestion, { style })}
                >
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};
