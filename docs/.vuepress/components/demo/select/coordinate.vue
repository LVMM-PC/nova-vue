<template>
  <section>
    <NovaSelect v-model="firstCity" @change="onProvinceChange">
      <NovaOption
        v-for="province in provinceData"
        :key="province"
        :value="province"
      >
        {{ province }}
      </NovaOption>
    </NovaSelect>
    <NovaSelect v-model="secondCity">
      <NovaOption v-for="city in cities" :key="city" :value="city">
        {{ city }}
      </NovaOption>
    </NovaSelect>
  </section>
</template>

<script>
const provinceData = ['Anhui', 'Jiangxi'];
const cityData = {
  Anhui: ['Hefei', 'Wuhu', 'Huangshan'],
  Jiangxi: ['Nanchang', 'Jingdezhen', 'Jiujiang']
};

export default {
  data() {
    return {
      provinceData,
      cities: cityData[provinceData[0]],
      firstCity: provinceData[0],
      secondCity: cityData[provinceData[0]][0]
    };
  },
  methods: {
    onProvinceChange(value) {
      this.cities = cityData[value];
      this.secondCity = cityData[value][0];
    }
  }
};
</script>

<style scoped>
.nova-select{
  width: 120px;
}
</style>
