<template>
  <div class="box">
    <NovaAutocomplete
      v-model="keyword"
      :fetch-suggestions="querySearch"
      focus-search
    >
      <template v-slot:start>Hot</template>
      <template v-slot:default="slotProps">
        {{ slotProps.item.trueDistrictAlias }}
      </template>
      <template v-slot:group-label="slotProps">
        <div>
          {{ slotProps.group.type }}
        </div>
      </template>
    </NovaAutocomplete>
  </div>
</template>

<script>
import groupBy from 'lodash/groupBy';
import NovaAutocomplete from '@/components/autocomplete/NovaAutocomplete';
import globalHotelList from '@/views/data/global-hotel-list';

export default {
  name: 'Group',
  components: { NovaAutocomplete },
  data() {
    return {
      keyword: ''
    };
  },
  methods: {
    querySearch(queryString, cb) {
      let matchList = globalHotelList.matchList.map((matchItem, index) => {
        let ret = {
          value: matchItem.name,
          index: index
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
          type: type,
          children: group
        });
      }

      console.log(matchGroups);

      cb(matchList, matchGroups);
    }
  }
};
</script>
