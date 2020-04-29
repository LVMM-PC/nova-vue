<template>
  <section>
    <NovaIconHelp :style="{ fontSize: '48px', color: '#88bbee' }" />
    <NovaIconInfo :style="{ fontSize: '40px', color: '#0099ff' }" />
    <NovaIconCheckCircle :style="{ fontSize: '32px', color: '#66cc33' }" />
    <NovaIconCancel :style="{ fontSize: '24px', color: '#ff3300' }" />
    <NovaIconError :style="{ fontSize: '16px', color: '#ffaa00' }" />
    <NovaIconLoading spin />
  </section>
</template>

<script>
import {
  NovaIconHelp,
  NovaIconInfo,
  NovaIconCheckCircle,
  NovaIconCancel,
  NovaIconError,
  NovaIconLoading
} from 'nova-vue';

export default {
  components: {
    NovaIconHelp,
    NovaIconInfo,
    NovaIconCheckCircle,
    NovaIconCancel,
    NovaIconError,
    NovaIconLoading
  }
};
</script>
