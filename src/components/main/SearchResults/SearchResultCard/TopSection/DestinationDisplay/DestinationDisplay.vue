<script setup lang="ts">
import IconCurrentWeatherVue from '../../../../../icons/IconCurrentWeather.vue'
import DestionationDetailsVue from './DestionationDetails.vue'
const destinations:any = ["something","something"];
</script>
<template>
    <div class="destination-display-container" :class="{' multiple': destinations.length > 0}">
        <div class="destination-display-item">
            <IconCurrentWeatherVue/>
            <DestionationDetailsVue/>
        </div>
    </div>
</template>

<style scoped>
.destination-display-container{
   display: grid;
   gap:3rem;
   grid-template-columns: repeat(1,minmax(0,1fr));    
}
.multiple{   
   grid-template-columns: repeat(2,minmax(0,1fr));    
}
@media (min-width: 1024px)
    {      
        .multiple {
            grid-template-columns: repeat(3,minmax(0,1fr));  
        }
   
}

@media (min-width: 768px){
    .multiple {
        grid-template-columns: repeat(2,minmax(0,1fr));
    }
}

.destination-display-item {
    border: 1px solid gray;
    border-radius: 1rem;
    height: 100px;
    padding: 0 1rem;
    display: flex;
}
</style>