<template>
  <v-container>
    <div class="text-h5 text-center">BEM VINDO</div>
  </v-container>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&display=swap');


.cardPai {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin-top: 8vh;
  width: 100%;
}

@media screen and (max-width: 900px) {
  .card {
    width: 30vw;
    height: 28vw;
    margin-bottom: 3vh;
  }


  .photo {
    height: 20vw;
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    align-items: center;
  }

  .texto {
    height: 5vw;
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    align-items: flex-end;
  }


  .photo .v-img {
    height: 8vh;
  }



  .box-relatorio {
    display: none;
  }

  p {
    font-family: 'Roboto Condensed', sans-serif;
    text-align: center;
    font-size: 3vw;
  }


}

@media screen and (min-width: 900px) {
  .card {
    width: 12vw;
    height: 10vw;
  }


  .photo {
    height: 7vw;
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    align-items: center;
  }

  .texto {

    height: 3vw;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-end;
  }


  .v-img {
    height: 8vw;
    width: 3vw;
  }

  .propriedade .photo .v-img {
    height: 5vw;
  }

  .coleta .photo .v-img {
    height: 6vw;
  }

  .box-pai {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    height: 10vw;
  }

  .box-relatorio {
    display: none;
    padding-top: 8vh;
    padding-bottom: 8vh;
    background-color: rgba(90, 231, 100, 0.418)
  }

  .card:hover .photo {
    display: none;
  }

  .card:hover .texto {
    display: none;
  }

  .card:hover .box-relatorio {
    display: inline-block;
  }

  p {
    font-family: 'Roboto Condensed', sans-serif;
    text-align: center;
    font-size: 1.3vw;
  }


}


.coleta {
  background-color: rgb(54, 156, 54);
}

.plantio {
  background-color: rgb(162, 233, 80);
}

.parceiro {
  background-color: rgb(186, 214, 147);
}

.propriedade {
  background-color: greenyellow;
}

.lote {
  background-color: rgb(113, 214, 55)
}








/* pra deixar o texto em cima da imagem */
/* .div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.div img, .div p {
    position: absolute;
    font-size: 1vw;
    font-family: sans-serif;
    text-align: center;
} */
</style>