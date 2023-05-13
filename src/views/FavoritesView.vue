<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import type { IDestinationDisplay } from '@/interfaces/interfaces';
import {useLocationsStore} from '@/stores/locations-store';
import {useDefaultTempratureTypeStore} from '@/stores/temprature-conversion-store';
import FavoritesDisplay from '@/components/favorites/FavoritesDisplay.vue';

const displayItems = ref<IDestinationDisplay[]>([]);
const locationsStore = useLocationsStore();
const {defaultTempratureType} = storeToRefs(useDefaultTempratureTypeStore());

onMounted(() => {  
  const favoriteLocations = locationsStore.favoriteLocations;
  if (favoriteLocations.length > 0) {    
    displayItems.value = favoriteLocations.map((location) => {
      return {
        weatherIcon: location.weatherIcon ?? '',
        WeatherText: location.WeatherText ?? '',
        cityName: location.cityName ?? '',
        cityKey: location.cityKey ?? 0,
        tempratureValue:
          defaultTempratureType.value === 'C'
            ? location.weatherCelsiusTemprature
            : location.weatherFahrenheitTemprature,
        tempratureValueType: defaultTempratureType.value ?? 'C',
        weatherCelsiusTemprature: location.weatherCelsiusTemprature ?? 0,
        weatherCelsiusUnitType: location.weatherCelsiusUnitType ?? '',
        weatherFahrenheitTemprature: location.weatherFahrenheitTemprature ?? 0,
        weatherFahrenheitlUnitType: location.weatherFahrenheitlUnitType ?? '',
      };
    });
  }
});

</script>
<template>
  <div class="favorites-container">
    <FavoritesDisplay v-if="displayItems && displayItems.length > 0" :display-items="displayItems"/>
    <p v-if="!displayItems || displayItems.length === 0">No Favorite Locations Chosen</p>
  </div>
  </template>
  
<style scoped>
.favorites-container {    
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 920px;
    margin: 2rem auto;
}
.favorites-container p {
  text-align: center;
}
  </style>
  