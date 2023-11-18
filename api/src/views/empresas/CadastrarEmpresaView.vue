<template>
    <v-container class="w-60 mx-auto">
        <v-card class="mb-5" elevation="10" style="text-align:center; color:aliceblue; background-color:#086ddd">
            <h1>Cadastrar Empresa</h1>
        </v-card>

        <v-card elevation="10">
            <v-divider></v-divider>

            <v-card-text>
                <h3> <v-icon icon="mdi-account-details-outline"></v-icon> Dados gerais</h3>

                <v-form ref="form">
                    <v-row>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="nomefantasia" label="Nome Fantasia *"
                                placeholder="Nome da Empresa" required prepend-inner-icon="mdi-account">
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="razaosocial" label="Razão social *"
                                prepend-inner-icon="mdi-head-snowflake"></v-text-field>
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="cnpj" label="CNPJ *"
                                placeholder="00.000.000/0001-00" required prepend-inner-icon="mdi-card-account-details">
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="responsavel" label="Responsável *"
                                prepend-inner-icon="mdi-account-supervisor"></v-text-field>
                        </v-col>

                    </v-row>

                    <v-row>

                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="email" label="Email *"
                                placeholder="usuario@email.com" required prepend-inner-icon="mdi-email-multiple">
                            </v-text-field>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col cols="5">
                            <v-text-field variant="outlined" v-model="telefone" label="Telefone celular *"
                                placeholder="(DDD) 99999-9999" required prepend-inner-icon="mdi-phone" :rules="rules">
                            </v-text-field>


                        </v-col>
                        <v-col cols="1" class="d-flex align-start">
                            <v-btn v-if="addRecado == false" variant="tonal" size="x-small" icon="mdi-plus" class="addcel"
                                @click="addRecado = true">
                            </v-btn>

                        </v-col>
                        <v-col>
                            <v-text-field variant="outlined" v-model="whatsapp" placeholder="(DDD) 99999-9999"
                                label="WhatsApp" required prepend-inner-icon="mdi-whatsapp">
                            </v-text-field>
                        </v-col>

                    </v-row>
                    <v-row v-if="addRecado">
                        <v-col cols="5">
                            <v-text-field variant="outlined" v-model="telefonerecado" label="Telefone p/ recado"
                                placeholder="(DDD) 99999-9999" required prepend-inner-icon="mdi-phone">
                            </v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-btn variant="tonal" size="x-small" icon="mdi-trash-can" class="addcel"
                                @click="addRecado = false">
                            </v-btn>
                        </v-col>

                    </v-row>
                    <v-divider></v-divider>
                    <h3> <v-icon icon="mdi-map-marker"></v-icon> Endereço</h3>
                    <v-row>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="cep" label="CEP *" placeholder="CEP">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-autocomplete :rules="rules" label="UF *" variant="solo" v-model="uf"
                                :items="estados"></v-autocomplete>
                        </v-col>
                        <v-col>
                            <v-autocomplete :rules="rules" label="Cidade *" variant="solo" v-model="cidade"
                                :items="listacidades" :disabled="!liberaCidades"></v-autocomplete>

                        </v-col>


                    </v-row>
                    <v-row>
                        <v-col cols="9">
                            <v-text-field :rules="rules" variant="outlined" v-model="logradouro" label="Logradouro *"
                                placeholder="Logradouro" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="3">
                            <v-text-field :rules="rules" variant="outlined" v-model="numcasa" label="Número *"
                                placeholder="Número" required type="number">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="bairro" label="Bairro *"
                                placeholder="Bairro">
                            </v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field variant="outlined" v-model="complemento" label="Complemento"
                                placeholder="Apt, Sala..." required>
                            </v-text-field>
                        </v-col>

                    </v-row>
                    <v-row>
                        <p v-if="alertEmpty" id="alertEmpty">
                            Preencha todos os campos obrigatórios (*)</p>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-btn color="warning" class="mt-4" block to="/empresas">
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
                        </v-avatar>Empresa cadastrada com sucesso!
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
//import router from '../../router';
//import { getAuth } from "firebase/auth";
export default {
    data: () => ({
        overlay: false,
        valid: true,
        nomefantasia: null,
        razaosocial: null,
        cnpj: null,
        email: null,
        responsavel: null,
        telefone: null,
        cep: null,
        uf: null,
        cidade: null,
        logradouro: null,
        numcasa: null,
        bairro: null,
        complemento: null,
        listacidades: [],
        listaestados: [],
        estados: [],
        telefonerecado: null,
        whatsapp: null,
        addRecado: false,
        rules: [v => !!v || 'Preenchimento obrigatório',
        ],
        alertSucces: false,
        alertClose: false,
        alertEmpty: false,
        liberaCidades: false
    }),
    methods: {       
        async validate() {
            const { valid } = await this.$refs.form.validate()

            if (valid == true && this.cnpj != null && this.responsavel != null && this.uf != null && this.cidade != null) this.salvar()
            else this.alertEmpty = true
        },
        async salvar() {
            if (this.telefonerecado == null) {
                this.telefonerecado = "Não Informado";
            }
            if (this.complemento == null) {
                this.complemento = "Não Informado";
            }

            this.overlay = true
            var data = {
                razaosocial: this.razaosocial,
                cnpj: this.cnpj,
                nomefantasia: this.nomefantasia,
                logradouro: this.logradouro,
                cep: this.cep,
                numcasa: this.numcasa,
                uf: this.uf,
                cidade: this.cidade,
                bairro: this.bairro,
                complemento: this.complemento,
                telefone: this.telefone,
                telefonerecado: this.telefonerecado,
                whatsapp: this.whatsapp,
                responsavel: this.responsavel,
                email: this.email,
            }

            const token = localStorage.getItem("token");
            if (!token){
                this.$token();                
            }
            const dataJson = JSON.stringify(data);
            await fetch(`${this.$baseUrlApiMain}/empresa/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}` },
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
        this.$isPermited('empresas');
        //esse get traz todos os estados do brasil
        const req = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");
        const data = await req.json()

        for (let i = 0; i < data.length; i++) {
            this.listaestados.push({ id: data[i].id, sigla: data[i].sigla })
            this.estados.push(data[i].sigla)
        }

    },
    watch: {
        alertSucces(val) {
            val && setTimeout(() => {
                this.alertSucces = false;
            }, 2000);
        },
        async uf() {
            //vai limpar o array pra garantir que as cidades não se acumulem quando muda o estado
            this.listacidades = []
            this.cidade = null

            // quando o estado for selecionado, esse método será ativado
            //procuro na lista e estados qual é o index que contem a sigla igual ao valor selecionado no campo UF
            let index = this.listaestados.findIndex(o => o.sigla === this.uf);

            //com esse index, vejo qual é o id do estado selecionado
            let id = this.listaestados[index].id

            //filtro os municipios a partir do Id do estado
            const req = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`);
            const data = await req.json()

            //"data" vai trazer um array com várias informações, então faço um for para preencehr o array listacidades com apenas os nomes
            for (let i = 0; i < data.length; i++) {
                this.listacidades.push(data[i].nome)
            }

            //libero o campo de escolhar a cidade
            this.liberaCidades = true;
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