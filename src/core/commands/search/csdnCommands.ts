import { CommandType } from "../../command";

const csdnCommand: CommandType = {
  func: "csdn",
  name: "csdn搜索",
  alias: ["cs"],
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
  ],
  action(options, terminal) {
    const { _, s, p } = options;
    //你好
    const word = _.length > 0 ? _[0] : "";
    let targetLink = `https://so.csdn.net/so/search?spm=1000.2115.3001.4498&q=${word}&t=&u=`;
    // 搜索图片
    if (s) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};
export default csdnCommand;
