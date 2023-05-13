<script setup lang="ts">
  defineProps<{
    forecastSynopsis: string|null,  
}>();
</script>

<template>
    <h1 class="main-forecast-synopsis" :class="{ 'show': forecastSynopsis !== ''}"> {{ forecastSynopsis }}</h1>
</template>

<style scoped>
.main-forecast-synopsis {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.main-forecast-synopsis.show {
  opacity: 1;
  transform: translateY(0);
}
</style>