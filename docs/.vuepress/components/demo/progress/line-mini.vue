<template>
  <section style="width: 50%">
    <NovaProgress :percent="0.25" :stroke-width="5"></NovaProgress>
    <NovaProgress
      :percent="0.25"
      status="active"
      :stroke-width="5"
    ></NovaProgress>
    <NovaProgress :percent="1" :stroke-width="5"></NovaProgress>
    <NovaProgress
      :percent="0.5"
      :show-info="false"
      :stroke-width="5"
    ></NovaProgress>
  </section>
</template>
