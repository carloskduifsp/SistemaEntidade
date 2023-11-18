<template>
  <v-navigation-drawer v-model="drawer" @click="drawer = !drawer" clipped permanent>

    <!--  -->
    <v-list active-color="blue" class="responsiveMenu">
      <v-list>
        <v-list-item :prepend-avatar="photoURL" :subtitle="email" :title="displayName" nav></v-list-item>
      </v-list>

      <v-list-item @click="cleanSelect()" link to="/index" prepend-icon="mdi-home" title="Inicio">
      </v-list-item>

      <!-- <v-list-item v-if="alterar" @click="cleanSelect()" link to="/permissoes" prepend-icon="mdi-account"
        title="Permissões">
        v-if="permissoes[`${item.nomesistema}`]"
      </v-list-item> -->
      {{listEmpresa }}
      <div v-for="item in listSistem" :key="item.linksistema">
        <v-list-item @click="cleanSelect()"  link :to="item.linksistema"
          :prepend-icon="item.iconsistema">
          <v-list-item-title class="text-capitalize">{{ item.nomesistema }}</v-list-item-title>
        </v-list-item>

      </div>
    </v-list>

    <v-list-item @click.stop="gaveta()" key="gaveta" prepend-icon="mdi-cards" title="Relatorios" link
      :color="active ? 'blue' : ''">

    </v-list-item>
    <v-divider></v-divider>
    
  <v-divider></v-divider>
    <v-list>
      <v-list-item>Versão: 1.{{ version }}<br />
        &copy; {{ new Date().getFullYear() }} - Itepbrasil
      </v-list-item>
    </v-list>

  </v-navigation-drawer>

  <div v-if="barra2">
    <v-navigation-drawer @click="barra2 = !barra2" v-model="barra2" style="z-index:1" permanent>
      <!-- Barra 2 -->
      <div v-for="item in relatorios" :key="item.linksistema">
        <v-list-item @click="pushRelSelect(item.workspaceid, item.reportid)" :prepend-icon="item.iconsistema">
          <v-list-item-title class="text-capitalize">{{ item.nomesistema }}</v-list-item-title>
        </v-list-item>

      </div>
      <!-- <v-list-item @click="drawer = !drawer" to="/reportbi">
        Geral
      </v-list-item>
      <v-list-item @click="drawer = !drawer" to="/reportbi">
        Clientes
      </v-list-item> -->
    </v-navigation-drawer>

  </div>

  <v-app-bar app>

    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Sistema Financeiro</v-toolbar-title>

    <v-col>
      <v-select label="Empresa" variant="solo" @update:modelValue="ChangeCompany" v-model="companySelected"
        :items="listEmpresa"></v-select>

    </v-col>

    <v-menu transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" :prepend-avatar="photoURL" max-width="70">
        </v-list-item>
      </template>
      <v-list>
        <v-list-item>

          <v-list-item-title> Perfil.</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$store.dispatch('logout')">

          <v-list-item-title> Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth } from "firebase/auth";
//import router from "@/router";
//import { useStore } from 'vuex'

const avatar = require("../assets/avatar.png");

const config = require("../version.json");

//import path from "path";
const displayName = ref();
const photoURL = ref();
const email = ref()
const version = ref()


onMounted(() => {

  const auth = getAuth();
  const user = auth.currentUser;
  displayName.value = (user.displayName) ? user.displayName : user.email;
  photoURL.value = (user.photoURL) ? user.photoURL : avatar;
  email.value = (!user.displayName) ? '' : user.email;
  version.value = config.version;
})

</script>
<script >
export default {
  props: { listSistem:[],
    permissoes: [],
    listEmpresa: []},
  setup() {
    //const store = useStore()
    
    //this.getId();
    //this.getRelatorios(); 
    //this.ListCompany();
  },
  onMounted(){
    console.log('testes');
  },
  data() {
    return {
      rw: "220",
      drawer: true,
      relatorios: [],
      active: false,
      barra2: false,
      alterar: false,
      id: null,
      companySelected: localStorage.getItem('company')
    };
  },
  methods: {
    gaveta() {
      this.barra2 = !this.barra2;
      if (this.barra2) {
        this.active = true;
      }
      else {
        this.active = false;
      }
    },
    cleanSelect() {
      this.active = false;
      this.barra2 = false;
    },
    async pushRelSelect(workspaceid, reportid) {
      this.active = false;
      this.barra2 = false;
      await this.$router.push({ path: '/reportbi/' + workspaceid + '/' + reportid });
    },
    
    async getRelatorios() {
      const req = await fetch(`${this.$baseUrlApiMain}/sistema/relatorios`);
      const data = await req.json()
      this.relatorios = data;
    },
  

    ChangeCompany: function (object) {
      localStorage.setItem('company', object);
      // :data-selected="selectedOption"
      window.location.reload();
    },
  },
  watch: {
    alertSucces(val) {
      val && setTimeout(() => {
        this.alertSucces = false;
      }, 2000);
    },
    barra2(b) {
      if (b) {
        this.rw = "130";

      }
      else {
        this.rw = "220";
      }
    }
  },
 
}
</script>

<style>
.barra2 {
  display: none;
  width: 0;
}
</style>