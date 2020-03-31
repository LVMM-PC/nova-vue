<template>
  <div class="box">
    <dl>
      <dt>协议：</dt>
      <dd>
        <NovaRadio
          v-model="isRead1"
          value="READ"
          data-id="42"
          @change="handleReadChange"
          @click="handleClick"
          @mouseenter="handleMouseenter"
          @mouseleave="handleMouseleave"
          >我已阅读
        </NovaRadio>
      </dd>
    </dl>
    <dl>
      <dt>镜头：</dt>
      <dd>
        <NovaRadioGroup v-model="lensValue1" @change="handleLensChange">
          <NovaRadio
            v-model="isChecked"
            value="ULTRA_WIDE_ANGLE"
            @change="handleLenChange"
          >
            超广角
          </NovaRadio>
          <NovaRadio value="WIDE_ANGLE" @change="handleLenChange">
            广角
          </NovaRadio>
          <NovaRadio value="STANDARD" @change="handleLenChange">
            标准
          </NovaRadio>
          <NovaRadio value="TELEPHOTO" @change="handleLenChange">
            长焦
          </NovaRadio>
          <NovaRadio value="MACRO" @change="handleLenChange">
            微距
          </NovaRadio>
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
      <dt>协议：</dt>
      <dd>
        <NovaRadioGroup v-model="isReadGroup">
          <NovaRadio v-model="isRead3" value="LISTENING"
            >input 的 radio 类型元素默认渲染为小型圆圈图表，填充即为激活
            <input type="text" />
          </NovaRadio>
          <NovaRadio v-model="isRead4" value="SPEAKING"
            >input 的 radio
            类型元素默认渲染为小型圆圈图表，填充即为激活，类似于之前描述额复选框（checkbox）类型。单选按钮允许你选择单一的值来提交表单。
            <textarea cols="30" rows="10"></textarea>
          </NovaRadio>
          <NovaRadio v-model="isRead5" value="READING"
            >input 的 radio 类型元素默认渲染为小型圆圈图表，填充即为激活
            <div contenteditable="true">Content editable</div>
          </NovaRadio>
          <NovaRadio v-model="isRead6" value="WRITING"
            >input 的 radio
            类型元素默认渲染为小型圆圈图表，填充即为激活，类似于之前描述额复选框（checkbox）类型。单选按钮允许你选择单一的值来提交表单。
            <input type="text" />
          </NovaRadio>
        </NovaRadioGroup>
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
        <NovaRadio v-model="isRead7" disabled value="READ">我已阅读</NovaRadio>
      </dd>
    </dl>
    <dl>
      <dt>镜头：</dt>
      <dd>
        <NovaRadioGroup v-model="lensValue3">
          <NovaRadio value="ULTRA_WIDE_ANGLE">超广角</NovaRadio>
          <NovaRadio disabled value="WIDE_ANGLE">广角</NovaRadio>
          <NovaRadio value="STANDARD">标准</NovaRadio>
          <NovaRadio value="TELEPHOTO">长焦</NovaRadio>
          <NovaRadio value="MACRO">微距</NovaRadio>
        </NovaRadioGroup>
      </dd>
    </dl>
    <dl>
      <dt>镜头：</dt>
      <dd>
        <NovaRadioGroup v-model="lensValue3" disabled>
          <NovaRadio value="ULTRA_WIDE_ANGLE">超广角</NovaRadio>
          <NovaRadio disabled value="WIDE_ANGLE">广角</NovaRadio>
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
            name="test"
            type="radio"
            value="1"
            @change="handleNativeChange(1)"
          />
          Apple
          <input type="text" />
        </label>
        <label>
          <input
            name="test"
            type="radio"
            value="2"
            @change="handleNativeChange(2)"
          />
          Pear
          <textarea cols="30" rows="10"></textarea>
        </label>
        <label>
          <input
            name="test"
            type="radio"
            value="3"
            @change="handleNativeChange(3)"
          />
          Orange
          <div contenteditable="true">Content editable</div>
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
      isRead4: false,
      isRead5: false,
      isRead6: false,
      isRead7: false,
      isReadGroup: '',
      lensValue1: '',
      lensValue3: 'MACRO',
      lensValue2: 'MACRO'
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

<style lang="less" scoped>
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
  padding-top: 5px;
}

dd {
  width: calc(100% - 100px);
  margin: 0;
  display: inline-block;
  vertical-align: top;
}

.nova-radio {
  /deep/ .nova-radio-label {
    max-width: 300px;
  }
}
</style>
