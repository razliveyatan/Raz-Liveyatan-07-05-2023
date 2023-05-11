<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import type { IDestinationDisplay } from '@/interfaces/interfaces';
import DestinationDisplay from '@/components/main/SearchResults/SearchResultCard/TopSection/DestinationDisplay/DestinationDisplay.vue';
import {useLocationsStore} from '@/stores/locations-store';
import {useDefaultTempratureTypeStore} from '@/stores/temprature-conversion-store';

const displayItems = ref<IDestinationDisplay[]>([]);

const {favoriteLocations} = storeToRefs(useLocationsStore());
const {defaultTempratureType} = storeToRefs(useDefaultTempratureTypeStore());

watch(
  () => favoriteLocations.value,
  (newVal) => {
    displayItems.value.splice(0, displayItems.value.length); // Clear the displayItems array
    newVal.forEach((location) => {
      const newDisplayItem: IDestinationDisplay = {
        weatherIcon: location.weatherIcon ?? '',
        cityName: location.cityName ?? '',
        cityKey: location.cityKey ?? 0,
        tempratureValue:
          defaultTempratureType.value === 'C'
            ? location.weatherCelsiusTemprature
            : location.weatherFahrenheitTemprature,
        tempratureValueType:defaultTempratureType.value ? defaultTempratureType.value : 'C',
        weatherCelsiusTemprature: location.weatherCelsiusTemprature ?? 0,
        weatherCelsiusUnitType: location.weatherCelsiusUnitType ?? '',
        weatherFahrenheitTemprature: location.weatherFahrenheitTemprature ?? 0,
        weatherFahrenheitlUnitType: location.weatherFahrenheitlUnitType ?? '',
      };
      displayItems.value.push(newDisplayItem);
    });
  }
);</script>
<template>
    <DestinationDisplay :display-items="displayItems"/>
  </template>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  