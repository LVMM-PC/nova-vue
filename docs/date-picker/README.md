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

### 日期格式

使用 `format` 属性，可以自定义日期显示格式。

<demo-date-picker-format/>

<<< @/docs/.vuepress/components/demo/date-picker/format.vue

### 禁用

选择框的不可用状态。你也可以通过数组单独禁用 type 为 `range` 的其中一项。

<demo-date-picker-disabled/>

<<< @/docs/.vuepress/components/demo/date-picker/disabled.vue

### 不可选择日期

可用 `disabledDate` 禁止选择部分日期。

<demo-date-picker-disabled-date/>

<<< @/docs/.vuepress/components/demo/date-picker/disabled-date.vue

## API

### props

以下 API 为 type 等于 `date`、`range` 共享的 API。

| 参数         | 说明                                                       | 类型    | 默认值       |
| ------------ | ---------------------------------------------------------- | ------- | ------------ |
| appendToBody | 是否渲染到 body 上                                         | boolean | true         |
| class        | 选择器 className                                           | string  | -            |
| format       | 设置日期格式。配置参考 [Day.js](https://day.js.org/zh-CN/) | string  | `YYYY-MM-DD` |
| locale       | 国际化配置                                                 | object  |              |
| dropdownClass | 额外的弹出日历 className                                   | string  | -            |
| type         | 选择器的类型，可选 `date` `range`                          | string  | `date`       |

### type:`date` props

| 参数            | 说明           | 类型                            | 默认值 |
| --------------- | -------------- | ------------------------------- | ------ |
| disabled        | 禁用           | boolean                         | false  |
| disabledDate    | 不可选择的日期 | \(currentDate: Date) => boolean | -      |
| placeholder     | 输入框提示文字 | string                          | -      |
| value / v-model | 日期           | Date                            | -      |

### type:`date` Events

| 事件名称 | 说明                                    | 类型                  |
| -------- | --------------------------------------- | --------------------- |
| change   | 时间发生变化的回调                      | function\(date: Date) |
| close    | 关闭日历的回调                          | function\()           |
| open     | 弹出日历的回调                          | function\()           |
| update   | 不使用 v-model 时，调用此函数更新 value | function\(date: Date) |

### type:`date` Methods

| 方法名称 | 说明     | 参数 |
| -------- | -------- | ---- |
| focus\() | 获取焦点 | -    |
| blur\()  | 移除焦点 | -    |

### type:`range` props

| 参数            | 说明           | 类型                                                         | 默认值 |
| --------------- | -------------- | ------------------------------------------------------------ | ------ |
| disabled        | 禁用           | boolean \| \[boolean, boolean]                               | false  |
| disabledDate    | 不可选择的日期 | \(currentDate: Date, rangeName: `start` \| `end`) => boolean | -      |
| placeholder     | 输入框提示文字 | string \| \[string, string]                                  | -      |
| value / v-model | 日期           | \[Date, Date]                                                | -      |

### type:`range` Events

| 事件名称 | 说明                                    | 类型                                                         |
| -------- | --------------------------------------- | ------------------------------------------------------------ |
| change   | 时间发生变化的回调                      | function\(dates: \[Date, Date], rangeName: `start` \| `end`) |
| close    | 关闭日历的回调                          | function\(rangeName: `start` \| `end`)                       |
| open     | 弹出日历的回调                          | function\(rangeName: `start` \| `end`)                       |
| update   | 不使用 v-model 时，调用此函数更新 value | function\(dates: \[Date, Date])                              |

### type:`range` Methods

| 方法名称 | 说明                   | 参数                        |
| -------- | ---------------------- | --------------------------- |
| focus\() | 获取焦点，必须指定目标 | rangeName: `start` \| `end` |
| blur\()  | 移除焦点，必须指定目标 | rangeName: `start` \| `end` |
