<template>

  <div class="container mt-5">
    <h1>Lista de Notas</h1>
    <form @submit.prevent="agregarNota">
      <div class="mb-3">
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          v-model="nuevaNota"
          placeholder="Introduce Nota"
          :style="{ width: '31rem', height: '100px' }"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-outline-light btn-lg">Guardar</button>
    </form>
    <hr>
    <ul class="list-group">
      <li
        class="list-group-item text-wrap text-break" 
        style="width: 31rem;"
        v-for="(dato, index) in datosFirestore"
        :key="index"
      >
        {{ dato.descripcion }}
      </li>
    </ul>
  </div>
  
</template>
  
  
<script>
  import { getFirestore, collection, addDoc,getDocs } from 'firebase/firestore';
  
  export default {
    data() {
      return { 
        nuevaNota: '',
        datosFirestore:[],
      };
    },
    methods: {
      async agregarNota() {
        if (!this.nuevaNota) {
          return; // Evita guardar notas vacías
        }
  
        try {
          const db = getFirestore();
          const notasCollection = collection(db, 'notas');
  
          // Agrega la nueva nota
          await addDoc(notasCollection, {
            descripcion: this.nuevaNota,
            timestamp: new Date().toISOString(),
          });
  
          // Limpia el campo de entrada después de guardar
          this.nuevaNota = '';
  
          // Actualiza la lista de notas
          this.actualizarNotas();
        } catch (error) {
          console.error('Error al agregar la nota a Firestore:', error);
        }
      },
      async actualizarNotas() {
        try {
          const db = getFirestore();
          const datosCollection = collection(db, 'notas');
  
          // Vuelve a obtener las notas desde Firestore
          const querySnapshot = await getDocs(datosCollection);
  
          this.datosFirestore = []; // Borra la lista actual
  
          querySnapshot.forEach((doc) => {
            this.datosFirestore.push(doc.data());
          });
        } catch (error) {
          console.error('Error obteniendo datos de Firestore:', error);
        }
      },
    },
    created() {
      this.actualizarNotas(); 
    },
  };
</script>