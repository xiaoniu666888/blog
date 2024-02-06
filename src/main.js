import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
const app = createApp(App)
const pinpa = createPinia()
app.use(pinpa)
app.use(router)
app.mount('#app')
