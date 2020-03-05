# DatePicker 日期选择框

输入或选择日期的控件。

## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## 代码演示

### 基本

最简单的用法，在浮层中可以选择或者输入日期。

<demo-date-picker-basic/>

<<< @/docs/.vuepress/components/demo/date-picker/basic.vue

### 范围选择器

通过设置 `type` 属性，使用范围选择器类型。

<demo-date-picker-range/>

<<< @/docs/.vuepress/components/demo/date-picker/range.vue

### 禁用

选择框的不可用状态。你也可以通过数组单独禁用 RangePicker 的其中一项。

<demo-date-picker-disabled/>

<<< @/docs/.vuepress/components/demo/date-picker/disabled.vue

### 不可选择日期

可用 `disabledDate` 禁止选择部分日期。

<demo-date-picker-disabled-date/>

<<< @/docs/.vuepress/components/demo/date-picker/disabled-date.vue

## API

| 参数            | 说明                              | 类型                           | 默认值 |
| --------------- | --------------------------------- | ------------------------------ | ------ |
| disabled        | 禁用                              | boolean                        | false  |
| disabledDate    | 不可选择的日期                    | (currentDate: Date) => boolean | 无     |
| placeholder     | 输入框提示文字                    | string                         | -      |
| type            | 选择器的类型，可选 `date` `range` | string                         | `date` |
| value / v-model | 日期                              | Date                           | -      |

### Events

| 事件名称 | 说明                                    | 类型                  |
| -------- | --------------------------------------- | --------------------- |
| change   | 时间发生变化的回调                      | function\(date: Date) |
| update   | 不使用 v-model 时，调用此函数更新 value | function\(date: Date) |
