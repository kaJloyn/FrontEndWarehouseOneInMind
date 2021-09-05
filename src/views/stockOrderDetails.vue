<template>
  <div class="container">
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Полуфабрикат</th>
        <th>Снимка</th>
        <th>Цвят</th>
        <th>Размер</th>
        <th>Бройки</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="orderLine in getCurrentStockOrderDetails" :key="orderLine.id">
        <td class="id">{{orderLine.id}} </td>
        <td>{{currentRawMaterial(orderLine.raw_material).title}}</td>
        <td>
          <img :src="currentRawMaterial(orderLine.raw_material).pic" alt="no pic">
        </td>
        <td>{{currentRawMaterial(orderLine.raw_material).color}}</td>
        <td>{{currentRawMaterial(orderLine.raw_material).size}}</td>
        <td>{{orderLine.quantity}}</td>
      </tr>
      </tbody>
    </table>
    <aside>
      <section class="order-data">
        <p>номер поръчка:  <span class="data">{{this.$route.query.orderNumber}}</span></p>
        <p>статус: <span class="data">{{this.$route.query.orderStatus ? 'пристигнала' : 'на-път'}}</span></p>
        <p>доставчик: <span class="data">{{this.$route.query.supplierName}}</span></p>
        <p>дата поръчка:  <span class="data">{{this.$route.query.dateCateted}}</span></p>
        <p>Общ брой Артикули: <span class="data">{{amountOfOrderedStockItems}}</span></p>

          <button  @click="orderStatus(currentStockOrderId, true)" >пристигнала</button>
          <button @click="orderStatus(currentStockOrderId, false)" >не е пристигнала </button>

      </section>
    </aside>

  </div>
</template>

<script>
import requestDataMixin from "@/mixins/requestDataMixin";



export default {
name: "stockOrderDetails",
  mixins:[requestDataMixin],
  data(){
    return{
    }
  },
  computed:{
    currentStockOrderId(){
      return this.$route.query.stockOrderId
    },
    amountOfOrderedStockItems(){
      return this.getCurrentStockOrderDetails.reduce((a, b) => (a + b.quantity), 0);
    },
    getCurrentStockOrderDetails(){
      return this.ordersData.filter(order => order.order_number == this.currentStockOrderId)
    },


  },
  methods:{
   currentRawMaterial(rawMaterialId){
      let currentRM =  this.rawMaterials.find(rM => rM.id === rawMaterialId)
      return currentRM
    },

    getSupplierName(supplierId){
      let currentSupplier = this.suppliers.find(s => s.id === supplierId)
      if(currentSupplier){
        return currentSupplier.name
      }
      return 'Няма доставчик'
    },
    async orderStatus(orderId, status){
     // calculate quantity and update it/ this is obsolete, stock will be put on stock with qr
     // let newRawMatQyantity = 0
     // for (let eachRawMaterial of this.getCurrentStockOrderDetails){
     //   let rawMaterialId = eachRawMaterial.raw_material
     //   let currentRawMatQuantity = this.rawMaterials.find(rm => rm.id == rawMaterialId).quantity
     //   if (status){
     //     newRawMatQyantity = currentRawMatQuantity + eachRawMaterial.quantity
     //   }
     //   else{
     //     newRawMatQyantity = currentRawMatQuantity - eachRawMaterial.quantity
     //   }
     //   await this.updateRawMaterialQauntity(rawMaterialId, newRawMatQyantity)
     // }

      await this.changeOrderStatus(orderId, status)
      let updatedSotckOrder = await this.stockOrderById(this.currentStockOrderId)
      this.$router.replace({ name: 'stockOrderDetails', query: {
          stockOrderId:updatedSotckOrder.id,
          orderNumber:updatedSotckOrder.order_number,
          supplierName: this.getSupplierName(updatedSotckOrder.supplier_name),
          dateCateted:updatedSotckOrder.date_created,
          orderStatus:updatedSotckOrder.arrived
        } })

    },

  },
  async created() {
    await this.getOrdersData()
    await this.getRawMaterials()
    await this.getSuppliers()


  }

}
</script>

<style scoped>
  table{
    flex-grow: 5;
    margin-top: 1rem;
  }
  aside{
    flex-grow: 2;
    margin-left: 5%;
  }
  img{
    width: 80px;
    height: auto;
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
  .container{
    display: flex;
    justify-content: space-between;
  }
  .order-data{
    margin-top: 3%;
    border: solid 2px;
    border-color:  #545c64;
    border-radius: 3px;
    position: sticky;
    top: 0;
    text-transform: uppercase;
    font-weight: bold;

  }
  .data{
    color: red;
  }

  button{
    background-color: #545c64;
    color: #f1f1e8;
    margin-top: 2px;
    padding: 10px;
    border-radius: 12px;
    border-color: transparent;
    margin-left: 1%;
    padding-left: 1%;
    margin-bottom: 1%;
    text-transform: uppercase;
    font-weight: bold;
  }
  button:hover{
    cursor: pointer;
    color: mediumseagreen;
  }

</style>