<template>
    <v-container grid-list-sm>

        <v-card class="mb-5" elevation="10" style="text-align:center; color:aliceblue; background-color:#086ddd">
            <h1>Clientes Obras</h1>
        </v-card>

        <v-alert class="text-center" v-show="alert" border="start" type="success" variant="flat">
            <strong>{{ messageSuccess }}</strong>
        </v-alert>

        <v-row class="mt-4">
            <v-col cols="12" sm="6" md="4">
                <v-text-field variant="outlined" v-model="busca" :loading="loading" label="Pesquisa por nome">
                </v-text-field>
            </v-col>
            <v-col cols="4" sm="12" md="4">
                <v-btn variant="tonal" rounded="lg" size="large" color="info" append-icon="mdi-account-plus-outline"
                    elevation="5" to="/clientesObras/cadastrarcliente">
                    Incluir Cliente
                </v-btn>
            </v-col>
        </v-row>

        <v-table fixed-header style="text-align:center">
            <thead>
                <tr>
                    <th class="text-center text-h6 font-weight-bold">
                        Empresa
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Obra
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Cno Obra
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Responsável
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Telefone
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in clientes" :key="item.id">
                    <td :id="item.id">{{ item.empresa }}</td>
                    <td>{{ item.nomeobra }}</td>
                    <td>{{ item.cnoobra }}</td>
                    <td>{{ item.responsavel }}</td>
                    <td>{{ item.telefone }}</td>
                    <td>
                        <v-btn size="large" variant="tonal" @click="levarDados(item.id)" icon color="info">
                            <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn size="large" variant="tonal" @click="deleteCliente(item.id)"
                            prepend-icon="mdi-trash-can-outline" icon color="error">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-container>
</template>
<script>
import router from '../../router';
//import { getAuth } from "firebase/auth";
export default {
    data() {
        return {
            alert: false,
            clientes: [],
            data: [],
            busca: "",
            loading: false,
            messageSuccess: null
        }
    },
    methods: {
        async getCliente() {
            const token = localStorage.getItem("token");
            if (!token){
                this.$token();                
            }
            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];
            const req = await fetch(`${this.$baseUrlApiMain}/clienteObra/read/${companyId}`,{
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
                });
            const data = await req.json()
            this.clientes = data
        },
        // async isPermited() {
        //     const auth = getAuth();
        //     const u = auth.currentUser;
        //     const req = await fetch(`${this.$baseUrlApiMain}/cadastro/email?email=${u.email}`);
        //     const datauser = await req.json();
        //     if (!datauser[0].permissoes.clientes) {
        //         this.$store.state.error = true
        //         router.push('/index')
        //     }
        // },
        async deleteCliente(id) {
            const token = localStorage.getItem("token");
            if (!token){
                this.$token();                
            }

            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];

            const req = await fetch(`${this.$baseUrlApiMain}/clienteObra/delete/${companyId}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`  }
            });
            const res = await req;
            const status = res.status
            try {
                if (status === 200) {
                    this.alert = true
                    this.messageSuccess = `cliente deletado com sucesso!`
                    setTimeout(() => (this.messageSuccess = false, this.alert = false), 3000);
                    this.getCliente();
                } else {
                    console.log('Erro ao Deletar')
                }
            } catch (e) {
                console.error('Error', e)
            }
        },
        async levarDados(id) {
            router.push(`/clientesObras/alterarcliente/${id}`)
        },
        async search() {
            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];

            this.data = [];
            const req = await fetch(`${this.$baseUrlApiMain}/clienteObra/read/${companyId}`)
            const dataCompany = await req.json()


            if (this.busca != "") {
                this.data = [];
                dataCompany.forEach(element => {
                    if (element.nome.includes(this.busca) || element.id.includes(this.busca)
                        || element.nome.toLowerCase().includes(this.busca.toLowerCase())
                        || element.id == this.busca
                    ) {
                        this.data.push(element);
                    }

                });
            } else {
                this.data = dataCompany;
            }
        },
    },
    beforeMount() {
        this.$isPermited('clientes');
        this.getCliente();
    },
    mounted() {
        this.getCliente();
        this.search();
    }
}
</script>