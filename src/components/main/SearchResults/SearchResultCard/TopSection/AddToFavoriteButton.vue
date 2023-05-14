<script setup lang="ts">
import { ref, onMounted } from 'vue';
import IconSupportVue from '@/components/icons/IconSupport.vue';
import {useLocationsStore} from '@/stores/locations-store';
import { toast } from 'vue3-toastify';
import { findFavorite, getFavoritesFromSessionStorage, removeFavorite } from '@/services/data-service';
const currentLocationStore = useLocationsStore();

onMounted(() => {
  try {
    const location = currentLocationStore.currentLocation;
    if (location) {      
      let exists = currentLocationStore.isLocationInFavorites(location.cityKey);
      if (!exists){
        const favorites = getFavoritesFromSessionStorage();
        if (favorites && favorites.length > 0){
          exists = favorites.some(favorite => favorite.cityKey === location.cityKey);
          currentLocationStore.addFavoriteLocation(location);
        }
      }
      addToFavoritesText.value = exists ? 'Remove from Favorites' : 'Add to Favorites';
    }
  }
  catch (error){
    console.error(error);
    toast.error('Something went wrong while trying to fetch current location');
  }  
});

const addToFavoritesText = ref('');

const handleFavorite = () => {
  try {
    const location = currentLocationStore.currentLocation;
   if (location) {
    const exists = currentLocationStore.isLocationInFavorites(location.cityKey);
      if (exists){
          currentLocationStore.removeFavoriteLocation(location.cityKey);
          const favorites = getFavoritesFromSessionStorage();
          if (favorites && favorites.length > 0){
            const removeResponse = removeFavorite(location.cityKey);
            if (!removeResponse){
              toast.error('Error removing favorite from session storage');
            }
          }
          addToFavoritesText.value = 'Add to Favorites';
      }
      else {        
          currentLocationStore.addFavoriteLocation(location);
          const favorites = getFavoritesFromSessionStorage();
          if (favorites && favorites.length > 0){
            const favorite = findFavorite(location.cityKey);
            if (!favorite){
              favorites.push(location);
              sessionStorage.setItem('favorites', JSON.stringify(location));
            }            
          }
          else{
            let favorites:any = [];
            favorites.push(location);                  
            sessionStorage.setItem('favorites', JSON.stringify(favorites));
          }
          addToFavoritesText.value = 'Remove from Favorites';        
      }
    }
   }   
   catch(error){
    console.error(error);
    toast.error('Something went wrong while trying to fetch current location');
   }
}

</script>
<template>
    <div class="add-to-favorites-container" @click="handleFavorite">
        <IconSupportVue :selected="addToFavoritesText === 'Remove from Favorites'" />
        <button class="add-to-favorites-button" type="button">{{ addToFavoritesText }}</button>
    </div>
</template>

<style scoped>
.add-to-favorites-container {
  display: flex;
  align-items: center;  
  border-radius: 4px;
  transition: background-color 0.3s ease;
  padding: 10px 20px; 
  background-color: transparent;
  cursor: pointer;
}
.add-to-favorites-button {  
  background-color: transparent;
   color: #fff; 
   border: none;
   margin-left:0.5rem;  
   font-size:15px;
}
.add-to-favorites-container:hover {
  background-color: rgb(0, 89, 134,.5);
  
}

@media (max-width: 450px) {
  .add-to-favorites-button{
    display: none;
  }
}

</style>

