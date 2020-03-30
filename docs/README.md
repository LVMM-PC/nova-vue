# Nova of Vue

`nova-vue` 是基于 Nova 设计体系的 Vue UI 组件库，主要用于研发企业级前台产品。

<div class="pic-plus">
  <img width="125" :src="$withBase('/nova-logo.svg')" alt="Nova 标志图片。丛蓝色六边形背景上中心处有一个白色的三角形，六边形与三角形边角处均有一些圆角，显得比较平滑。六边形其中一个角指向上方，三角形其中一个角指向右方。六边形与三角形边长差不多相等。" />
  <span class="pic-plus-icon">+</span>
  <img width="125" :src="$withBase('/vue-logo.png')" alt="Vue 标志图片。薄荷色的V字形状与木炭色的V字形状重叠。或者可以说是薄荷色的颠倒三角形，上方中央覆盖一个木炭色的颠倒三角形，最上方中央覆盖白色颠倒三角形，三个三角形顶部边在同一条直线上。三个三角形边长之比约为1比3比5。" />
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
