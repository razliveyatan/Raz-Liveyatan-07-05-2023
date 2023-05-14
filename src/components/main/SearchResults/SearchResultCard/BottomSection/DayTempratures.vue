<script setup lang="ts">
import {watch, reactive} from 'vue';
import { storeToRefs } from 'pinia';
import {useDefaultTempratureTypeStore} from '@/stores/temprature-conversion-store';
import type {IDailyTemperature} from '@/interfaces/interfaces';
import {convertToUnit} from '@/services/data-helper';
const {defaultTempratureType} = storeToRefs(useDefaultTempratureTypeStore());
const temperature = reactive<any>([]); 

type temperatureProps = {
    maxTemperature:IDailyTemperature,
    minTemperature:IDailyTemperature,
}
defineProps<temperatureProps>();
watch(defaultTempratureType, (newVal) => { 
    temperature.push(newVal);
});

</script>
<template>
    <div class="day-temperatures-container">
        <p class="min-temperature">{{temperature === maxTemperature.unit ? maxTemperature.value : convertToUnit(maxTemperature.value,defaultTempratureType) }}°</p>
        <p class="max-temperature">/{{temperature === minTemperature.unit ? minTemperature.value : convertToUnit(minTemperature.value,defaultTempratureType) }}°</p>
    </div>
</template>

<style scoped>
.day-temperatures-container{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.min-temperature{
  font-size: 18px;
  font-weight: bold;
  margin-right: 5px;
}

max-temperature  {
  font-size: 14px;
  color: #888;
}
</style>