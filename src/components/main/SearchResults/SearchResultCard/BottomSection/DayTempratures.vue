<script setup lang="ts">
import {watch} from 'vue';
import { storeToRefs } from 'pinia';
import {useDefaultTempratureTypeStore} from '@/stores/temprature-conversion-store';
import type {IDailyTemperature} from '@/interfaces/interfaces';
import {convertToUnit} from '@/services/data-helper';
const {defaultTempratureType} = storeToRefs(useDefaultTempratureTypeStore());

type temperatureProps = {
    maxTemperature:IDailyTemperature,
    minTemperature:IDailyTemperature,
}
defineProps<temperatureProps>();
watch(defaultTempratureType, (newVal) => { 
    defaultTempratureType: newVal;
});



</script>
<template>
    <div class="daily-temprature-container">
        <span class="high">{{defaultTempratureType === maxTemperature.unit ? maxTemperature.value : convertToUnit(maxTemperature.value,defaultTempratureType) }}°</span>
        <span class="low">/{{defaultTempratureType === minTemperature.unit ? minTemperature.value : convertToUnit(minTemperature.value,defaultTempratureType) }}°</span>
    </div>
</template>

<style scoped>
.daily-temprature-container{
    align-self: center;
    white-space: nowrap;
}

.high {
    font-size: 50.6px;
    letter-spacing: -.42px;
    line-height: 1.07;
    font-weight: 500;
}

.low {
    font-size: 20.3px;
    line-height: .92;
    color: #878787;
}
</style>