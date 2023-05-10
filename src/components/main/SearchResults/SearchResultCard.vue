<script setup lang="ts">
import DailyForecast from './SearchResultCard/BottomSection/DailyForecast.vue';
import MainForecast from './SearchResultCard/MainSection/MainForecast.vue';
import AddToFavoriteButton from './SearchResultCard/TopSection/AddToFavoriteButton.vue';
import DestinationDisplay from './SearchResultCard/TopSection/DestinationDisplay/DestinationDisplay.vue';
</script>
<template>
    <div class="search-results-card">
        <div class="search-results-card-top-inner">
            <DestinationDisplay/>
            <AddToFavoriteButton/>           
        </div>        
        <MainForecast :forecast-synopsis="null"/>
        <DailyForecast/>
    </div>
</template>

<style scoped>
.search-results-card {
    background-color:cornsilk;
    border: 1px black solid;
    width:860px;
    min-height: 120px;
    display: flex; 
    flex-direction: column;
    margin:0 auto;
}
.search-results-card-top-inner {
    padding: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>