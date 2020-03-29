<template>
  <section>
    <div class="box">
      <NovaProgress :percent="0"></NovaProgress>
      <NovaProgress :percent="0.25"></NovaProgress>
      <NovaProgress :percent="0.5" :status="status"></NovaProgress>
      <div class="inline-block">
        <div>{{ status }}</div>
        <button @click="toggleActive">
          {{ status === 'active' ? 'Set Normal' : 'Set Active' }}
        </button>
      </div>
      <NovaProgress :percent="0.75" :show-info="showInfo"></NovaProgress>
      <div class="inline-block">
        <div>{{ showInfo }}</div>
        <button @click="toggleShowInfo">Toggle ShowInfo</button>
      </div>
      <NovaProgress :percent="1"></NovaProgress>
    </div>
    <div class="box">
      <NovaProgress :percent="value"></NovaProgress>
      <button @click="handleIncreasing">+</button>
      <button @click="handleDecreasing">-</button>
    </div>
    <div class="box">
      <NovaProgress type="circle" :percent="0" :width="width"></NovaProgress>
      <button @click="widthIncreasing">+</button>
      <button @click="widthDecreasing">-</button>
      <NovaProgress
        class="has-guide"
        type="circle"
        :percent="0.25"
        :stroke-linecap="linecap"
      ></NovaProgress>
      <div class="inline-block">
        <div>{{ linecap }}</div>
        <button @click="toggleLinecap">Toggle Linecap</button>
      </div>
      <NovaProgress type="circle" :percent="0.5"></NovaProgress>
      <NovaProgress
        type="circle"
        :percent="0.75"
        :show-info="showInfo"
      ></NovaProgress>
      <div class="inline-block">
        <div>{{ showInfo }}</div>
        <button @click="toggleShowInfo">Toggle ShowInfo</button>
      </div>
      <NovaProgress
        type="circle"
        :percent="1"
        :width="120"
        :stroke-width="strokeWidth"
      ></NovaProgress>
      <button @click="strokeWidthIncreasing">+</button>
      <button @click="strokeWidthDecreasing">-</button>
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
import Utils from '@/utils/utils';

export default {
  name: 'ProgressDemo',
  components: {
    NovaProgress
  },
  data() {
    return {
      value: 0,
      status: 'active',
      showInfo: false,
      linecap: 'round',
      width: 100,
      strokeWidth: 10
    };
  },
  methods: {
    handleIncreasing() {
      this.value = Utils.numberLimit(this.value + 1 / 8, 0, 1);
    },
    handleDecreasing() {
      this.value = Utils.numberLimit(this.value - 1 / 8, 0);
    },
    widthIncreasing() {
      this.width += 10;
    },
    widthDecreasing() {
      this.width = Utils.numberLimit(this.width - 10, 0);
    },
    strokeWidthIncreasing() {
      this.strokeWidth = Utils.numberLimit(this.strokeWidth + 5, 0, 60);
    },
    strokeWidthDecreasing() {
      this.strokeWidth = Utils.numberLimit(this.strokeWidth - 5, 0);
    },
    toggleActive() {
      if (this.status === 'active') {
        this.status = 'normal';
      } else {
        this.status = 'active';
      }
    },
    toggleShowInfo() {
      this.showInfo = !this.showInfo;
    },
    toggleLinecap() {
      switch (this.linecap) {
        case 'butt':
          this.linecap = 'round';
          break;
        case 'round':
          this.linecap = 'square';
          break;
        case 'square':
        default:
          this.linecap = 'butt';
          break;
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

.has-guide {
  background-image: url(../../assets/guide.svg);
}

.inline-block {
  display: inline-block;
}
</style>
