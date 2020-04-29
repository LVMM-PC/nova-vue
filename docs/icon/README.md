# Icon 图标

语义化的矢量图形。

## 图标列表

<site-icon-list/>

## 代码演示

### 基本用法

通过 `nova-vue` 引用 Icon 组件，可以通过设置 `spin` 属性来实现动画旋转效果。

<demo-icon-basic/>

<<< @/docs/.vuepress/components/demo/icon/basic.vue

## API

| 参数  | 说明                                       | 类型          | 默认值 |
| ----- | ------------------------------------------ | ------------- | ------ |
| style | 设置图标的样式，例如 `fontSize` 和 `color` | CSSProperties | -      |
| spin  | 是否有旋转动画                             | boolean       | false  |
