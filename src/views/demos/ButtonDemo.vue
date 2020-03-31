<template>
  <section>
    <div class="box">
      <NovaButton
        :data-id="dataId"
        @click="handleClick"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
      >
        Button
      </NovaButton>
      <NovaButton disabled>Button</NovaButton>
      <NovaButton loading>Button</NovaButton>
    </div>
    <div class="box">
      <NovaButton type="primary">
        主要
      </NovaButton>
      <NovaButton type="secondary">次要</NovaButton>
      <NovaButton>默认</NovaButton>
      <NovaButton
        type="link"
        href="http://nova-vue.em2046.com/"
        target="_blank"
      >
        链接
      </NovaButton>
    </div>
    <div class="box">
      <NovaButton :loading="loading" type="primary">
        主要
      </NovaButton>
      <NovaButton :loading="loading" type="secondary">次要</NovaButton>
      <NovaButton :loading="loading">默认</NovaButton>
      <NovaButton :loading="loading" type="link">链接</NovaButton>
    </div>
    <div class="box">
      <NovaButton :disabled="disabled" type="primary">
        主要
      </NovaButton>
      <NovaButton :disabled="disabled" type="secondary">次要</NovaButton>
      <NovaButton :disabled="disabled">默认</NovaButton>
      <NovaButton :disabled="disabled" type="link">链接</NovaButton>
      <NovaButton @click="toggleDisabled">Toggle Disabled</NovaButton>
    </div>
    <div class="box">
      <NovaButton type="primary">
        <NovaIconAddCircle slot="icon"></NovaIconAddCircle>
        主要
      </NovaButton>
      <NovaButton type="secondary">
        <NovaIconRemoveCircle slot="icon"></NovaIconRemoveCircle>
        次要
      </NovaButton>
      <NovaButton>
        <NovaIconInfo slot="icon"></NovaIconInfo>
        默认
      </NovaButton>
      <NovaButton type="link">
        <NovaIconInfo slot="icon"></NovaIconInfo>
        链接
      </NovaButton>
    </div>
    <div class="box">
      <NovaButton type="primary" :loading="loading">
        <NovaIconAddCircle slot="icon"></NovaIconAddCircle>
        主要
      </NovaButton>
      <NovaButton type="secondary" :loading="loading">
        <NovaIconRemoveCircle slot="icon"></NovaIconRemoveCircle>
        次要
      </NovaButton>
      <NovaButton :loading="loading">
        <NovaIconInfo slot="icon"></NovaIconInfo>
        默认
      </NovaButton>
      <NovaButton type="link" :loading="loading">
        <NovaIconInfo slot="icon"></NovaIconInfo>
        链接
      </NovaButton>
      <NovaButton @click="toggleLoading">Toggle Loading</NovaButton>
    </div>
    <div class="box">
      <NovaButton type="primary" danger>
        <NovaIconAddCircle slot="icon"></NovaIconAddCircle>
        主要
      </NovaButton>
      <NovaButton type="secondary" danger>
        <NovaIconRemoveCircle slot="icon"></NovaIconRemoveCircle>
        次要
      </NovaButton>
      <NovaButton danger>
        <NovaIconInfo slot="icon"></NovaIconInfo>
        默认
      </NovaButton>
      <NovaButton type="link" danger>
        <NovaIconInfo slot="icon"></NovaIconInfo>
        链接
      </NovaButton>
    </div>
    <div class="box">
      <NovaButton type="primary" block>
        <NovaIconAddCircle slot="icon"></NovaIconAddCircle>
        主要
      </NovaButton>
      <NovaButton type="secondary" block>
        <NovaIconRemoveCircle slot="icon"></NovaIconRemoveCircle>
        次要
      </NovaButton>
      <NovaButton block>
        <NovaIconInfo slot="icon"></NovaIconInfo>
        默认
      </NovaButton>
      <NovaButton type="link" block>
        <NovaIconInfo slot="icon"></NovaIconInfo>
        链接
      </NovaButton>
    </div>
    <div class="box">
      <NovaButton type="primary" :loading="loading">
        <NovaIconAddCircle slot="icon"></NovaIconAddCircle>
      </NovaButton>
      <NovaButton type="secondary" :loading="loading">
        <NovaIconRemoveCircle slot="icon"></NovaIconRemoveCircle>
      </NovaButton>
      <NovaButton :loading="loading">
        <NovaIconInfo slot="icon"></NovaIconInfo>
      </NovaButton>
      <NovaButton type="link" :loading="loading">
        <NovaIconInfo slot="icon"></NovaIconInfo>
      </NovaButton>
    </div>
  </section>
</template>

<script>
import NovaButton from '@/components/button/NovaButton';
import Utils from '@/utils/utils';
import NovaIconInfo from '@/icons/NovaIconInfo';
import NovaIconAddCircle from '@/icons/NovaIconAddCircle';
import NovaIconRemoveCircle from '@/icons/NovaIconRemoveCircle';

export default {
  name: 'ButtonDemo',
  components: {
    NovaIconRemoveCircle,
    NovaIconAddCircle,
    NovaIconInfo,
    NovaButton
  },
  data() {
    return {
      dataId: 42,
      loading: true,
      disabled: true
    };
  },
  methods: {
    handleClick(e) {
      console.log(e);
      this.dataId = Utils.getRandomInt(0, 42);
    },
    toggleLoading() {
      this.loading = !this.loading;
    },
    toggleDisabled() {
      this.disabled = !this.disabled;
    },
    handleMouseenter(e) {
      console.log(e);
    },
    handleMouseleave(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped>
.nova-button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
