<script setup lang="ts">
import { ref } from 'vue';
import TempConversionButton from '@/components/nav/TempConversionButton.vue';
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

</script>

<template> 
    <div class="wrapper">                          
        <nav :class="{active : isMenuOpen}">
          <div class="no-toggle">
            <RouterLink to="/Main"><button>Main</button></RouterLink>
            <RouterLink to="/Favorites"><button>Favorites</button></RouterLink>          
          </div>
          <div class="menu-toggle" :class="{active : isMenuOpen}">
            <TempConversionButton/>          
            <button id="theme-toggle">Theme</button>
            <button id="hamburger-toggle" @click="toggleMenu" class="hamburger-toggle">☰</button>          
          </div>
        </nav>
      <RouterView />                 
    </div>      
</template>

<style scoped>
.wrapper {
  /* width:100%;  */
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav {  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 2px 0 #64b3c9;
    /* padding: 10px;
    display: flex;
    justify-content: end;
    align-items: center;
    box-shadow: 0 2px 0 #64b3c9; */
}

.menu-toggle {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

nav button {
  background-color: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;
  /* transition: background-color 0.1s ease; */
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

.hamburger-toggle {
    display: none;
  }

@media (max-width: 600px) {
  nav {  
    padding: 10px;
    display: flex;
    justify-content: end;
    align-items: center;
    box-shadow: 0 2px 0 #64b3c9;
}
  nav.active > .no-toggle {
    display: block;
  }
  .no-toggle {
    display: inline-flex;
  }
  .hamburger-toggle {
    display: block;
    transition: block 0.5s ease-in;
  }

  nav button,
  #unit-toggle,
  #theme-toggle {
    display: none;
  }

  nav.active button,
  nav.active #unit-toggle,
  nav.active #theme-toggle {
    display: block;
  }
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
