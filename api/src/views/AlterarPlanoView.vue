<template>
    <v-container grid-list-sm>
    <v-card class="mb-5" elevation="10" style="text-align:center; color:aliceblue; background-color:#086ddd">
            <h1>Alterando Plano</h1>
        </v-card>

    <v-container class="mt-5 rounded-lg border text-center">
        <v-card-text>
            <v-form ref="form" class="mb-5" v-model="valid" lazy-validation>
                <v-row justify="center">
                    <v-col cols="12">
                        <v-text-field 
                        placeholder="Insira o novo nome do plano"
                        label="Nome do Plano*"
                        :rules="nomePlanoRule"
                        v-model="novoPlanoNome"
                        :loading="loading"
                        variant="outlined">
                        </v-text-field>
                    </v-col>
                    
                </v-row>

                <v-row >
                    <v-col cols="5">
                        <v-select
                        v-if="planoSelected[0].idParente != null"
                        label="Conta-Mãe*"
                        :loading="loading"
                        v-model="novoPlanoContaMae"
                        :items="planosList">
                        </v-select>

                        <span v-else>Este plano é uma conta-mãe primária, não é possível move-lá! </span>
                    </v-col>
                    
                    <v-col cols="4">
                        <v-select
                        label="Tipo de Movimentação*"
                        :items="TipoMovimentoList"
                        :loading="loading"
                        v-model="novoTipoMovimento">
                        </v-select>
                    </v-col>
                    
                    <v-col cols="3">
                        <v-checkbox v-model="novoDisponivelDRE" label="Mostrar plano na DRE"></v-checkbox>   
                    </v-col>
                </v-row>

                <v-row>
                        <v-btn
                        :disabled="!valid"
                        :loading="loading"
                        @click="atualizarPlano()"
                        color="info"
                        class="mr-5">
                        Cadastrar
                        </v-btn>

                        <v-btn
                        :loading="loading"
                        @click="this.$router.push('/planos')">
                            Cancelar
                        </v-btn>
                        
                </v-row>
            </v-form>
        </v-card-text>
        <v-container v-if="showSuccess">
            <v-alert 
            class="text-center"  
            type="success" 
            variant="flat">                    
                <strong>Plano cadastrado com sucesso!</strong>  
                </v-alert>
            <v-container class="d-flex justify-center">
                <v-progress-circular
                indeterminate
                color="green"
                ></v-progress-circular>

                <div class="mt-2 ml-5">Retornando aos Planos...</div>
            </v-container>
        </v-container>

        <v-container v-if="showError">
            <v-alert 
            class="text-center"  
            type="error" 
            variant="flat">                    
                <strong>Erro ao cadastrar o plano!</strong><br>
                <span>Contate o suporte</span>  
            </v-alert>
        </v-container>
  </v-container>
</v-container>
</template>

<script>
    export default {
        data() {
            return {
                loading: true,
                showSuccess: false,
                showError: false,
                valid: false,
                novoPlanoContaMae: "Nenhuma",
                novoPlanoNome: "",
                novoPlanoParente: null,
                novoDisponivelDRE: false,
                novoTipoMovimento: "Pagamento",
                TipoMovimentoList: ["Pagamento", "Recebimento"],
                planoSelected: [{idParente: null}],
                planos: [],
                planosList: [],
                nomePlanoRule: [
                    v => v = !!v || "Campo obrigatório"
                ]
            }
        },
        async beforeMount() {
            this.planoSelected = await this.getPlanoByID(this.$route.params.id)
            this.planos = await this.getPlanos()
            this.planosList = this.formPlanoSelect()
            await this.fillForm(this.planoSelected)
            this.loading = false       
        },
        methods: {
            async getPlanoByID(id) {
                const req = await fetch(`${this.$baseUrlApiMain}/plano/read/${id}`)
                return req.json() 
            },

            async getPlanos() {
                const req = await fetch(`${this.$baseUrlApiMain}/plano/read`)
                return req.json()     
            },
            
            formPlanoSelect() {
                var planoResult = []
                planoResult.push("Nenhuma")
                this.planos.forEach((obj) => {
                    planoResult.push(obj.classificacao + " | " + obj.nomeplano)
                })

                return planoResult
            },

            async fillForm() {
                this.novoPlanoNome = this.planoSelected[0].nomeplano
                this.novoDisponivelDRE = this.planoSelected[0].disponiveldre

                if (this.novoTipoMovimento == 1) {"Pagamento"} else {"Recebimento"}   

                if (this.planoSelected[0].idParente != null) {
                    let resultObj = this.planos.find(obj => obj.id == this.planoSelected[0].idParente)

                    this.planosList.forEach((str) => {
                        if (str == resultObj.classificacao + " | " + resultObj.nomeplano) {
                            this.novoPlanoContaMae = str
                        }
                    })
                }

                
            },

            pegarMae() {
                this.planos.forEach((obj) =>{
                    if (this.novoPlanoContaMae.includes(obj.classificacao)){
                        this.novoPlanoParente = obj.id
                    }
                })
            },

            async atualizarPlano() {
                this.loading = true
                if(this.novoPlanoContaMae != "Nenhuma") {
                    this.pegarMae()
                }
                let tTipoMovimento = 0

                if (this.novoTipoMovimento == "Pagamento"){
                    tTipoMovimento = 1
                } else {
                    tTipoMovimento = 2
                }

                const data = {
                    nomeplano: this.novoPlanoNome,
                    idparente: this.novoPlanoParente,
                    disponiveldre: this.novoDisponivelDRE,
                    tipomovimento: tTipoMovimento
                }

                const dataJson = JSON.stringify(data);
                const req = await fetch(`${this.$baseUrlApiMain}/plano/update/${this.planoSelected[0].id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });
                
                this.loading = false
                this.valid = false
                this.showMessage(req.status)

            },
            showMessage(status) {
                if (status == 200) {
                    this.showSuccess = true
                    this.$router.push('/planos')
                } else {
                    this.showError = true
                }
            }
        }
    }
    
</script>