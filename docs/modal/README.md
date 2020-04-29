# Modal 对话框

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用 `NovaConfirm.confirm()` 等语法糖方法。

## 代码演示

### 基本

第一个对话框。

<demo-modal-basic/>

<<< @/docs/.vuepress/components/demo/modal/basic.vue

### 异步关闭

点击确定后异步关闭对话框，例如提交表单。

<demo-modal-async/>

<<< @/docs/.vuepress/components/demo/modal/async.vue

### 自定义页脚

更复杂的例子，自定义了页脚的按钮，点击提交后进入 loading 状态，完成后关闭。

不需要默认确定取消按钮时，你可以把 `footer` 设为 `null`。

<demo-modal-footer/>

<<< @/docs/.vuepress/components/demo/modal/footer.vue

### 确认对话框

使用 `confirm()` 可以快捷地弹出确认框。

<demo-modal-confirm/>

<<< @/docs/.vuepress/components/demo/modal/confirm.vue

### 异步确认对话框

使用 `confirm()` 可以快捷地弹出确认框。onCancel/onOk 返回 promise 可以延迟关闭。

<demo-modal-confirm-promise/>

<<< @/docs/.vuepress/components/demo/modal/confirm-promise.vue

### 信息提示

各种类型的信息提示，只提供一个按钮用于关闭。

<demo-modal-info/>

<<< @/docs/.vuepress/components/demo/modal/info.vue

### 国际化

设置 `okText` 与 `cancelText` 以自定义按钮文字。

<demo-modal-locale/>

<<< @/docs/.vuepress/components/demo/modal/locale.vue

### 手动更新和移除

手动更新和关闭 `NovaConfirm.method` 方式创建的对话框。

<demo-modal-manual/>

<<< @/docs/.vuepress/components/demo/modal/manual.vue

### 自定义页脚按钮属性

传入 `okButtonProps` 和 `cancelButtonProps` 可分别自定义确定按钮和取消按钮的 props。

<demo-modal-button-props/>

<<< @/docs/.vuepress/components/demo/modal/button-props.vue

## API

### Common props

| 参数              | 说明                 | 类型                  | 默认值      |
| ----------------- | -------------------- | --------------------- | ----------- |
| cancelButtonProps | 取消按钮 props       | object                | -           |
| cancelText        | 取消按钮文字         | string                | `取消`      |
| cancelType        | 取消按钮类型         | string                | -           |
| className         | 对话框的类名         | string\|object\|array | -           |
| confirmLoading    | 确定按钮 loading     | boolean               | false       |
| mask              | 是否展示遮罩         | Boolean               | true        |
| okButtonProps     | 确认按钮 props       | object                | -           |
| okText            | 确认按钮文字         | string                | `确定`      |
| okType            | 确认按钮类型         | string                | `secondary` |
| title             | 标题                 | string                | -           |
| width             | 宽度                 | string\|number        | 400         |
| wrapClass         | 对话框外层容器的类名 | string\|object\|array | -           |

### Modal props

| 参数              | 说明                     | 类型    | 默认值 |
| ----------------- | ------------------------ | ------- | ------ |
| closable          | 是否显示右上角的关闭按钮 | boolean | true   |
| maskClosable      | 点击蒙层是否允许关闭     | boolean | true   |
| visible / v-model | 对话框是否可见           | boolean | false  |

### Modal Slots

| 参数   | 说明                                            | 默认值       |
| ------ | ----------------------------------------------- | ------------ |
| -      | 内容                                            | -            |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 null | 确定取消按钮 |

### Modal Events

| 事件名称 | 说明                                      | 类型             |
| -------- | ----------------------------------------- | ---------------- |
| cancel   | 点击遮罩层或右上角叉或取消按钮的回调      | function\(e)     |
| ok       | 点击确定回调                              | function\(e)     |
| update   | 不使用 v-model 时，调用此函数更新 visible | function\(value) |

### NovaConfirm.method()

包括

- `NovaConfirm.confirm`
- `NovaConfirm.info`
- `NovaConfirm.success`
- `NovaConfirm.error`
- `NovaConfirm.warning`

以上均为一个函数，参数为 object，除公共参数外其它参数如下：

### NovaConfirm props

| 参数         | 说明                                             | 类型          | 默认值             |
| ------------ | ------------------------------------------------ | ------------- | ------------------ |
| content      | 内容                                             | string\|vNode | -                  |
| icon         | 自定义图标                                       | vNode         | `<NovaIconHelp />` |
| maskClosable | 点击蒙层是否允许关闭                             | boolean       | false              |
| onCancel     | 取消回调，返回 promise 时 resolve 后自动关闭     | function      | -                  |
| onOk         | 点击确定回调，返回 promise 时 resolve 后自动关闭 | function      | -                  |

以上函数调用后，会返回一个引用，可以通过该引用更新和关闭弹窗。

```javascript
const confirmInstance = NovaConfirm.info();

confirmInstance.update({
  title: '修改的标题',
  content: '修改的内容'
});

confirmInstance.destroy();
```
