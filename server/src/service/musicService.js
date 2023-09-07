const { searchMusics } = require("../thirdpart/neteaseMusicApi");

/**
 * 获取天气情况
 * @param keywords
 */
const fs = require("fs");
async function getSingleMusic(keywords) {
  const songs = await searchMusics(keywords, 1);
  if (songs.length < 1) {
    return null;
  }
  return songs[0];
}

module.exports = {
  getSingleMusic,
};
