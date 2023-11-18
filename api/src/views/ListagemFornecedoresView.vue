<template>
    <v-container grid-list-sm>

        <v-card class="mb-5" elevation="10" style="text-align:center; color:aliceblue; background-color:#086ddd">
            <h1>Fornecedores</h1>
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
                    elevation="5" to="/fornecedores/cadastrarfornecedor">
                    Incluir Fornecedor
                </v-btn>
            </v-col>
        </v-row>

        <v-table fixed-header style="text-align:center">
            <thead>
                <tr>
                    <th class="text-center text-h6 font-weight-bold">
                        Nome
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Tipo
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Situação
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Telefone
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Celular
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        E-mail
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Cadastrado em
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Alterado em
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in fornecedores" :key="item.id">
                    <td :id="item.id">{{ item.nome }}</td>
                    <td>{{ item.tipo }}</td>
                    <td>{{ item.situacao }}</td>
                    <td>{{ item.telefone }}</td>
                    <td>{{ item.celular }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.datacadastro }}</td>
                    <td>{{ item.dataalteracao }}</td>
                    <td>
                        <v-btn size="large" variant="tonal" @click="levarDados(item.id)" icon color="info">
                            <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn size="large" variant="tonal" @click="deleteFornecedor(item.id)"
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
import router from '../router';
import { getAuth } from "firebase/auth";
export default {
    data() {
        return {
            alert: false,
            fornecedores: [],
            data: [],
            busca: "",
            loading: false,
            messageSuccess: null
        }
    },
    methods: {
        async isPermited() {
            const auth = getAuth();
            const u = auth.currentUser;
            const req = await fetch(`${this.$baseUrlApiMain}/cadastro/email?email=${u.email}`);
            const datauser = await req.json();
            if (!datauser[0].permissoes.fornecedores) {
                this.$store.state.error = true
                router.push('/index')
            }
        },
        async getFornecedor() {
            const req = await fetch(`${this.$baseUrlApiMain}/fornecedor/read`);
            const data = await req.json()
            this.fornecedores = data
        },
        async deleteFornecedor(id) {
            const reqFornecedor = await fetch(`${this.$baseUrlApiMain}/fornecedor/read/${id}`);
            const resFornecedor = await reqFornecedor.json();
            let nome = resFornecedor[0].nome;

            const req = await fetch(`${this.$baseUrlApiMain}/fornecedor/delete/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            const res = await req;
            const status = res.status
            try {
                if (status === 200) {
                    this.alert = true
                    this.messageSuccess = `Fornecedor ${nome} deletado(a) com sucesso!`
                    setTimeout(() => (this.messageSuccess = false, this.alert = false), 3000);
                    this.getFornecedor();
                } else {
                    console.log('Erro ao Deletar')
                }
            } catch (e) {
                console.error('Error', e)
            }
        },
        async levarDados(id) {
            router.push(`/fornecedores/alterarfornecedor/${id}`)
        },
        async search() {
            this.data = [];
            const req = await fetch(`${this.$baseUrlApiMain}/fornecedor/read`)
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
        this.isPermited();
        this.getFornecedor();
    },
    mounted() {
        this.getFornecedor();
        this.search();
    }
}
</script>