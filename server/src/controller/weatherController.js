const MyError = require("../exception");
const {
  REQUEST_PARAMS_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
} = require("../exception/errorCode");
const { getSingleCity } = require("../service/weatherService");

async function getWeatherApi(event, req, res) {
  const { city } = event;
  if (!city) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "请输入城市名称");
  }
  const cityName = await getSingleCity(city);
  console.log(cityName);
  if (!cityName) {
    throw new MyError(NOT_FOUND_ERROR_CODE);
  }
  return {
    cityName,
  };
}
module.exports = {
  getWeatherApi,
};
