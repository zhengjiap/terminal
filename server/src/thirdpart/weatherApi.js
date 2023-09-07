const axios = require("axios");
async function searchWeather(city) {
  if (!city) {
    return null;
  }
  const key = "1b0ad594df1d223229757123c4fa677e";
  return await axios({
    method: "get",
    url: "https://restapi.amap.com/v3/weather/weatherInfo",
    params: {
      city,
      key,
    },
  }).then((res) => res.data);
}
module.exports = {
  searchWeather,
};
