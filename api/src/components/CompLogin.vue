<template>
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
          <v-text-field variant="outlined" :error="errMsg" v-model="login_form.email" label="Email"></v-text-field>
          <v-text-field variant="outlined" :error="errMsg" type="password" v-model="login_form.password"
            label="Senha"></v-text-field>
          <div class="text-left ">
            <div class="ms-3 me-3">
              <div v-if="$store.state.error" class="mt-3 mx-auto mb-3 text-red text-capitalize text-caption" size="small"
                closable>{{ $store.state.error
                }}</div>
              <div v-if="errMsg" class="mt-3 mx-auto mb-3 text-red text-capitalize text-caption" size="small"
                max-width="80%">{{ errMsg }}</div>
            </div>
            <v-btn to="/redefinicao" size="small" variant="plain"
              class="text-left text-capitalize font-weight-bold">Esqueceu a senha?</v-btn>
          </div>
        </v-container>
        <v-btn @click="login" class="mb-3 text-white font-weight-bold text-capitalize" color="blue">Entrar</v-btn>
      </form>
      <div class="d-flex align-center">

        <v-divider class="font-weight-bold"></v-divider>
        <div class="ms-3 me-3 text-body-2 font-weight-bold">ou</div>
        <v-divider></v-divider>
      </div>
      <v-btn rounded="lg" class="mt-1 text-caption font-weight-bold mb-3" variant="outlined"
        @click="signInWithGoogle"><v-img src="../assets/google.png" width="10%" height="auto" class="ms-3 me-3"></v-img>
        <div class="me-3">Entrar com o Google</div>
      </v-btn>
    </div>
    <div class="text-caption d-flex justify-center align-center"><v-btn variant="text" class="text-caption text-left"
        color="error" to="/cadastro">
        <div class="text-black">Novo no sistema? </div> Cadastre-se
      </v-btn>
    </div>
  </div>
</template>

<script setup>
//import { ref, onMounted } from "vue";
//import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
//import router from "@/router";

////const email = ref("");
//const password = ref("");
//const errMsg = ref()//error messag


/* const redefSenha = () => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      console.log('email enviado')
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (error.code) {
      case "auth/invalid-email":
        errMsg.value = "Email inválido";
        break;
      case "auth/user-not-found":
        errMsg.value = "Não foi encontrado nenhuma conta com este email";
        break;
    }
      // ..
    });
} */

</script>

<style scoped>
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
}</style>