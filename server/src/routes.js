const routes = [
  {
    path: "/user/register",
    handler: require("./controller/userController").userRegisterApi,
  },
  {
    path: "/user/login",
    handler: require("./controller/userController").userLoginApi,
  },
  {
    path: "/user/logout",
    handler: require("./controller/userController").userLogoutApi,
  },
  {
    path: "/user/current",
    handler: require("./controller/userController").getLoginUserApi,
  },
  {
    path: "/music/get",
    handler: require("./controller/musicController").getSingleMusicApi,
  },
  {
    // 处理来自客户端的请求，可以将 path 视为客户端请求的目标路径，服务器会根据这个路径来确定使用哪个处理程序来处理请求。
    path: "/fanyi/translate",
    handler: require("./controller/fanyiController").translateApi,
  },
  {
    path: "/background/get/random",
    handler: require("./controller/backgroundController")
      .getRandomBackgroundApi,
  },
  {
    path: "/weather/get/weather",
    handler: require("./controller/weatherController").getWeatherApi,
  },
];

module.exports = routes;
