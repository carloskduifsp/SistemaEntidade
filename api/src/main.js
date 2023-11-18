import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import globalVariables from './globalVariable';

loadFonts()
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {  
  apiKey:globalVariables.baseapiKey,
  authDomain:globalVariables.baseauthDomain,
  projectId:globalVariables.baseprojectId,
  storageBucket:globalVariables.basestorageBucket,
  messagingSenderId:globalVariables.basemessagingSenderId,
  appId:globalVariables.baseappId,
  measurementId:globalVariables.basemeasurementId
};

initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.use(store);
app.use(vuetify);
app.mount('#app');

