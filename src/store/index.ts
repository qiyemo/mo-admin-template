import { createPinia } from 'pinia';
import { Raw, markRaw } from 'vue';
import { Router } from 'vue-router';
import router from '@/router';
import useUserStore from './modules/user';
import useAppStore from './modules/app';

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
