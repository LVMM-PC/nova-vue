<template>
  <div class="box">
    <NovaAutoComplete
      v-model="keyword"
      :fetch-suggestions="querySearch"
      focus-search
    >
      <template v-slot:default="slotProps">
        {{ slotProps.item.trueDistrictAlias }}
      </template>
      <template v-slot:groupLabel="slotProps">
        <div>
          {{ slotProps.group.type }}
        </div>
      </template>
    </NovaAutoComplete>
  </div>
</template>

<script>
import groupBy from 'lodash/groupBy';
import NovaAutoComplete from '@/components/auto-complete/NovaAutoComplete';
import globalHotelList from '@/views/data/global-hotel-list';

export default {
  name: 'Group',
  components: { NovaAutoComplete },
  data() {
    return {
      keyword: ''
    };
  },
  methods: {
    querySearch(queryString, cb) {
      let matchList = globalHotelList.matchList.map(matchItem => {
        let ret = {
          value: matchItem.name
        };
        return Object.assign(ret, matchItem);
      });

      let listGroups = groupBy(matchList, item => {
        return item.type;
      });

      let matchGroups = [];
      for (let type in listGroups) {
        if (!Object.prototype.hasOwnProperty.call(listGroups, type)) {
          continue;
        }
        let group = listGroups[type];
        matchGroups.push({
          type,
          children: group
        });
      }

      cb(matchGroups);
    }
  }
};
</script>
