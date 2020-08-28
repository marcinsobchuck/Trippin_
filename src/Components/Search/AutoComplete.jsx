import React, { useState, useEffect } from "react";

import "./Search.scss";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { default as MaterialUiAutocomplete } from "@material-ui/lab/Autocomplete";

export const AutoComplete = ({
  address,
  setAddress,
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

  const handleChange = (event, value) => {
    if (value) {
      setAddress(value.name);
    }
  };

  const handleInputChange = (event, value) => {
    setAddress(value);
  };
  return (
    <MaterialUiAutocomplete
      inputValue={address || ""}
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
};
