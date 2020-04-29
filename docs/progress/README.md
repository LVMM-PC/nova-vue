# Progress 进度条

展示操作的当前进度。

## 何时使用

在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

- 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过 2 秒时；
- 当需要显示一个操作完成的百分比时。

## 代码演示

### 进度条

标准的进度条。

<demo-progress-line/>

<<< @/docs/.vuepress/components/demo/progress/line.vue

### 进度圈

圈形的进度。

<demo-progress-circle/>

<<< @/docs/.vuepress/components/demo/progress/circle.vue

### 小型进度条

适合放在较狭窄的区域内。

<demo-progress-line-mini/>

<<< @/docs/.vuepress/components/demo/progress/line-mini.vue

### 小型进度圈

小一号的圈形进度。

<demo-progress-circle-mini/>

<<< @/docs/.vuepress/components/demo/progress/circle-mini.vue

### 进度条动态展示

会动的进度条才是好进度条。

<demo-progress-line-dynamic/>

<<< @/docs/.vuepress/components/demo/progress/line-dynamic.vue

### 进度圈动态展示

会动的进度圈才是好进度圈。

<demo-progress-circle-dynamic/>

<<< @/docs/.vuepress/components/demo/progress/circle-dynamic.vue

### 圆角/方角边缘

通过设定 `strokeLinecap="butt|round|square"` 可以调整进度圈边缘的形状。

<demo-progress-linecap/>

<<< @/docs/.vuepress/components/demo/progress/linecap.vue

## API

各类型共用的属性。

| 属性        | 说明                       | 类型    | 默认值 |
| ----------- | -------------------------- | ------- | ------ |
| percent     | 百分比，区间为 (0-1)       | number  | 0      |
| showInfo    | 是否显示进度数值           | boolean | true   |
| strokeWidth | 进度条线的宽度，单位 px    | number  | 10     |
| type        | 类型，可选 `line` `circle` | string  | `line` |

### `type="line"`

| 属性   | 说明                          | 类型   | 默认值   |
| ------ | ----------------------------- | ------ | -------- |
| status | 状态，可选：`normal` `active` | string | `normal` |

### `type="circle"`

| 属性          | 说明                    | 类型                          | 默认值 |
| ------------- | ----------------------- | ----------------------------- | ------ |
| strokeLinecap | 进度圈边缘形状          | `butt` \| `round` \| `square` | `butt` |
| width         | 进度圈画布宽度，单位 px | number                        | 100    |
