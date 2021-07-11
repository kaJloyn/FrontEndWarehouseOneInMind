<template>
    <div >
        <div v-if="checkCronStatus">
            <p>
                Поръчките се обновяват моля да опитате след 3 минути
            </p>
        </div>
        <div v-else>
            <table>
                <thead>
                <tr>
                    <th> Статус</th>
                    <th class = "name-rm">Поръчка</th>
                    <th>Фабрикат</th>
                    <th>Краен</th>
                    <th>Краен Бр.</th>
                    <th>Размер</th>
                    <th>Цвят</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(rm_and_order, orderNum) in mrp_processing_ord" :key="orderNum">
                    <td>ОБРАБОТКА</td>
                    <td>{{orderNum}}</td>
                    <td>
                        <div v-for="(each_rm, index) in rm_and_order[0]" :key="index">
                            <div>
                                {{each_rm.title_translation}}
                            </div>

                        </div>
                    </td>
                    <td>
                        <div v-for="(order, index) in rm_and_order[1]" :key="index">
                            <div>
                                {{order.name}}-{{order.size}}
                            </div>

                        </div>
                    </td>
                    <td>
                        <div v-for="(fin_qty, index) in rm_and_order[2]" :key="index">
                            <div>
                                {{fin_qty}}
                            </div>

                        </div>
                    </td>
                    <td>
                        <div v-for="(each_rm, index) in rm_and_order[0]" :key="index">
                            <div>
                                {{each_rm.size}}
                            </div>

                        </div>
                    </td>
                    <td>
                        <div v-for="(each_rm, index) in rm_and_order[0]" :key="index">
                            <div>
                                {{each_rm.color}}
                            </div>

                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <table>
                <thead>
                <tr>
                    <th> Статус</th>
                    <th class = "name-rm">Поръчка</th>
                    <th>Фабрикат</th>
                    <th>Краен</th>
                    <th>Краен Бр.</th>
                    <th>Размер</th>
                    <th>Цвят</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(rm_and_order, orderNum) in mrp_on_hold_ord" :key="orderNum">
                    <td>ЗАДЪРЖАНИ</td>
                    <td>{{orderNum}}</td>
                    <td>
                        <div v-for="(each_rm, index) in rm_and_order[0]" :key="index">
                            <div>
                                {{each_rm.title_translation}}
                            </div>

                        </div>
                    </td>
                    <td>
                        <div v-for="(order, index) in rm_and_order[1]" :key="index">
                            <div>
                                {{order.name}}-{{order.size}}
                            </div>

                        </div>
                    </td>
                    <td>
                        <div v-for="(fin_qty, index) in rm_and_order[2]" :key="index">
                            <div>
                                {{fin_qty}}
                            </div>

                        </div>
                    </td>
                    <td>
                        <div v-for="(each_rm, index) in rm_and_order[0]" :key="index">
                            <div>
                                {{each_rm.size}}
                            </div>

                        </div>
                    </td>
                    <td>
                        <div v-for="(each_rm, index) in rm_and_order[0]" :key="index">
                            <div>
                                {{each_rm.color}}
                            </div>

                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <table>
                <thead>
                <tr>
                    <th> Статус</th>
                    <th class = "name-rm">Поръчка</th>
                    <th>Фабрикат</th>
                    <th>Краен</th>
                    <th>Краен Бр.</th>
                    <th>Размер</th>
                    <th>Цвят</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(rm_and_order, orderNum) in mrp_pending_ord" :key="orderNum">
                    <td>ЧАКАЩИ</td>
                    <td>{{orderNum}}</td>
                    <td>
                        <div v-for="(each_rm, index) in rm_and_order[0]" :key="index">
                            <div>
                                {{each_rm.title_translation}}
                            </div>

                        </div>
                    </td>
                    <td>
                        <div v-for="(order, index) in rm_and_order[1]" :key="index">
                            <div>
                                {{order.name}}-{{order.size}}
                            </div>

                        </div>
                    </td>
                    <td>
                        <div v-for="(fin_qty, index) in rm_and_order[2]" :key="index">
                            <div>
                                {{fin_qty}}
                            </div>

                        </div>
                    </td>
                    <td>
                        <div v-for="(each_rm, index) in rm_and_order[0]" :key="index">
                            <div>
                                {{each_rm.size}}
                            </div>

                        </div>
                    </td>
                    <td>
                        <div v-for="(each_rm, index) in rm_and_order[0]" :key="index">
                            <div>
                                {{each_rm.color}}
                            </div>

                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>

