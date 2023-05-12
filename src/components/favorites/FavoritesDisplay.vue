<script setup lang="ts">
import type { IDestinationDisplay } from '@/interfaces/interfaces';
import DestionationDetails from '../main/SearchResults/SearchResultCard/TopSection/DestinationDisplay/DestionationDetails.vue';
import IconCurrentWeather from '../icons/IconCurrentWeather.vue'
import MainForecast from '../main/SearchResults/SearchResultCard/MainSection/MainForecast.vue';

const favoriteProps = defineProps<{
  displayItems: IDestinationDisplay[];  
}>();

</script>
<template>    
    <div class="favorites-item" v-for="item in favoriteProps.displayItems" :key="item.cityKey">
        <DestionationDetails :city-name="item.cityName" :temperature="item.tempratureValue" :tempertaute-type="item.tempratureValueType" />
        <IconCurrentWeather :icon-url="item.weatherIcon"/>            
        <MainForecast :forecast-synopsis="item.WeatherText"/> 
    </div>    
</template>

<style scoped>

</style>