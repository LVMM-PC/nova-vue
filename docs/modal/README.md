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

//TODO
