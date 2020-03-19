<template>
  <NovaAutoComplete
    v-model="value"
    :fetch-suggestions="querySearch"
    focus-search
    placeholder="Input here"
    dropdown-class="certain-category-search-dropdown"
    :dropdown-match-select-width="400"
    @select="onSelect"
  >
    <template v-slot:groupLabel="{ group }">
      <div class="label">
        {{ group.label }}
        <a
          class="more"
          href="https://www.npmjs.com/search?q=nova-vue"
          target="_blank"
          >More</a
        >
      </div>
    </template>
    <template v-slot="{ item }">
      <div class="item">
        <span>{{ item.value }}</span>
        <span>{{ item.count }}</span>
      </div>
    </template>
  </NovaAutoComplete>
</template>

<script>
const options = [
  {
    label: 'Libraries',
    children: [
      { value: 'Nova Vue', count: 10000 },
      { value: 'Nova Vue UI', count: 10600 }
    ]
  },
  {
    label: 'Solutions',
    children: [
      { value: 'Nova Vue FAQ', count: 60100 },
      { value: 'Nova Vue UI FAQ', count: 30100 }
    ]
  },
  {
    label: 'Articles',
    children: [{ value: 'Nova Design language', count: 100000 }]
  }
];

export default {
  data() {
    return {
      value: ''
    };
  },
  methods: {
    querySearch(searchText, setResult) {
      setResult(options);
    },
    onSelect(value, item) {
      console.log(value, item);
    }
  }
};
</script>

<style>
.certain-category-search-dropdown .nova-auto-complete-label {
  opacity: 1;
}
</style>

<style scoped>
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
</style>
