# 快速上手

Nova Vue 致力于提供给程序员**愉悦**的开发体验。

> 在开始之前，推荐先学习 [Vue](https://cn.vuejs.org/) 和 [ES2015](http://babeljs.io/docs/learn-es2015/)，并正确安装和配置了 [Node.js](https://nodejs.org/) v8 或以上。本指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 Vue 全家桶的正确开发方式。如果你刚开始学习前端或者 Vue，将 UI 框架作为你的第一步可能不是最好的主意。

---

## 第一个例子

这是一个最简单的 Nova Vue 组件的演示，[在新窗口中打开](http://nova-vue-preview.em2046.com/)。

此演示使用 Vue CLI 工具构建，相关代码见 [nova-vue-preview](https://github.com/em2046/nova-vue-preview)。

<demo-getting-started-first/>

<<< @/docs/.vuepress/components/demo/getting-started/first.vue

## 使用组件

将下面的代码添加到 main.js 中，用 Vue 的方式直接使用 Nova 组件。

<<< @/docs/getting-started/using.js

## 兼容性

Nova Vue 支持所有的现代浏览器和 IE9+。

| IE / Edge             | Firefox         | Chrome          | Safari          | iOS Safari      |
| --------------------- | --------------- | --------------- | --------------- | --------------- |
| IE9, IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

对于 IE 系列浏览器，需要提供相应的 Polyfill 支持，建议使用 [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env) 来解决浏览器兼容问题。
