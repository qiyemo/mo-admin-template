import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import { Raw, markRaw } from 'vue';
import { Router } from 'vue-router';
import router from '@/router';

import 'pinia';
declare module 'pinia' {
  export interface PiniaCustomProperties {
    set $router(value: Raw<Router>);
    get $router(): Raw<Router>;
  }
}

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});

export { useAppStore, useUserStore };
export default pinia;
