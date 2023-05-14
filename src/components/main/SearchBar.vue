<script setup lang="ts">
import { onMounted, ref } from "vue";
import {getLocationsList, getLocationConditions, getDailyForecast, setItemInSessionStorage, getItemFromSessionStorage} from '../../services/data-service';
import {normalizeLocationObject, normalizeDestinationObject, normalizeForecastObject} from '../../services/data-helper';
import _, {debounce} from 'lodash';
import type {ILocation} from '@/interfaces/interfaces';
import {toast} from 'vue3-toastify';

import { useCurrentConditionsStore } from "@/stores/conditions-store";
import { useLocationsStore } from "@/stores/locations-store";
import { useDefaultTempratureTypeStore} from "@/stores/temprature-conversion-store";

const currentLocationStore = useLocationsStore();
const currentLocationForecast = useCurrentConditionsStore();
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
    console.error(error);     
    toast.error('An error occured while fetching locations' + error);
}
  return {cities};
}

const debouncedFetchData = debounce(() => {
  getLocationsData()
    }, 500)

const getCurrentLocationConditions = async(city:ILocation) => {
  if (city){
    try {
      const response = await getLocationConditions(city.cityKey);
      if (response && response.data){       
      for (let i=0;i<response.data.length;i++){
          const normalized = normalizeDestinationObject(city,response.data[i], defaultTempratureType.defaultTempratureType);
          if (normalized){
            currentLocationStore.setCurrentLocation(null);
            currentLocationStore.setCurrentLocation(normalized);
          }
        }
        const forecastResponse = await getDailyForecast(city.cityKey, defaultTempratureType.defaultTempratureType === 'C');
        if (forecastResponse && forecastResponse.data){          
          const normalizedForecast = normalizeForecastObject(city, forecastResponse);
          if (normalizedForecast){
            currentLocationForecast.setCurrentLocationForecast(null);
            currentLocationForecast.setCurrentLocationForecast(normalizedForecast);
          }          
        }
      }     
      searchResultsVisible.value = false;
    }
    catch(error){
      console.error(error);     
      toast.error('An error occured while fetching current location conditions' + error);
    }    
  }
}

onMounted(() =>{     
  const location = currentLocationStore.currentLocation;
  const city = {
    cityName: location && location?.cityName !== '' ? location?.cityName : 'Tel Aviv',
    cityKey:location && location?.cityKey ? location?.cityKey : 215854
  } as ILocation
  if (city){
    getCurrentLocationConditions(city)
    .catch(error => {
        console.error(error);
        toast.error('An error occurred while fetching current location conditions: ' + error);
      });
    }  
});


</script>

<template>
  <div class="search-container">
    <input type="text" v-model="input" @change="getLocationsData" @input="debouncedFetchData" placeholder="Search Destination..." />
    <div class="search-results" v-if="input !== '' && input.length > 1 && searchResultsVisible">
      <div class="city-item" v-for="city in cities" :key="city.cityKey" @click="getCurrentLocationConditions(city)">
        <p>{{ city.cityName + ', ' + city.countryName + ', ' + city.countryID}}</p>
      </div>
      <div class="item error" v-if="input && !cities">
        <p>No results found!</p>
      </div>
    </div>    
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
  margin-bottom: 20px;
}

.search-results{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  max-height:200px;
  overflow: hidden;
  overflow-y: scroll;
}
.search-results::-webkit-scrollbar {
        width: 12px;
  }
  
  .search-results::-webkit-scrollbar-track {
      border-radius: 8px;
      background-color: #e7e7e7;
      border: 1px solid #cacaca;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  }
  
  .search-results::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: rgb(0, 89, 134,.5);;
  }

.search-container input {
  width: 300px;
  padding: 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: border-color 0.3s ease;
  outline:none; 
}

.search-container .city-item {
    width: 300px;
    padding: 8px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    transition: border-color 0.3s ease;
    background-color: rgb(0, 89, 134,.5);
    cursor: pointer;
}

.search-container .city-item:hover {
    transition: border-color 0.3s ease;
    background-color: rgba(233, 236, 238, 0.5);
    color:rgb(0, 89, 134)
    
}

.search-container .item.city p {
  margin: 0;
  padding: 5px;
}

.search-container .item.city.show {
  opacity: 1;
}

.search-container .item.error {
  background-color: #f8d7da;
  color: #721c24;
  padding: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.search-container .item.error.show {
  opacity: 1;
}

</style>
