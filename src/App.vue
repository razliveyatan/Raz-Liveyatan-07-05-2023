<script setup lang="ts">
import {ref, watch, onMounted} from 'vue';
import TempConversionButton from '@/components/nav/TempConversionButton.vue';
import {useRoute} from 'vue-router';
import {useCurrentThemeStore} from '@/stores/theme-store';
const currentTheme = useCurrentThemeStore();
const router = useRoute();

const currentRoute = ref('/home');
const currentThemeType = ref('');
onMounted(() => {  
  currentThemeType.value = currentTheme.currentThemeType ? currentTheme.currentThemeType : 'Theme';
});

watch(() => router.path, () => {
  currentRoute.value = router.path;
});

const handleToggleTheme = () => {
  if (currentThemeType.value === 'Dark-Theme'){
    currentTheme.setCurrentTheme('Theme');
    currentThemeType.value = 'Theme';
  }
  else {
    currentTheme.setCurrentTheme('Dark-Theme');
    currentThemeType.value = 'Dark-Theme';
  }
}

</script>

<template> 
    <div class="wrapper" :class="currentThemeType === 'Dark-Theme' ? '' : 'Dark-Theme'">                                     
        <nav :class="currentThemeType === 'Dark-Theme' ? '' : 'Dark-Theme'">
          <div class="msg-button-container">
            <button type="button" class="msg-button">Welcome to WeatherApp</button>
          </div>          
            <RouterLink to="/home"><button type="button" class="simple" :class="{bold : currentRoute === '/home'}">Home</button></RouterLink>
            <RouterLink to="/favorites"><button type="button" class="simple" :class="{bold : currentRoute !== '/home'}">Favorites</button></RouterLink>          
            <TempConversionButton/>          
             <button type="button" @click="handleToggleTheme">{{currentThemeType === 'Dark-Theme' ? 'Dark' : 'Theme' }}</button>           
        </nav>
      <RouterView />                 
    </div>      
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.simple {
  font-weight: normal;
}

.bold {
    font-weight:bold;
}

nav {  
    display: flex;
    flex-direction: row;
    justify-content: flex-end;    
    width: 100%;
    margin: 2rem 0;
    background-color: rgb(0, 89, 134,.5);
    padding:0 2rem;
}
nav.Dark-Theme {
  background-color: black;
  border: 1px solid white;
  border-radius: 10px;
}
.msg-button{  
  cursor: default;
}

.msg-button:hover{  
  background-color: transparent;
}

.msg-button-container {
  margin-right:auto;
}

nav button {
  background-color: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;  
}

nav button:hover {
  background-color: #64b3c9;
  border-radius: 10px;
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

@media (max-width: 600px) {

  .wrapper{
    padding: 0 1rem;
  }

    .msg-button-container {
      display: none;
  }

  nav{
    justify-content: center;
    padding:0;
    border-radius: 10px;
  }
}

</style>
