<script setup lang="ts">
import IconCurrentWeather from '@/components/icons/IconCurrentWeather.vue'
import DestionationDetailsVue from './DestionationDetails.vue'
import type { IDestinationDisplay } from '@/interfaces/interfaces';

const props = defineProps<{
  displayItems: IDestinationDisplay[];
}>();

</script>

<template>
    <div class="destination-display-container" :class="{' multiple': props.displayItems.length > 1}">
        <div class="destination-display-item">
            <IconCurrentWeather v-for="displayItem in props.displayItems" :icon-url="displayItem.weatherIcon"/>
            <DestionationDetailsVue v-for="displayItem in props.displayItems" :city-name="displayItem.cityName" :temprature="displayItem.tempratureValue" :temprtaute-type="displayItem.tempratureValueType" />
        </div>
    </div>
</template>

<style scoped>
/* .destination-display-container{
   display: grid;
   gap:3rem;
   grid-template-columns: repeat(1,minmax(0,1fr));    
} */
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

/* .destination-display-item {
    border: 1px solid gray;
    border-radius: 1rem;
    height: 100px;
    padding: 0 1rem;
    display: flex;
} */
</style>