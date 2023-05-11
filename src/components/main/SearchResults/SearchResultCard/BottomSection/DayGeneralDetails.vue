<script setup lang="ts">
import {getDayName, getDateString} from "@/services/data-helper";
type dateProps = {
    date: any | null;
}
defineProps<dateProps>()
</script>
<template>
    <h2 class="daily-general-details-container">
        <span class="day-name">{{ getDayName(getDateString(date,false)) }}</span>
        <span class="day-date">{{getDateString(date,true)}}</span>
    </h2>
</template>

<style scoped>
.daily-general-details-container{
    display: flex;        
    flex-direction: column;
    text-align: center;
}
.day-name {
    color:#000000;
    font:bold;
}
day-date{
    color: lightgray;
}
</style>