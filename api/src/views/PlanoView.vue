<template>
    <v-container grid-list-sm>
      <v-card class="mb-5" elevation="10" style="text-align:center; color:aliceblue; background-color:#086ddd">
            <h1>Planos</h1>
        </v-card>
    <v-container class="mb-5">
      <v-row class="d-flex justify-space-between">
          <v-btn
          variant="tonal"
          size="large"
          color="info"
          :loading="loading"
          @click="this.$router.push({name: 'AdicionarPlano'});"
          >
          Adicionar
          </v-btn>

          <v-btn
          variant="tonal"
          size="large"
          color="info"
          :loading="loading"
          @click="importPlanos()"
          :disabled="this.resultPlano.length != 0"
          >
          Importar Plano Padrão
          </v-btn>
      </v-row>

    </v-container>

    <v-table density="compact" class="pl-6 pr-6">
    <thead>
      <tr>
        <th 
        @click="resultPlano = resultPlano.reverse(); isListAsc = !isListAsc" 
        class="text-center d-flex"
        style="cursor: pointer;">
          <span class="mt-1 mdi mdi-arrow-up-bold" v-if="!isListAsc"></span>
          <span class="mt-1 mdi mdi-arrow-down-bold" v-if="isListAsc"></span>
          <span class="mt-1">Classificação</span>
        </th>
        <th class="text-center">
          Nome
        </th>
        <th class="text-center">
          Disponível no DRE
        </th>
        <th class="text-center">
          Tipo de Movimentação
        </th>
        <th class="text-center">
          Ações
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="plano in this.resultPlano"
        :key="plano.id"
        
      >
        <td width="8px">{{ plano.classificacao }}</td>

        <td>{{ plano.nomeplano }}</td>

        <td class="text-center">
          <v-icon v-if="plano.disponiveldre" color="green">mdi-check-circle</v-icon> 
          <v-icon v-else color="red">mdi-close-circle</v-icon>
        </td>

        <td class="text-center">
          <span v-if="plano.tipoMovimento == 1">Pagamento</span>
          <span v-else-if="plano.tipoMovimento == 2">Recebimento</span>
          <span v-else>Indefinido</span>
        </td>

        <td class="text-center">
          <v-btn size="x-small" variant="tonal" @click="levarDados(plano.id)" icon color="info"
          class="mr-5">
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>

          <v-btn size="x-small" variant="tonal"
            @click="
            selectedIdDelete = plano.id;
            selectedNameDelete = plano.nomeplano + ' | ' + plano.classificacao; 
            showDeleteAlert=true
            temporizadorDeleteEnabled = true;
            "
            prepend-icon="mdi-trash-can-outline" icon color="error">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
    <v-container class="text-body-1 d-flex justify-center"
    v-if="this.resultPlano.length == 0">
    Não há nenhum plano cadastrado!
    </v-container>

    <!--DIALOGOS QUE APARECERAM-->
    <v-dialog v-model="showDeleteAlert" persistent>
        <v-card color="error" max-width="800" min-width="344"
        prepend-icon="mdi-alert"
        :title="`Tem certeza de que deseja deletar o plano: ${selectedNameDelete}?`">
          <v-card-text>
              <span v-if="stepDelete ==1"> 
              Está acão é irreversível e todos os seus planos-filhos serão deletados como resultado.
              </span>

              <v-progress-circular
              v-if="stepDelete==2"
              :width="3"
              color="red"
              indeterminate
            ></v-progress-circular>

              <span 
              v-if="stepDelete==2">
              Deletando plano...
              </span>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="showDeleteAlert = false;
            temporizadorDeleteEnabled = false">Cancelar</v-btn>
            <v-btn :disabled="this.temporizadorDeleteContador > 0" @click="deletePlano(selectedIdDelete)">
              Deletar Plano
            </v-btn>
            <span v-if="this.temporizadorDeleteContador > 0">{{ temporizadorDeleteContador }}</span>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
    export default {
        data() {
            return {
                temporizadorDeleteEnabled: false,
                temporizadorDeleteContador: 5,
                stepDelete: 1,
                selectedNameDelete: "",
                selectedIdDelete: 0,
                showDeleteAlert: false,
                loading: true,
                resultPlano: Array,
                isListAsc: true
            }
        },
        async beforeMount() {
          this.resultPlano = await this.getPlanos()
          this.loading = false
        },
        
        methods: {
          async getPlanos(){
            const req = await fetch(`${this.$baseUrlApiMain}/plano/read`)
            return req.json()
          },

          async importPlanos() {
            this.resultPlano = []
            this.loading = true

            await fetch(`${this.$baseUrlApiMain}/plano/import`, {
              method: "POST",
              headers: { "Content-Type": "application/json" }
            })

            this.resultPlano = await this.getPlanos()
            this.loading = false

          },
          
          levarDados(id) {
            this.$router.push(`${this.$baseUrlApiMain}/planos/alterarplano/${id}`)
          },

          async deletePlano(id) {
            this.stepDelete = 2
            this.loadingDelete = true
            
            await fetch(`${this.$baseUrlApiMain}/plano/delete/${id}`,{
              method: "DELETE",
              headers: { "Content-Type": "application/json" }
            })

            window.location.reload()
          }
        },

        watch: {
          temporizadorDeleteEnabled(value) {
            if(value) {
              setTimeout(() => {
                          this.temporizadorDeleteContador--;
                      }, 1000);
            } else { this.temporizadorDeleteContador = 5}
          },

          temporizadorDeleteContador: {
              handler(value) {
                  if (value > 0 && this.temporizadorDeleteEnabled) {
                      setTimeout(() => {
                          this.temporizadorDeleteContador--;
                      }, 1000);
                  }

              },
              immediate: true // This ensures the watcher is triggered upon creation
            }
        }
    }
</script>

<style>
  .mt-1 {
    margin-top: 6px !important;
  }
  table th {   
    border-top: 1px solid #dddddd;             
    border-left:1px solid #dddddd;
  }
  table th + th{   
    border-top: 1px solid #dddddd;                
  }

  table th:last-child{   
    border-right: 1px solid #dddddd;                
  }

  table td {       
    border-left:1px solid #dddddd;
  }

  table td + td:last-child{ 
    border-right:1px solid #dddddd; 
  }

  table td{
    border-bottom: 1px solid #dddddd;
  }
  /*table {padding-right: 40%; padding-left: 40%;}*/
</style>