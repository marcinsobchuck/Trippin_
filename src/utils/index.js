export const getAirportCode = (location) =>
  location.split(",")[location.split(",").length - 1];
