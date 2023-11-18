<template>
    <v-container class="w-60 mx-auto">
        <v-card class="mb-5" elevation="10" style="text-align:center; color:aliceblue; background-color:#086ddd">
            <h1>Alterar Cliente Obras</h1>
        </v-card>

        <v-card elevation="10">
            <v-divider></v-divider>

            <v-card-text>
                <h3> <v-icon icon="mdi-account-details-outline"></v-icon> Dados Obra</h3>

                <v-form ref="form">
                    <v-row>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="empresa" label="Nome Empresa *"
                                placeholder="Nome Empresa" required prepend-inner-icon="mdi-account">
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="nomeobra" label="Nome Obra *"
                                placeholder="Nome Obra" required prepend-inner-icon="mdi-account">
                            </v-text-field>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="cnoobra" label="CNO Obra (antigo cei) *"
                                placeholder="CNO Obra" required prepend-inner-icon="mdi-account">
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="responsavel" label="Responsavel *"
                                placeholder="Responsavel" required prepend-inner-icon="mdi-account">
                            </v-text-field>
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
                            <v-text-field variant="outlined" v-model="whatsapp" label="Telefone celular *"
                                placeholder="(DDD) 99999-9999" required prepend-inner-icon="mdi-phone" :rules="rules">
                            </v-text-field>


                        </v-col>
                        <v-col cols="1" class="d-flex align-start">
                            <v-btn v-if="addRecado == false" variant="tonal" size="x-small" icon="mdi-plus" class="addcel"
                                @click="addRecado = true">
                            </v-btn>

                        </v-col>
                        <v-col>
                            <v-text-field variant="outlined" v-model="telefone" placeholder="(DDD) 99999-9999"
                                label="Telefone comercial" prepend-inner-icon="mdi-phone" :rules="rules">
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
                    <h3> <v-icon icon="mdi-map-marker"></v-icon> Endereço Obra</h3>
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
                    <v-divider></v-divider>
                    <h3> <v-icon icon="mdi-cash-usd"></v-icon>Dados Faturamento</h3>
                    <v-row>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="fat_razaosocial" label="Razão Social *"
                                placeholder="Razão Social" required prepend-inner-icon="mdi-account">
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="fat_cnpj" label="Cnpj *"
                                placeholder="Cnpj" required prepend-inner-icon="mdi-account">
                            </v-text-field>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="fat_responsavel" label="Responsavel *"
                            placeholder="Responsavel" required prepend-inner-icon="mdi-account">
                            </v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="fat_email" label="Email *"
                                placeholder="Email" required prepend-inner-icon="mdi-account">
                            </v-text-field>
                        </v-col>
                    
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="fat_cep" label="CEP *" placeholder="CEP">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-autocomplete :rules="rules" label="UF *" variant="solo" v-model="fat_uf"
                                :items="fat_estados"></v-autocomplete>
                        </v-col>
                        <v-col>
                            <v-autocomplete :rules="rules" label="Cidade *" variant="solo" v-model="fat_cidade" 
                                :items="fat_listacidades" :disabled="!fat_liberaCidades"
                                ></v-autocomplete>

                        </v-col>


                    </v-row>
                    <v-row>
                        <v-col cols="9">
                            <v-text-field :rules="rules" variant="outlined" v-model="fat_logradouro" label="Logradouro *"
                                placeholder="Logradouro" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="3">
                            <v-text-field :rules="rules" variant="outlined" v-model="fat_numcasa" label="Número *"
                                placeholder="Número" required type="number">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field :rules="rules" variant="outlined" v-model="fat_bairro" label="Bairro *"
                                placeholder="Bairro">
                            </v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field variant="outlined" v-model="fat_complemento" label="Complemento"
                                placeholder="Apt, Sala..." required>
                            </v-text-field>
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field variant="outlined" v-model="fat_observacao" label="Observação"
                                placeholder="Observação" required>
                            </v-text-field>
                        </v-col>

                    </v-row>
                    <v-row>
                        <p v-if="alertEmpty" id="alertEmpty">
                            Preencha todos os campos obrigatórios (*)</p>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-btn color="warning" class="mt-4" block to="/clientesObras">
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
                        </v-avatar>Cliente alterado com sucesso!
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
import router from '../../router';
import { getAuth } from "firebase/auth";
export default {
    data: () => ({
        overlay: false,
        valid: true,
        empresa: null,
        nomeobra: null,
        cnoobra: null,
        responsavel: null,
        email: null,
        telefone: null,
        telefonerecado: null,
        whatsapp: null,
        cep: null,
        uf: null,
        estados: [],
        cidade: null,
        logradouro: null,
        numcasa: null,
        bairro: null,
        complemento: null,
        listacidades: [],
        listaestados: [],
        fat_razaosocial: null, 
        fat_cnpj: null,
        fat_cep: null,
        fat_uf: null,
        fat_cidade: null,
        fat_logradouro: null,
        fat_numcasa: null,
        fat_bairro: null,
        fat_complemento: null,
        fat_estados: [],
        fat_listacidades: [],
        fat_listaestados: [],
        fat_responsavel: null,
        fat_email: null,
        fat_observacao: null,
        addRecado: false,
        rules: [v => !!v || 'Preenchimento obrigatório',
        ],
        alertSucces: false,
        alertClose: false,
        alertEmpty: false,
        idEstado: null,
        id: null
    }),
    methods: {
        async isPermited() {
            let i = 1;
            const auth = getAuth();
            const u = auth.currentUser;
            const token = localStorage.getItem("token");
            if (!token){
                this.token = this.token();                      
            }     

            const req = await fetch(`${this.$baseUrlApiMain}/cadastro/email?email=${u.email}`,{
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
                });
                if (req.error=='Token invalid' || req.error=='No token provided' || req.status==401){
                  window.localStorage.removeItem("token"); 
                  i++;
                  if (i==2);             
                    this.cadastraBd(u);
                }
            const datauser = await req.json();
            if (!datauser[0].permissoes.clientes) {
                this.$store.state.error = true
                router.push('/index')
            }
        },
        async trazerDadosPai() {
            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];

            const req = await fetch(`${this.$baseUrlApiMain}/clienteObra/read/${companyId}/${this.$route.params.id}`);
            const data = await req.json();

            if (data[0].telrecado != "Não Informado") {
                this.addRecado = true;
                this.telrecado = data[0].telrecado;
            }
            if (data[0].complemento == "Não Informado") {
                this.complemento = '';
            }
            else {
                this.complemento = data[0].complemento;
            }

                this.idEmpresa = data[0].idEmpresa,
                this.empresa = data[0].empresa,
                this.nomeobra = data[0].nomeobra,
                this.cnoobra = data[0].cnoobra,
                this.responsavel = data[0].responsavel,
                this.email = data[0].email,
                this.telefone = data[0].telefone,
                this.telefonerecado = data[0].telefonerecado,
                this.whatsapp = data[0].whatsapp,
                this.cep = data[0].cep,
                this.uf = data[0].uf,
                this.cidade = data[0].cidade,
                this.logradouro = data[0].logradouro,
                this.numcasa = data[0].numcasa,
                this.bairro = data[0].bairro,
                this.complemento = data[0].complemento,
                this.fat_razaosocial = data[0].fat_razaosocial, 
                this.fat_cnpj = data[0].fat_cnpj,
                this.fat_cep = data[0].fat_cep,
                this.fat_uf = data[0].fat_uf,
                this.fat_cidade = data[0].fat_cidade,
                this.fat_logradouro = data[0].fat_logradouro,
                this.fat_numcasa = data[0].fat_numcasa,
                this.fat_bairro = data[0].fat_bairro,                
                this.fat_complemento = data[0].fat_complemento,
                this.fat_responsavel = data[0].fat_responsavel,
                this.fat_email = data[0].fat_email,
                this.fat_observacao = data[0].fat_observacao;
                //this.teste.length = this.teste.length + 1;

            let index = this.listaestados.findIndex(o => o.sigla === this.uf);
            //com esse index, vejo qual é o id do estado selecionado
            this.idEstado = this.listaestados[index].id
        },
        async validate() {
            const { valid } = await this.$refs.form.validate()

            if (valid == true && this.nomeobra != null && this.cnoobra != null && this.uf != null && this.cidade != null) this.update()
            else this.alertEmpty = true
        },
        async update() {
            this.id = this.$route.params.id

            if (this.telefonerecado == null || this.telefonerecado == "") {
                this.telefonerecado = "Não Informado";
            }
            if (this.whatsapp == null || this.whatsapp == "") {
                this.whatsapp = "Não Informado";
            }

            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];


            this.overlay = true
            const data = {
                id: this.id,
                idEmpresa: this.idEmpresa,
                empresa: this.empresa,
                nomeobra: this.nomeobra,
                cnoobra: this.cnoobra,
                responsavel: this.responsavel,
                email: this.email,
                telefone: this.telefone,
                telefonerecado: this.telefonerecado,
                whatsapp: this.whatsapp,
                cep: this.cep,
                uf: this.uf,
                cidade: this.cidade,
                logradouro: this.logradouro,
                numcasa: this.numcasa,
                bairro: this.bairro,
                complemento: this.complemento,
                fat_razaosocial: this.fat_razaosocial, 
                fat_cnpj: this.fat_cnpj,
                fat_cep: this.fat_cep,
                fat_uf: this.fat_uf,
                fat_cidade: this.fat_cidade,
                fat_logradouro: this.fat_logradouro,
                fat_numcasa: this.fat_numcasa,
                fat_bairro: this.fat_bairro,
                fat_complemento: this.fat_complemento,
                fat_responsavel: this.fat_responsavel,
                fat_email: this.fat_email,
                fat_observacao: this.fat_observacao          
            }
            const dataJson = JSON.stringify(data);
            const req = await fetch(`${this.$baseUrlApiMain}/clienteObra/update/${companyId}/${this.$route.params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });
            await req.json;
            this.overlay = false
            this.alertSucces = true
            this.alertClose = false
            setTimeout(() => {
                router.push('/clientesObras');
            }, 3000);

        },        
        reset() {
            this.$refs.form.reset()
        },
    },
    async beforeMount() {
        this.isPermited();
        //esse get traz todos os estados do brasil
        const req = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");
        const data = await req.json()

        for (let i = 0; i < data.length; i++) {
            this.listaestados.push({ id: data[i].id, sigla: data[i].sigla })
            this.estados.push(data[i].sigla)
        }

           
        for (let i = 0; i < data.length; i++) {
            this.fat_listaestados.push({ id: data[i].id, sigla: data[i].sigla })
            this.fat_estados.push(data[i].sigla)
        }

        this.trazerDadosPai()


        let id = this.idEstado
            //filtro os municipios a partir do Id do estado
            const req2 = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`);
            const data2 = await req2.json()

            //"data" vai trazer um array com várias informações, então faço um for para preencehr o array listacidades com apenas os nomes
            for (let i = 0; i < data2.length; i++) {
                this.fat_listacidades.push(data[i].nome)
            }
  
        //     //libero o campo de escolhar a cidade
            this.fat_liberaCidades = true;
    },
    mounted(){
        this.fat_liberaCidades = true;
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

        },
        async fat_uf() {
            //vai limpar o array pra garantir que as cidades não se acumulem quando muda o estado
            this.fat_listacidades = []
            this.fat_cidade = null

            // quando o estado for selecionado, esse método será ativado
            //procuro na lista e estados qual é o index que contem a sigla igual ao valor selecionado no campo UF
            let index = this.fat_listaestados.findIndex(o => o.sigla === this.fat_uf);

            //com esse index, vejo qual é o id do estado selecionado
            let id = this.fat_listaestados[index].id

            //filtro os municipios a partir do Id do estado
            const req = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`);
            const data = await req.json()

            //"data" vai trazer um array com várias informações, então faço um for para preencehr o array listacidades com apenas os nomes
            for (let i = 0; i < data.length; i++) {
                this.fat_listacidades.push(data[i].nome)
            }

            //libero o campo de escolhar a cidade
            this.fat_liberaCidades = true;
        },
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