<template>
  <div class="box">
    <dl>
      <dt>协议：</dt>
      <dd>
        <NovaCheckbox
          v-model="isRead1"
          data-id="42"
          @change="handleReadChange"
          @click="handleClick"
          @mouseenter="handleMouseenter"
          @mouseleave="handleMouseleave"
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
      <dt>Lorem：</dt>
      <dd>
        <NovaCheckboxGroup v-model="isReadGroup">
          <NovaCheckbox v-model="isRead3" value="LISTENING">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure,
            sapiente?
            <input type="text" />
          </NovaCheckbox>
          <NovaCheckbox v-model="isRead4" value="SPEAKING">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae, sapiente!
            <textarea cols="30" rows="2"></textarea>
          </NovaCheckbox>
          <NovaCheckbox v-model="isRead5" value="READING">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere,
            incidunt.
            <div contenteditable="true">Content editable</div>
          </NovaCheckbox>
          <NovaCheckbox v-model="isRead6" value="WRITING">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
            ratione.
          </NovaCheckbox>
        </NovaCheckboxGroup>
      </dd>
    </dl>
    <dl>
      <dt>朝向：</dt>
      <dd>
        <NovaCheckboxGroup
          v-model="orientations"
          @change="handleOrientationsChange"
        >
          <NovaCheckbox
            v-model="isChecked"
            value="EAST"
            @change="handleOrientationChange"
            >东
          </NovaCheckbox>
          <NovaCheckbox value="SOUTH" @change="handleOrientationChange"
            >南
          </NovaCheckbox>
          <NovaCheckbox value="WEST" @change="handleOrientationChange"
            >西
          </NovaCheckbox>
          <NovaCheckbox value="NORTH" @change="handleOrientationChange"
            >北
          </NovaCheckbox>
        </NovaCheckboxGroup>
      </dd>
    </dl>
    <dl>
      <dt>朝向：</dt>
      <dd>
        <NovaCheckboxGroup v-model="orientations">
          <NovaCheckbox value="EAST">东</NovaCheckbox>
          <NovaCheckbox disabled value="SOUTH">南</NovaCheckbox>
          <NovaCheckbox value="WEST">西</NovaCheckbox>
          <NovaCheckbox value="NORTH">北</NovaCheckbox>
        </NovaCheckboxGroup>
      </dd>
    </dl>
    <dl>
      <dt>朝向：</dt>
      <dd>
        <NovaCheckboxGroup v-model="orientations" disabled>
          <NovaCheckbox value="EAST">东</NovaCheckbox>
          <NovaCheckbox disabled value="SOUTH">南</NovaCheckbox>
          <NovaCheckbox value="WEST">西</NovaCheckbox>
          <NovaCheckbox value="NORTH">北</NovaCheckbox>
        </NovaCheckboxGroup>
      </dd>
    </dl>
    <dl>
      <dt></dt>
      <dd>
        <Basic></Basic>
      </dd>
    </dl>
    <dl>
      <dt>Native：</dt>
      <dd>
        <label>
          <input type="checkbox" />
          apple
          <input type="text" />
        </label>
        <label>
          <input type="checkbox" />
          banana
          <textarea cols="30" rows="2"></textarea>
        </label>
        <label>
          <input type="checkbox" />
          cheery
          <div contenteditable="true">Content editable</div>
        </label>
      </dd>
    </dl>
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
      isChecked: true,
      isRead1: false,
      isRead2: true,
      isRead3: false,
      isRead4: false,
      isRead5: false,
      isRead6: false,
      orientations: [],
      isReadGroup: []
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
    handleOrientationChange(checked) {
      console.log(checked);
    },
    handleOrientationsChange(value) {
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

.nova-checkbox {
  /deep/ .nova-checkbox-label {
    max-width: 300px;
  }
}
</style>
