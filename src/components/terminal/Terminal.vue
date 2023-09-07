<template>
  <div class="terminal-wrapper" :style="wrapperStyle">
    <div ref="terminalRef" class="terminal" :style="mainStyle">
      <a-collapse
        v-model:activeKey="activeKeys"
        :bordered="false"
        expand-icon-position="right"
      >
        <template v-for="(output, index) in outputList" :key="index">
          <!-- 折叠 -->
          <a-collapse-panel
            v-if="output.collapsible"
            :key="index"
            class="terminal-row"
            show-arrow="true"
          >
            <template #header>
              <!--              //local promot是表示当时用户是谁-->
              <span style="user-select: none; margin-right: 10px">
                {{ prompt }}
              </span>
              <span>{{ output.text }}</span>
            </template>
            <div
              v-for="(result, idx) in output.resultList"
              :key="idx"
              class="terminal-row"
            >
              <content-output :output="result" />
            </div>
          </a-collapse-panel>
          <!--          不折叠-->
          <template v-else>
            <!-- 输出命令及结果-->
            <template v-if="output.type === 'command'">
              <div class="terminal-row">
                <span style="user-select: none; margin-right: 10px">{{
                  prompt
                }}</span>
                <span>{{ output.text }}</span>
              </div>
              <div
                v-for="(result, idx) in output?.resultList"
                :key="idx"
                class="terminal-row"
              >
                <content-output :output="result" />
              </div>
            </template>
            <!-- 打印信息 -->
            <template v-else>
              <div class="terminal-row">
                <content-output :output="output" />
              </div>
            </template>
          </template>
        </template>
      </a-collapse>
      <div class="terminal-row">
        <!--  输入内容的地方-->
        <a-input
          ref="commandInputRef"
          v-model:value="inputCommand.text"
          class="command-input"
          :placeholder="inputCommand.placeholder"
          :bordered="false"
          autofocus
          @press-enter="doSubmitCommand"
        >
          <template #addonBefore>
            <span class="command-input-prompt">{{ prompt }}</span>
          </template>
        </a-input>
      </div>
      <div v-if="hint" class="terminal-row" style="color: #bbb">
        hint：{{ hint }}
      </div>
      <div style="margin-bottom: 16px" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, StyleValue, toRefs, ref, watchEffect, onMounted } from "vue";
import { useTerminalConfigStore } from "../../core/commands/terminal/config/terminalConfigStore";
import UserType = User.UserType;
import { LOCAL_USER } from "../../core/commands/user/userConstant";
import OutputType = Terminal.OutputType;
import CommandOutputType = Terminal.CommandOutputType;
import CommandInputType = Terminal.CommandInputType;
import TerminalType = Terminal.TerminalType;
import useHint from "./hint";
import OutputStatusType = Terminal.OutputStatusType;
import TextOutputType = Terminal.TextOutputType;
import { registerShortcuts } from "./shortcuts";
import useHistory from "./history";
const configStore = useTerminalConfigStore();
const terminalRef = ref();
// 命令列表
const commandList = ref<CommandOutputType[]>([]);
const commandInputRef = ref();
// TypeScript 的接口定义,用来定义TerminalProps
interface TerminalProps {
  height?: string | number;
  fullScreen?: boolean;
  user?: UserType;
  // eslint-disable-next-line vue/require-default-prop
  onSubmitCommand?: (inputText: string) => void;
}
// withDefaults默认配置
const props = withDefaults(defineProps<TerminalProps>(), {
  height: "400px",
  fullScreen: false,
  user: LOCAL_USER as any,
});
/**
 * 终端主样式,判断props的fullScreen值，真就返回全屏，false就返回设置的高度
 */
const mainStyle = computed(() => {
  const fullScreenStyle: StyleValue = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  return props.fullScreen
    ? fullScreenStyle
    : {
        height: props.height,
      };
});
/**
 * 终端包装类主样式
 */
const wrapperStyle = computed(() => {
  const { background } = configStore;
  const style = {
    ...mainStyle.value,
  };
  if (background.startsWith("http")) {
    style.background = `url(${background})`;
  } else {
    style.background = background;
  }
  return style;
});
const { user } = toRefs(props);

/**
 * 初始命令
 */
const initCommand: CommandInputType = {
  text: "",
  placeholder: "",
};
/**
 * 待输入的命令
 */
const inputCommand = ref<CommandInputType>({
  ...initCommand,
});
/**
 * 提交命令（回车）
 */
/**
 * 全局记录当前命令，便于写入结果
 */
let currentNewCommand: CommandOutputType;
// 输出列表,outputList存放各种输出类型都可以"command" | "text" | "component"
const outputList = ref<OutputType[]>([]);
const { hint, setHint, debounceSetHint } = useHint();
const activeKeys = ref<number[]>([]);

