import React, { useState, useEffect } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./Search.scss";

export const AutoComplete = ({
  address,
  setAddress,
  setCoordinates,
  placeholder,
  customClass,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) return;

    fetch("https://country.register.gov.uk/records.json?page-size=5000")
      .then((res) => res.json())
      .then((countries) => {
        if (active) {
          setOptions(
            Object.keys(countries).map((key) => countries[key].item[0])
          );
        }
      });

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleSelect = (value) => {
    geocodeByAddress(value)
      .then((res) => getLatLng(res[0]))
      .then((res) => {
        setAddress(value);
        setCoordinates(res);
        console.log(res);
      });
  };

  const handleChange = (event, value) => {
    if (value) {
      setAddress(value.name);
      handleSelect(value.name);
    }
  };

  const handleInputChange = (event, value) => {
    setAddress(value);
  };

  return (
    <Autocomplete
      inputValue={address}
      onChange={handleChange}
      onInputChange={handleInputChange}
      className={customClass}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          variant="filled"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
  // return (

  //   // <PlacesAutocomplete
  //   //   value={address}
  //   //   onChange={setAddress}
  //   //   onSelect={handleSelect}
  //   // >
  //   //   {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
  //   //     <div>
  //   //       <input className={customClass} {...getInputProps({ placeholder })} />

  //   //       <div style={{ position: "absolute", zIndex: 9999, width: "100%" }}>
  //   //         {loading ? <div>...loading</div> : null}

  //   //         {suggestions.map((suggestion) => {
  //   //           const style = {
  //   //             backgroundColor: suggestion.active ? "dodgerblue" : "white",
  //   //             color: suggestion.active ? "white" : "black",
  //   //           };

  //   //           return (
  //   //             <div
  //   //               {...getSuggestionItemProps(suggestion, { style })}
  //   //               key={suggestion.index}
  //   //             >
  //   //               {suggestion.description}
  //   //             </div>
  //   //           );
  //   //         })}
  //   //       </div>
  //   //     </div>
  //   //   )}
  //   // </PlacesAutocomplete>
  // );
};
