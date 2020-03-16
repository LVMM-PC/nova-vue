# AutoComplete 自动完成

输入框自动完成功能。

## 何时使用

需要自动完成时。

## 代码演示

### 基本

基本使用，通过 `fetch-suggestions` 设置自动完成的数据源。

<demo-auto-complete-basic/>

<<< @/docs/.vuepress/components/demo/auto-complete/basic.vue

### 自定义选项

可以设置 `Slot` 控制下拉菜单的渲染以实现自定义样式。

<demo-auto-complete-custom/>

<<< @/docs/.vuepress/components/demo/auto-complete/custom.vue

### 不区分大小写

不区分大小写的 AutoComplete 。

<demo-auto-complete-non-case-sensitive/>

<<< @/docs/.vuepress/components/demo/auto-complete/non-case-sensitive.vue

### 查询模式 - 确定类目

可以控制选项按确定类目分组展示。

<demo-auto-complete-certain-category/>

<<< @/docs/.vuepress/components/demo/auto-complete/certain-category.vue

### 查询模式 - 不确定类目

不确定类目示例。

<demo-auto-complete-uncertain-category/>

<<< @/docs/.vuepress/components/demo/auto-complete/uncertain-category.vue

## API

| 参数            | 说明                                 | 类型    | 默认值 |
| --------------- | ------------------------------------ | ------- | ------ |
| appendToBody    | 是否渲染到 body 上                   | boolean | true   |
| autoSelect      | 失去焦点时，是否自动选中当前高亮选项 | boolean | false  |
| disabled        | 是否禁用                             | boolean | false  |
| focusSearch     | 输入框有内容时获得焦点，是否显示选项 | boolean | false  |
| placeholder     | 输入框提示                           | string  | -      |
| popoverClass    | 下拉菜单的 className 属性            | string  | -      |
| value / v-model | 指定当前选中的条目                   | string  | -      |

### Slots

| 参数       | 说明           |
| ---------- | -------------- |
| -          | 选项           |
| empty      | 未找到匹配选项 |
| groupLabel | 当前选项组标签 |

#### default slot props

| 参数 | 说明     | 类型               |
| ---- | -------- | ------------------ |
| item | 当前选项 | { value: string; } |

#### groupLabel slot props

| 参数  | 说明       | 类型                               |
| ----- | ---------- | ---------------------------------- |
| group | 当前选项组 | {label: string; children: {}\[]; } |

### Events

| 事件名称 | 说明                                    | 类型                                       |
| -------- | --------------------------------------- | ------------------------------------------ |
| select   | 选项发生变化的回调                      | function\(value, item: { value: string; }) |
| update   | 不使用 v-model 时，调用此函数更新 value | function\(value)                           |
