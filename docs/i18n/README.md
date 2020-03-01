# 国际化

为组件提供统一的全局化配置。

## 使用

NovaLocale 使用 Vue 的[依赖注入](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)特性，只需在应用外围包裹一次即可全局生效。

<<< @/docs/.vuepress/components/demo/i18n/basic.vue

### 语言包引入

<<< @/docs/i18n/utils.js

## 代码演示

此处列出 Nova Vue 中需要国际化支持的组件。

<demo-i18n-full/>

<<< @/docs/.vuepress/components/demo/i18n/full.vue

## API

| 参数    | 说明                                                                                                                                  | 类型   | 默认值  |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- |
| locale  | 语言包配置，语言包可到 [nova-vue/src/locales/lang](https://github.com/LVMM-PC/nova-vue/tree/master/src/locales/lang) 目录下寻找       | object | `zhCN`  |
| holiday | 节假日配置，节假日可到 [nova-vue/src/locales/holiday](https://github.com/LVMM-PC/nova-vue/tree/master/src/locales/holiday) 目录下寻找 | object | `china` |
