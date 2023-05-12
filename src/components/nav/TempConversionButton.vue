<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {useDefaultTempratureTypeStore} from '@/stores/temprature-conversion-store';
const defaultTemparature = useDefaultTempratureTypeStore();

onMounted(() => {  
  chosenTemperature.value = defaultTemparature.defaultTempratureType ? defaultTemparature.defaultTempratureType : 'C';
});
const chosenTemperature = ref('');

const handleTemperatueTypeConversion = () => {
   const temperature = defaultTemparature.defaultTempratureType;   
   chosenTemperature.value = temperature === 'C' ? 'F' : 'C';
   defaultTemparature.setDefaultTempratureType(chosenTemperature.value);
} 
</script>

<template>
    <button type="button" @click="handleTemperatueTypeConversion">
        <span :class="{ bold: chosenTemperature === 'C' }">°C</span>
        <span> / </span>
        <span :class="{ bold: chosenTemperature === 'F' }">°F</span>
    </button>    
</template>

<style scoped>
.black {
    color:black;
}

.bold {
    font-weight:bold;
}

</style>