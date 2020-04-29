<template>
  <section>
    <div class="box">
      <NovaProgress
        :percent="0"
        :data-id="dataId"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
        @click="handleClick"
      ></NovaProgress>
      <NovaProgress :percent="0.25" :stroke-width="strokeWidth"></NovaProgress>
      <NovaProgress :percent="0.5" :status="status"></NovaProgress>
      <div class="inline-block">
        <div>{{ status }}</div>
        <NovaButton @click="toggleActive">
          {{ status === 'active' ? 'Set Normal' : 'Set Active' }}
        </NovaButton>
      </div>
      <NovaProgress :percent="0.75" :show-info="showInfo"></NovaProgress>
      <div class="inline-block">
        <div>{{ showInfo }}</div>
        <NovaButton @click="toggleShowInfo">Toggle ShowInfo</NovaButton>
      </div>
      <NovaProgress :percent="1"></NovaProgress>
    </div>
    <div class="box">
      <NovaProgress :percent="value"></NovaProgress>
      <NovaButton :disabled="value >= 1" @click="handleIncreasing"
        ><NovaIconAddCircle slot="icon"></NovaIconAddCircle>
      </NovaButton>
      <NovaButton :disabled="value <= 0" @click="handleDecreasing"
        ><NovaIconRemoveCircle slot="icon"></NovaIconRemoveCircle>
      </NovaButton>
    </div>
    <div class="box">
      <NovaProgress
        type="circle"
        :percent="0"
        :width="width"
        :data-id="dataId"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
        @click="handleClick"
      ></NovaProgress>
      <NovaButton :disabled="width >= 200" @click="widthIncreasing"
        ><NovaIconAddCircle slot="icon"></NovaIconAddCircle>
      </NovaButton>
      <NovaButton :disabled="width <= 0" @click="widthDecreasing">
        <NovaIconRemoveCircle slot="icon"></NovaIconRemoveCircle>
      </NovaButton>
      <NovaProgress
        class="has-guide"
        type="circle"
        :percent="0.25"
        :stroke-linecap="linecap"
      ></NovaProgress>
      <div class="inline-block">
        <div>{{ linecap }}</div>
        <NovaButton @click="toggleLinecap">Toggle Linecap</NovaButton>
      </div>
      <NovaProgress type="circle" :percent="0.5"></NovaProgress>
      <NovaProgress
        type="circle"
        :percent="0.75"
        :show-info="showInfo"
      ></NovaProgress>
      <div class="inline-block">
        <div>{{ showInfo }}</div>
        <NovaButton @click="toggleShowInfo">Toggle ShowInfo</NovaButton>
      </div>
      <NovaProgress
        type="circle"
        :percent="1"
        :width="120"
        :stroke-width="strokeWidth"
      ></NovaProgress>
      <NovaButton :disabled="strokeWidth >= 60" @click="strokeWidthIncreasing">
        <NovaIconAddCircle slot="icon"></NovaIconAddCircle>
      </NovaButton>
      <NovaButton :disabled="strokeWidth <= 0" @click="strokeWidthDecreasing">
        <NovaIconRemoveCircle slot="icon"></NovaIconRemoveCircle>
      </NovaButton>
    </div>
    <div class="box">
      <NovaProgress type="circle" :percent="value"></NovaProgress>
      <NovaButton :disabled="value >= 1" @click="handleIncreasing">
        <NovaIconAddCircle slot="icon"></NovaIconAddCircle>
      </NovaButton>
      <NovaButton :disabled="value <= 0" @click="handleDecreasing">
        <NovaIconRemoveCircle slot="icon"></NovaIconRemoveCircle>
      </NovaButton>
    </div>
  </section>
</template>

<script>
import NovaProgress from '@/components/progress/NovaProgress';
import Utils from '@/utils/utils';
import NovaButton from '@/components/button/NovaButton';
import NovaIconAddCircle from '@/icons/NovaIconAddCircle';
import NovaIconRemoveCircle from '@/icons/NovaIconRemoveCircle';

export default {
  name: 'ProgressDemo',
  components: {
    NovaIconRemoveCircle,
    NovaIconAddCircle,
    NovaButton,
    NovaProgress
  },
  data() {
    return {
      value: 0,
      status: 'active',
      showInfo: false,
      linecap: 'round',
      width: 100,
      strokeWidth: 10,
      dataId: 42
    };
  },
  methods: {
    handleClick(e) {
      console.log('Click', e);
      this.dataId = Utils.getRandomInt(0, 42);
    },
    handleMouseenter(e) {
      console.log(e);
    },
    handleMouseleave(e) {
      console.log(e);
    },
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

<style lang="less" scoped>
.nova-progress-circle {
  margin-bottom: 10px;
  margin-right: 10px;
}

.has-guide {
  &:before,
  &:after {
    width: 50px;
    height: 50px;
    border: 1px solid #29e;
    content: '';
    display: block;
    position: absolute;
    box-sizing: border-box;
  }

  &:before {
    width: 50px;
    height: 50px;
    border: 1px solid #29e;
    top: 0;
    left: 0;
  }

  &:after {
    width: 50px;
    height: 50px;
    border: 1px solid #29e;
    bottom: 0;
    right: 0;
  }
}

.inline-block {
  display: inline-block;
}

.nova-button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
