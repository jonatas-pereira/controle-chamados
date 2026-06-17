import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import appRouter from './routes/routes.ts'

createApp(App)
.use(appRouter)
.mount('#app')
