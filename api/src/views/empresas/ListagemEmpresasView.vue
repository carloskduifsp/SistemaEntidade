<template>
    <v-container grid-list-sm>

        <v-card class="mb-5" elevation="10" style="text-align:center; color:aliceblue; background-color:#086ddd">
            <h1>Empresas</h1>
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
                    elevation="5" to="/empresas/cadastrarempresa">
                    Incluir Empresa
                </v-btn>
            </v-col>
        </v-row>

        <v-table fixed-header style="text-align:center">
            <thead>
                <tr>
                    <th class="text-center text-h6 font-weight-bold">
                        Nome Fantasia
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Razão Social
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Resposável
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        CNPJ
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Whatsapp
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in empresas" :key="item.id">
                    <td :id="item.id">{{ item.nomefantasia }}</td>
                    <td>{{ item.razaosocial }}</td>
                    <td>{{ item.responsavel }}</td>
                    <td>{{ item.cnpj }}</td>
                    <td>{{ item.whatsapp }}</td>
                    <td>
                        <v-btn size="large" variant="tonal" @click="levarDados(item.id)" icon color="info">
                            <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn size="large" variant="tonal" @click="deleteCompany(item.id)"
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
            empresas: [],
            data: [],
            busca: "",
            loading: false,
            messageSuccess: null
        }
    },
    methods: {
        async getCompany() {
            const token = localStorage.getItem("token");
            if (!token){
                this.$token();                
            }

            const req = await fetch(`${this.$baseUrlApiMain}/empresa/read`,{
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
                });
            const data = await req.json()
            this.empresas = data
        },
        async deleteCompany(id) {
            const token = localStorage.getItem("token");
            if (!token){
                this.$token();                
            }

            const req = await fetch(`${this.$baseUrlApiMain}/empresa/delete/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`  }
            });
            const res = await req;
            const status = res.status
            try {
                if (status === 200) {
                    this.alert = true
                    this.messageSuccess = `empresa deletada com sucesso!`
                    setTimeout(() => (this.messageSuccess = false, this.alert = false), 3000);
                    this.getCompany();
                } else {
                    console.log('Erro ao Deletar')
                }
            } catch (e) {
                console.error('Error', e)
            }
        },
        async levarDados(id) {
            router.push(`/empresas/alterarempresa/${id}`)
        },
        async search() {
            const token = localStorage.getItem("token");
            if (!token){
                this.$token();                
            }
            this.data = [];
            const req = await fetch(`${this.$baseUrlApiMain}/empresa/read`,{
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
                });
            const dataCompany = await req.json()


            if (this.busca != "") {
                this.data = [];
                dataCompany.forEach(element => {
                    if (element.nomefantasia.includes(this.busca) || element.id.includes(this.busca)
                        || element.nomefantasia.toLowerCase().includes(this.busca.toLowerCase())
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
        this.$isPermited('empresas');
        this.getCompany();
    },
    mounted() {
        this.getCompany();
        this.search();
    }
}
</script>