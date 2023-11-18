<template>
    <div >
      <section id="container" class="embed-container col-lg-offset-4 col-lg-7 col-md-offset-5 col-md-7 col-sm-offset-5 col-sm-7 mt-5"></section>
    </div>
  </template>
  
  <script>
 import * as pbi from 'powerbi-client';

  export default {
    name: 'PowerBIReport',
    data() {
        return {
          powerbi: null
        };
      },
    props: {
      embedUrl: {
        type: String,
        required: true
      },
      accessToken: {
        type: String,
        required: true
      },
      reportId: {
        type: String,
        required: true
      }
    },
    methods: {
    reloadReport() {
        this.pbi.refresh();
      }
    },
    mounted() {

      /* eslint-disable */
      let loadedResolve, reportLoaded = new Promise((res, rej) => { loadedResolve = res; });
      let renderedResolve, reportRendered = new Promise((res, rej) => { renderedResolve = res; });

     
      // Get models. models contains enums that can be used.
      //let models = window['powerbi-client'].models;

      async function embedPowerBIReport(accessToken,embedUrl,reportId)  {

        //let models = window["pbi"].models;
        //let dashboardContainer = document.getElementById('container').get(0);
        //let reportContainer = $("#report-container").get(0);


            const config = {
              type: 'report',
              tokenType: pbi.models.TokenType.Embed,
              accessToken: accessToken,
              embedUrl: embedUrl,
              id: reportId,
              permissions: pbi.models.Permissions.All,
              settings: {
                  panes: {
                      filters: {
                          visible: false
                      },
                      pageNavigation: {
                          visible: true
                      }
                  }
              }       
            }

            let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);      
              
              //await dashboard.reload();
              //const dashboardContainer = this.$refs.container;
              let dashboardContainer = document.getElementById('container');

              
              powerbi.reset(dashboardContainer);

              //let dashboardContainer = document.getElementById('container').get(0);
              let dashboard = powerbi.embed(dashboardContainer, config);

                // report.off removes all event handlers for a specific event
                dashboard.off("loaded");

                // report.on will add an event handler
                dashboard.on("loaded", function () {
                    loadedResolve();
                    dashboard.off("loaded");
                });

                // report.off removes all event handlers for a specific event
                dashboard.off("error");

                dashboard.on("error", function (event) {
                    console.log(event.detail);
                });

                // report.off removes all event handlers for a specific event
                dashboard.off("rendered");

                // report.on will add an event handler
                dashboard.on("rendered", function () {
                    renderedResolve();
                    dashboard.off("rendered");
                });

                reportLoaded;

              // Insert here the code you want to run after the report is loaded

                reportRendered;

      }

      embedPowerBIReport(this.accessToken,this.embedUrl,this.reportId);
      

    }
  }
  </script>
  
  <style>

section#container {
    height: calc(0.5625 * 61vw); /* 16:9 aspect ratio */
}

@media only screen and (max-width: 575px) {
    section#container {
        height: calc(0.5625 * 100vw); /* 16:9 aspect ratio */
    }
}

iframe {
    border: none;
}
</style>