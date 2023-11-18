<template>
  <v-app>

    <v-main class="body">
      <v-container class="d-flex justify-center">
        <v-sheet class="box-container mx-auto pa-2" height="auto" max-width="98%" width="360">
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

                <form class="login" @submit.prevent="login">
                  <v-container class="mx-auto">
                    <v-text-field variant="outlined" :error="errMsg" v-model="login_form.email"
                      label="Email"></v-text-field>
                    <v-text-field variant="outlined" :error="errMsg" type="password" v-model="login_form.password"
                      label="Senha"></v-text-field>
                    <div class="text-left ">
                      <div class="ms-3 me-3">
                        <div v-if="$store.state.error" class="mt-3 mx-auto mb-3 text-red text-capitalize text-caption"
                          size="small" closable>{{ $store.state.error
                          }}</div>
                        <div v-if="errMsg" class="mt-3 mx-auto mb-3 text-red text-capitalize text-caption" size="small"
                          max-width="80%">{{ errMsg }}</div>
                      </div>
                      <v-btn to="/redefinicao" size="small" variant="plain"
                        class="text-left text-capitalize font-weight-bold">Esqueceu a senha?</v-btn>
                    </div>
                  </v-container>
                  <v-btn @click="login" class="mb-3 text-white font-weight-bold text-capitalize"
                    color="blue">Entrar</v-btn>
                </form>
                <div class="d-flex align-center">

                  <v-divider class="font-weight-bold"></v-divider>
                  <div class="ms-3 me-3 text-body-2 font-weight-bold">ou</div>
                  <v-divider></v-divider>
                </div>
                <v-btn rounded="lg" class="mt-1 text-caption font-weight-bold mb-3" variant="outlined"
                  @click="signInWithGoogle"><v-img src="../assets/google.png" width="10%" height="auto"
                    class="ms-3 me-3"></v-img>
                  <div class="me-3">Entrar com o Google</div>
                </v-btn>
              </div>
              <div class="text-caption d-flex justify-center align-center"><v-btn variant="text"
                  class="text-caption text-left" color="error" to="/cadastro">
                  <div class="text-black">Novo no sistema? </div> Cadastre-se
                </v-btn>
              </div>
            </div>
          </v-sheet>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import CompLogin from '@/components/CompLogin.vue';
import { ref } from 'vue'
import { useStore } from 'vuex'
//import { getAuth,  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//import router from "@/router";
//import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";


export default {
  name: 'App',

  data: () => ({
    errMsg: ref(),
  }),
  setup() {
    const login_form = ref({});
    const store = useStore();


    const login = async () => {	
      await store.dispatch('login', login_form.value)		
      await store.dispatch('token');
      //const usuario = await store.dispatch('searchCadastro');

      //console.log(usuario);

    //  if(!usuario){
      //  await store.dispatch('CreateCadastro');
     // }
    }


    return {
      login_form,
      login,
      //loginGoogle
    }
  },
}



</script>
<style scoped>
.v-sheet {
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



.v-divider {
  margin-left: 10px;
  margin-right: 10px;
}

</style>