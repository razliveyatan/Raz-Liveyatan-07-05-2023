<script setup lang="ts">
import SearchResultCard from '../components/main/SearchResults/SearchResultCard.vue';
import SearchBar from '../components/main/SearchBar.vue'
</script>

<template>
  <div class="main-view">      
    <SearchBar/>
    <SearchResultCard/>
  </div>    
</template> 

<style scoped>
/* .main-view {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-view > * {
  margin-bottom: 20px;
} */

.main-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

