# my-pro

## 项目初始化说明

本项目使用 Vite + Vue3 + Pinia + Axios + Vue Router 技术栈，使用 pnpm 作为包管理器。

### 初始化步骤

1. 克隆项目
2. 安装依赖：`pnpm install`
3. 启动开发服务器：`pnpm dev`

## 项目结构

```text
my-pro/
├── .husky/            # Git 钩子配置
├── .vscode/           # VS Code 配置
├── public/            # 静态资源
├── src/
│   ├── api/           # API 配置
│   ├── assets/        # 静态资源
│   ├── components/    # 组件
│   ├── composables/   # 组合式函数
│   ├── constants/     # 常量
│   ├── plugins/       # 插件
│   ├── router/        # 路由配置
│   ├── stores/        # Pinia 状态管理
│   ├── styles/        # 样式文件
│   ├── utils/         # 工具函数
│   ├── views/         # 页面视图
│   ├── App.vue        # 根组件
│   ├── main.js        # 入口文件
│   └── style.css      # 全局样式
├── .gitignore
├── README.md
├── eslint.config.js   # ESLint 配置
├── index.html
├── package.json
├── pnpm-lock.yaml
└── vite.config.js     # Vite 配置
```

## 技术栈

- **前端框架**：Vue 3
- **构建工具**：Vite
- **状态管理**：Pinia
- **HTTP 客户端**：Axios
- **路由**：Vue Router
- **样式**：SCSS
- **代码规范**：ESLint (@antfu/eslint-config)
- **提交规范**：Commitlint + Husky

## 核心功能

1. **自动注册组件**：在 `src/components` 目录下创建的组件会自动注册到应用中
2. **状态管理**：使用 Pinia 进行状态管理
3. **路由管理**：使用 Vue Router 进行路由管理
4. **API 调用**：使用 Axios 进行 HTTP 请求
5. **代码规范**：使用 ESLint 确保代码质量
6. **提交规范**：使用 Commitlint + Husky 确保提交消息符合规范

## 常用命令

| 命令            | 描述                       |
| --------------- | -------------------------- |
| `pnpm dev`      | 启动开发服务器             |
| `pnpm build`    | 构建生产版本               |
| `pnpm preview`  | 预览生产构建               |
| `pnpm lint`     | 运行 ESLint 检查           |
| `pnpm lint:fix` | 运行 ESLint 检查并自动修复 |
| `pnpm prepare`  | 初始化 Husky 钩子          |

## 代码规范

项目使用 @antfu/eslint-config 配置，包含以下规则：

- Vue 相关规则
- 代码风格规则
- JSONC、YAML、Markdown 文件规则

## 提交规范

项目使用 Conventional Commits 规范，通过 Commitlint + Husky 进行校验。

### 提交消息格式

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

其中 type 可以是：

- feat: 新功能
- fix: 修复 bug
- docs: 文档更新
- style: 代码风格调整
- refactor: 代码重构
- test: 测试相关
- chore: 构建或依赖更新

## 开发指南

### 组件开发

1. 在 `src/components` 目录下创建组件文件夹（PascalCase 命名）
2. 在文件夹中创建 `index.vue` 文件
3. 组件会自动注册到应用中，无需手动导入

### 状态管理

1. 在 `src/stores` 目录下创建 store 文件
2. 使用 `defineStore` 定义状态管理

### 路由配置

1. 在 `src/views` 目录下创建页面组件
2. 在 `src/router/index.js` 中配置路由

### API 调用

1. 在 `src/api/axios.js` 中配置 API 实例
2. 可以在该文件中添加拦截器和其他配置
