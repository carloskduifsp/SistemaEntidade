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
                                        <h1>Redefinição de Senha</h1>
                                    </v-row>
                                    <v-row class="d-flex justify-center align-top">
                                        <v-img src="../assets/tsuru-origami.png" max-width="100" />
                                    </v-row>
                                </v-container>

                                <v-container class="mx-auto">
                                    <v-text-field variant="outlined" v-model="email" label="Email"></v-text-field>
                                </v-container>
                                <v-btn @click="redefSenha" class="mb-3 text-white font-weight-bold text-capitalize"
                                    color="blue">Enviar Email de Redefinição</v-btn>

                                <div class="ms-3 me-3">
                                    <v-alert v-if="success" title="Email Enviado!"
                                        text="Verifique sua caixa de span e lixeira e defina sua nova senha"
                                        type="success"></v-alert>
                                    <v-alert v-if="errMsg" type="error" class="mt-3 mx-auto mb-3" max-width="80%">{{
                                            errMsg
                                    }}</v-alert>
                                </div>
                                <div class="d-flex align-center">

                                    <v-divider class="font-weight-bold"></v-divider>
                                    <div class="ms-3 me-3 text-body-2 font-weight-bold">ou</div>
                                    <v-divider></v-divider>
                                </div>

                            </div>
                            <div class="text-caption d-flex justify-center align-center"><v-btn variant="text"
                                    class="text-caption text-left" color="error" to="/cadastro">
                                    <div class="text-caption d-flex justify-center align-center"><v-btn variant="text"
                                            class="text-caption text-left" color="error" to="/">
                                            <div class="text-black">Possui Cadastro? </div> Faça Login
                                        </v-btn>
                                    </div>
                                </v-btn>
                            </div>
                        </div>
                    </v-sheet>
                </v-sheet>
            </v-container>
        </v-main>
    </v-app>
</template>
  
<script setup>
import { ref } from "vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const email = ref("");
const errMsg = ref()//error messag
const success = ref()




//redefinir Senha


const redefSenha = () => {
    if (email.value != "") {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email.value)
            .then(() => {
                console.log('email enviado')
                success.value = true;
                errMsg.value = false;
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
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
    }else{
        errMsg.value="Insira um endereço de Email.";
    }
}

</script>
<style scoped>
.space {
    display: flex;
    align-content: center;
}

.register {
    align-items: center;
}

.form {
    text-align: center;
    margin-top: 2rem;
}

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
</style>