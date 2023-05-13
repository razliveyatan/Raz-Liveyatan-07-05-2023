<script setup lang="ts">
import type { IDestinationDisplay } from '@/interfaces/interfaces';
import DestionationDetails from '../main/SearchResults/SearchResultCard/TopSection/DestinationDisplay/DestionationDetails.vue';
import IconCurrentWeather from '../icons/IconCurrentWeather.vue'
import MainForecast from '../main/SearchResults/SearchResultCard/MainSection/MainForecast.vue';
import { useLocationsStore } from "@/stores/locations-store";
import { toast } from 'vue3-toastify';
import router from '@/router';


const currentLocationStore = useLocationsStore();

const favoriteProps = defineProps<{
  displayItems: IDestinationDisplay[];  
}>();

const handleFavoriteItemClick = (item:IDestinationDisplay) => {      
  if (item){
    try {
      currentLocationStore.setCurrentLocation(item);
      router.push('/main');
    }
    catch (error) {
      console.error(error);     
      toast.error('An error occured while setting location to store' + error, {
      autoClose:1000,
    });
  }     
}; 
}

</script>
<template>    
    <div class="favorites-item" v-for="item in favoriteProps.displayItems" :key="item.cityKey" @click="handleFavoriteItemClick(item)">
        <DestionationDetails :city-name="item.cityName" :temperature="item.tempratureValue" :tempertaute-type="item.tempratureValueType" />
        <IconCurrentWeather :icon-url="item.weatherIcon"/>            
        <MainForecast :forecast-synopsis="item.WeatherText"/> 
    </div>    
</template>

<style scoped>

</style>