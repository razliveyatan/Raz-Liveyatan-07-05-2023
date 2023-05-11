<script setup lang="ts">
import { ref } from "vue";
import {getLocationsList, getLocationConditions, getDailyForecast, setItemInSessionStorage, getItemFromSessionStorage} from '../../services/data-service';
import {normalizeLocationObject, normalizeDestinationObject, normalizeForecastObject} from '../../services/data-helper';
import {debounce} from 'lodash';
import type {ILocation} from '@/interfaces/interfaces';

import { useCurrentConditionsStore } from "@/stores/conditions-store";
import { useLocationsStore } from "@/stores/locations-store";
import { useDefaultTempratureTypeStore} from "@/stores/temprature-conversion-store";

const currentLocationStore = useLocationsStore();
const currentLocationCondition = useCurrentConditionsStore();
const defaultTempratureType = useDefaultTempratureTypeStore();
const searchResultsVisible = ref(true); 

let input = ref('');
const cities = ref<ILocation[]>([]);

const getLocationsData = async() => {  
  try {
      if (input.value !== '' && input.value.length >= 2){
        searchResultsVisible.value = true;        
        const response = getItemFromSessionStorage('cities') != null ? getItemFromSessionStorage('cities') : await getLocationsList(input.value);              
        if (response && response.data){
          setItemInSessionStorage('cities',response);
          cities.value = [];          
          for (let i=0;i<response.data.length;i++){
            const normalized = normalizeLocationObject(response.data[i]);
            if (normalized){              
              cities.value.push(normalized);
            }
          }          
        }
      }
  }
  catch (error) {
  console.error(error); //TODO: Error Handling
}
  return {cities};
}

const debouncedFetchData = debounce(() => {
  getLocationsData()
    }, 500)

const getCurrentLocationConditions = async(city:ILocation) => {
  if (city){
    const response = getItemFromSessionStorage('locationConditions') != null ? getItemFromSessionStorage('locationConditions') : await getLocationConditions(city.cityKey);
    if (response && response.data){ 
      setItemInSessionStorage('locationConditions',response);
      for (let i=0;i<response.data.length;i++){
          const normalized = normalizeDestinationObject(city,response.data[i], defaultTempratureType.defaultTempratureType);
          if (normalized){
            currentLocationStore.setCurrentLocation(null);
            currentLocationStore.setCurrentLocation(normalized);
          }
        }
        const forecastResponse = getItemFromSessionStorage('forecastData') != null ? getItemFromSessionStorage('forecastData') : await getDailyForecast(city.cityKey, defaultTempratureType.defaultTempratureType === 'C');
        if (forecastResponse && forecastResponse.data){
          setItemInSessionStorage('forecastData',forecastResponse);
          const normalizedForecast = normalizeForecastObject(city, forecastResponse);
          if (normalizedForecast){
            currentLocationCondition.setCurrentLocationCondition(null);
            currentLocationCondition.setCurrentLocationCondition(normalizedForecast);
          }          
        }
      }
      searchResultsVisible.value = false;
  }
}


</script>

<template>
    <div class="search-container">
        <input type="text" v-model="input" @change="getLocationsData" @input="debouncedFetchData" placeholder="Search Destination..." />
        <div :class="(input !== '' && input.length > 1) && searchResultsVisible ? 'item city' : 'hidden'" v-for="city in cities" :key="city.cityID">
            <p @click="getCurrentLocationConditions(city)">{{ city.cityName + ', ' + city.countryName + ', ' + city.countryID}}</p>
        </div>
        <div class="item error" v-if="input&&!cities">
            <p>No results found!</p>
        </div>
    </div>
 </template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  padding: 20px;
  min-height: 100vh;
  background-color: rgb(234, 242, 255);
}
.search-container {
    width:100%;
    margin:0 auto;
}
input {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("src/assets/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.item {
  width: 350px;
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.city {
  background-color: rgb(97, 62, 252);
  cursor: pointer;
}

.error {
  background-color: tomato;
}

.hidden {
  display: none;
}
</style>
