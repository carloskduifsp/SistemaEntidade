<template>
    <v-container class="w-60 mx-auto">
        <v-card class="mb-5" elevation="10" style="text-align:center; color:aliceblue; background-color:#086ddd">
            <h1>Cadastrar Fornecedor</h1>
        </v-card>

        <v-card elevation="10">
            <v-divider></v-divider>

            <v-card-text>
                <h3> <v-icon icon="mdi-account-details-outline"></v-icon> Dados gerais</h3>

                <v-form ref="form">
                    <v-row>
                        <v-col>
                            <v-select :rules="rules" label="Tipo de Fornecedor *" variant="solo" v-model="tipo"
                                :items="['Pessoa Física', 'Pessoa Jurídica']"></v-select>
                        </v-col>
                        <v-col>
                            <v-select :rules="rules" label="Situação *" variant="solo" v-model="situacao"
                                :items="['Ativo', 'Inativo']"></v-select>

                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="nome" label="Nome *"
                                placeholder="Nome do Fornecedor" required prepend-inner-icon="mdi-account">
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="email" label="E-mail *"
                                prepend-inner-icon="mdi-email-multiple"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field variant="outlined" v-model="telefone" label="Telefone"
                                placeholder="(DDD) 99999-9999" prepend-inner-icon="mdi-phone">
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field variant="outlined" v-model="celular" label="Celular"
                                placeholder="(DDD) 99999-9999" prepend-inner-icon="mdi-phone">
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <p v-if="alertEmpty" id="alertEmpty">
                            Preencha todos os campos obrigatórios (*)</p>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-btn color="warning" class="mt-4" block to="/fornecedores">
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
                        </v-avatar>Fornecedor cadastrado(a) com sucesso!
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
                        limpar o formulário? Todo seu progresso será perdido.
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
import router from '../router';
import { getAuth } from "firebase/auth";
export default {
    data: () => ({
        overlay: false,
        valid: true,
        nome: null,
        tipo: null,
        situacao: null,
        telefone: null,
        celular: null,
        email: null,
        datacadastro: null,
        rules: [v => !!v || 'Preenchimento obrigatório',
        ],
        alertSucces: false,
        alertClose: false,
        alertEmpty: false
    }),
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
        async validate() {
            const { valid } = await this.$refs.form.validate()

            if (valid == true && this.nome != null && this.situacao != null && this.email != null) this.salvar()
            else this.alertEmpty = true
        },
        async salvar() {
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const Data = today.toLocaleString()
            this.datacadastro = Data

            console.log(Data)
            if (this.telefone == null) {
                this.telefone = "Não Informado";
            }
            if (this.celular == null) {
                this.celular = "Não Informado";
            }

            this.overlay = true
            const data = {
                nome: this.nome,
                tipo: this.tipo,
                situacao: this.situacao,
                telefone: this.telefone,
                celular: this.celular,
                email: this.email,
                datacadastro: this.datacadastro,
                dataalteracao: ''
            }

            console.log(data)
            const dataJson = JSON.stringify(data);
            await fetch(`${this.$baseUrlApiMain}/fornecedor/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });
            this.overlay = false
            this.alertSucces = true
            this.reset()
        },
        reset() {
            this.$refs.form.reset()
            this.alertClose = false
        },
    },
    async beforeMount() {
        this.isPermited()
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