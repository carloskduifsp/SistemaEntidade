<template>
        <v-container class="w-60 d-flex flex-column mx-auto">
        <v-row>
          <v-btn
            rounded="lg"
            size="large"
            color="success"
            to="/"
          >
            reports
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            rounded="lg"
            size="large"
            color="sucess"
            to="/workspace"
          >
            Workspace
          </v-btn>
        </v-row>
        <br>
            <v-form
            v-model="valid"
      :rules="nameRules"
      method="post"
      ref="form"
            >
    <v-card
      class="mb-5"
      elevation="10"
      style="text-align: center; color: aliceblue; background-color: #086ddd"
    >
      <h1 style="color: aliceblue">Reports</h1>
    </v-card>
    <v-card elevation="10">
        <v-alert
        v-show="msgSuccess === true"
        class="text-center"
        border="start"
        density="comfortable"
        type="success"
        
        variant="flat"
      >
        <strong>Sucesso</strong></v-alert
      >
      <v-alert
        v-show="msgError === true"
        class="text-center"
        border="start"
        density="comfortable"
        type="error"
        variant="flat"
      >
        <strong>Erro, campo não preenchido, preencha todos os campos</strong>
      </v-alert>
      <v-text-field :rules="nameRules" v-model="workID" label="Workspace ID"></v-text-field>
      <v-text-field :rules="nameRules" v-model="reportName" label="Report Name"></v-text-field>
      <v-text-field :rules="nameRules" v-model="reportID" label="Report ID"></v-text-field>

      <v-card-actions variant="tonal">
            <v-row class="btn-layout">
              <v-btn
                rounded="lg"
                size="large"
                color="success"
                elevation="5"
                @click="salvarWork"
                :disabled="!valid"
                append-icon="mdi-content-save-outline"
              >
                Salvar Report
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                rounded="lg"
                size="large"
                color="warning"
                prepend-icon="mdi-autorenew"
                elevation="5"
                variant="tonal"
                @click="clear()"
              >
                Limpar
              </v-btn>
            </v-row>
          </v-card-actions>
    </v-card>
</v-form>
    </v-container>
</template>
<script>
export default {
  name: "repostsView",
  data: () => ({
    msgSuccess:false,
    msgError:false,
    valid:false,
    nameRules: [(v) => !!v || "Campo obrigatório"],
    workID:"",
    reportID:"",
    reportName:"",
}),
methods:{
    clear(){
        this.$refs.form.reset();
    },
    async salvarWork(){
        const insertForm = {
          idworkspace: this.workID,
          reportname: this.reportName,
          reportid: this.reportID,
      };
      const data = JSON.stringify(insertForm);

      const rr = await fetch(
        `http://127.0.0.1:5001/api-financeiro-654a3/us-central1/api/report/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
        }
      );
      await rr.json;
      console.log("req", rr)

      this.msgSuccess = true;
        this.$refs.form.validate();
    }
}
  }
</script>
<style>
.v-text-field{
    margin: 1%;
}
.btn-layout{
    padding-left: 2%;
    padding-right: 2%;
    padding-bottom: 2%;
}
</style>