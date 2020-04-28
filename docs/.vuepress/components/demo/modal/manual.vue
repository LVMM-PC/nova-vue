<template>
  <section>
    <NovaButton @click="countDown">Open modal to close in 5s</NovaButton>
  </section>
</template>

<script>
import { NovaConfirm } from 'nova-vue';

export default {
  setup() {
    function countDown() {
      let secondsToGo = 5;

      const confirmInstance = NovaConfirm.success({
        title: 'This is a notification message',
        content: `This modal will be destroyed after ${secondsToGo} second.`
      });

      const timer = setInterval(() => {
        secondsToGo -= 1;
        confirmInstance.update({
          content: `This modal will be destroyed after ${secondsToGo} second.`
        });
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
        confirmInstance.destroy();
      }, secondsToGo * 1000);
    }

    return {
      countDown
    };
  }
};
</script>
