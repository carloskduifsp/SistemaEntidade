<template>
    <v-container class="w-60 d-flex flex-column mx-auto">
        <v-card class="mb-5" elevation="10" style="text-align:center; color:aliceblue; background-color:#086ddd">
            <h1>Alteração de Sistema</h1>
        </v-card>

        <v-card elevation="10">
            <v-divider></v-divider>

            <v-window v-model="step">
                <v-window-item :value="1">
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field variant="outlined" v-model="nomesistema" :rules="nomesistemaRules" label="Nome"
                                placeholder="Insira o nome do Sistema" required>
                            </v-text-field>

                            <v-row>
                                <v-col>
                                    <v-text-field variant="outlined" v-model="iconsistema" label="Icon" required>
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-text-field variant="outlined" v-model="linksistema" :rules="linksistemaRules"
                                        label="Link" required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-window-item>

                <v-window-item :value="2">
                    <v-alert class="text-center" :msg="messageSuccess" border="start" type="success" variant="flat">
                        <strong>{{ messageSuccess }}</strong>
                    </v-alert>
                </v-window-item>
            </v-window>

            <v-divider></v-divider>
            <v-container>
                <v-card-actions variant="tonal">
                    <v-row>
                        <v-btn rounded="lg" size="large" color="primary" prepend-icon="mdi-arrow-left" elevation="5"
                            v-if="step == 1" to="/sistemas">
                            Voltar
                        </v-btn>

                        <v-spacer></v-spacer>

                        <v-btn rounded="lg" size="large" color="warning" prepend-icon="mdi-autorenew" elevation="5"
                            v-if="step == 1" variant="tonal" text @click="reset()">
                            Limpar
                        </v-btn>

                        <v-btn size="large" rounded="lg" append-icon="mdi-handshake" color="primary" elevation="5"
                            variant="tonal" v-if="step == 2" to="/sistemas">
                            Página de Listagem
                        </v-btn>

                        <v-spacer></v-spacer>


                        <v-btn rounded="lg" size="large" color="success" :loading="loading" :disabled="!valid"
                            v-if="step == 1" @click="validate(), updateSystem(), load()"
                            append-icon="mdi-content-save-outline" elevation="5">
                            Salvar
                        </v-btn>
                    </v-row>
                </v-card-actions>
            </v-container>

        </v-card>
    </v-container>
</template>
<script>
import router from '../../router';
import { getAuth } from "firebase/auth";

export default {
    data: () => ({
        valid: false,
        value: null,
        loading: false,
        step: 1,
        id: null,
        nomesistema: null,
        nomesistemaRules: [
            v => !!v || "Campo obrigatório"
        ],
        linksistema: null,
        linksistemaRules: [
            v => !!v || "Campo obrigatório"
        ],
        iconsistema: null,
        messageSuccess: null,
    }),
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
        reset() {
            this.$refs.form.reset();
        },
        validate() {
            this.$refs.form.validate();
        },
        resetValidation() {
            this.$refs.form.resetValidation();
        },
        async trazerDadosPai() {
            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];

            const req = await fetch(`${this.$baseUrlApiMain}/sistema/read/${companyId}/${this.$route.params.id}`);                        
            const data = await req.json();
            this.nomesistema = data[0].nomesistema;
            this.iconsistema = data[0].iconsistema;
            this.linksistema = data[0].linksistema;
        },
        async updateSystem() {
            this.id = this.$route.params.id
            this.nomesistema = this.nomesistema.toLowerCase();
            
            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];

            const data = {
                id: this.id,
                nomesistema: this.nomesistema,
                iconsistema: this.iconsistema,
                linksistema: this.linksistema,
                idEmpresa: companyId
            }
            const dataJson = JSON.stringify(data);
            const req = await fetch(`${this.$baseUrlApiMain}/sistema/update/${this.$route.params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });
            await req.json;
            this.messageSuccess = `Sistema ${this.nomesistema} alterado com sucesso!`;
        },

        limpaCampos() {
            this.nomesistema = null;
            this.iconsistema = null;
            this.linksistema = null
        },
        load() {
            this.loading = true
            setTimeout(() => (this.loading = false, this.step = 2, this.limpaCampos(), this.resetValidation()), 3000)
        },
    },
    async beforeMount() {
        this.isPermited();
        this.trazerDadosPai();
    },
    unmounted() {
        this.limpaCampos()
    },
    computed: {
        currentTitle() {
            switch (this.step) {
                case 1: return "Dados do Sitema";
                default: return "Alteração realizada com sucesso!";
            }
        },
    },
}
</script>