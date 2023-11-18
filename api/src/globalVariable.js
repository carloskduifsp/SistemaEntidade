const host = location.hostname;
let amb = '';
if (host=='teste.ointegrador.com.br'){
    amb = 'development';
} else if(host=='gestao.ointegrador.com.br'){
  amb = 'production';
} else {
  amb = 'local';
}


let apiKey, authDomain, projectId, messagingSenderId, appId, storageBucket, measurementId  = '';
let baseUrlApiMain, baseUrlApiPowerbi;
if (amb === 'production') {
      //BASE_URL = 'https://gesta.ointegrador.com.br'
      baseUrlApiMain = 'https://us-central1-api-financeiro-654a3.cloudfunctions.net/api';
      apiKey="AIzaSyA5CY7hDUcSMByTN2DC_8FDEtHwhVy2HEE";
      authDomain="financeiro-e44b1.firebaseapp.com";
      projectId= "financeiro-e44b1";
      storageBucket= "financeiro-e44b1.appspot.com";
      messagingSenderId= "177097167480";
      appId= "1:177097167480:web:91529f757659410a08538d";
      measurementId= "G-84VB8FRWX9";
} else if (amb === 'development') {
      //BASE_URL = 'https://teste.gesta.ointegrador.com.br'
      baseUrlApiMain = 'https://us-central1-teste-api-principal.cloudfunctions.net/api';
      apiKey="AIzaSyAtSKe49sKD9oF8uRP5mkfuIjoGDpS3A8M";
      authDomain= "teste-front-financeiro-62b79.firebaseapp.com";
      projectId= "teste-front-financeiro-62b79";
      storageBucket= "teste-front-financeiro-62b79.appspot.com";
      messagingSenderId= "682312801972";
      appId= "1:682312801972:web:80a91658e1810ae9af01e1";
      
} else {
  baseUrlApiMain = 'http://127.0.0.1:5004/teste-api-principal/us-central1/api';
  apiKey="AIzaSyAtSKe49sKD9oF8uRP5mkfuIjoGDpS3A8M";
  authDomain= "teste-front-financeiro-62b79.firebaseapp.com";
  projectId= "teste-front-financeiro-62b79";
  storageBucket= "teste-front-financeiro-62b79.appspot.com";
  messagingSenderId= "682312801972";
  appId= "1:682312801972:web:80a91658e1810ae9af01e1";
}

//Variavel para Api Power Bi
if (amb === 'production') {
  baseUrlApiPowerbi = 'https://us-central1-api-powerbi-bee2c.cloudfunctions.net/api';
} else if (amb === 'development') {
  baseUrlApiPowerbi = 'https://us-central1-teste-api-powerbi-f4889.cloudfunctions.net/api/';
} else {
  baseUrlApiPowerbi = 'http://localhost:5001/api-powerbi-bee2c/us-central1/api/';
}

export default {
    baseUrlApiMain: baseUrlApiMain,
    baseUrlApiPowerbi: baseUrlApiPowerbi,
    baseapiKey: apiKey,
    baseauthDomain: authDomain,
    baseprojectId: projectId,
    basestorageBucket: storageBucket,
    basemessagingSenderId: messagingSenderId,
    baseappId: appId,
    basemeasurementId: measurementId
    }