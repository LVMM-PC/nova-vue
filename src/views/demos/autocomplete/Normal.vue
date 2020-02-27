<template>
  <div>
    <div class="box">
      <NovaAutocomplete
        v-model="city"
        :fetch-suggestions="querySearch"
        @select="handleSelect"
        popover-class="my-autocomplete-dropdown"
        placeholder="请选择城市"
        show-prefix
        show-suffix
        ref="my-autocomplete"
        class="my-autocomplete"
        auto-select
        @click="handleClick"
      >
        <template slot="prefix">
          出发地：
        </template>
        <template slot="suffix">
          🚝
        </template>
        <template slot="start">
          <div class="city-area">
            <div class="city-hot">
              <div class="city-hot-title">
                {{ cityAreaHot.name }}
              </div>
              <div class="city-list">
                <div
                  class="city-item"
                  :class="{ hidden: !city.title }"
                  v-for="(city, cityIndex) in cityAreaHot.children"
                  :key="'CITY_' + cityIndex"
                  @click="handleCitySelect(city)"
                >
                  <template v-if="city.title">{{ city.title }}</template>
                </div>
              </div>
            </div>
            <div class="city-tabs">
              <div
                class="city-tab"
                :class="{
                  active: cityStartActiveIndex === listIndex
                }"
                v-for="(list, listIndex) in cityAreaList"
                :key="'TAB' + listIndex"
                @click="handleCityIndexSwitch(listIndex)"
              >
                <div class="city-tab-text">{{ list.name }}</div>
              </div>
            </div>

            <div
              class="city-pane"
              :class="{
                active: cityStartActiveIndex === listIndex
              }"
              v-for="(list, listIndex) in cityAreaList"
              :key="'PANE' + listIndex"
            >
              <div
                class="city-line"
                :class="{ hidden: !list.children }"
                v-for="(sub, subIndex) in list.children"
                :key="'LETTER_' + subIndex"
              >
                <div class="city-sub-title" v-if="sub.name">{{ sub.name }}</div>
                <div v-if="sub.children" class="city-list">
                  <div
                    class="city-item"
                    v-for="(city, cityIndex) in sub.children"
                    :key="'CITY_' + cityIndex"
                    @click="handleCitySelect(city)"
                  >
                    <template v-if="city.title">{{ city.title }}</template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template slot-scope="scope">
          {{ scope.item.name }}
        </template>
      </NovaAutocomplete>
    </div>
    <div class="box">
      <button @click="triggerFocus">Focus</button>
      <button @click="triggerBlur">Blur</button>
      <button @click="triggerOpenStart">openStart</button>
      <button @click="triggerOpenList">openList</button>
      <button @click="triggerCloseStart">closeStart</button>
      <button @click="triggerCloseList">closeList</button>
      <button @click="triggerClose">close</button>
    </div>
  </div>
</template>

<script>
import NovaAutocomplete from '@/components/autocomplete/NovaAutocomplete';
import cityList from '@/views/data/city-list';
import cityArea from '@/views/data/city-area';

export default {
  name: 'Normal',
  components: { NovaAutocomplete },
  data() {
    return {
      city: '',
      cityList: [],
      cityAreaList: [],
      cityAreaHot: [],
      cityStartActiveIndex: 0
    };
  },
  mounted() {
    this.loadAll();
  },
  methods: {
    loadAll() {
      this.cityList = cityList.map(city => {
        let item = {
          value: city.name
        };
        return Object.assign(item, city);
      });
      this.cityAreaHot = cityArea[0];
      this.cityAreaList = cityArea.slice(1);
    },
    querySearch(queryString, cb) {
      let cityList = this.cityList;
      let result = queryString
        ? cityList.filter(this.createFilter(queryString))
        : cityList;
      cb(result.slice(0, 10));
    },
    createFilter(queryString) {
      return item => {
        let matchName =
          item.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1;
        let matchPinyin =
          item.pinyin.toLowerCase().indexOf(queryString.toLowerCase()) !== -1;
        let matchShortPinyin =
          item.jianpin.toLowerCase().indexOf(queryString.toLowerCase()) !== -1;
        return matchName || matchPinyin || matchShortPinyin;
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    handleClick(e) {
      console.log(e);
    },
    handleCityIndexSwitch(index) {
      this.cityStartActiveIndex = index;
    },
    handleCitySelect(city) {
      this.city = city.title;
      this.$refs['my-autocomplete'].closeDropdown();
    },
    triggerFocus() {
      let $myAutocomplete = this.$refs['my-autocomplete'];
      setTimeout(() => {
        $myAutocomplete.focus();
      }, 1);
    },
    triggerBlur() {
      let $myAutocomplete = this.$refs['my-autocomplete'];

      setTimeout(() => {
        this.triggerFocus();
      }, 1);

      setTimeout(() => {
        $myAutocomplete.blur();
      }, 1000);
    },
    triggerOpenStart() {
      let $myAutocomplete = this.$refs['my-autocomplete'];
      setTimeout(() => {
        $myAutocomplete.openStart();
      }, 1);
    },
    triggerOpenList() {
      let $myAutocomplete = this.$refs['my-autocomplete'];
      setTimeout(() => {
        $myAutocomplete.openList();
      }, 1);
    },
    triggerCloseStart() {
      let $myAutocomplete = this.$refs['my-autocomplete'];

      setTimeout(() => {
        this.triggerOpenStart();
      }, 1);

      setTimeout(() => {
        $myAutocomplete.closeStart();
      }, 1000);
    },
    triggerCloseList() {
      setTimeout(() => {
        this.triggerOpenList();
      }, 1);

      let $myAutocomplete = this.$refs['my-autocomplete'];
      setTimeout(() => {
        $myAutocomplete.closeList();
      }, 1000);
    },
    triggerClose() {
      let $myAutocomplete = this.$refs['my-autocomplete'];

      setTimeout(() => {
        this.triggerOpenStart();
      }, 1);
      setTimeout(() => {
        this.triggerOpenList();
      }, 500);

      setTimeout(() => {
        $myAutocomplete.close();
      }, 1000);

      setTimeout(() => {
        this.triggerOpenList();
      }, 1500);
      setTimeout(() => {
        this.triggerOpenStart();
      }, 2000);

      setTimeout(() => {
        $myAutocomplete.close();
      }, 2500);
    }
  }
};
</script>

<style lang="less" scoped>
.my-autocomplete {
  /deep/ .nova-ui-autocomplete-input {
    padding-left: 60px;
  }
}

.hot {
  padding: 10px;
}

.city-area {
  padding: 10px;
}

.city-hot {
  margin-bottom: 10px;
}

.city-hot-title {
  margin-bottom: 10px;
}

.city-tabs {
  margin-bottom: 10px;
}

.city-tab {
  cursor: pointer;
  margin-right: 10px;
  display: inline-block;
  vertical-align: top;

  &.active {
    color: #e38;
  }
}

.city-item {
  cursor: pointer;
  font-size: 12px;
  display: inline-block;
  vertical-align: top;
  margin-right: 10px;
  margin-bottom: 10px;

  &.hidden {
    display: none;
  }
}

.city-pane {
  display: none;

  &.active {
    display: block;
  }
}

.city-line {
  &.hidden {
    display: none;
  }

  .city-sub-title {
    width: 20px;
    display: inline-block;
    vertical-align: top;
  }

  .city-list {
    width: 360px;
    display: inline-block;
    vertical-align: top;
  }
}
</style>

<style lang="less">
.my-autocomplete-dropdown {
  .nova-ui-autocomplete-start {
    width: 400px;
  }
}
</style>
