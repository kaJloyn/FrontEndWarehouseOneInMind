<template>
<div>
  <section class="search">
    <input @blur="onSearch" @keyup.enter="onSearch" id="search-data" type="text" @click="showAll">
    <button @click="onSearch">Търси</button>
    <button @click="showAll" class="show-all"> покажи всички</button>
  </section>
  <table>
    <thead>
    <tr>
      <th class="id">ID</th>
      <th>име</th>
      <th>снимка</th>
      <th>код.дост</th>
      <th>пол</th>
      <th>размер</th>
      <th>цвят</th>
      <th>наличснот</th>
      <th>всички продажби</th>
      <th>продажби текущ месец</th>
      <th>продажби минал месец</th>
      <th>поръчки</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="rawMat in rawMaterials" :key="rawMat.id">
      <td class="id">{{rawMat.id}} </td>
      <td>{{rawMat.title}}</td>
      <td @click="onPictureClick(rawMat.title, rawMat.pic)"><img :src="rawMat.pic" :alt="rawMat.title"></td>
      <td>{{rawMat.cross_pn}}</td>
      <td>{{rawMat.sex}}</td>
      <td>{{rawMat.size}}</td>
      <td>{{rawMat.color}}</td>
      <td>{{rawMat.quantity}}</td>
      <td>{{rawMat.sales_so_far}}</td>
      <td>{{rawMat.current_month_sales}}</td>
      <td>{{rawMat.last_month_sales}}</td>
      <td>
        <ul v-for="order in findOrderedQuantityByRawMatId(rawMat.id)" :key="order.id">
          {{order.quantity}} --- {{getOrderDate(order.order_number)}}
        </ul>
      </td>
    </tr>
    </tbody>
  </table>


</div>
</template>

<script>

import requestDataMixin from "@/mixins/requestDataMixin";
export default {
  name: "Inventory",
  mixins:[requestDataMixin],
  methods:{
    findOrderedQuantityByRawMatId(id){
      let activeStockOrders = this.stockOrders.filter(order => order.arrived === false)
      let ordersArray = []
      for (let order of activeStockOrders){
        let currentOrderDataObj = this.ordersData.filter(orderData => orderData.order_number === order.id).
        filter(order => order.raw_material === id)
        if (currentOrderDataObj.length > 0){
          ordersArray.push(currentOrderDataObj[0])
        }
      }
      return ordersArray
    },

    getOrderDate(orderNumber){
      let resultStockOrder = this.stockOrders.find(order => order.id === orderNumber)
      return resultStockOrder.date_created
    },
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
    await this.getRawMaterials()
    await this.getStockOrders()
    await this.getOrdersData()
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
    font-size: 14px;
    text-transform: uppercase;
    width: auto;
    height: 40px;
    text-align: center;
    position: sticky;
    top: 0;
    background: #545c64;
    color: #fff;
    padding: 5px;
  }
  td{
    max-width: 150px;
    border: solid 1px;
    border-color: grey;
    border-radius: 3px;
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