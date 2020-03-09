# Alert 警告提示

警告提示，展现需要关注的信息。

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## 代码演示

### 基本

最简单的用法，适用于简短的警告提示。

<demo-alert-basic/>

<<< @/docs/.vuepress/components/demo/alert/basic.vue

### 样式

具有不同样式 `success`、`info`、`help`、`warning`、`error`。

<demo-alert-style/>

<<< @/docs/.vuepress/components/demo/alert/style.vue

### 边框

可以控制边框的显示隐藏。

<demo-alert-border/>

<<< @/docs/.vuepress/components/demo/alert/border.vue

### 布局

即可占用一整行，也可行内显示以便在表单中使用。

<demo-alert-block/>

<<< @/docs/.vuepress/components/demo/alert/block.vue

### 可关闭的警告提示

显示关闭按钮，点击可关闭警告提示。

<demo-alert-closable/>

<<< @/docs/.vuepress/components/demo/alert/closable.vue

### 箭头

位置有 12 个方向。

<demo-alert-arrow/>

<<< @/docs/.vuepress/components/demo/alert/arrow.vue

## API

### props

| 参数         | 说明                                                                                                                                             | 类型    | 默认值 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------ |
| block        | 是否占用一整行                                                                                                                                   | boolean | false  |
| border       | 是否显示边框                                                                                                                                     | boolean | false  |
| closable     | 是否显示关闭按钮                                                                                                                                 | boolean | false  |
| placement    | 箭头位置，可选 `top` `top-start` `top-end` `bottom` `bottom-start` `bottom-end` `left` `left-start` `left-end` `right` `right-start` `right-end` | string  | -      |
| type         | 指定警告提示的样式，可选 `success` `info` `help` `warning` `error`                                                                               | string  | -      |
| visibleArrow | 是否显示箭头                                                                                                                                     | boolean | false  |

### Slots

| 参数 | 说明     |
| ---- | -------- |
| -    | 提示文字 |

### Events

| 事件名称   | 说明                         | 类型        |
| ---------- | ---------------------------- | ----------- |
| afterClose | 关闭动画结束后触发的回调函数 | \() => void |
| close      | 关闭时触发的回调函数         | \() => void |
