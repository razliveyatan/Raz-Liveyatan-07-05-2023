<script setup lang="ts">
import {watch, reactive} from 'vue';
import { storeToRefs } from 'pinia';
import {useDefaultTempratureTypeStore} from '@/stores/temprature-conversion-store';
import type {IDailyTemperature} from '@/interfaces/interfaces';
import {convertToUnit} from '@/services/data-helper';
const {defaultTempratureType} = storeToRefs(useDefaultTempratureTypeStore());
let temperature = reactive<any>([]); 

type temperatureProps = {
    maxTemperature:IDailyTemperature,
    minTemperature:IDailyTemperature,
}
defineProps<temperatureProps>();
watch(defaultTempratureType, (newVal) => { 
    temperature: newVal;
});

</script>
<template>
    <div class="day-temperatures-container" :class="{'show' : maxTemperature.value > -50 }">
        <p class="min-temperature">{{temperature === maxTemperature.unit ? maxTemperature.value : convertToUnit(maxTemperature.value,defaultTempratureType) }}°</p>
        <p class="max-temperature">/{{temperature === minTemperature.unit ? minTemperature.value : convertToUnit(minTemperature.value,defaultTempratureType) }}°</p>
    </div>
</template>

<style scoped>
.daily-temprature-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.daily-temprature-container.show {
  opacity: 1;
  transform: translateY(0);
}

.high {
  font-size: 18px;
  font-weight: bold;
  margin-right: 5px;
}

.low {
  font-size: 14px;
  color: #888;
}
</style>