<script setup lang="ts">
import {watch, reactive,ref,onMounted} from 'vue';
import { storeToRefs } from 'pinia';
import type { IDestinationDisplay } from '@/interfaces/interfaces';
import DestionationDetails from '../main/SearchResults/SearchResultCard/TopSection/DestinationDisplay/DestionationDetails.vue';
import IconCurrentWeather from '../icons/IconCurrentWeather.vue'
import MainForecast from '../main/SearchResults/SearchResultCard/MainSection/MainForecast.vue';
import { useLocationsStore } from "@/stores/locations-store";
import { toast } from 'vue3-toastify';
import router from '@/router';
import { useDefaultTempratureTypeStore} from "@/stores/temprature-conversion-store";
const {defaultTempratureType} = storeToRefs(useDefaultTempratureTypeStore());
let temperature = reactive<any>([]); 

watch(defaultTempratureType, (newVal) => { 
  temperature=newVal;
});


const currentLocationStore = useLocationsStore();

const favoriteProps = defineProps<{
  displayItems: IDestinationDisplay[];  
}>();

const handleFavoriteItemClick = (item:IDestinationDisplay) => {      
  if (item){
    try {
      currentLocationStore.setCurrentLocation(item);
      currentLocationStore.setIsFromFavoritesLocations(true);
      router.push('/Main');
    }
    catch (error) {
      console.error(error);     
      toast.error('An error occured while setting location to store' + error);
  }     
}; 
}

</script>
<template>
  <div class="favorites-list-items">
    <div class="favorites-item" v-for="item in favoriteProps.displayItems" :key="item.cityKey" @click="handleFavoriteItemClick(item)">
        <DestionationDetails :city-name="item.cityName" :temperature="defaultTempratureType === 'F' ? item.weatherFahrenheitTemprature : item.weatherCelsiusTemprature" :tempertaute-type="defaultTempratureType ? defaultTempratureType : item.tempratureValueType" />
        <IconCurrentWeather :icon-url="item.weatherIcon" class="icon-favorites"/>            
        <MainForecast :forecast-synopsis="item.WeatherText" class="mainforecast-favorites"/> 
    </div>    
  </div>    
</template>

<style scoped>

.favorites-list-items {
  display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 3rem;
    width: 100%;
    overflow: hidden;
}
.favorites-item {  
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;    
  transition: opacity 0.3s ease, transform 0.3s ease;
  width:200px;
  background-color: rgb(0, 89, 134,.5);
  border-radius: 10px;
  height: auto;
  justify-content: center;
  padding: 1rem 0;
  cursor: pointer;
}

.icon-favorites{
  margin-top:2rem;
}
.mainforecast-favorites{
  margin-top:1rem;
}

</style>