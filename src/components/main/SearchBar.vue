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
    toast.error('An error occured while fetching locations' + error, {
      autoClose:1000,
    });
}
  return {cities};
}

const debouncedFetchData = debounce(() => {
  getLocationsData()
    }, 500)

const getCurrentLocationConditions = async(city:ILocation) => {
  if (city){
    try {
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
            currentLocationForecast.setCurrentLocationForecast(null);
            currentLocationForecast.setCurrentLocationForecast(normalizedForecast);
          }          
        }
      }
      searchResultsVisible.value = false;
    }
    catch(error){
      console.error(error);     
      toast.error('An error occured while fetching current location conditions' + error, {
      autoClose:1000,
    });
    }    
  }
}

onMounted(() =>{
  const location = currentLocationStore.currentLocation;
  const city = {
    cityName: location?.cityName,
    cityKey:location?.cityKey        
  } as ILocation
  if (city){
    getCurrentLocationConditions(city)
    .catch(error => {
        console.error(error);
        toast.error('An error occurred while fetching current location conditions: ' + error, {
          autoClose: 1000,
        });
      });
    }  
});


</script>

<template>
  <div class="search-container">
    <input type="text" v-model="input" @change="getLocationsData" @input="debouncedFetchData" placeholder="Search Destination..." />
    <div class="search-results" v-if="input !== '' && input.length > 1 && searchResultsVisible">
      <div class="city-item" v-for="city in cities" :key="city.cityID" @click="getCurrentLocationConditions(city)">
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

.search-container input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.search-container .item.city {
  background-color: #fff;
  padding: 5px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
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

/* .search-container {
  position: relative;
  display: flex;
  align-items: center;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.item.city {
  padding: 10px;
  background-color: #f5f5f5;
  cursor: pointer;
}

.hidden {
  display: none;
}

.item.error {
  color: red;
} */

/* @import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

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
} */
</style>
