
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyA1o_uY0yXy31PPPhl-6BC8jJTNfdb_pqc",
  authDomain: "hicapps-desarrollo.firebaseapp.com",
  projectId: "hicapps-desarrollo",
  storageBucket: "hicapps-desarrollo.appspot.com",
  messagingSenderId: "874286640220",
  appId: "1:874286640220:web:7f3e0d7874a8fdc297ca99",
  measurementId: "G-LTKD2XSGZM"
};



const app = firebase.initializeApp(firebaseConfig);

const firebaseService = {}
firebaseService.auth = () => {
    return app.auth()
}

export default firebaseService
