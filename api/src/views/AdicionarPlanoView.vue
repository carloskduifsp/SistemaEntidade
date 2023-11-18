<template>
    <v-container grid-list-sm>
    <v-card class="mb-5" elevation="10" style="text-align:center; color:aliceblue; background-color:#086ddd">
            <h1>Adicionar Plano </h1>
        </v-card>

    <v-container class="mt-5 rounded-lg border text-center">
        <v-card-text>
            <v-form ref="form" class="mb-5" v-model="valid" lazy-validation>
                <v-row justify="center">
                    <v-col cols="12">
                        <v-text-field 
                        placeholder="Insira o nome do plano"
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
                        label="Conta-Mãe*"
                        :loading="loading"
                        v-model="novoPlanoContaMae"
                        :items="planosList">
                        </v-select>
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
                        @click="cadastrarPlano()"
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
                planos: [],
                planosList: [],
                nomePlanoRule: [
                    v => !!v || "Campo obrigatório"
                ]
            }
        },
        async beforeMount() {
            this.planos = await this.getPlanos()
            this.planosList = this.formPlanoSelect()

            this.proximaClassificacaoDisponivel() 
            this.loading = false
        },
        methods: {
            async getPlanos() {
                const req = await fetch(`${this.$baseUrlApiMain}/plano/read`)
                return req.json()     
            },

            async getNextID() {
                const req = await fetch(`${this.$baseUrlApiMain}/plano/getNextID`)
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

            proximaClassificacaoDisponivel() {
                this.planos.forEach((obj) => {
                    if (parseInt(obj.classificacao[0])+1 > parseInt(this.novoPlanoClassificao)) { 
                        this.novoPlanoClassificao = parseInt(obj.classificacao[0])+1
                    }
                })
            },

            pegarMae() {
                this.planos.forEach((obj) =>{
                    if (this.novoPlanoContaMae.includes(obj.classificacao)){
                        this.novoPlanoParente = obj.id
                    }
                })
            },
            
            async cadastrarPlano() {
                this.loading = true
                if(this.novoPlanoContaMae != "Nenhuma") {
                    this.pegarMae()
                } else {
                   this.proximaClassificacaoDisponivel()
                }

                let tTipoMovimento
                if (this.novoTipoMovimento == "Pagamento"){
                    tTipoMovimento = 1
                } else if (this.novoTipoMovimento == "Recebimento"){
                    tTipoMovimento = 2
                } else {
                    tTipoMovimento = 3
                }
                let id = await this.getNextID()
                let nextid = id.nextID
                const data = {
                    id: nextid,
                    nomeplano: this.novoPlanoNome,
                    idparente: this.novoPlanoParente,
                    disponiveldre: this.novoDisponivelDRE,
                    tipomovimento: tTipoMovimento
                }

                const dataJson = JSON.stringify(data);
                const req = await fetch(`${this.$baseUrlApiMain}/plano/create`, {
                    method: "POST",
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