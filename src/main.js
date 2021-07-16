import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'      //这个CSS的功能就是对几乎所有的默认样式进行重置，让所有的浏览器上对于未定义的样式浏览效果达到一致
import './style/index.scss'

createApp(App).use(store).use(router).mount('#app')
