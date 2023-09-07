import myAxios from "../../../plugins/myAxios";

/**
 * 搜索单条音乐
 * @param keywords
 */
export const getWeather = async (city: string) => {
  if (!city) {
    return null;
  }
  return await myAxios.post("/weather/get/weather", { city });
};