</template>

<script>
    import requestsDataMixin from "../mixins/requestDataMixin";
    import { cloneDeep } from "lodash"

    export default {
        name: "MRP",
        mixins:[requestsDataMixin],
        data(){
            return {
                order_processing: [],
                orders_on_hold:[],
                orders_pending:[],
                all_final_products:[],
                all_raw_materials:[],
                mrp_processing_rm: {},
                mrp_processing_ord: {},

                mrp_on_hold_rm: {},
                mrp_on_hold_ord: {},

                mrp_pending_rm: {},
                mrp_pending_ord: {},

                cron_status: false

            }
        },
        computed:{
             checkCronStatus() {
                return this.cron_status
            }
        },
        methods:{
            getRawMaterialById(id){
                // console.log(id, 'idto')
                return this.all_raw_materials.find(item => item.id === id)

            },


            mrp_plan(orders){
                let final_products_copy = cloneDeep(this.all_final_products)
                // let total_per_rm = {}
                let total_per_order = {}
                for (let each_ord of orders){
                    for ( let each_fin_prd of this.all_final_products){
                        if(each_ord.product_id === each_fin_prd.b2c_website_product_id && each_ord.product_size.toUpperCase() === each_fin_prd.size){
                            let cur_raw_mat_id = each_fin_prd.raw_material
                            let cur_raw_mat = this.getRawMaterialById(cur_raw_mat_id)

                            // this calculates per raw material, but returns object where the key is raw id
                            // if(total_per_rm[cur_raw_mat_id]){
                            //     total_per_rm[cur_raw_mat_id][0] += 1
                            //     total_per_rm[cur_raw_mat_id][1].push(each_ord)
                            // }
                            // else{
                            //     total_per_rm[cur_raw_mat_id] = [1, []]
                            //     total_per_rm[cur_raw_mat_id][1].push(each_ord)
                            // }

                            let each_fin_prd_copy = final_products_copy.find(item => item.id === each_fin_prd.id)

                            if(total_per_order[each_ord.order_id]){
                                total_per_order[each_ord.order_id][0].push(cur_raw_mat)
                                total_per_order[each_ord.order_id][1].push(each_fin_prd)
                                if(each_fin_prd_copy.quantity > 0){
                                    total_per_order[each_ord.order_id][2].push(1)
                                    each_fin_prd_copy.quantity -=1
                                }

                            }
                            else{
                                total_per_order[each_ord.order_id] = [ [], [], [] ]
                                total_per_order[each_ord.order_id][0].push(cur_raw_mat)
                                total_per_order[each_ord.order_id][1].push(each_fin_prd)
                                if(each_fin_prd_copy.quantity > 0){
                                    total_per_order[each_ord.order_id][2].push(1)
                                    each_fin_prd_copy.quantity -=1
                                }
                            }
                        }
                    }
                }
                let final_per_rm = []
                // this calculates per raw material, but returns object where the key raw mat object
                // for (const [key, value] of Object.entries(total_per_rm)){
                //     // console.log(value, 'v')
                //     let id = Number(key)
                //     let cur_raw_mat = this.getRawMaterialById(id)
                //     let sup_el = [cur_raw_mat, value]
                //     final_per_rm.push(sup_el)
                // }
                return [final_per_rm, total_per_order]
            },
        },
        async created() {
            let cron_obj = await this.getCronStatus()
            this.cron_status = cron_obj[0].status
            let all_b2c_orders = await this.getB2C_Orders()
            this.all_final_products = await this.getFinalProducts()
            this.all_raw_materials = await this.getRawMaterials()

            this.order_processing = all_b2c_orders.filter( item => item.order_status === 'processing')
            this.orders_on_hold = all_b2c_orders.filter(item => item.order_status === 'on-hold')
            this.orders_pending = all_b2c_orders.filter(item => item.order_status==='pending')



            this.mrp_processing_ord = this.mrp_plan(this.order_processing)[1]
            this.mrp_on_hold_ord = this.mrp_plan(this.orders_on_hold)[1]
            this.mrp_pending_ord = this.mrp_plan(this.orders_pending)[1]




        }
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
        font-size: 15px;
        text-transform: uppercase;
        width: auto;
        text-align: center;
        position: sticky;
        top: 0;
        background: #545c64;
        color: #fff;
    }
    td{
        padding: 10px;
        border: 1px solid black;
        border-collapse: collapse;
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