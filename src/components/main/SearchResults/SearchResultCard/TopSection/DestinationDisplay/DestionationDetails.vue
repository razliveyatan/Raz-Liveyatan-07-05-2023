<script setup lang="ts">
defineProps<{
  cityName: string|null,
  temperature:number,
  tempertauteType:string,
}>();
</script>
<template>
    <div class="destination-details-container">
        <p>{{cityName}}</p>
        <p>{{temperature}}°{{ tempertauteType }}</p>
    </div>
</template>

<style scoped>
.destination-details-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left:1rem;
}
</style>