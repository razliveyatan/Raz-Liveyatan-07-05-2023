import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import App from '../src/App.vue'
import router from './router'
import 'vue3-toastify/dist/index.css';



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(
    Vue3Toastify,
    {      
      style: {
        opacity: '1',
        userSelect: 'initial',
      },
      limit:2,
      position: 'top-center',
      transition: 'bounce',
    } as ToastContainerOptions,
  );


app.mount('#app')
