import { CommandType } from "../../command";
import { defineAsyncComponent } from "vue"
import ComponentOutputType = Terminal.ComponentOutputType;
const weatherCommand: CommandType = {
  func: "weather",
  name: "天气",
  desc: "搜索天气情况",
  params: [
    {
      key: "name",
      desc: "城市名称",
      required: true,
    },
  ],
  options: [
    {
      key: "name",
      desc: "当前天气",
      alias: ["n"],
      type: "string",
      required: true,
    },
  ],
  collapsible: true,
  action(options, terminal) {
    const { _ } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("参数不足");
      return;
    }
    const name = _[0];
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./Weather.vue")),
      props: {
        name,
      },
    };
    terminal.writeResult(output);
  },
};

export default weatherCommand;
