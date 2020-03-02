<template>
  <div class="box">
    <dl>
      <dt>协议：</dt>
      <dd>
        <NovaCheckbox
          v-model="isRead1"
          @change="handleReadChange"
          @click="handleClick"
          >我已阅读
        </NovaCheckbox>
        <NovaCheckbox v-model="isRead1" disabled>我已阅读</NovaCheckbox>
      </dd>
    </dl>
    <dl>
      <dt>协议：</dt>
      <dd>
        <NovaCheckbox v-model="isRead2">我已阅读</NovaCheckbox>
        <NovaCheckbox v-model="isRead2" disabled>我已阅读</NovaCheckbox>
      </dd>
    </dl>
    <dl>
      <dt>朝向：</dt>
      <dd>
        <NovaCheckboxGroup
          v-model="orientations"
          @change="handleOrientationsChange"
        >
          <NovaCheckbox value="EAST">东</NovaCheckbox>
          <NovaCheckbox value="SOUTH">南</NovaCheckbox>
          <NovaCheckbox value="WEST">西</NovaCheckbox>
          <NovaCheckbox value="NORTH">北</NovaCheckbox>
        </NovaCheckboxGroup>
      </dd>
    </dl>
    <dl>
      <dt>朝向：</dt>
      <dd>
        <NovaCheckboxGroup v-model="orientations">
          <NovaCheckbox value="EAST">东</NovaCheckbox>
          <NovaCheckbox value="SOUTH" disabled>南</NovaCheckbox>
          <NovaCheckbox value="WEST">西</NovaCheckbox>
          <NovaCheckbox value="NORTH">北</NovaCheckbox>
        </NovaCheckboxGroup>
      </dd>
    </dl>
    <dl>
      <dt>朝向：</dt>
      <dd>
        <NovaCheckboxGroup disabled v-model="orientations">
          <NovaCheckbox value="EAST">东</NovaCheckbox>
          <NovaCheckbox value="SOUTH" disabled>南</NovaCheckbox>
          <NovaCheckbox value="WEST">西</NovaCheckbox>
          <NovaCheckbox value="NORTH">北</NovaCheckbox>
        </NovaCheckboxGroup>
      </dd>
    </dl>
    <Basic></Basic>
  </div>
</template>

<script>
import NovaCheckbox from '../../components/checkbox/NovaCheckbox';
import NovaCheckboxGroup from '../../components/checkbox/NovaCheckboxGroup';
import Basic from '@/views/demos/checkbox/Basic';

export default {
  name: 'CheckboxDemo',
  components: { Basic, NovaCheckboxGroup, NovaCheckbox },
  data() {
    return {
      isRead1: false,
      isRead2: true,
      orientations: []
    };
  },
  methods: {
    handleClick(e) {
      console.log(e);
    },
    handleReadChange(value) {
      console.log(value);
    },
    handleOrientationsChange(value) {
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

.nova-ui-checkbox {
  margin-right: 10px;
}
</style>
