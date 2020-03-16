<template>
  <NovaAutoComplete
    v-model="value"
    placeholder="Input email"
    @select="onSelect"
    focus-search
    :fetch-suggestions="querySearch"
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
            domain: domain
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
