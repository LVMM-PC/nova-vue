<template>
  <NovaAutoComplete
    v-model="value"
    :dropdown-match-select-width="300"
    :fetch-suggestions="querySearch"
    focus-search
    placeholder="Input here"
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
        <span class="result">{{ item.count }} result</span>
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
    querySearch(searchText, setResult) {
      const size = getRandomInt(1, 6);
      const sequence = Object.keys(new Array(size).fill(null));

      let result = sequence.map((item, index) => {
        const category = `${searchText}-${index}`;
        return {
          value: category,
          category,
          query: searchText,
          count: getRandomInt(100, 201)
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

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
}

.item a {
  color: #ff9900;
}

.item .result {
  text-align: right;
  width: 100px;
  flex-shrink: 0;
}
</style>
