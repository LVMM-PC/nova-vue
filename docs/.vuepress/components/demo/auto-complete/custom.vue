<template>
  <NovaAutoComplete
    v-model="value"
    :fetch-suggestions="querySearch"
    focus-search
    placeholder="Input email"
    @select="onSelect"
  >
    <template v-slot="{ item }">
      <span class="email">
        <span class="username">{{ item.username }}</span>
        <span class="at">@</span>
        <span class="domain">{{ item.domain }}</span>
      </span>
    </template>
  </NovaAutoComplete>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    };
  },
  methods: {
    querySearch(searchText, setResult) {
      let result = [];

      if (!searchText || searchText.indexOf('@') >= 0) {
        result = [];
      } else {
        result = ['gmail.com', 'outlook.com', 'qq.com'].map(domain => {
          return {
            value: `${searchText}@${domain}`,
            username: searchText,
            domain
          };
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

<style>
.email {
  font-size: 0;
}

.username,
.at,
.domain {
  font-size: 14px;
}

.username {
  color: #e38;
}
</style>
