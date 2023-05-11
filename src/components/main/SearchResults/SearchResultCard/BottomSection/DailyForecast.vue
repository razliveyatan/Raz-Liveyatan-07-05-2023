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
        <div class="daily-forecast-item" v-for="forecast in forecasts">
            <DayGeneralDetails :date="forecast.date"/>
            <IconCurrentWeatherVue :icon-url="isDayTime ? forecast.day.weatherIcon : forecast.night.weatherIcon"/>
            <DayTempratures :min-temperature="forecast.minTemperature.temperature" :max-temperature="forecast.maxTemperature.temperature"/>
        </div>
    </div>
</template>

<style scoped>
.daily-forecast-cotainer {
    display:grid;
    gap: 3rem;
    grid-template-columns: repeat(1,minmax(0,1fr));    
}
@media (min-width: 1024px)
    {
        .daily-forecast-cotainer {
        grid-template-columns: repeat(3,minmax(0,1fr));
    }
}

@media (min-width: 768px){
    .daily-forecast-cotainer {
        grid-template-columns: repeat(2,minmax(0,1fr));
    }
}

.daily-forecast-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    padding: 2rem;
    border: 1px solid gray;
    width: 175px;
}
</style>