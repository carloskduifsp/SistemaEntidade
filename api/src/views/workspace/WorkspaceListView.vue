<template>
    <v-container grid-list-sm>

        <v-card class="mb-5" elevation="10" style="text-align:center; color:aliceblue; background-color:#086ddd">
            <h1>Workspace</h1>
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
                    elevation="5" to="/workspace/cadastrarworkspace">
                    Incluir Workspace
                </v-btn>
            </v-col>
        </v-row>

        <v-table fixed-header style="text-align:center">
            <thead>
                <tr>
                    <th class="text-center text-h6 font-weight-bold">
                        Workspace Name
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Workspace ID
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        TenantId
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        Cliente Id
                    </th>
                    <th class="text-center text-h6 font-weight-bold">
                        App-id
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in workspace" :key="item.id">
                    <td :id="item.id">{{ item.workspacename }}</td>
                    <td>{{ item.workspaceid }}</td>
                    <td>{{ item.tenantid }}</td>
                    <td>{{ item.clientid }}</td>
                    <td>{{ item.appid }}</td>
                    <td>
                        <v-btn size="large" variant="tonal" @click="updateWorkspace(item.id)" icon color="info">
                            <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>                    
                        <v-btn size="large" variant="tonal" @click="deleteWorkspace(item.id)"
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
            workspace: [],
            data: [],
            busca: "",
            loading: false,
            messageSuccess: null

        }
    },

    methods: {
        async getWorkspace() {
            const token = localStorage.getItem("token");
            if (!token){
                this.$token();                
            }
            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];
            const req = await fetch(`${this.$baseUrlApiMain}/workspace/read/${companyId}`,{
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
                });
            const data = await req.json();
            this.workspace = data
        },
        async deleteWorkspace(id) {
            const token = localStorage.getItem("token");
            if (!token){
                this.$token();                
            }
            const req = await fetch(`${this.$baseUrlApiMain}/workspace/delete/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`}
            });
            const res = await req;
            const status = res.status
            try {
                if (status === 200) {
                    this.alert = true
                    this.messageSuccess = `Workspace deletado(a) com sucesso!`
                    setTimeout(() => (this.messageSuccess = false, this.alert = false), 3000);
                    this.getWorkspace();
                } else {
                    console.log('Erro ao Deletar')
                }
            } catch (e) {
                console.error('Error', e)
            }
        },
        async updateWorkspace(id) {
            router.push(`/workspace/alterarworkspace/${id}`)
        },
        async search() {
            this.data = [];
            const token = localStorage.getItem("token");
            if (!token){
                this.$token();                
            }
            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];

            const req = await fetch(`${this.$baseUrlApiMain}/workspace/read/${companyId}`,{
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
                });
            const dataCompany = await req.json()

            if (this.busca != "") {
                this.data = [];
                dataCompany.forEach(element => {
                    if (element.workspacename.includes(this.busca) || element.id.includes(this.busca)
                        || element.workspacename.toLowerCase().includes(this.busca.toLowerCase())
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
        this.$isPermited('workspacereports');
    },
    mounted() {
        this.getWorkspace();
        //this.search();
    }
}
</script>