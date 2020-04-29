<template>
  <section>
    <NovaProgress :percent="0.25"></NovaProgress>
    <NovaProgress :percent="0.25" status="active"></NovaProgress>
    <NovaProgress :percent="1"></NovaProgress>
    <NovaProgress :percent="0.5" :show-info="false"></NovaProgress>
  </section>
</template>
