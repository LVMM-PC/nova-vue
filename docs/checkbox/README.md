# Checkbox 多选框

多选框。

## 何时使用

- 在一组可选项中进行多项选择时；
- 单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 代码演示

### 基本

简单的 checkbox。

<demo-checkbox-basic/>

<<< @/docs/.vuepress/components/demo/checkbox/basic.vue

### 不可用

checkbox 不可用。

<demo-checkbox-disabled/>

<<< @/docs/.vuepress/components/demo/checkbox/disabled.vue

### 受控的 Checkbox

联动 checkbox。

<demo-checkbox-controller/>

<<< @/docs/.vuepress/components/demo/checkbox/controller.vue

### Checkbox 组

方便的从数组生成 Checkbox 组。

<demo-checkbox-group/>

<<< @/docs/.vuepress/components/demo/checkbox/group.vue

## API

### Checkbox props

| 参数              | 说明                              | 类型                        | 默认值 |
| ----------------- | --------------------------------- | --------------------------- | ------ |
| checked / v-model | 指定当前是否选中                  | boolean                     | false  |
| disabled          | 失效状态                          | boolean                     | false  |
| label             | Checkbox 显示内容                 | string \| number \| boolean | -      |
| value             | 根据 value 进行比较，判断是否选中 | string \| number \| boolean | -      |

### Checkbox Events

| 事件名称 | 说明                                      | 类型               |
| -------- | ----------------------------------------- | ------------------ |
| change   | 变化时回调函数                            | function\(checked) |
| update   | 不使用 v-model 时，调用此函数更新 checked | function\(checked) |

### CheckboxGroup props

| 参数            | 说明           | 类型                             | 默认值 |
| --------------- | -------------- | -------------------------------- | ------ |
| disabled        | 整组失效       | boolean                          | false  |
| value / v-model | 指定选中的选项 | (string \| number \| boolean)\[] | \[]    |

### CheckboxGroup Events

| 事件名称 | 说明                                    | 类型             |
| -------- | --------------------------------------- | ---------------- |
| change   | 变化时回调函数                          | function\(value) |
| update   | 不使用 v-model 时，调用此函数更新 value | function\(value) |
