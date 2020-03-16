<template>
  <NovaAutoComplete
    v-model="value"
    :fetch-suggestions="querySearch"
    focus-search
    placeholder="Try to type `b`"
    @select="onSelect"
  ></NovaAutoComplete>
</template>

<script>
const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' }
];

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
        result = options.filter(option => {
          return (
            option.value.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
          );
        });
      }

      setResult(result);
    },
    onSelect(value, item) {
      console.log(value, item);
    }
  }
};
</script>
