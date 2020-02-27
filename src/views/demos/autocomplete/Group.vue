<template>
  <div class="box">
    <NovaAutocomplete
      v-model="keyword"
      :fetch-suggestions="querySearch"
      focusSearch
    >
      <template slot="start"
        >Hot
      </template>
      <template slot-scope="scope">
        {{ scope.item.trueDistrictAlias }}
      </template>
      <template slot="group-label" slot-scope="scope">
        <div>
          {{ scope.group.type }}
        </div>
      </template>
    </NovaAutocomplete>
  </div>
</template>

<script>
import NovaAutocomplete from '@/components/autocomplete/NovaAutocomplete';
import globalHotelList from '@/views/data/global-hotel-list';
import lodash from 'lodash';

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

      let listGroups = lodash.groupBy(matchList, item => {
        return item.type;
      });

      let matchGroups = [];
      for (let type in listGroups) {
        if (listGroups.hasOwnProperty(type)) {
          let group = listGroups[type];

          matchGroups.push({
            type: type,
            children: group
          });
        }
      }

      console.log(matchGroups);

      cb(matchList, matchGroups);
    }
  }
};
</script>

<style scoped></style>
