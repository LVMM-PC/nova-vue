<template>
  <NovaCalendar>
    <template v-slot:dateCellRender="slotProps">
      <div class="date-cell">
        <div class="date-num">{{ getDate(slotProps.date) }}</div>
        <ul class="events">
          <li
            v-for="(event, eventIndex) in getListData(slotProps.date)"
            :key="eventIndex"
          >
            <NovaAlert :type="event.type">{{ event.content }}</NovaAlert>
          </li>
        </ul>
      </div>
    </template>
  </NovaCalendar>
</template>

<script>
import dayjs from 'dayjs';

function getListData(date) {
  let listData;
  switch (dayjs(date).date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is success event.' }
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is success event.' },
        { type: 'error', content: 'This is error event.' }
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is very long usual event.' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' }
      ];
      break;
  }
  return listData;
}

export default {
  name: 'notice',
  methods: {
    getListData,
    getDate(date) {
      return dayjs(date).date();
    }
  }
};
</script>

<style lang="less" scoped>
.date-num {
  text-align: right;
  padding: 5px;
  line-height: 10px;
}

.events {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 20px 0 0 5px;
  padding: 0;
  overflow-y: auto;

  li {
    list-style: none;
  }
}
</style>
