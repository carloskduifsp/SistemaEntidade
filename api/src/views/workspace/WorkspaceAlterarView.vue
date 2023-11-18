<template>
    <v-container class="w-60 mx-auto">
        <v-card class="mb-5" elevation="10" style="text-align:center; color:aliceblue; background-color:#086ddd">
            <h1>alterarworkspace Workspace</h1>
        </v-card>

        <v-card elevation="10">
            <v-divider></v-divider>

            <v-card-text>
                <h3> <v-icon icon="mdi-account-details-outline"></v-icon> Dados do Workspace</h3>

                <v-form ref="form">
                    <v-row>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="workspacename" label="Workspace *"
                                placeholder="Nome do Workspace" required prepend-inner-icon="mdi-account">
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="workspaceid" label="ID Workspace *"
                                placeholder="ID do Workspace" required prepend-inner-icon="mdi-account">
                            </v-text-field>

                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="tenantid" label="Tenant ID *"
                                placeholder="Tenant ID Azure" required prepend-inner-icon="mdi-account">
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="appid" label="Aplicativo ID *"
                                placeholder="Aplicativo ID Azure" required prepend-inner-icon="mdi-account">
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="clientid" label="Client ID *"
                                placeholder="Client ID Azure" required prepend-inner-icon="mdi-account">
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="clientsecret" label="Client Secret *"
                                placeholder="Client Secret Azure" required prepend-inner-icon="mdi-account">
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <p v-if="alertEmpty" id="alertEmpty">
                            Preencha todos os campos obrigatórios (*)</p>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-btn color="warning" class="mt-4" block to="/workspace">
                                Voltar
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn color="error" class="mt-4" block @click="alertClose = true">
                                Limpar formulário
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn color="success" class="mt-4" block @click="validate">
                                Salvar
                            </v-btn>
                        </v-col>
                    </v-row>

                </v-form>
            </v-card-text>

            <v-dialog v-model="alertSucces">
                <v-card color="success" max-width="800" min-width="344" height="80">
                    <v-card-text>
                        <v-avatar>
                            <v-icon dark icon="mdi-checkbox-marked-circle"></v-icon>
                        </v-avatar>Workspace Alterado com sucesso!
                    </v-card-text>

                </v-card>
            </v-dialog>

            <v-dialog v-model="alertClose" persistent>
                <v-card color="error" max-width="800" min-width="344">
                    <v-card-text>
                        <v-avatar>
                            <v-icon icon="mdi-alert"></v-icon>
                        </v-avatar>
                        Tem certeza de que deseja
                        limpar o formulário? Todos Dados na tela será limpo.
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="alertClose = false">Cancelar</v-btn>
                        <v-btn @click="reset()">Limpar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
        <v-overlay :model-value="overlay" class="align-center justify-center">
            <v-progress-circular indeterminate size="54" color="primary"></v-progress-circular>
        </v-overlay>
    </v-container>
</template>

<script>
//import router from '../../router';
//import { getAuth } from "firebase/auth";
export default {
    data: () => ({
        overlay: false,
        valid: true,
        workspacename: null,
        workspaceid: null,
        tenantid: null,
        clientid: null,
        clientsecret: null,
        appid: null,
        datacadastro: null,
        rules: [v => !!v || 'Preenchimento obrigatório',
        ],
        alertSucces: false,
        alertClose: false,
        alertEmpty: false
    }),
    methods: {
        async validate() {
            const { valid } = await this.$refs.form.validate()

            if (valid == true && this.workspacename != null && this.workspaceid != null && this.tenantid != null && this.clientid != null && this.clientsecret != null && this.appid != null) this.update()
            else this.alertEmpty = true
        },
        async dataUpdate() {
            const token = localStorage.getItem("token");
            if (!token){
                this.$token();                
            }
            
            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];

            const req = await fetch(`${this.$baseUrlApiMain}/workspace/read/${companyId}/${this.$route.params.id}`,{
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
                });
            const data = await req.json();

            this.workspacename = data[0].workspacename;
            this.workspaceid = data[0].workspaceid;
            this.tenantid = data[0].tenantid;
            this.clientid = data[0].clientid;
            this.clientsecret = data[0].clientsecret;
            this.appid = data[0].appid;
        },
        async update() {

            const token = localStorage.getItem("token");
            if (!token){
                this.$token();                
            }

            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];

            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const Data = today.toLocaleString()
            this.datacadastro = Data
            
            this.overlay = true

            this.idworkspace = this.$route.params.id
            const data = {
                idworkspace: this.idworkspace,
                workspacename: this.workspacename,
                workspaceid: this.workspaceid,
                tenantid: this.tenantid,
                clientid: this.clientid,
                clientsecret: this.clientsecret,
                appid: this.appid,
                datacadastro: this.datacadastro,
                dataalteracao: '',
                idEmpresa: companyId
            }
            const dataJson = JSON.stringify(data);
            const req = await fetch(`${this.$baseUrlApiMain}/workspace/update/${this.$route.params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: dataJson
            });
            await req.json;
            this.overlay = false
            this.alertSucces = true
            this.alertClose = false
            this.reset()
            // setTimeout(() => {
            //     router.push('/clientes');
            // }, 3000);

        },        
        reset() {
            this.$refs.form.reset()
            this.alertClose = false
        },
    },
    async beforeMount() {
        this.$isPermited('workspacereports');
        this.dataUpdate();
    },
    watch: {
        alertSucces(val) {
            val && setTimeout(() => {
                this.alertSucces = false;
            }, 2000);
        }
    },
}
</script>

<style scoped>
h3 {
    margin-top: 5vh;
    margin-bottom: 2vh;
}


form {
    margin-top: 1%;
}

.addcel {
    margin-top: 15px;
}

#alertEmpty {
    color: rgb(146, 3, 3);
    margin-top: 30px;
    margin-left: 15px;
    font-size: 1.3em;
}
</style>