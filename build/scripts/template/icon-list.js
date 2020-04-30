export default function iconList(componentNameList) {
  const usingCode = componentNameList
    .map(componentName => {
      const icon =
        componentName === 'NovaIconLoading'
          ? `<${componentName} spin />`
          : `<${componentName} />`;
      const iconNameWordBreak = componentName
        .split(/(?=[A-Z])/)
        .join('<wbr />');

      return `<li>${icon} <div class="icon-name">${iconNameWordBreak}</div></li>`;
    })
    .join('\n');

  const listCode = componentNameList.join(',');

  return `<!-- GENERATE BY yarn build-icon
DO NOT EDIT IT MANUALLY -->

<template>
  <section class="icon-list">
    <ul>
      ${usingCode}
    </ul>
  </section>
</template>

<script>
import {
  ${listCode}
} from 'nova-vue';

export default {
  components: {
    ${listCode},
  }
};
</script>

<style scoped>
.icon-list ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 10px 0;
}

.icon-list li {
  list-style: none;
  width: 148px;
  height: 100px;
  font-size: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: background-color 100ms, color 100ms;
}

.icon-list li:hover {
  background-color: #2299ee;
  color: #fff;
}

.icon-list .icon-name {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  line-height: 14px;
  min-height: 28px;
}
</style>
`;
}
