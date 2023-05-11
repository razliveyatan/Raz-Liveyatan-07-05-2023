<script setup lang="ts">
type CityWeatherSynopsisProps = {
    forecastSynopsis: string|null;
}
defineProps<CityWeatherSynopsisProps>();
</script>
<template>
     <h1 class="main-forecast-synopsis">{{ forecastSynopsis }}</h1>
    <!-- <h1 class="main-forecast-synopsis">Mostly Cloudy</h1> -->
</template>

<style scoped>
.main-forecast-synopsis {
    margin:5rem auto;
    align-items: center;
}
</style>