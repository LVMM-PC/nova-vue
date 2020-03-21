<template>
  <section class="icon-box">
    <div class="box">
      <NovaIconTop></NovaIconTop>
      <NovaIconRight></NovaIconRight>
      <NovaIconBottom></NovaIconBottom>
      <NovaIconLeft></NovaIconLeft>
    </div>
    <div class="box">
      <NovaIconCheckCircle :style="{ color: '#66CC33' }"></NovaIconCheckCircle>
      <NovaIconError :style="{ color: '#FFAA00' }"></NovaIconError>
      <NovaIconInfo :style="{ color: '#0099FF' }"></NovaIconInfo>
      <NovaIconHelp :style="{ color: '#88BBEE' }"></NovaIconHelp>
      <NovaIconCancel :style="{ color: '#FF3300' }"></NovaIconCancel>
    </div>
    <div class="box">
      <NovaIconDateRange></NovaIconDateRange>
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

export default {
  name: 'IconDemo',
  components: {
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
    onClick(e) {
      console.log(e);
    }
  }
};
</script>

<style>
.icon-box {
  font-size: 48px;
  color: #666;
}
</style>
