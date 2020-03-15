<template>
  <NovaAutoComplete
    v-model="value"
    placeholder="Try to type `b`"
    focus-search
    :fetch-suggestions="querySearch"
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
    }
  }
};
</script>
