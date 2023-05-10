<script setup lang="ts">
import { ref } from "vue";
import {getLocationsList, normalizeLocationObject, getLocationConditions} from '../../services/data-helper-service';
import {debounce} from 'lodash';
import type {ILocation} from '@/interfaces/interfaces';

let input = ref('');
const cities = ref<ILocation[]>([]);

const getLocationsData = async() => {  
  try {
      if (input.value !== '' && input.value.length >= 2){
        const response = await getLocationsList(input.value);              
        if (response && response.data){          
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
    const data = await getLocationConditions(city.cityKey);
    if (data){
      console.log(data);
    }
  }
}

</script>

<template>
    <div class="search-container">
        <input type="text" v-model="input" @change="getLocationsData" @input="debouncedFetchData" placeholder="Search Destination..." />
        <div :class="input !== '' && input.length > 1 ? 'item city' : 'hidden'" v-for="city in cities" :key="city.cityID">
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
