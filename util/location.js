const axios = require("axios");
require("dotenv").config();
const HttpError = require("../models/http-error");
const API_KEY = process.env.LOCATIONIQ_API_KEY;

const getCoordsForAddress = async (address) => {
  const response = await axios.get(
    `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(
      address
    )}&format=json`
  );

  const data = response.data[0];
  console.log(data);

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    return next(error);
  }

  const coorLat = data.lat;
  const coorLon = data.lon;
  const coordinates = {
    lat: coorLat,
    lng: coorLon,
  };

  return coordinates;
};

module.exports = getCoordsForAddress;
