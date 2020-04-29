<template>
  <section class="icon-box">
    <div class="box">
      <NovaIconTop
        data-id="42"
        @click="handleClick"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
      ></NovaIconTop>
      <NovaIconRight></NovaIconRight>
      <NovaIconBottom></NovaIconBottom>
      <NovaIconLeft></NovaIconLeft>
    </div>
    <div class="box">
      <NovaIconCheckCircle :style="{ color: '#66cc33' }"></NovaIconCheckCircle>
      <NovaIconError :style="{ color: '#ffaa00' }"></NovaIconError>
      <NovaIconInfo :style="{ color: '#0099ff' }"></NovaIconInfo>
      <NovaIconHelp :style="{ color: '#88bbee' }"></NovaIconHelp>
      <NovaIconCancel :style="{ color: '#ff3300' }"></NovaIconCancel>
    </div>
    <div class="box">
      <NovaIconDateRange></NovaIconDateRange>
      <NovaIconLoading spin></NovaIconLoading>
    </div>
  </section>
</template>

<script>
import NovaIconBottom from '@/icons/NovaIconBottom';
import NovaIconLeft from '@/icons/NovaIconLeft';
import NovaIconRight from '@/icons/NovaIconRight';
import NovaIconTop from '@/icons/NovaIconTop';
import NovaIconHelp from '@/icons/NovaIconHelp';
import NovaIconInfo from '@/icons/NovaIconInfo';
import NovaIconCheckCircle from '@/icons/NovaIconCheckCircle';
import NovaIconError from '@/icons/NovaIconError';
import NovaIconCancel from '@/icons/NovaIconCancel';
import NovaIconDateRange from '@/icons/NovaIconDateRange';
import NovaIconLoading from '@/icons/NovaIconLoading';

export default {
  name: 'IconDemo',
  components: {
    NovaIconLoading,
    NovaIconDateRange,
    NovaIconCancel,
    NovaIconError,
    NovaIconCheckCircle,
    NovaIconInfo,
    NovaIconHelp,
    NovaIconTop,
    NovaIconRight,
    NovaIconLeft,
    NovaIconBottom
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
    }
  }
};
</script>

<style>
.icon-box {
  font-size: 48px;
  color: #666666;
}
</style>
