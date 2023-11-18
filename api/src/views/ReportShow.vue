<template>
    <v-container v-if="!carregando">    
            <PowerBIReport
                v-bind:embedUrl="embedUrl"
                v-bind:accessToken="accessToken"
                v-bind:reportId="reportId"
                v-bind:reportName="reportName"
              />
    </v-container>    
    <v-container v-else>
        <p>Carregando...</p>
    </v-container >
  
</template>

<script>
import PowerBIReport from '@/components/PowerBIReport.vue'

  
export default {
  name: 'PowerBIApp',
  data() {
        return  {
            accessToken: null,
            embedUrl: null,
            reportId: null,
            reportName: null,
            carregando: true,
        }        
  },
  components: {
    PowerBIReport
  },
   methods: {
        async getTokenEmbbed(workspaceId,reportid) {
            const req = await fetch(`${this.$baseUrlApiPowerbi}/report/getEmbedToken?workspace=${workspaceId}&report=${reportid}`);
            const dados = await req.json();
            this.accessToken = dados.accessToken;
            this.embedUrl = dados.embedUrl[0].embedUrl;
            this.reportId = dados.embedUrl[0].reportId;
            this.reportName =  dados.embedUrl[0].reportName;
            this.carregando = false;
        },
  },
  created() {        
        this.getTokenEmbbed(this.$route.params.idwork,this.$route.params.idrepo);
    },
}
</script>
