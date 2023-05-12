<script setup lang="ts">
import { ref, onMounted } from 'vue';
import IconSupportVue from '@/components/icons/IconSupport.vue';
import {useLocationsStore} from '@/stores/locations-store';
const currentLocationStore = useLocationsStore();

onMounted(() => {
  const location = currentLocationStore.currentLocation;
  if (location) {
    const exists = currentLocationStore.isLocationInFavorites(location.cityKey);
    addToFavoritesText.value = exists ? 'Remove from Favorites' : 'Add to Favorites';
  }
});

const addToFavoritesText = ref('');

const handleFavorite = () => {
   const location = currentLocationStore.currentLocation;
   if (location) {
    const exists = currentLocationStore.isLocationInFavorites(location.cityKey);
    if (exists){
        currentLocationStore.removeFavoriteLocation(location.cityKey);
        addToFavoritesText.value = 'Add to Favorites';
    }
    else {        
        currentLocationStore.addFavoriteLocation(location);
        addToFavoritesText.value = 'Remove from Favorites';        
    }
   }
}

</script>
<template>
    <div class="add-to-favorites-container">
        <IconSupportVue/>
        <button class="add-to-favorites-button" @click="handleFavorite">{{ addToFavoritesText }}</button>
    </div>
</template>

<style scoped>
.add-to-favorites-container {
    display: flex;
    flex-direction: row;
}
.add-to-favorites-button {
    margin-left:1rem;
}
</style>

