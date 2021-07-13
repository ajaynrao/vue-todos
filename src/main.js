import { createApp } from 'vue';
import App from './App.vue';
import router from '@/Router';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './api/firebase/config'
import Store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
createApp(App).use(ElementPlus).use(Store).use(router).mount('#app')