import { onBeforeUnmount, onMounted, ref } from '@vue/composition-api';

export function useClickPosition() {
  let timer;
  const x = ref(0);
  const y = ref(0);

  function update(e) {
    x.value = e.pageX - window.pageXOffset;
    y.value = e.pageY - window.pageYOffset;

    clearTimeout(timer);
    timer = setTimeout(() => {
      x.value = 0;
      y.value = 0;
    }, 100);
  }

  onMounted(() => {
    document.addEventListener('click', update);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', update);
  });

  return {
    x,
    y
  };
}
