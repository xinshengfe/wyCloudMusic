import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import getVant from '@/plugins/index'

const app = createApp(App)
getVant(app)
app.use(store).use(router).mount('#app')
