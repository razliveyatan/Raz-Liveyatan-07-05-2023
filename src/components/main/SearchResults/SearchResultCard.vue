<script setup lang="ts">
import DailyForecast from './SearchResultCard/BottomSection/DailyForecast.vue';
import MainForecast from './SearchResultCard/MainSection/MainForecast.vue';
import AddToFavoriteButton from './SearchResultCard/TopSection/AddToFavoriteButton.vue';
import DestinationDisplay from './SearchResultCard/TopSection/DestinationDisplay/DestinationDisplay.vue';
import type {IDailyForecast} from "@/interfaces/interfaces";
import { storeToRefs } from 'pinia';
import {useLocationsStore} from '@/stores/locations-store';
import {useDefaultTempratureTypeStore} from '@/stores/temprature-conversion-store';
import { useCurrentConditionsStore } from '@/stores/conditions-store';

import { reactive, watch } from 'vue';
import type {IDestinationDisplay} from '@/interfaces/interfaces';

const {currentLocation} = storeToRefs(useLocationsStore());
const currentConditionsStore = useCurrentConditionsStore();
const defaultTempratureType = useDefaultTempratureTypeStore().defaultTempratureType;
const displayItems = reactive<IDestinationDisplay[]>([]);
const forecastItems = reactive<IDailyForecast[]>([]);
let highlightText = reactive<any>([]);

if (currentLocation){
    watch(currentLocation, (newVal) => {    
  const newDisplayItem: IDestinationDisplay = {    
    weatherIcon: newVal?.weatherIcon ?? '',
    cityName: newVal?.cityName ?? '',
    cityKey:newVal?.cityKey ?? 0,
    tempratureValue: newVal?.tempratureValue ?? 0,
    tempratureValueType: defaultTempratureType ? defaultTempratureType : 'C',
    weatherCelsiusTemprature: newVal?.weatherCelsiusTemprature ?? 0,
    weatherCelsiusUnitType: newVal?.weatherCelsiusUnitType ?? '',
    weatherFahrenheitTemprature: newVal?.weatherCelsiusTemprature ?? 0,
    weatherFahrenheitlUnitType: newVal?.weatherFahrenheitlUnitType ?? ''
    };
  displayItems.push(newDisplayItem);
  highlightText = currentConditionsStore.currentLocationCondition?.highLightString;
  const dailyForecastArray = currentConditionsStore.currentLocationCondition?.dailyForecast;
  if (dailyForecastArray){
    dailyForecastArray.forEach((forecast:IDailyForecast) => {
        forecastItems.push(forecast);
    })
  }
});
}

</script>
<template>
    <div class="search-results-card" v-if="displayItems.length > 0">
        <div class="search-results-card-top-inner">
            <DestinationDisplay :display-items="displayItems"/>
            <AddToFavoriteButton/>           
        </div>        
        <MainForecast :forecast-synopsis="highlightText"/>   
        <DailyForecast :forecasts="forecastItems" :is-day-time="currentConditionsStore.currentLocationCondition?.isDayTime"/>
    </div>
</template>

<style scoped>
.hidden {
    display: none;
}

.search-results-card {
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 920px;
    margin:0 auto;
}

.search-results-card-top-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
}
/* .search-results-card {
    background-color:cornsilk;
    border: 1px black solid;
    width:860px;
    min-height: 120px;
    display: flex; 
    flex-direction: column;
    margin:0 auto;
}
.search-results-card-top-inner {
    padding: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
} */
</style>