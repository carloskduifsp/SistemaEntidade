<template>
  <v-app>
    
    <NavigationDrawer v-if="$store.state.user" :listSistem="listSistem" :permissoes="permissoes" :listEmpresa="listEmpresa"></NavigationDrawer>
    <v-main absolute transition="scroll-y-transition">
      <routerView></routerView>
    </v-main>

  </v-app>
</template>


<script >
import { onBeforeMount } from 'vue'
import { useStore, mapGetters } from 'vuex'
import NavigationDrawer from "./components/NavigationDrawer.vue";

export default {
  name: 'App',
  setup() {
    const store = useStore()
    onBeforeMount(async () => {
      await store.dispatch('fetchUser')
      await store.dispatch('ListSistema');
      await store.dispatch('ListCompany');
    })
  },
  computed: {
      ...mapGetters({
        listSistem: 'getListSistema',
        permissoes: 'getPermissoes',
        listEmpresa: 'getListCompany',
      })
  },
  components: {
    NavigationDrawer
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>