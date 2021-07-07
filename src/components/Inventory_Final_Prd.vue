<template>
<div>
  <section class="search">
    <input @blur="onSearch" @keyup.enter="onSearch" id="search-data" type="text">
    <button @click="onSearch">Търси</button>
    <button @click="showAll" class="show-all"> покажи всички</button>
  </section>
  <table>
    <thead>
    <tr>
      <th class="id">ID</th>
      <th>име</th>
      <th>размер</th>
      <th>цвят</th>
      <th>наличснот</th>

    </tr>
    </thead>
    <tbody>
    <tr v-for="final_prd in final_products" :key="final_prd.id">
      <td class="id">{{final_prd.id}} </td>
      <td>{{final_prd.name}}</td>
      <td @click="onPictureClick(final_prd.name, final_prd.pic)"><img :src="final_prd.pic" :alt="final_prd.name"></td>

      <td>{{final_prd.size}}</td>
      <td>{{final_prd.color}}</td>
      <td>{{final_prd.quantity}}</td>

    </tr>
    </tbody>
  </table>


</div>
</template>

<script>

import requestDataMixin from "@/mixins/requestDataMixin";
export default {
  name: "Inventory_Final_Prd",
  mixins:[requestDataMixin],
  data(){
    return {
      final_products:[],
    }
  },
  methods:{
      onPictureClick(rawMaterialName, rawMaterialPicture){
        this.$router.push({name:'picture', query:{ name:rawMaterialName, pic:rawMaterialPicture}})
      },
    onSearch(){
      let allRows = document.querySelectorAll('tbody>tr')
      let input = document.getElementById('search-data').value
      for (const eacRow of allRows) {
        if(!((eacRow.textContent).toLocaleLowerCase()).includes(input.toLocaleLowerCase()) && input != '' ){
          eacRow.setAttribute('class', 'hidden')
        }
      }

    },
    showAll(){
      let input = document.getElementById('search-data')
      input.value = ''
      let allRows = document.querySelectorAll('tbody>tr')
      for (const eacRow of allRows) {
        eacRow.classList.remove('hidden')
      }
    }
  },

  async created() {
    this.final_products = await this.getFinalProducts()

  },
}
</script>

<style scoped>
  table{
    margin-top: 1rem;
  }
  img{
    width: 80px;
    height: auto;
  }
  img:hover{
    cursor: pointer;
  }

  tr{
    text-align: center;
  }
  th{
    font-size: 20px;
    text-transform: uppercase;
    width: auto;
    text-align: center;
    position: sticky;
    top: 0;
    background: #545c64;
    color: #fff;
  }
  .search{
    position: sticky;
    margin-top: 2%;
  }
  .search input{
    width: 10vw;
    height: 26px;
  }
  .search button{
    font-size: 20px;
    width: 100px;
    height: 30px;
    margin-left: 10px;
    background-color: #545c64;
    color: #f1f1e8;
  }
  .search button:hover{
    cursor: pointer;
    color: mediumseagreen;
  }
  .hidden{
    display: none;
  }

  button.show-all{
    font-size: 20px;
    width: 170px;
    height: 30px;
    margin-left: 10px;
    background-color: #545c64;
    color: #f1f1e8;
  }


</style>