# Calendar 日历

按照日历形式展示数据的容器。

## 何时使用

当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持月份切换。

## 代码演示

### 基本

一个通用的日历面板，支持月份切换。

<demo-calendar-basic/>

<<< @/docs/.vuepress/components/demo/calendar/basic.vue

### 通知事项日历

一个复杂的应用示例，用 `dateCellRender` 作用域插槽来自定义需要渲染的数据。

<demo-calendar-notice/>

<<< @/docs/.vuepress/components/demo/calendar/notice.vue

## API

### props

| 参数         | 说明           | 类型                           | 默认值      |
| ------------ | -------------- | ------------------------------ | ----------- |
| disabledDate | 不可选择的日期 | (currentDate: Date) => boolean | -           |
| locale       | 国际化配置     | object                         | -           |
| value        | 展示日期       | Date                           | Date.now\() |

### Slots

| 参数           | 说明                                     |
| -------------- | ---------------------------------------- |
| dateCellRender | 自定义渲染日期单元格，返回内容覆盖单元格 |

#### dateCellRender slot props

| 参数      | 说明                   | 类型   |
| --------- | ---------------------- | ------ |
| date      | 单元格日期             | Date   |
| index     | 单元格序号             | number |
| panelDate | 单元格所在月份的第一天 | Date   |

### Events

| 事件名称    | 说明             | 类型                 |
| ----------- | ---------------- | -------------------- |
| panelChange | 日期面板变化回调 | function(date: Date) |
