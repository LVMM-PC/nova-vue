<template>
  <div class="box">
    <div class="box">
      <NovaSelect
        v-model="selectValue1"
        @change="handleChange"
        @open="handleOpen"
        @close="handleClose"
        @click="handleClick"
        popover-class="test"
      >
        <NovaOption
          :key="option.value"
          v-for="option in selectOptions"
          :label="option.label"
          :value="option.value"
        ></NovaOption>
      </NovaSelect>
      <NovaLocale :locale="en">
        <NovaSelect
          v-model="selectValue1"
          @change="handleChange"
          @open="handleOpen"
          @close="handleClose"
          :append-to-body="false"
        >
          <NovaOption
            :key="option.value"
            v-for="option in selectOptions"
            :label="option.label"
            :value="option.value"
          ></NovaOption>
        </NovaSelect>
      </NovaLocale>
      <NovaSelect
        v-model="selectValue1"
        @change="handleChange"
        @open="handleOpen"
        @close="handleClose"
        :append-to-body="true"
        :disabled="true"
      >
        <NovaOption
          :key="option.value"
          v-for="option in selectOptions"
          :label="option.label"
          :value="option.value"
        ></NovaOption>
      </NovaSelect>
    </div>
    <div class="block"></div>
    <div class="box">
      <NovaSelect
        v-model="selectValue2"
        @change="handleChange"
        @open="handleOpen"
        @close="handleClose"
        :multiple="true"
      >
        <NovaOption
          :key="option.value"
          v-for="option in selectOptions"
          :label="option.label"
          :value="option.value"
        ></NovaOption>
      </NovaSelect>
      <NovaLocale :locale="en">
        <NovaSelect
          v-model="selectValue2"
          @change="handleChange"
          @open="handleOpen"
          @close="handleClose"
          :multiple="true"
        >
          <NovaOption
            :key="option.value"
            v-for="option in selectOptions"
            :label="option.label"
            :value="option.value"
          ></NovaOption>
        </NovaSelect>
      </NovaLocale>
      <NovaSelect
        v-model="selectValue2"
        @change="handleChange"
        @open="handleOpen"
        @close="handleClose"
        :multiple="true"
        :disabled="true"
      >
        <NovaOption
          :key="option.value"
          v-for="option in selectOptions"
          :label="option.label"
          :value="option.value"
        ></NovaOption>
      </NovaSelect>
    </div>
    <div class="block"></div>
    <div class="box">
      <NovaSelect v-model="selectValue3">
        <NovaOptGroup label="直辖市">
          <NovaOption
            :value="m"
            v-for="(m, mIndex) in administrativeDivision.municipality"
            :key="mIndex"
          ></NovaOption>
        </NovaOptGroup>
        <NovaOptGroup label="自治区">
          <NovaOption
            :value="a"
            v-for="(a, aIndex) in administrativeDivision.autonomousRegion"
            :key="aIndex"
          ></NovaOption>
        </NovaOptGroup>
        <NovaOption
          :value="p"
          v-for="(p, pIndex) in administrativeDivision.province"
          :key="pIndex"
        ></NovaOption>
      </NovaSelect>
    </div>
    <div class="block"></div>
    <div class="box">
      <NovaSelect v-model="emojiSelect">
        <NovaOptGroup>
          <template slot="label">
            <div class="large-icon">❤</div>
          </template>
          <template>
            <NovaOption value="苹果">
              <div class="large-icon">🍎</div>
            </NovaOption>
            <NovaOption value="橘子">
              <div class="large-icon">🍊</div>
            </NovaOption>
            <NovaOption value="香蕉">
              <div class="large-icon">🍌</div>
            </NovaOption>
          </template>
        </NovaOptGroup>
      </NovaSelect>
    </div>
    <div class="block"></div>
    <div class="box">
      <NovaSelect v-model="numberOfSelect">
        <NovaOption
          v-for="(item, itemIndex) in 10"
          :value="itemIndex"
          :key="itemIndex"
        >
          {{ itemIndex }}
        </NovaOption>
      </NovaSelect>
    </div>
  </div>
</template>

<script>
import NovaSelect from '../../components/select/NovaSelect';
import NovaOption from '../../components/select/NovaOption';
import NovaLocale from '@/components/locale/NovaLocale';
import en from '@/locales/lang/en';
import NovaOptGroup from '@/components/select/NovaOptGroup';

export default {
  name: 'SelectDemo',
  data() {
    return {
      en: en,
      emojiSelect: '苹果',
      selectOptions: [
        {
          label: '苹果',
          value: 'apple'
        },
        {
          label: '橘子',
          value: 'orange'
        },
        {
          label: '香蕉',
          value: 'banana'
        }
      ],
      selectValue1: '',
      selectValue2: [],
      selectValue3: '',
      administrativeDivision: {
        municipality: ['北京市', '上海市', '天津市', '重庆市'],
        autonomousRegion: [
          '内蒙古自治区',
          '新疆维吾尔自治区',
          '广西壮族自治区',
          '宁夏回族自治区',
          '西藏自治区'
        ],
        province: [
          '河北省',
          '山西省',
          '辽宁省',
          '吉林省',
          '黑龙江省',
          '江苏省',
          '浙江省',
          '安徽省',
          '福建省',
          '台湾省',
          '江西省',
          '山东省',
          '河南省',
          '湖北省',
          '湖南省',
          '广东省',
          '海南省',
          '四川省',
          '贵州省',
          '云南省',
          '陕西省',
          '甘肃省',
          '青海省'
        ]
      },
      numberOfSelect: 0
    };
  },
  components: { NovaOptGroup, NovaLocale, NovaOption, NovaSelect },
  methods: {
    handleClick(e) {
      console.log(e);
    },
    handleChange(value) {
      console.log('change', value);
    },
    handleOpen() {
      console.log('open');
    },
    handleClose() {
      console.log('close');
    }
  }
};
</script>

<style lang="less" scoped>
.nova-ui-select {
  margin-right: 20px;
  margin-bottom: 20px;
}

.large-icon {
  font-size: 54px;
  height: 100px;
  line-height: 100px;
}
</style>
