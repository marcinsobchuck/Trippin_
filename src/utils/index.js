export const getAirportCode = (location) => {
  return location.split(", ")[location.split(", ").length - 1];
};
