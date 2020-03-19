# Nova of Vue

`nova-vue` 是基于 Nova 设计体系的 Vue UI 组件库，主要用于研发企业级前台产品。

<div class="pic-plus">
  <img width="125" src="./assets/nova-logo.svg"/>
  <span class="pic-plus-icon"></span>
  <img width="150" src="./assets/vue-logo.png"/>
</div>

---

## ✨ 特性

- 🏢 提炼自企业级前台产品的交互语言和视觉风格。
- 🗃️ 开箱即用的高质量 Vue 组件。
- 🌐 国际化语言支持。
- 📐 深入每个细节的样式定制能力。

## 支持环境

- 现代浏览器和 IE9 及以上。
- 支持服务端渲染。

## 安装

### 使用 yarn 或 npm 安装

**我们推荐使用 yarn 或 npm 的方式进行开发**，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
$ yarn add nova-vue
```

```bash
$ npm install nova-vue --save
```

如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm)。

## 示例

```vue
<template>
  <NovaDatePicker />
</template>

<script>
import { NovaDatePicker } from 'nova-vue';

export default {
  components: {
    NovaDatePicker
  }
};
</script>
```

引入样式

```js
import 'nova-vue/dist/nova.css';
```

### 按需加载

> Nova Vue 默认支持基于 ES module 的 tree shaking，无需插件也会有按需加载的效果。

使用 Vue CLI 创建一个项目，或使用 Webpack 构建项目。然后引入需要使用的组件。

```js
import { NovaAlert } from 'nova-vue';
```

引入单个组件的样式

```js
import 'nova-vue/dist/css/alert.css';
```

## 链接

- [首页](http://nova-vue.em2046.com/)
- [GitHub](https://github.com/LVMM-PC/nova-vue)
- [NPM Package](https://www.npmjs.com/package/nova-vue)

## 谁在使用

- [驴妈妈旅游](http://www.lvmama.com/)
