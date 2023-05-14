<script setup lang="ts">
import {getDayName, getDateString} from "@/services/data-helper";
type dateProps = {
    date: any | null;
}
defineProps<dateProps>()
</script>

<template>
    <div class="daily-general-details-container" :class="{'show' : date}">
        <span class="day-name">{{ getDayName(getDateString(new Date(date),false)) }}</span>
        <span class="day-date">{{getDateString(new Date(date),true)}}</span>
    </div>
</template>

<style scoped>
.daily-general-details-container {
  text-align: center;
  margin-bottom: 10px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.daily-general-details-container.show {
  opacity: 1;
  transform: translateY(0);
}

.day-name {
  font-size: 18px;
  font-weight: bold;
  margin-right:0.5rem;
}

.day-date {
  font-size: 14px;
  color: #f3d4d4;
}
</style>