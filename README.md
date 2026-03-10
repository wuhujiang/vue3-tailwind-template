# my-pro

基于 Vite + Vue 3 + Tailwind CSS 4 的前端项目模板，集成了主流工程化工具链，开箱即用。

## 快速开始

```bash
# 克隆项目
git clone <repo-url>

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 技术栈

| 分类 | 技术 | 版本 |
|------|------|------|
| 前端框架 | Vue 3 (Composition API) | ^3.5 |
| 构建工具 | Vite | ^7.3 |
| CSS 框架 | Tailwind CSS | ^4.2 |
| CSS 预处理 | SCSS | - |
| 路由 | Vue Router | ^5.0 |
| 状态管理 | Pinia | ^3.0 |
| HTTP 请求 | Axios / ofetch(V1) | - |
| API Mock | MSW (Mock Service Worker) | ^2.12 |
| 代码规范 | ESLint (@antfu/eslint-config) | - |
| 提交规范 | Commitlint + Husky + lint-staged | - |
| 自动导入 | unplugin-auto-import + unplugin-vue-components | - |

## 项目结构

```text
my-pro/
├── .husky/                  # Git 钩子（commit-msg、pre-commit）
├── .vscode/                 # VS Code 编辑器配置
├── public/
│   └── mockServiceWorker.js # MSW Service Worker 脚本（自动生成，勿修改）
├── src/
│   ├── api/                 # API 请求层
│   │   ├── axios.js         # Axios 实例封装
│   │   ├── ofetch/          # ofetch 实例封装（轻量替代方案）
│   │   │   ├── api.js       # ofetch 实例配置
│   │   │   └── report/      # 业务接口示例
│   │   ├── about/           # 业务接口（axios 版）
│   │   └── test/            # 测试接口（axios 版）
│   ├── assets/              # 静态资源
│   ├── components/          # 公共组件（自动注册）
│   ├── composables/         # 组合式函数（自动导入）
│   ├── constants/           # 常量定义
│   ├── mocks/               # MSW Mock 数据
│   │   ├── browser.js       # MSW 浏览器集成入口
│   │   ├── handlers.js      # Handler 汇总
│   │   └── modules/         # 按业务模块拆分的 mock 数据
│   ├── router/              # 路由配置
│   │   ├── index.js         # 路由实例
│   │   ├── routes.js        # 路由表
│   │   └── guards.js        # 路由守卫
│   ├── stores/              # Pinia 状态管理
│   ├── styles/              # 全局样式
│   │   ├── main.css         # Tailwind 入口 + 自定义工具类
│   │   ├── reset.css        # 样式重置
│   │   ├── index.scss       # SCSS 入口
│   │   └── var.scss         # SCSS 变量
│   ├── utils/               # 工具函数（自动导入）
│   ├── views/               # 页面视图
│   ├── App.vue              # 根组件
│   └── main.js              # 应用入口
├── eslint.config.js         # ESLint 配置
├── vite.config.js           # Vite 配置
├── index.html               # HTML 入口
└── package.json
```

## 核心功能

### 自动导入与自动注册

通过 `unplugin-auto-import` 和 `unplugin-vue-components` 实现：

- **API 自动导入**：`vue`、`vue-router`、`pinia` 的常用 API 无需手动 import
- **目录自动导入**：`src/composables/`、`src/stores/`、`src/utils/` 下的导出会自动可用
- **组件自动注册**：`src/components/` 下的 `.vue` 组件无需手动注册，直接在模板中使用

### API Mock（MSW）

项目集成了 [MSW](https://mswjs.io/)，在开发环境下自动启用 API 拦截，无需后端即可开发调试。

**工作原理**：MSW 通过 Service Worker 在网络层拦截请求，浏览器 Network 面板可正常查看请求/响应。

**文件组织**：

```text
src/mocks/
├── browser.js       # setupWorker 入口
├── handlers.js      # 汇总所有模块的 handlers
└── modules/         # 按业务拆分 mock 数据
    └── report.js    # 示例：报告相关接口
```

**添加新的 mock 接口**：

1. 在 `src/mocks/modules/` 下新建业务模块文件
2. 导出 handler 数组
3. 在 `handlers.js` 中汇总导入

**切换到真实接口**：将 mock 模块中的 `BASE_URL` 替换为真实后端地址，或从 `handlers.js` 中移除对应模块即可。

### 路由

基于 Vue Router，支持路由守卫和懒加载：

- 路由表定义在 `src/router/routes.js`
- 路由守卫定义在 `src/router/guards.js`
- About 页面使用了动态导入实现懒加载

### 状态管理

使用 Pinia，store 文件放在 `src/stores/` 目录下，支持自动导入。

### 构建优化

生产构建（`prod` / `pre` 环境）启用 Terser 压缩：

- 移除 `console` 和 `debugger`
- 全局变量与模块变量混淆
- 移除所有注释
- 静态资源按类型分目录输出

## 常用命令

| 命令 | 描述 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm preview` | 预览生产构建 |
| `pnpm lint` | ESLint 检查 |
| `pnpm lint:fix` | ESLint 检查并自动修复 |

## 代码规范

基于 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 配置：

- Vue 组件块顺序：`<template>` → `<script>` → `<style>`
- 缩进：2 空格
- 引号：单引号
- 分号：使用分号
- 支持 CSS / HTML / SCSS / JSONC / YAML / Markdown 格式化

## 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范，通过 Commitlint + Husky 在提交时自动校验。

```text
<type>[optional scope]: <description>
```

| type | 说明 |
|------|------|
| feat | 新功能 |
| fix | 修复 bug |
| docs | 文档更新 |
| style | 代码风格调整（不影响逻辑） |
| refactor | 代码重构 |
| test | 测试相关 |
| chore | 构建或依赖更新 |
