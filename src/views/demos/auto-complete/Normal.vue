<template>
  <div>
    <div class="box">
      <NovaAutoComplete
        ref="my-auto-complete"
        v-model="city"
        :fetch-suggestions="querySearch"
        auto-select
        dropdown-class="my-auto-complete-dropdown"
        placeholder="请选择城市"
        :focus-search="true"
        @click="handleClick"
        @select="handleSelect"
      >
        <template slot="start">
          <div class="city-area">
            <div class="city-hot">
              <div class="city-hot-title">
                Hot
              </div>
              <div class="city-list">
                <div
                  v-for="(cityHot, cityHotIndex) in cityAreaHot"
                  :key="'CITY_' + cityHotIndex"
                  class="city-item"
                  @click="handleCitySelect(cityHot)"
                >
                  <template>{{ cityHot.name }}</template>
                </div>
              </div>
            </div>
            <div class="city-tabs">
              <div
                v-for="(list, listIndex) in cityAreaList"
                :key="'TAB' + listIndex"
                :class="{
                  active: cityStartActiveIndex === listIndex
                }"
                class="city-tab"
                @click="handleCityIndexSwitch(listIndex)"
              >
                <div class="city-tab-text">{{ listIndex }}</div>
              </div>
            </div>

            <div
              v-for="(list, listIndex) in cityAreaList"
              :key="'PANE' + listIndex"
              :class="{
                active: cityStartActiveIndex === listIndex
              }"
              class="city-panel"
            >
              <div
                v-for="(sub, subIndex) in list"
                :key="'LETTER_' + subIndex"
                class="city-line"
              >
                <div class="city-sub-title">{{ subIndex }}</div>
                <div class="city-list">
                  <div
                    v-for="(cityItem, cityItemIndex) in sub"
                    :key="'CITY_' + cityItemIndex"
                    class="city-item"
                    @click="handleCitySelect(cityItem)"
                  >
                    <template>
                      {{ cityItem.name }}
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:default="slotProps">
          {{ slotProps.item.name }}
        </template>
      </NovaAutoComplete>
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
import NovaAutoComplete from '@/components/auto-complete/NovaAutoComplete';

import cityList from '@/views/data/city-list.json';
import cityArea from '@/views/data/city-area.json';

export default {
  name: 'Normal',
  components: { NovaAutoComplete },
  data() {
    return {
      city: '',
      cityList: [],
      cityAreaList: [],
      cityAreaHot: [],
      cityStartActiveIndex: 'ABCD'
    };
  },
  created() {
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
      this.cityAreaList = cityArea['list'];
      this.cityAreaHot = cityArea['hot'];
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
          item.firstLetter.toLowerCase().indexOf(queryString.toLowerCase()) !==
          -1;
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
      this.city = city.name;
      this.$refs['my-auto-complete'].closeDropdown();
    },
    triggerFocus() {
      let $myAutoComplete = this.$refs['my-auto-complete'];
      setTimeout(() => {
        $myAutoComplete.focus();
      }, 1);
    },
    triggerBlur() {
      let $myAutoComplete = this.$refs['my-auto-complete'];

      setTimeout(() => {
        this.triggerFocus();
      }, 1);

      setTimeout(() => {
        $myAutoComplete.blur();
      }, 1000);
    },
    triggerOpenStart() {
      let $myAutoComplete = this.$refs['my-auto-complete'];
      setTimeout(() => {
        $myAutoComplete.openStart();
      }, 1);
    },
    triggerOpenList() {
      let $myAutoComplete = this.$refs['my-auto-complete'];
      setTimeout(() => {
        $myAutoComplete.openList();
      }, 1);
    },
    triggerCloseStart() {
      let $myAutoComplete = this.$refs['my-auto-complete'];

      setTimeout(() => {
        this.triggerOpenStart();
      }, 1);

      setTimeout(() => {
        $myAutoComplete.closeStart();
      }, 1000);
    },
    triggerCloseList() {
      setTimeout(() => {
        this.triggerOpenList();
      }, 1);

      let $myAutoComplete = this.$refs['my-auto-complete'];
      setTimeout(() => {
        $myAutoComplete.closeList();
      }, 1000);
    },
    triggerClose() {
      let $myAutoComplete = this.$refs['my-auto-complete'];

      setTimeout(() => {
        this.triggerOpenStart();
      }, 1);
      setTimeout(() => {
        this.triggerOpenList();
      }, 500);

      setTimeout(() => {
        $myAutoComplete.close();
      }, 1000);

      setTimeout(() => {
        this.triggerOpenList();
      }, 1500);
      setTimeout(() => {
        this.triggerOpenStart();
      }, 2000);

      setTimeout(() => {
        $myAutoComplete.close();
      }, 2500);
    }
  }
};
</script>

<style lang="less" scoped>
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

.city-panel {
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
.my-auto-complete-dropdown {
  .nova-auto-complete-start {
    width: 400px;
  }
}
</style>
