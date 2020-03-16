<template>
  <NovaAutoComplete
    v-model="value"
    placeholder="Input here"
    @select="onSelect"
    focus-search
    :fetch-suggestions="querySearch"
  ></NovaAutoComplete>
</template>

<script>
function mockValue(text, times = 1) {
  return {
    value: text.repeat(times)
  };
}

export default {
  data() {
    return {
      value: ''
    };
  },
  methods: {
    querySearch(searchText, setResult) {
      let result;

      if (!searchText) {
        result = [];
      } else {
        result = [
          mockValue(searchText),
          mockValue(searchText, 2),
          mockValue(searchText, 3)
        ];
      }

      setResult(result);
    },
    onSelect(value, item) {
      console.log(value, item);
    }
  }
};
</script>
