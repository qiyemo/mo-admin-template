// vite.config.ts
import { defineConfig } from "file:///E:/momei/open-source/my-project/mo-admin/mo-admin-template/node_modules/.pnpm/vite@4.3.8_@types+node@18.16.15/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/momei/open-source/my-project/mo-admin/mo-admin-template/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.3.8+vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import eslintPlugin from "file:///E:/momei/open-source/my-project/mo-admin/mo-admin-template/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.41.0+vite@4.3.8/node_modules/vite-plugin-eslint/dist/index.mjs";
import Components from "file:///E:/momei/open-source/my-project/mo-admin/mo-admin-template/node_modules/.pnpm/unplugin-vue-components@0.23.0_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///E:/momei/open-source/my-project/mo-admin/mo-admin-template/node_modules/.pnpm/unplugin-vue-components@0.23.0_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import AutoImport from "file:///E:/momei/open-source/my-project/mo-admin/mo-admin-template/node_modules/.pnpm/unplugin-auto-import@0.13.0_@vueuse+core@9.13.0/node_modules/unplugin-auto-import/dist/vite.js";
var vite_config_default = async ({ mode, command }) => {
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ["vue"],
        dirs: ["./src/utils/global"],
        dts: "./src/auto-imports.d.ts",
        eslintrc: {
          enabled: true
          // <-- this
        }
      }),
      eslintPlugin({
        include: ["src/**/*.ts", "src/**/*.vue", "src/*.ts", "src/*.vue"]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      // 配置路径别名
      alias: {
        "@": "/src"
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxtb21laVxcXFxvcGVuLXNvdXJjZVxcXFxteS1wcm9qZWN0XFxcXG1vLWFkbWluXFxcXG1vLWFkbWluLXRlbXBsYXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxtb21laVxcXFxvcGVuLXNvdXJjZVxcXFxteS1wcm9qZWN0XFxcXG1vLWFkbWluXFxcXG1vLWFkbWluLXRlbXBsYXRlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9tb21laS9vcGVuLXNvdXJjZS9teS1wcm9qZWN0L21vLWFkbWluL21vLWFkbWluLXRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7LypcbiAqIEBBdXRob3I6IHFpeWVcbiAqIEBMYXN0RWRpdG9yczogcWl5ZVxuICogQGRlc2NyaXB0aW9uOiBwYWdlIGRlc2NyaXB0aW9uXG4gKiBARGF0ZTogMjAyMy0wMS0wOSAxMzo1MzozOFxuICogQExhc3RFZGl0VGltZTogMjAyMy0wNS0yOSAxNTo1ODo0M1xuICovXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBlc2xpbnRQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50JztcblxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcblxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jICh7IG1vZGUsIGNvbW1hbmQgfSkgPT4ge1xuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZSddLFxuICAgICAgICBkaXJzOiBbJy4vc3JjL3V0aWxzL2dsb2JhbCddLFxuICAgICAgICBkdHM6ICcuL3NyYy9hdXRvLWltcG9ydHMuZC50cycsXG4gICAgICAgIGVzbGludHJjOiB7XG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgLy8gPC0tIHRoaXNcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgZXNsaW50UGx1Z2luKHtcbiAgICAgICAgaW5jbHVkZTogWydzcmMvKiovKi50cycsICdzcmMvKiovKi52dWUnLCAnc3JjLyoudHMnLCAnc3JjLyoudnVlJ10sXG4gICAgICB9KSxcbiAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAvLyBcdTkxNERcdTdGNkVcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogJy9zcmMnLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBT0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sa0JBQWtCO0FBRXpCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBRXBDLE9BQU8sZ0JBQWdCO0FBRXZCLElBQU8sc0JBQVEsT0FBTyxFQUFFLE1BQU0sUUFBUSxNQUFNO0FBQzFDLFNBQU8sYUFBYTtBQUFBLElBQ2xCLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLFdBQVc7QUFBQSxRQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLFFBQ2pDLFNBQVMsQ0FBQyxLQUFLO0FBQUEsUUFDZixNQUFNLENBQUMsb0JBQW9CO0FBQUEsUUFDM0IsS0FBSztBQUFBLFFBQ0wsVUFBVTtBQUFBLFVBQ1IsU0FBUztBQUFBO0FBQUEsUUFDWDtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsYUFBYTtBQUFBLFFBQ1gsU0FBUyxDQUFDLGVBQWUsZ0JBQWdCLFlBQVksV0FBVztBQUFBLE1BQ2xFLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLE1BQ25DLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUE7QUFBQSxNQUVQLE9BQU87QUFBQSxRQUNMLEtBQUs7QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
