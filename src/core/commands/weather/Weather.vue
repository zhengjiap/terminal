<template>
  <a-card style="width: 300px">
    <template #title
      ><a href="#"> {{ result.province }} {{ result.city }} </a></template
    >
    <template class="content">
      <div class="left">
        <p>天气：{{ result.weather }}</p>
        <p>温度：{{ result.temperature }}</p>
        <p>风力：{{ result.windpower }}</p>
      </div>
      <div class="right">
        <p>湿度：{{ result.humidity }}</p>
        <p>风向：{{ result.winddirection }}</p>
      </div>
    </template>
    <p>时间：{{ result.reporttime }}</p>
  </a-card>
</template>
<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import { onMounted } from "vue";
import { getWeather } from "./weatherApi";

interface WeatherProps {
  name: string;
}
const props = withDefaults(defineProps<WeatherProps>(), {});
const { name } = toRefs(props);
const errorHint = ref("");
let result = ref({});
onMounted(async () => {
  const res: any = await getWeather(name.value);
  if (res == null) {
    return;
  } else {
    result.value = res.data.cityName;
    console.log(result);
  }
  // const province = result.province;
});
</script>
<style scoped>
.content {
  display: flex;
  justify-content: space-around;
}
</style>
