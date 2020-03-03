<template>
  <div class="box">
    <dl>
      <dt>协议：</dt>
      <dd>
        <NovaRadio
          v-model="isRead1"
          @change="handleReadChange"
          value="READ"
          @click="handleClick"
          >我已阅读
        </NovaRadio>
      </dd>
    </dl>
    <dl>
      <dt>镜头：</dt>
      <dd>
        <NovaRadioGroup v-model="lensValue1" @change="handleLensChange">
          <NovaRadio value="ULTRA_WIDE_ANGLE" v-model="isChecked" @change="handleLenChange">超广角</NovaRadio>
          <NovaRadio value="WIDE_ANGLE" @change="handleLenChange">广角</NovaRadio>
          <NovaRadio value="STANDARD" @change="handleLenChange">标准</NovaRadio>
          <NovaRadio value="TELEPHOTO" @change="handleLenChange">长焦</NovaRadio>
          <NovaRadio value="MACRO" @change="handleLenChange">微距</NovaRadio>
        </NovaRadioGroup>
      </dd>
    </dl>
    <dl>
      <dt>协议：</dt>
      <dd>
        <NovaRadio v-model="isRead2" value="READ">我已阅读</NovaRadio>
      </dd>
    </dl>
    <dl>
      <dt>镜头：</dt>
      <dd>
        <NovaRadioGroup v-model="lensValue2">
          <NovaRadio value="ULTRA_WIDE_ANGLE">超广角</NovaRadio>
          <NovaRadio value="WIDE_ANGLE">广角</NovaRadio>
          <NovaRadio value="STANDARD">标准</NovaRadio>
          <NovaRadio value="TELEPHOTO">长焦</NovaRadio>
          <NovaRadio value="MACRO">微距</NovaRadio>
        </NovaRadioGroup>
      </dd>
    </dl>
    <dl>
      <dt>协议：</dt>
      <dd>
        <NovaRadio v-model="isRead3" value="READ" disabled>我已阅读</NovaRadio>
      </dd>
    </dl>
    <dl>
      <dt>镜头：</dt>
      <dd>
        <NovaRadioGroup v-model="lensValue3">
          <NovaRadio value="ULTRA_WIDE_ANGLE">超广角</NovaRadio>
          <NovaRadio value="WIDE_ANGLE" disabled>广角</NovaRadio>
          <NovaRadio value="STANDARD">标准</NovaRadio>
          <NovaRadio value="TELEPHOTO">长焦</NovaRadio>
          <NovaRadio value="MACRO">微距</NovaRadio>
        </NovaRadioGroup>
      </dd>
    </dl>
    <dl>
      <dt>镜头：</dt>
      <dd>
        <NovaRadioGroup disabled v-model="lensValue3">
          <NovaRadio value="ULTRA_WIDE_ANGLE">超广角</NovaRadio>
          <NovaRadio value="WIDE_ANGLE" disabled>广角</NovaRadio>
          <NovaRadio value="STANDARD">标准</NovaRadio>
          <NovaRadio value="TELEPHOTO">长焦</NovaRadio>
          <NovaRadio value="MACRO">微距</NovaRadio>
        </NovaRadioGroup>
      </dd>
    </dl>
    <dl>
      <dt>test：</dt>
      <dd>
        <label>
          <input
            type="radio"
            @change="handleNativeChange(1)"
            name="test"
            value="1"
          />
          Apple
        </label>
        <label>
          <input
            type="radio"
            @change="handleNativeChange(2)"
            name="test"
            value="2"
          />
          Pear
        </label>
        <label>
          <input
            type="radio"
            @change="handleNativeChange(3)"
            name="test"
            value="3"
          />
          Orange
        </label>
      </dd>
    </dl>
  </div>
</template>

<script>
import NovaRadioGroup from '@/components/radio/NovaRadioGroup';
import NovaRadio from '@/components/radio/NovaRadio';

export default {
  name: 'RadioDemo',
  components: { NovaRadio, NovaRadioGroup },
  data() {
    return {
      isChecked: false,
      isRead1: false,
      isRead2: true,
      isRead3: false,
      lensValue1: '',
      lensValue3: 'MACRO',
      lensValue2: 'MACRO'
    };
  },
  methods: {
    handleClick(e) {
      console.log(e);
    },
    handleReadChange(value) {
      console.log(value);
    },
    handleLenChange(checked) {
      console.log(checked);
    },
    handleLensChange(value) {
      console.log(value);
    },
    handleNativeChange(value) {
      console.log(value);
    }
  }
};
</script>

<style scoped>
.box {
  line-height: 20px;
  font-size: 12px;
}

dl {
  margin: 0 0 10px 0;
}

dt {
  width: 100px;
  text-align: right;
  display: inline-block;
  vertical-align: top;
}

dd {
  margin: 0;
  display: inline-block;
  vertical-align: top;
}

.nova-ui-radio {
  margin-right: 10px;
}
</style>
