<template>
  <div>
    <table>

      <thead>
      <tr>
        <th>Order Id</th>
        <th>Номер Поръчка</th>
        <th>Доставчик</th>
        <th>Дата</th>
        <th>Статус</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in stockOrders" :key="order.id">
        <td>{{order.id}}</td>
        <td>{{ order.order_number }}</td>
        <td>{{getSupplierName(order.supplier_name)}}</td>
        <td>{{ order.date_created }}</td>
        <td>{{ order.arrived ? 'пристигнала': 'на-път' }}</td>
        <td>
          <button @click="onStockOrderClick(order.id, order.order_number, getSupplierName(order.supplier_name), order.date_created, order.arrived)">детайли
          </button>
        </td>

      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import requestDataMixin from "@/mixins/requestDataMixin";
import getUserToken from "@/common/userToken";
import axios from "axios";
export default {
name: "Orders",
  mixins:[requestDataMixin],
  methods:{
    onStockOrderClick(stockOrderId, orderNumber, supplierName, dateCateted, orderStatus){
      this.$router.push({name:'stockOrderDetails', query:{
          stockOrderId:stockOrderId,
          orderNumber:orderNumber,
          supplierName: supplierName,
          dateCateted:dateCateted,
          orderStatus:orderStatus
      }})
    },
    getSupplierName(supplierId){
      let currentSupplier = this.suppliers.find(s => s.id === supplierId)
      if(currentSupplier){
        return currentSupplier.name
      }
      return 'Няма доставчик'
    },
    async getRawMatStat(){
      const result = await axios.get('http://www.1inmind.tk/scm-api/rawMaterialStatistics/', {
        headers: {
          'Authorization': `token ${getUserToken()}`
        }
      })
      return result.data
    }

  },
  async created(){
    await this.getStockOrders()
    await this.getOrdersData()
    await this.getSuppliers()
  }
}
</script>

<style scoped>
  table{
    margin-top: 2%;
    width: 100vh;
  }

img{
  width: 80px;
  height: auto;
}

tr{
  text-align: center;
}

th{
  text-align: center;
  position: sticky;
  top: 0;
  background: #545c64;
  color: #fff;
  width: auto;

}

h1{
  text-align: center;
}
button{
  background-color: #545c64;
  color: #f1f1e8;
  margin-top: 2px;
  padding: 10px;
  border-radius: 12px;
  border-color: transparent;

  text-transform: uppercase;
  font-weight: bold;
}
  button:hover{
    cursor: pointer;
    color: mediumseagreen;
  }



</style>