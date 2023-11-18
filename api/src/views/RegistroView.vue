<template>
  <v-app>
    <v-main class="body">
      <v-container class="d-flex justify-center">
        <v-sheet class="box-container mx-auto pa-2" height="auto" width="360">
          <v-sheet color="white" height="auto" width="auto">
            <div class="register">
              <div class="form">
                <v-container class="">
                  <v-row class="d-flex justify-center">
                    <h1>Sistema</h1>
                  </v-row>
                  <v-row class="d-flex justify-center align-top">
                    <v-img src="../assets/tsuru-origami.png" max-width="100" />
                  </v-row>

                </v-container>
                <form class="register" @submit.prevent="register">
                  <v-container class="mx-auto">

                    <div class="ms-1 me-1 text-body-1 font-weight-bold">Cadastrar</div>
                    <v-text-field variant="outlined" :error="errMsg" type="email" v-model="register_form.email"
                      label="Email"></v-text-field>
                    <v-text-field variant="outlined" :error="errMsg" type="password" v-model="register_form.password"
                      label="Senha"></v-text-field>

                  </v-container>

                  <div class="text-register mb-1">
                    Ao se cadastrar, você concorda com nossos
                    <b>Termos, Politicas de Privacidade e Politica de Cookies</b>
                  </div>
                  <input type="submit" value="Cadastre-se"
                    class="btn_register mb-3 text-white font-weight-bold text-capitalize" />
                </form>
                <div class="d-flex align-center">
                  <v-divider class="font-weight-bold"></v-divider>
                  <div class="ms-3 me-3 text-body-2 font-weight-bold">ou</div>
                  <v-divider></v-divider>
                </div>
                <v-btn rounded="lg" class="mt-1 text-caption font-weight-bold mb-3" variant="outlined"
                  @click="loginGoogle"><v-img src="../assets/google.png" width="10%" height="auto"
                    class="ms-3 me-3"></v-img>
                  <div class="me-3">Cadastre-se com o Google</div>
                </v-btn>
              </div>
              <div class="text-caption d-flex justify-center align-center"><v-btn variant="text"
                  class="text-caption text-left" color="error" to="/">
                  <div class="text-black">Possui Cadastro? </div> Faça Login
                </v-btn>
              </div>
              <v-alert v-if="errMsg" type="error" class="mt-3 mx-auto mb-3" max-width="80%">{{ errMsg }}</v-alert>
            </div>
          </v-sheet>
        </v-sheet>
      </v-container>
    </v-main>
</v-app></template>

<script>
import { ref } from 'vue'

import { useStore } from 'vuex'
//import { getAuth,  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//import router from "@/router";

export default {
  name: 'App',
  data: () => ({
    errMsg: ref(),

  }),
  setup () {
		const register_form = ref({});
		const store = useStore();


		const register = async () => {	
      await store.dispatch('register', register_form.value)		
      await store.dispatch('token');
      const usuario = await store.dispatch('searchCadastro');

      console.log(usuario);

      if(!usuario){
        await store.dispatch('CreateCadastro');
      }
		}

    const loginGoogle = () => {
			store.dispatch('signInWithGoogle', register_form.value);
		}
    
		return {
			register_form,
			register,
      loginGoogle
		}
	}, 
}



</script>
<style scoped>
.v-sheet {
  margin-top: 3%;
  padding-top: 1%;
  border: solid rgba(216, 216, 216, 255) 1.3px;
  border-radius: 0.1rem;
}

.box-bottom {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

a {
  /* color: rgb(106, 193, 244); */
  color: rgb(253, 127, 127);
}

p {
  text-align: center;
  font-size: small;
  padding-top: 1.3rem;
}

.box-container {
  background-color: rgba(250, 250, 250, 255);
}

.body {
  background-color: rgba(245, 245, 245, 255);
}
.space {
  padding-left: 1rem;
  display: flex;
  align-content: center;
}

.register {
  align-items: center;
  
}

h1 {
  color: black;
  margin-bottom: 1rem;
}

h5 {
  color: rgb(163, 163, 163);
  margin-right: 30px;
  margin-left: 30px;
}

.form {
  text-align: center;
  margin-top: 2rem;
}

.text-register,
b {
  color: rgb(163, 163, 163);
  font-size: 10px;
  margin-right: 25px;
  margin-left: 25px;
  display: inline-table;

}

.btn_register{
  background-color: royalblue;
  border-radius: 5px;
  padding: 5px;
}


.v-divider {
  margin-left: 10px;
  margin-right: 10px;
}
</style>