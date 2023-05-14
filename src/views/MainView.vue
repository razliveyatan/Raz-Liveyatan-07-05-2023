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
.main-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  height:100vh;
  width:80%;
}

@media (max-width: 650px) or (min-height:400px) { 
  .main-view {
    width:100%;
    height:100%;
  }
}
</style>

