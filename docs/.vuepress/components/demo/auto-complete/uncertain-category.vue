<template>
  <NovaAutoComplete
    v-model="value"
    :fetch-suggestions="querySearch"
    focus-search
    placeholder="Input here"
    popover-class="uncertain-category-search-dropdown"
    @select="onSelect"
  >
    <template v-slot="{ item }">
      <div class="item">
        <span>
          {{ `Found ${item.query} on ` }}
          <a href="https://www.npmjs.com/search?q=nova-vue" target="_blank">
            {{ item.category }}
          </a>
        </span>
        <span class="result">{{ getRandomInt(100, 201) }} result</span>
      </div>
    </template>
  </NovaAutoComplete>
</template>

<script>
function getRandomInt(low, high) {
  return Math.floor(low + Math.random() * (high - low));
}

export default {
  data() {
    return {
      value: ''
    };
  },
  methods: {
    getRandomInt,
    querySearch(searchText, setResult) {
      const size = getRandomInt(1, 6);
      const sequence = Object.keys(new Array(size).fill(null));

      let result = sequence.map((item, index) => {
        const category = `${searchText}-${index}`;
        return {
          value: category,
          category,
          query: searchText
        };
      });

      setResult(result);
    },
    onSelect(value, item) {
      console.log(value, item);
    }
  }
};
</script>

<style>
.uncertain-category-search-dropdown .nova-auto-complete-groups {
  width: 300px;
}
</style>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
}

.item a {
  color: #f90;
}

.item .result {
  text-align: right;
  width: 100px;
  flex-shrink: 0;
}
</style>