const doSubmitCommand = async () => {
  setHint(" ");
  let inputText = inputCommand.value.text;
  const newCommand: CommandOutputType = {
    text: inputText,
    type: "command",
    resultList: [],
  };
  // 记录当前命令，便于写入结果
  currentNewCommand = newCommand;
  // 执行命令，子组件向父组件传递用户在终端输入的内容,会调用父组件的函数onSubmitCommand
  await props.onSubmitCommand?.(inputText);
  // 添加输出（为空也要输出换行）
  outputList.value.push(newCommand);
  console.log("outputList" + outputList.value);
  // 不为空字符串才算是有效命令
  if (inputText) {
    commandList.value.push(newCommand);
    // 重置当前要查看的命令位置
    commandHistoryPos.value = commandList.value.length;
  }
  inputCommand.value = { ...initCommand };
  // 默认展开折叠面板
  activeKeys.value.push(outputList.value.length - 1);
  // 自动滚到底部
  setTimeout(() => {
    //这里的terminalRef指的是第二个div
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
  }, 50);
};
/**
 * 输入提示符
 */
const prompt = computed(() => {
  return `[${user.value?.username}]$`;
});
// 输入框内容改变时，触发输入提示
watchEffect(() => {
  debounceSetHint(inputCommand.value.text);
});
/**
 * 输入框聚焦
 */
const focusInput = () => {
  commandInputRef.value.focus();
};

/**
 * 写命令文本结果
 * @param text
 * @param status
 */
const writeTextResult = (text: string, status?: OutputStatusType) => {
  const newOutput: TextOutputType = {
    text,
    type: "text",
    status,
  };
  currentNewCommand.resultList.push(newOutput);
};
//写出文本的错误结果
const writeTextErrorResult = (text: string) => {
  writeTextResult(text, "error");
};
/**
 * 写结果
 * @param output
 */
const writeResult = (output: OutputType) => {
  currentNewCommand.resultList.push(output);
};
const writeTextOutput = (text: string, status?: OutputStatusType) => {
  const newOutput: TextOutputType = {
    text,
    type: "text",
    status,
  };
  outputList.value.push(newOutput);
};
/**
 * 写文本成功状态结果
 * @param text
 */
const writeTextSuccessResult = (text: string) => {
  writeTextResult(text, "success");
};
/**
 * 清空所有输出
 */
const clear = () => {
  outputList.value = [];
};
/**
 * 折叠 / 展开所有块
 */
const toggleAllCollapse = () => {
  // 展开
  if (activeKeys.value.length === 0) {
    activeKeys.value = outputList.value.map((_, index) => {
      return index;
    });
  } else {
    // 折叠
    activeKeys.value = [];
  }
};
const {
  commandHistoryPos,
  showPrevCommand,
  showNextCommand,
  listCommandHistory,
} = useHistory(commandList.value, inputCommand);
// 操作终端的对象
const terminal: TerminalType = {
  writeTextResult,
  writeTextErrorResult,
  writeTextSuccessResult,
  writeResult,
  writeTextOutput,
  // writeOutput,
  clear,
  focusInput,
  doSubmitCommand,
  showNextCommand,
  showPrevCommand,
  listCommandHistory,
  toggleAllCollapse,
  // setCommandCollapsible,
};
onMounted(() => {
  //实现快捷键功能
  registerShortcuts(terminal);
  terminal.writeTextOutput(
    `Welcome to YEYE's terminal project`
  );
  terminal.writeTextOutput("<br/>");
});

defineExpose({
  terminal,
});
</script>
<style scoped>
.terminal-wrapper {
  background: black;
}

.terminal {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  overflow: scroll;
}

.terminal::-webkit-scrollbar {
  display: none;
}

.terminal span {
  font-size: 16px;
}

.terminal
  :deep(
    .ant-collapse-icon-position-right
      > .ant-collapse-item
      > .ant-collapse-header
  ) {
  color: white;
  padding: 0;
}

.terminal :deep(.ant-collapse) {
  background: none;
}

.terminal :deep(.ant-collapse-borderless > .ant-collapse-item) {
  border: none;
}

.terminal :deep(.ant-collapse-content > .ant-collapse-content-box) {
  padding: 0;
}

.command-input {
  caret-color: white;
}

.command-input :deep(input) {
  color: white !important;
  font-size: 16px;
  padding: 0 10px;
}

.command-input :deep(.ant-input-group-addon) {
  background: none;
  border: none;
  padding: 0;
}

.command-input-prompt {
  color: white;
  background: transparent;
}

.terminal-row {
  color: white;
  font-size: 16px;
  font-family: courier-new, courier, monospace;
}
</style>
