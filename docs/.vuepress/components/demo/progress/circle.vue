<template>
  <section>
    <NovaProgress type="circle" :percent="0.25"></NovaProgress>
    <NovaProgress type="circle" :percent="1"></NovaProgress>
    <NovaProgress
      type="circle"
      :percent="0.5"
      :show-info="false"
    ></NovaProgress>
  </section>
</template>
