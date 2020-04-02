<template>
  <div class="box">
    <div class="box">
      <Basic></Basic>
    </div>
    <Dynamic></Dynamic>
    <div class="box">
      <select>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </select>
    </div>
    <div class="box">
      <NovaSelect
        v-model="selectValue1"
        dropdown-class="test"
        data-id="42"
        @change="handleChange"
        @click="handleClick"
        @close="handleClose"
        @open="handleOpen"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
      >
        <NovaOption
          v-for="option in selectOptions"
          :key="option.value"
          :disabled="option.disabled"
          :label="option.label"
          :value="option.value"
        ></NovaOption>
      </NovaSelect>
      <NovaLocale :block="false" :locale="en">
        <NovaSelect
          v-model="selectValue1"
          :append-to-body="false"
          @change="handleChange"
          @close="handleClose"
          @open="handleOpen"
        >
          <NovaOption
            v-for="option in selectOptions"
            :key="option.value"
            :disabled="option.disabled"
            :label="option.label"
            :value="option.value"
          ></NovaOption>
        </NovaSelect>
      </NovaLocale>
      <NovaSelect
        v-model="selectValue1"
        :append-to-body="true"
        :disabled="true"
        @change="handleChange"
        @close="handleClose"
        @open="handleOpen"
      >
        <NovaOption
          v-for="option in selectOptions"
          :key="option.value"
          :disabled="option.disabled"
          :label="option.label"
          :value="option.value"
        ></NovaOption>
      </NovaSelect>
    </div>
    <div class="block"></div>
    <div class="box">
      <NovaSelect
        v-model="selectValue2"
        :multiple="true"
        @change="handleChange"
        @close="handleClose"
        @open="handleOpen"
      >
        <NovaOption
          v-for="option in selectOptions"
          :key="option.value"
          :disabled="option.disabled"
          :label="option.label"
          :value="option.value"
        ></NovaOption>
      </NovaSelect>
      <NovaLocale :block="false" :locale="en">
        <NovaSelect
          v-model="selectValue2"
          :append-to-body="false"
          :multiple="true"
          @change="handleChange"
          @close="handleClose"
          @open="handleOpen"
        >
          <NovaOption
            v-for="option in selectOptions"
            :key="option.value"
            :disabled="option.disabled"
            :label="option.label"
            :value="option.value"
          ></NovaOption>
        </NovaSelect>
      </NovaLocale>
      <NovaSelect
        v-model="selectValue2"
        :disabled="true"
        :multiple="true"
        @change="handleChange"
        @close="handleClose"
        @open="handleOpen"
      >
        <NovaOption
          v-for="option in selectOptions"
          :key="option.value"
          :disabled="option.disabled"
          :label="option.label"
          :value="option.value"
        ></NovaOption>
      </NovaSelect>
    </div>
    <div class="block"></div>
    <div class="box">
      <NovaSelect v-model="selectValue3">
        <NovaOptGroup label="省">
          <NovaOption
            v-for="(p, pIndex) in administrativeDivision.province"
            :key="pIndex"
            :value="p"
          ></NovaOption>
        </NovaOptGroup>
        <NovaOptGroup label="自治区">
          <NovaOption
            v-for="(a, aIndex) in administrativeDivision.autonomousRegion"
            :key="aIndex"
            :value="a"
          ></NovaOption>
          <NovaOptGroup label="直辖市">
            <NovaOption
              v-for="(m,
              mIndex) in administrativeDivision.municipalityDirectlyUnderTheCentralGovernment"
              :key="mIndex"
              :value="m"
            ></NovaOption>
          </NovaOptGroup>
        </NovaOptGroup>
        <NovaOptGroup label="特别行政区">
          <NovaOption
            v-for="(s,
            sIndex) in administrativeDivision.specialAdministrativeRegion"
            :key="sIndex"
            :value="s"
          ></NovaOption>
        </NovaOptGroup>
      </NovaSelect>
      <NovaSelect
        v-model="selectValue4"
        placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, tenetur!"
      >
        <NovaOptGroup
          label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, tenetur!"
        >
          <NovaOption
            label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, tenetur!"
            value="apple"
          ></NovaOption>
        </NovaOptGroup>
      </NovaSelect>
      <NovaSelect
        v-model="selectValue5"
        multiple
        placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, tenetur!"
      >
        <NovaOptGroup
          label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, tenetur!"
        >
          <NovaOption
            label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, tenetur!"
            value="apple"
          ></NovaOption>
          <NovaOption
            label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, tenetur!"
            value="banana"
          ></NovaOption>
        </NovaOptGroup>
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
            <NovaOption label="苹果" value="apple">
              <div class="large-icon">🍎</div>
            </NovaOption>
            <NovaOption label="橘子" value="orange">
              <div class="large-icon">🍊</div>
            </NovaOption>
            <NovaOption label="香蕉" value="banana">
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
          :key="itemIndex"
          :value="itemIndex"
        >
          {{ itemIndex }}
        </NovaOption>
      </NovaSelect>
    </div>
    <div class="box">
      <NovaSelect v-model="boolValue">
        <NovaOption :value="true"></NovaOption>
        <NovaOption :value="false"></NovaOption>
      </NovaSelect>
    </div>
  </div>
</template>

<script>
import NovaSelect from '../../components/select/NovaSelect';
import NovaOption from '../../components/select/NovaOption';
import NovaLocale from '@/components/locale/NovaLocale';
import en from '@/locales/en';
import NovaOptGroup from '@/components/select/NovaOptGroup';
import Dynamic from '@/views/demos/select/Dynamic';
import Basic from '@/views/demos/select/Basic';

export default {
  name: 'SelectDemo',
  components: {
    NovaOptGroup,
    NovaLocale,
    NovaOption,
    NovaSelect,
    Dynamic,
    Basic
  },
  data() {
    return {
      en,
      emojiSelect: 'apple',
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
          value: 'banana',
          disabled: true
        },
        {
          label: '桃子',
          value: 'peach'
        }
      ],
      selectValue1: '',
      selectValue2: ['orange', 'apple'],
      selectValue3: '',
      selectValue4: '',
      selectValue5: [],
      administrativeDivision: {
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
          '青海省',
          '台湾省'
        ],
        municipalityDirectlyUnderTheCentralGovernment: [
          '北京市',
          '天津市',
          '上海市',
          '重庆市'
        ],
        autonomousRegion: [
          '内蒙古自治区',
          '广西壮族自治区',
          '西藏自治区',
          '宁夏回族自治区',
          '新疆维吾尔自治区'
        ],
        specialAdministrativeRegion: ['香港特别行政区', '澳门特别行政区']
      },
      numberOfSelect: 0,
      boolValue: false
    };
  },
  methods: {
    handleClick(e) {
      console.log(e);
    },
    handleMouseenter(e) {
      console.log(e);
    },
    handleMouseleave(e) {
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
.nova-select {
  margin-right: 20px;
  margin-bottom: 20px;
}

/deep/ .nova-select {
  margin-right: 20px;
  margin-bottom: 20px;
}

.large-icon {
  font-size: 54px;
  height: 100px;
  line-height: 100px;
}
</style>
