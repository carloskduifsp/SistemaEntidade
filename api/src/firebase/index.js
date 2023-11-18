import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  baseUrlApiMain:'https://us-central1-teste-api-principal.cloudfunctions.net/api',
  apiKey:"AIzaSyAtSKe49sKD9oF8uRP5mkfuIjoGDpS3A8M",
  authDomain: "teste-front-financeiro-62b79.firebaseapp.com",
  projectId: "teste-front-financeiro-62b79",
  storageBucket: "teste-front-financeiro-62b79.appspot.com",
  messagingSenderId: "682312801972",
  appId: "1:682312801972:web:80a91658e1810ae9af01e1"
}


const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }