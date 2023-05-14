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

import { onMounted, reactive, watch } from 'vue';
import type {IDestinationDisplay} from '@/interfaces/interfaces';

const locationStore = useLocationsStore();
const {currentLocation} = storeToRefs(useLocationsStore());
const currentConditionsStore = useCurrentConditionsStore();

const defaultTempratureType = useDefaultTempratureTypeStore().defaultTempratureType;
const displayItems = reactive<IDestinationDisplay[]>([]);
const forecastItems = reactive<IDailyForecast[]>([]);
let highlightText = reactive<any>([]);

if (currentLocation && currentLocation !== null){    
    watch([currentLocation, currentConditionsStore],([newVal,forecast]) => {
      displayItems.splice(0);
  const newDisplayItem: IDestinationDisplay = {    
    weatherIcon: newVal?.weatherIcon ?? '',
    WeatherText: newVal?.WeatherText ?? '',
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
    highlightText = forecast.currentLocationForecast?.highLightString;
    const dailyForecastArray = forecast.currentLocationForecast?.dailyForecast;
    if (dailyForecastArray){
      forecastItems.splice(0);
      dailyForecastArray.forEach((forecast:IDailyForecast) => {
          forecastItems.push(forecast);
      })
    }
  });
}

onMounted(() => {
  // displayItems.splice(0);
  // forecastItems.splice(0);
  if (!locationStore.isFromFavoritesLocations){
    currentLocation.value = null;
    currentConditionsStore.setCurrentLocationForecast(null);
  }
});

</script>
<template>
    <div class="search-results-card" v-if="displayItems.length > 0 && currentLocation !== null">
        <div class="search-results-card-top-inner">
            <DestinationDisplay :display-items="displayItems"/>
            <AddToFavoriteButton/>           
        </div>        
        <MainForecast :forecast-synopsis="highlightText"/>   
        <DailyForecast :forecasts="forecastItems"/>
    </div>
</template>


<style scoped>
.search-results-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.search-results-card-top-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  padding:0 1rem;
}

@media (max-width: 650px) { 
  .search-results-card-top-inner {
    width: 85%;
  }
}

</style>