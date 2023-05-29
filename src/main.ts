/*
 * @Author: qiye
 * @LastEditors: qiye
 * @description: page description
 * @Date: 2023-04-07 10:08:43
 * @LastEditTime: 2023-05-29 15:54:36
 */
import { createApp } from 'vue';

import router from '@/router/index';
import store from '@/store/index';
import App from '@/App.vue';
import 'normalize.css';
import './style/index.css';
import '@/api/interceptor';

const app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app');
