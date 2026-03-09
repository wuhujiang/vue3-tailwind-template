import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  return {
    plugins: [
      vue(),
      tailwindcss(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dirs: ['src/composables', 'src/stores', 'src/utils'],
        dts: false,
        eslintrc: {
          enabled: false, // ← 建议先关掉，后面需要再开
        },
        vueTemplate: true,
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        dts: false,
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/index.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      sourcemap: command === 'build' ? false : 'inline',
      chunkSizeWarningLimit: 2000, // 默认是500
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
      minify: ['prod', 'pre'].includes(mode) ? 'terser' : 'esbuild',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        // 混淆核心配置
        mangle: {
          toplevel: true, // 全局变量混淆
          // TODO 后期有全局引入的变量，需要添加到reserved中 reserved:['$', 'jQuery', 'Vue']
          module: true, // 模块变量混淆
        },
        // 生成混淆映射文件（可选，调试用，生产环境建议关闭）
        // sourceMap: false,  //默认的
        // 额外混淆配置：移除注释、简化代码
        format: {
          comments: false, // 移除所有注释
        },
      },
    },
  };
});
