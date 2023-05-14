<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import type { IDestinationDisplay } from '@/interfaces/interfaces';
import {useLocationsStore} from '@/stores/locations-store';
import {useDefaultTempratureTypeStore} from '@/stores/temprature-conversion-store';
import FavoritesDisplay from '@/components/favorites/FavoritesDisplay.vue';
import { toast } from 'vue3-toastify';
import { getFavoritesFromSessionStorage } from '@/services/data-service';

const displayItems = ref<IDestinationDisplay[]>([]);
const locationsStore = useLocationsStore();
const {defaultTempratureType} = storeToRefs(useDefaultTempratureTypeStore());

onMounted(() => { 
  try {
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
      else {
        const storedFavoriteLocations = getFavoritesFromSessionStorage();
        if (storedFavoriteLocations && storedFavoriteLocations.length > 0){
          displayItems.value = storedFavoriteLocations.map((location) => {
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
      }
  } 
  catch(error)
   {
    console.error(error);
    toast.error('Something went wrong fetching favorite location');
  }  
});

const clearFavorites = () => {
  try {
    const favoriteLocations = locationsStore.favoriteLocations;
    if (favoriteLocations && favoriteLocations.length > 0){
        locationsStore.resetFavoriteLocations();         
    }
    const empty:any = [];
    sessionStorage.setItem("favorites",JSON.stringify(empty));
    displayItems.value = [];
  }
  catch(error){
    toast.error("Something went wrong while trying to clear favorites");
  }
}

</script>
<template>
  <div class="favorites-page">
    <div class="favorites-container">
      <p class="favorites-page-title" v-if="displayItems && displayItems.length > 0">Here Are Your Favorite Locations</p>
      <p class="clear-favorites-container" v-if="displayItems && displayItems.length > 0"><button @click="clearFavorites" type="button" class="clear-favorites-button">Clear Favorite</button></p>
      <FavoritesDisplay v-if="displayItems && displayItems.length > 0" :display-items="displayItems"/>
      <p class="no-items-found" v-if="!displayItems || displayItems.length === 0">No Favorite Locations Found</p>
    </div>
  </div>
  </template>
  
<style scoped>
.clear-favorites-container {
 text-align: center;
 margin-bottom: 2rem;
}

.clear-favorites-button {  
  background-color: rgb(0, 89, 134,.5);
   color: #fff; 
   border: none;
   margin-left:0.5rem;  
   font-size:15px;
   cursor: pointer;
   padding:0.5rem;
   border-radius: 10px;
}
.clear-favorites-button:hover {
  background-color: #c32525;
  
}
.favorites-page{
  width: 100%;
  height:100%
}
.favorites-container {    
  padding: 20px;
  margin-top: 20px;    
  width: 80%;  
  margin: 2rem auto; 
}
.favorites-container p {
  text-align: center;
}

.no-items-found, .favorites-page-title {
  font-size: 16px;
  font-weight: bold;
}
  </style>
  