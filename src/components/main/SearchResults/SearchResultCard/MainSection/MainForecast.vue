<script setup lang="ts">
  defineProps<{
    forecastSynopsis: any,  
}>();
</script>

<template>
    <div class="main-forecast-synopsis" :class="{ 'show': forecastSynopsis && forecastSynopsis !== ''}"> {{ forecastSynopsis }}</div>
</template>

<style scoped>
.main-forecast-synopsis {
  font-size: 24px;
  font-weight: bold;
  margin: 4rem auto 2rem auto;
  opacity: 0;  
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.main-forecast-synopsis.show {
  opacity: 1;
  transform: translateY(0);
}
</style>