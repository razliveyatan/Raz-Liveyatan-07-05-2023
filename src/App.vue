<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {useCounterStore} from '@/stores/counter';
import NavPanel from './components/NavPanel.vue';

import TempConversionButton from './components/nav/TempConversionButton.vue'

const {count} = storeToRefs(useCounterStore());
const headers = ["Main","Favorites"];
</script>

<template> 
    <div class="wrapper">              
      <nav>
        <TempConversionButton/>
        <NavPanel :navPanelsNames="headers" />        
      </nav>
      <RouterView />
    </div>  
</template>

<style scoped>
.wrapper {
  width:100%;
 
}

/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {  

  .logo {
    margin: 0 2rem 0 0;
  }
  
  .wrapper {
    display: flex;
    flex-direction: row;    
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
