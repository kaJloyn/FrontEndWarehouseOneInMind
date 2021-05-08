<template>
  <div id="app">
  <Navigation></Navigation>
    <router-view/>
<!--    <button @click="checkSesionForUserLogedIn"> wtf </button>-->
<!--    <p>{{check}} !!!</p>-->
    <span class="toLearn"></span>
  </div>

</template>

<script>




import requestDataMixin from "@/mixins/requestDataMixin";

import Navigation from "./components/Navigation";
export default {
  name: 'App',
  components: {Navigation},
  data(){
    return{

    }
  },
  mixins:[requestDataMixin],

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.toLearn{
  /*text-overflow: clip;*/
  /*text-transform: uppercase;*/
  /*word-break: break-word;*/
  /*opacity: 0.2;*/
  /*vertical-align: center;*/
  /*z-index: -1;*/
  /*!*100% view hight - takes the max display*!*/
  /*width: 100vh;*/
  /*!*aside (aside bar)  tag in HMTL*!*/
  /*!*fit image in a box *!*/
  /*object-fit: cover;*/

}
</style>


<!--<router-link :to="{name:'inventory'}">Inventory</router-link>-->