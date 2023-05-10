<script setup lang="ts">

type NavPanelProps = {
    navPanelsNames:string[]     
};

defineProps<NavPanelProps>()
</script>

<template>
    <div>      
      <ul class="navButtons"> 
        <li v-for="navPanel in navPanelsNames"><RouterLink :to="'/'+navPanel ">{{navPanel}}</RouterLink></li>        
      </ul>
    </div>    
  </template>

<style scoped>
 div {
    color :aquamarine;
 }
 .navButtons {
  list-style: none;
 }
@media (min-width: 1024px) {  
    li {
        color:blue;
    }
}
</style>