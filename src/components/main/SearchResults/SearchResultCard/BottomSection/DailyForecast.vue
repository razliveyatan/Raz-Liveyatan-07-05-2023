<script setup lang="ts">
import IconCurrentWeatherVue from '@/components/icons/IconCurrentWeather.vue';
import DayGeneralDetails from './DayGeneralDetails.vue';
import DayTempratures from './DayTempratures.vue';
import type { IDailyForecast } from '@/interfaces/interfaces';

type forecastProps = {
    forecasts: IDailyForecast[] | null;    
}
defineProps<forecastProps>();

</script>
<template>
    <div class="daily-forecast-cotainer">
        <div class="daily-forecast-item" :class="{'show': forecast }" v-for="forecast in forecasts" :key="forecast.date.toString()">
            <DayGeneralDetails :date="forecast.date"/>
            <IconCurrentWeatherVue :icon-url="forecast.day.weatherIcon"/>
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
  gap:4rem;
}

.daily-forecast-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  width:150px;
  background-color: rgb(0, 89, 134,.5);
  border-radius: 10px;
  height: 150px;
  justify-content: center;
}

.daily-forecast-item.show {
  opacity: 1;
  transform: translateY(0);
}
@media (max-width: 650px) { 
  .daily-forecast-cotainer {
    align-items: center;
    justify-content: center;
    width:80%;
  }
  .daily-forecast-item {
    width:260px;
  }
}
</style>