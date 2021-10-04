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
                <th>код.дост</th>
                <th>пол</th>
                <th>размер</th>
                <th>цвят</th>
                <th>наличснот</th>
                <th>всички продажби</th>
                <th>продажби текущ месец</th>
                <th>продажби минал месец</th>
                <th>поръчано</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="rawMat in getrawMaterials" :key="rawMat.id">
                <td class="id">{{rawMat.id}} </td>
                <td>{{rawMat.title}}</td>
                <td>{{rawMat.cross_pn}}</td>
                <td>{{rawMat.sex}}</td>
                <td>{{rawMat.size}}</td>
                <td>{{rawMat.color}}</td>
                <td>{{rawMat.quantity}}</td>
                <td>{{rawMat.sales_so_far}}</td>
                <td>{{rawMat.current_month_sales}}</td>
                <td>{{rawMat.last_month_sales}}</td>
                <td>{{findOrderedQuantityByRawMatId(rawMat.id)}}</td>
            </tr>
            </tbody>
        </table>


    </div>
</template>

<script>

    import requestDataMixin from "@/mixins/requestDataMixin";
    export default {
        name: "order-suggestion",
        mixins:[requestDataMixin],
        computed:{
            getrawMaterials(){
                let result = this.rawMaterials.filter(item => item.status === 'active')
                result  = result.sort((a, b) => (a.title + b.title))
                return result
            }
        },
        methods:{
            findOrderedQuantityByRawMatId(id){
                let result = 0
                let activeStockOrders = this.stockOrders.filter(order => order.arrived === false)
                for (let order of activeStockOrders){
                    let currentOrderDataObj = this.ordersData.filter(orderData => orderData.order_number === order.id).
                    filter(order => order.raw_material === id)
                    if (currentOrderDataObj.length > 0){
                        result += Number(currentOrderDataObj[0].quantity)
                    }
                }
                return result
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