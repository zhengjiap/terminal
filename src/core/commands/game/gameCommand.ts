import { defineAsyncComponent } from "vue";
import ComponentOutputType = Terminal.ComponentOutputType;
import { CommandType } from "../../command";

/**
 * 摸鱼命令
 * @author yupi
 */
const gameCommand: CommandType = {
  func: "play",
  name: "摸鱼",
  options: [],
  collapsible: true,
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./Game.vue")),
      props: {},
    };
    terminal.writeResult(output);
  },
};

export default gameCommand;
