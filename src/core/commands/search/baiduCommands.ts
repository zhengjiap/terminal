import { CommandType } from "../../command";

const baiduCommand: CommandType = {
  func: "baidu",
  name: "百度搜索",
  alias: ["bd"],
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      key: "self",
      desc: "是否当前页面打开",
      alias: ["s"],
      type: "boolean",
      defaultValue: false,
    },
    {
      key: "picture",
      desc: "是否搜索图片",
      alias: ["p"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  action(options, terminal) {
    const { _, s, p } = options;
    //你好
    const word = _.length > 0 ? _[0] : "";
    let targetLink = `https://www.baidu.com/s?wd=${word}`;
    // 搜索图片
    if (p) {
      targetLink = `https://image.baidu.com/search/index?tn=baiduimage&word=${word}`;
    }
    if (s) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};
export default baiduCommand;
