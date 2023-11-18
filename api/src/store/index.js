import { createStore } from 'vuex'
import router from '../router'
import globalVariable from '../globalVariable'

//import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'

export default createStore({
  state: {
    drawer: true,
    error: null,
    msg: false,
    user: null,
    baseUrlApiMain: globalVariable.baseUrlApiMain,
    usuario: [],
    sistemas: [],
    permissoes: [],
    empresas: [],
    token: null,
  },
  getters: {
    getbaseUrlApiMain: (state) => state.baseUrlApiMain,
    getToken: (state) => state.token,
    getUsuario: (state) => state.usuario,
    getPermissoes: (state) => state.permissoes,
    getListSistema: (state) => state.sistemas,
    getListCompany: (state) => state.empresas,
  },
  mutations: {
    storeInter(state, data) {
      state.inter.push(data)

    },


    setToken(state, token) {
      state.token = token
    },

    setUsuario(state, usuario) {
      state.usuario = usuario
    },

    setPermissoes(state, permissoes) {
      state.permissoes = permissoes
    },

    setListSistema(state, sistemas) {
      state.sistemas = sistemas
    },

    setListCompany(state, empresas) {
      state.empresas = empresas
    },

    SET_USER(state, user) {
      state.user = user
    },

    CLEAR_USER(state) {
      state.user = null
    }
  },
  actions: {

    async login({ commit }, details) {
      const { email, password } = details

      try {
        await signInWithEmailAndPassword(getAuth(), email, password)
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert("Não foi encontrado nenhuma conta com este email")
            break
          case 'auth/wrong-password':
            alert("Senha Incorreta")
            break
          case "auth/invalid-email":
            alert("Email inválido")
            break
          default:
            alert("Something went wrong")
        }

        return
      }

      commit('SET_USER', getAuth().currentUser)
      
      router.push('/index')
    },

    async register({ commit }, details) {
      const { email, password } = details

      try {
        await createUserWithEmailAndPassword(getAuth(), email, password)
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert("E-mail já está em uso.")
            break
          case 'auth/invalid-email':
            alert("Endereço de e-mail inválido.")
            break
          case 'auth/operation-not-allowed':
            alert("Operação não permitida")
            break
          case 'auth/weak-password':
            alert("A senha é muito fraca.")
            break
          default:
            alert("Ocorreu um erro ao criar o usuário")
        }
        return
      }

      commit('SET_USER', getAuth().currentUser)
      router.push('/index')
    },

    async logout({ commit }) {
      await signOut(getAuth())

      commit('CLEAR_USER')
      window.localStorage.removeItem("token");
      router.push('/')
    },

    signInWithGoogle({ commit }) {
      //const { email, password } = details
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result.user);
          router.push("/index")
        }).catch(() => {
          return
        })

      commit('SET_USER', getAuth().currentUser)

      router.push('/')
    },

    fetchUser({ commit }) {

      getAuth().onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    },

    async token({ commit, getters }) {

      const dados = {
        email: getAuth().currentUser.email
      }
      const dataJson = JSON.stringify(dados);
      const respon = await fetch(`${getters.getbaseUrlApiMain}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson
      });
      const response = await respon.json()
      localStorage.setItem('token', response.token);
      commit('setToken', response.token)
      return response.token;
    },

    async searchCadastro({ commit, getters }) {

      const req = await fetch(`${getters.getbaseUrlApiMain}/cadastro/email/${getAuth().currentUser.email}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getters.getToken}` }
      });
      const datauser = req.json();

      datauser.then(async resultado => {
        if (resultado.length == 0) {
          commit('setUsuario', null)
          return false;
        } else {
          commit('setUsuario', resultado)
          return true
        }
      }).catch(erro => {
        console.log(erro)
      });

    },

    async CreateCadastro({ commit, getters }) {
      const sisDefault = await fetch(`${getters.getbaseUrlApiMain}/sistema/read/0`);
      const dataDefault = sisDefault.json()
      const permissoes = {};
      dataDefault.then(async result => {
        if (result.length != 0) {
          for (let i = 0; i < result.length; i++) {
            const element = result[i].nomesistema;
            permissoes[`${element}`] = true
          }

          const permissoesJson = JSON.stringify(permissoes)

          const data = {
            nome: getAuth().currentUser.displayName,
            email: getAuth().currentUser.email,
            uid: getAuth().currentUser.uid,
            login: true,
            alterar: false,
            permissoes: permissoesJson

          }
          commit('setUsuario', data)
          commit('setPermissoes', permissoesJson)
          const dataJson = JSON.stringify(data)
          fetch(`${getters.getbaseUrlApiMain}/cadastro/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${getters.getToken}` },
            body: dataJson
          });

        }
      }).catch(erro => {
        console.log(erro)
      });

    },

    async ListSistema({ commit, getters }) {
      const company = localStorage.getItem('companyId')
      let companyId = 1;

      if (company != null) {
        let companyI = company.split("-");
        companyId = companyI[0];
      }

      await fetch(`${getters.getbaseUrlApiMain}/sistema/read/${companyId}`)
        .then(async response => {
          if (!response.ok) {
            throw new Error('Erro na request');
          }
          return response.json();
        }).then(dados => {
          commit('setListSistema', dados);
        })
    },

    async ListCompany({ commit, getters }) {

      //if (getAuth().currentUser.email){                         
      const req = await fetch(`${getters.getbaseUrlApiMain}/empresa/readtocadastro/kdu1s683@itepbrasil.net`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getters.getToken}` }
      });
      // .then(async resultado => {
        const empresas = []
        const data = await req.json()
          for (let i = 0; i < data.length; i++) {
            empresas.push(data[i].id + '-'+ data[i].razaosocial );
        }        
        // if (resultado.length != 0) {
        //   const lsempre = resultado.map(objeto => ({ id: objeto.id, razaosocial: objeto.razaosocial }));

        // const empresas = []
        // for (let i = 0; i < dados.length; i++) {
        //   empresas.push(dados[i].id + '-' + dados[i].razaosocial);
        // }
        commit('setListCompany', `${getters.getUsuario}`);
        //return dados;
          //throw new Error('Erro na request');
          //   return 'Erro na response';
          // }
          //commit('setListCompany', resultado);
       // }
     // });
    }
  },
  modules: {
  }
})
