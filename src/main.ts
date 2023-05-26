/*
 * @Author: qiye
 * @LastEditors: qiye
 * @description: page description
 * @Date: 2023-04-07 10:08:43
 * @LastEditTime: 2023-05-26 14:05:35
 */
import { createApp } from 'vue';
import router from '@/router';
import store from '@/store';
import App from './App.vue';
import 'normalize.css';
import './style/index.css';

const app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app');
