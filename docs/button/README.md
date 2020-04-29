# Button 按钮

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

在 Nova Vue 中，我们有 4 种按钮。

- 主按钮：用于主要操作，一个操作区域只能有一个主按钮。
- 次按钮：用于次要操作。
- 默认按钮：用于没有主次之分的操作。
- 链接按钮：用于外链的操作。

以及 3 种状态属性与上面配合使用。

- 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
- 禁用：操作不可用的时候，一般需要文案解释。
- 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。

## 代码演示

### 按钮类型

按钮有 4 种类型：主按钮、次按钮、默认按钮、链接按钮

<demo-button-basic/>

<<< @/docs/.vuepress/components/demo/button/basic.vue

### 图标按钮

当需要在 `Button` 内嵌入 `Icon` 时，直接在 `Button` 内使用 `Icon` 组件。

为单个 `Icon` 添加 `slot="icon"` 属性，会显示为正方形按钮。

<demo-button-icon/>

<<< @/docs/.vuepress/components/demo/button/icon.vue

### 不可用状态

添加 `disabled` 属性即可让按钮处于不可用状态，同时按钮样式也会改变。

<demo-button-disabled/>

<<< @/docs/.vuepress/components/demo/button/disabled.vue

### 加载中状态

添加 `loading` 属性即可让按钮处于加载状态。

<demo-button-loading/>

<<< @/docs/.vuepress/components/demo/button/loading.vue

### 危险按钮

用于危险操作。

<demo-button-danger/>

<<< @/docs/.vuepress/components/demo/button/danger.vue

### 块状按钮

`block`属性将使按钮适合其父宽度。

<demo-button-block/>

<<< @/docs/.vuepress/components/demo/button/block.vue

## API

### props

| 属性     | 说明                                                          | 类型    | 默认值    |
| -------- | ------------------------------------------------------------- | ------- | --------- |
| block    | 将按钮宽度调整为其父宽度的选项                                | boolean | `false`   |
| danger   | 设置危险按钮                                                  | boolean | `false`   |
| disabled | 按钮失效状态                                                  | boolean | `false`   |
| href     | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致         | string  | -         |
| htmlType | 设置 `button` 原生的 `type` 值                                | string  | `button`  |
| loading  | 设置按钮载入状态                                              | boolean | `false`   |
| target   | 相当于 a 链接的 target 属性，href 存在时生效                  | string  | -         |
| type     | 设置按钮类型，可选值为 `primary` `secondary` `default` `link` | string  | `default` |

### Slots

| 参数 | 说明               | 默认值 |
| ---- | ------------------ | ------ |
| icon | 设置按钮的图标组件 | -      |
