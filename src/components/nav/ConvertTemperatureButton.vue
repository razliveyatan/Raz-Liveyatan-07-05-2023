<script setup lang="ts">
import { ref, onMounted } from 'vue';
import IconSupportVue from '@/components/icons/IconSupport.vue';
import {useLocationsStore} from '@/stores/locations-store';
import { useCurrentConditionsStore } from "@/stores/conditions-store";
import {normalizeFavoriteObject} from '@/services/data-helper';
const currentConditionsStore = useCurrentConditionsStore();
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
        const currentLocation = currentConditionsStore.currentLocationCondition;
        if (currentLocation){
            const favorite = normalizeFavoriteObject(currentLocation);
            currentLocationStore.addFavoriteLocation(favorite);
            addToFavoritesText.value = 'Remove from Favorites';
        }
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

