<p align="center">
<img width="150" src="http://oss.em2046.com/nova-vue/nova-logo.svg" alt="Nova Logo">
</p>

<h1 align="center">Nova Vue</h1>

<div align="center">

一套企业级 Vue 组件库。

</div>

## ✨ 特性

- 🏢 提炼自企业级前台产品的交互语言和视觉风格。
- 🗃️ 开箱即用的高质量 Vue 组件。
- 🌐 国际化语言支持。
- 📐 深入每个细节的样式定制能力。

## 💻 支持环境

- 现代浏览器和 IE9 及以上。
- 支持服务端渲染。

| IE / Edge             | Firefox         | Chrome          | Safari          | iOS Safari      |
| --------------------- | --------------- | --------------- | --------------- | --------------- |
| IE9, IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 🛠️ 安装

```bash
$ yarn add nova-vue
```

```bash
$ npm install nova-vue --save
```

## 🧭 示例

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

### 🍃 按需加载

参考 [按需加载文档](http://nova-vue.em2046.com/#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD) 。

## 🌐 国际化

参考 [国际化文档](http://nova-vue.em2046.com/i18n) 。

## 🔗 链接

- [首页](http://nova-vue.em2046.com/)
- [GitHub](https://github.com/LVMM-PC/nova-vue)
- [NPM Package](https://www.npmjs.com/package/nova-vue)

## 👨‍💻 本地开发

克隆到本地开发：

```bash
$ git clone https://github.com/LVMM-PC/nova-vue.git
$ cd nova-vue
$ yarn install
$ yarn serve
```

打开浏览器访问 http://localhost:8080 。
