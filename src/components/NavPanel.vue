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
nav {
  background-color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav button {
  background-color: transparent;
  border: none;
  color: #555;
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

nav button:hover {
  background-color: #f0f0f0;
}

nav button:focus {
  outline: none;
}

nav button.active {
  background-color: #f0f0f0;
  font-weight: bold;
}

nav button.theme-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
}

nav button.theme-toggle .theme-icon {
  width: 20px;
  height: 20px;
  fill: #555;
}

nav button.theme-toggle.black .theme-icon {
  fill: #000;
}

/* Responsive Styles */
@media screen and (max-width: 600px) {
  nav {
    flex-direction: column;
    align-items: flex-start;
  }

  nav button {
    padding: 8px 12px;
    margin-bottom: 8px;
  }
}
</style>