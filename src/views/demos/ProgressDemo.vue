<template>
  <section>
    <div class="box">
      <NovaProgress :percent="0"></NovaProgress>
      <NovaProgress :percent="0.25"></NovaProgress>
      <NovaProgress :percent="0.5"></NovaProgress>
      <NovaProgress :percent="0.75"></NovaProgress>
      <NovaProgress :percent="1"></NovaProgress>
    </div>
    <div class="box">
      <NovaProgress :percent="value"></NovaProgress>

      <button @click="handleIncreasing">+</button>
      <button @click="handleDecreasing">-</button>
    </div>
    <div class="box">
      <NovaProgress type="circle" :percent="0"></NovaProgress>
      <NovaProgress type="circle" :percent="0.25"></NovaProgress>
      <NovaProgress type="circle" :percent="0.5"></NovaProgress>
      <NovaProgress type="circle" :percent="0.75"></NovaProgress>
      <NovaProgress type="circle" :percent="1"></NovaProgress>
    </div>
    <div class="box">
      <NovaProgress type="circle" :percent="value"></NovaProgress>

      <button @click="handleIncreasing">+</button>
      <button @click="handleDecreasing">-</button>
    </div>
  </section>
</template>

<script>
import NovaProgress from '@/components/progress/NovaProgress';

export default {
  name: 'ProgressDemo',
  components: {
    NovaProgress
  },
  data() {
    return {
      value: 0
    };
  },
  methods: {
    handleIncreasing() {
      this.value += 1 / 8;
      if (this.value > 1) {
        this.value = 1;
      }
    },
    handleDecreasing() {
      this.value -= 1 / 8;
      if (this.value < 0) {
        this.value = 0;
      }
    }
  }
};
</script>

<style scoped>
.nova-progress-circle {
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
