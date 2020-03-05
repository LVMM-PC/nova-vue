# Radio 单选框

单选框。

## 何时使用

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

## 代码演示

### 基本

最简单的用法。

<demo-radio-basic/>

<<< @/docs/.vuepress/components/demo/radio/basic.vue

### 不可用

Radio 不可用。

<demo-radio-disabled/>

<<< @/docs/.vuepress/components/demo/radio/disabled.vue

### 单选组合

一组互斥的 Radio 配合使用。

<demo-radio-group/>

<<< @/docs/.vuepress/components/demo/radio/group.vue

### RadioGroup 垂直

垂直的 RadioGroup，配合更多输入框选项。

<demo-radio-group-more/>

<<< @/docs/.vuepress/components/demo/radio/group-more.vue

## API

### Radio props

| 参数              | 说明                              | 类型                        | 默认值 |
| ----------------- | --------------------------------- | --------------------------- | ------ |
| checked / v-model | 指定当前是否选中                  | boolean                     | false  |
| disabled          | 禁用 Radio                        | boolean                     | false  |
| label             | Radio 显示内容                    | string \| number \| boolean | -      |
| value             | 根据 value 进行比较，判断是否选中 | string \| number \| boolean | -      |

### Radio Events

| 事件名称 | 说明                                      | 类型               |
| -------- | ----------------------------------------- | ------------------ |
| change   | 选中 radio 时，调用此函数                 | function\(checked) |
| update   | 不使用 v-model 时，调用此函数更新 checked | function\(checked)   |

### RadioGroup props

| 参数            | 说明                 | 类型                        | 默认值 |
| --------------- | -------------------- | --------------------------- | ------ |
| disabled        | 禁选所有子单选器     | boolean                     | false  |
| value / v-model | 用于设置当前选中的值 | string \| number \| boolean | -      |

### RadioGroup Events

| 事件名称 | 说明                                    | 类型             |
| -------- | --------------------------------------- | ---------------- |
| change   | 选项变化时的回调函数                    | function\(value) |
| update   | 不使用 v-model 时，调用此函数更新 value | function\(value) |
