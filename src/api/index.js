export const getQuote = (start, dest, outbound) => {
  return fetch(
    `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${start}/${dest}/${outbound}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
      },
    }
  );
};
