const { searchWeather } = require("../thirdpart/weatherApi");
const fs = require("fs");

/**
 * 获取某个城市德天气
 * @param keywords
 */
async function getSingleCity(keywords) {
  const city = await searchWeather(keywords);
  let result = city.lives[0];
  if (city.length < 1) {
    return null;
  }
  return result;
}

module.exports = {
  getSingleCity,
};
