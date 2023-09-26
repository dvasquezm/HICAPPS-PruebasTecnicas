import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import OtraPagina from './OtraPagina.vue'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.css' 
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 

const firebaseConfig = {
  apiKey: "AIzaSyA1o_uY0yXy31PPPhl-6BC8jJTNfdb_pqc",
  authDomain: "hicapps-desarrollo.firebaseapp.com",
  projectId: "hicapps-desarrollo",
  storageBucket: "hicapps-desarrollo.appspot.com",
  messagingSenderId: "874286640220",
  appId: "1:874286640220:web:7f3e0d7874a8fdc297ca99",
  measurementId: "G-LTKD2XSGZM"
};

initializeApp(firebaseConfig);
const auth = getAuth();


const router = createRouter({
    history: createWebHistory(),
    routes: [
      
      { path: '/otra-pagina', 
        component: OtraPagina,
        meta: { requiresAuth: true }, 
    },
    ],
    
  });

  
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = auth.currentUser;
  
    if (requiresAuth && !isAuthenticated) {
      next('/inicio'); 
    } else {
      next();
    }
  });
  
  export default router;
  
  const app = createApp(App);
  
  app.use(router);
  app.mount('#app');


  


  
  
  