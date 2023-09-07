<template>
  <Terminal
    ref="terminalRef"
    full-screen
    :user="loginUser"
    :on-submit-command="onSubmitCommand"
  />
</template>

<script setup lang="ts">
import Terminal from "../components/terminal/Terminal.vue";
import { doCommandExecute } from "../core/commandExecutor";
import { onMounted, ref } from "vue";
import { useUserStore } from "../core/commands/user/userStore";
import { storeToRefs } from "pinia";
const terminalRef = ref();
const onSubmitCommand = async (inputText: string) => {
  // 父组件判断inputText是否为空，为空则直接返回，不做任何处理
  if (!inputText) {
    return;
  }
  const terminal = terminalRef.value.terminal;
  await doCommandExecute(inputText, terminal);
};
const userStore = useUserStore();
// 把loginUser变成响应式的
const { loginUser } = storeToRefs(userStore);
onMounted(() => {
  userStore.getAndSetLoginUser();
});
</script>
