<script setup lang="ts">
import IconCurrentWeatherVue from '@/components/icons/IconCurrentWeather.vue';
import DayGeneralDetails from './DayGeneralDetails.vue';
import DayTempratures from './DayTempratures.vue';
import type { IDailyForecast } from '@/interfaces/interfaces';

type forecastProps = {
    forecasts: IDailyForecast[] | null;
    isDayTime:boolean | undefined
}
defineProps<forecastProps>();

</script>
<template>
    <div class="daily-forecast-cotainer">
        <div class="daily-forecast-item" :class="{'show': forecast }" v-for="forecast in forecasts" :key="forecast.date.toString()">
            <DayGeneralDetails :date="forecast.date"/>
            <IconCurrentWeatherVue :icon-url="isDayTime ? forecast.day.weatherIcon : forecast.night.weatherIcon"/>
            <DayTempratures :min-temperature="forecast.minTemperature.temperature" :max-temperature="forecast.maxTemperature.temperature"/>
        </div>
    </div>
</template>

<style scoped>
.daily-forecast-cotainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.daily-forecast-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.daily-forecast-item.show {
  opacity: 1;
  transform: translateY(0);
}
</style>