<template>
    <v-container grid-list-sm>

        <v-card class="mb-5" elevation="10" style="text-align:center; color:aliceblue; background-color:#086ddd">
            <h1>Sistemas</h1>
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
                    elevation="5" to="/sistemas/cadastrarsistema">
                    Incluir Sistema
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
                        Icon
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Link
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in sistemas" :key="item.id">
                    <td :id="item.id">{{ item.nomesistema }}</td>
                    <td>{{ item.iconsistema }}</td>
                    <td>{{ item.linksistema }}</td>
                    <td>
                        <v-btn size="large" variant="tonal" @click="levarDados(item.id)" icon color="info">
                            <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn size="large" variant="tonal" @click="deleteSystem(item.id)"
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
import { getAuth } from "firebase/auth";
export default {
    data() {
        return {
            alert: false,
            sistemas: [],
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
            if (!datauser[0].permissoes.sistemas) {
                this.$store.state.error = true
                router.push('/index')
            }
        },
        async getSystem() {

            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];

            const req = await fetch(`${this.$baseUrlApiMain}/sistema/read/${companyId}`);
            const data = await req.json()
            this.sistemas = data
        },
        async deleteSystem(id) {
            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];

            const reqSystem = await fetch(`${this.$baseUrlApiMain}/sistema/read/${companyId}/${id}`);
            const resSystem = await reqSystem.json();
            let nomesistema = resSystem[0].nomesistema;

            const req = await fetch(`${this.$baseUrlApiMain}/sistema/delete/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            const res = await req;
            const status = res.status
            try {
                if (status === 200) {
                    this.alert = true
                    this.messageSuccess = `Sistema ${nomesistema} deletado com sucesso!`
                    setTimeout(() => (this.messageSuccess = false, this.alert = false), 3000);
                    this.getSystem();
                } else {
                    console.log('Erro ao Deletar')
                }
            } catch (e) {
                console.error('Error', e)
            }
        },
        async levarDados(id) {            
            router.push(`/sistemas/alterarsistema/${id}`)
        },
        async search() {
            this.data = [];

            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];

            const req = await fetch(`${this.$baseUrlApiMain}/sistema/read/${companyId}`)
            const dataSystem = await req.json()


            if (this.busca != "") {
                this.data = [];
                dataSystem.forEach(element => {
                    if (element.nomesistema.includes(this.busca) || element.id.includes(this.busca)
                        || element.nomesistema.toLowerCase().includes(this.busca.toLowerCase())
                        || element.id == this.busca
                    ) {
                        this.data.push(element);
                    }

                });
            } else {
                this.data = dataSystem;
            }
        },
    },
    beforeMount() {
        this.isPermited();
        this.getSystem();
    },
    mounted() {
        this.getSystem();
        this.search();
    }
}
</script>