<template>
  <div class="box">
    <NovaAutoComplete
      v-model="value"
      :dropdown-match-select-width="400"
      :fetch-suggestions="querySearch"
      dropdown-class="certain-category-search-dropdown"
      focus-search
      placeholder="Input element tag"
      @select="onSelect"
    >
      <template v-slot:groupLabel="{ group }">
        <div class="label">
          {{ group.type }}
          <a class="more" :href="getHref(group.type)" target="_blank">
            More
          </a>
        </div>
      </template>
      <template v-slot="{ item }">
        <div class="item">
          <span class="element">{{ item.element }}</span>
          <span class="description">{{ item.description }}</span>
        </div>
      </template>
    </NovaAutoComplete>
  </div>
</template>

<script>
import NovaAutoComplete from '@/components/auto-complete/NovaAutoComplete';
import htmlData from '@/views/data/html.json';

export default {
  components: {
    NovaAutoComplete
  },
  data() {
    return {
      value: ''
    };
  },
  methods: {
    querySearch(searchText, setResult) {
      setResult(
        htmlData
          .map(group => {
            return {
              type: group.type,
              children: group.children
                .filter(item => {
                  return item.element.indexOf(searchText.toLowerCase()) !== -1;
                })
                .map(item => {
                  return {
                    value: item.element,
                    ...item
                  };
                })
            };
          })
          .filter(group => {
            return group.children.length;
          })
      );
    },
    onSelect(value, item) {
      console.log(value, item);
    },
    getHref(type) {
      const hash = type.replace(/ /g, '_');
      return `https://developer.mozilla.org/en-US/docs/Web/HTML/Element#${hash}`;
    }
  }
};
</script>

<style lang="less">
.certain-category-search-dropdown .nova-auto-complete-label {
  opacity: 1;
}
</style>

<style scoped lang="less">
@import '../../../styles/var';

.label {
  color: #999;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}

.label a {
  color: #f90;
}

.item {
  display: flex;
  justify-content: space-between;
}

.element {
  width: 100px;
}

.description {
  width: 250px;
  font-size: 12px;
}
</style>
