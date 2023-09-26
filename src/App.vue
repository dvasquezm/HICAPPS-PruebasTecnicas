<template>
  <div class="container">
      <div class="p-3 mb-2 bg-dark text-white d-flex justify-content-center align-items-center">
          <h1>Prueba Técnica para HICAPPS</h1> 
      </div>
      <div id="app" class="p-3 mb-2 bg-dark text-white d-flex justify-content-center align-items-center vh-100" >  
          <button 
             id="authenticate" 
             class="btn btn-outline-light btn-lg" 
             v-if="!userLoggedIn" @click="authenticated" >Autenticar con Google
          </button>
  
          <div id="miBoton"  v-if="userLoggedIn">    
             <h1><router-link to="/otra-pagina"  class="text-white">Crear Notas</router-link></h1>   
                <router-view></router-view>
          </div>
      </div>
  </div>
</template>

<style>

.container {
  max-width: 100%; /* Asegura que el contenido no se desborde de la pantalla */
  margin: 0 auto; /* Centra el contenido en la pantalla */
  padding: 10px; /* Espaciado interno */
}
</style>

<script>
  import { ref } from 'vue'; 
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

  var provider = new GoogleAuthProvider();

  export default {
    name: 'app',
    setup() {
      const userLoggedIn = ref(false); 
    

      const authenticated = async () => {
        const auth = getAuth();
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          console.log(user);
          userLoggedIn.value = true; 
        } catch (error) {
          const errorMessage = error.message;
          console.log(errorMessage);
        }
      };
  
      return {
        userLoggedIn,
        authenticated,
    
      };
    },
  };
</script>
