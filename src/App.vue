<script setup lang="ts">

</script>

<template> 
    <div class="wrapper">                    
        <nav>
          <RouterLink to="/Main"><button>Main</button></RouterLink>
          <RouterLink to="/Favorites"><button>Favorites</button></RouterLink>         
          <button>°C / °F</button>
          <button class="theme-toggle">Theme</button>
        </nav>           
      <RouterView />
    </div>  
</template>

<style scoped>
.wrapper {
  width:100%;
 
}

nav {
  background-color: #fff;
  padding: 10px;
  display: flex;
  justify-content: end;
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
