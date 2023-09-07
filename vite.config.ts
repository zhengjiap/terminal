import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
let defineConfig1 = defineConfig({
  plugins: [
    vue(),
    // 按需加载 ant-design-vue
    Components({
      resolvers: [
        AntDesignVueResolver(),
        // {
        //   importStyle: false, // css in js,禁止了将组件内联的样式导入到组件
        // }
      ],
    }),
  ],
});
export default defineConfig1;
