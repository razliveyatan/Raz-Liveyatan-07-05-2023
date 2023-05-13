<script setup lang="ts">
import IconCurrentWeather from '@/components/icons/IconCurrentWeather.vue'
import DestionationDetailsVue from './DestionationDetails.vue'
import type { IDestinationDisplay } from '@/interfaces/interfaces';

const props = defineProps<{
  displayItems: IDestinationDisplay[];  
}>();

</script>

<template>
    <div class="destination-display-container" :class="{'multiple': props.displayItems.length > 1}">
      <div class="destination-display-item" v-for="displayItem in props.displayItems" :key="displayItem.cityKey">
        <IconCurrentWeather :icon-url="displayItem.weatherIcon" />
        <DestionationDetailsVue
          :city-name="displayItem.cityName"
          :temperature="displayItem.tempratureValue"
          :temperature-type="displayItem.tempratureValueType" :tempertaute-type="displayItem.tempratureValueType"
        />
      </div>
    </div>
  </template>

<style scoped>
.destination-display-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.destination-display-item {
  display: flex;
  align-items: center;
  margin-right: 10px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.destination-display-item.show {
  opacity: 1;
  transform: translateY(0);
}
</style>