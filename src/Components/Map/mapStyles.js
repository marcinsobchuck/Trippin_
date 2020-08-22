export default [
  {
    featureType: "road",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.province",
    stylers: [
      {
        visibility: "on",
      },
      {
        weight: 1.3,
      },
      {
        color: "#000b29",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        color: "#004b76",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#fff6cb",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#7f7d7a",
      },
      {
        lightness: 10,
      },
      {
        weight: 1.3,
      },
    ],
  },
];
