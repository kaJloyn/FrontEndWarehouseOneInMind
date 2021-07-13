<template>
    <div >

        <div v-if="checkCronStatus">
            <p>
                Поръчките се обновяват моля да опитате след 3 минути
            </p>
        </div>
        <div v-else>
            <div class="loader" v-if="checkSpnner"></div>
            <div v-else>
                <table>
                    <thead>
                    <tr>
                        <th> Статус</th>
                        <th class = "name-rm">Поръчка</th>
                        <th>Фабрикат</th>
                        <th>Краен</th>
                        <th>Краен2</th>
                        <th>Краен Бр.</th>
                        <th>Размер</th>
                        <th>Цвят</th>
                        <th>Клиент</th>
                        <th>Тел</th>
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
                            <div v-for="(each_order_line, index) in rm_and_order[3]" :key="index">
                                <div>
                                    {{each_order_line.product_name}}
                                </div>

                            </div>
                        </td>
                        <td>
                            <div v-for="(each_order_line, index) in rm_and_order[3]" :key="index">
                                <div>
                                    {{each_order_line.product_name_no_size}}
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
                        <td>
                            <div v-for="(each_order_line, index) in rm_and_order[3]" :key="index">
                                <div>
                                    {{each_order_line.first_name}}-{{each_order_line.last_name}}
                                </div>

                            </div>
                        </td>
                        <td>
                            <div v-for="(each_order_line, index) in rm_and_order[3]" :key="index">
                                <div>
                                    {{each_order_line.phone}}
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
                        <th>Краен2</th>
                        <th>Краен Бр.</th>
                        <th>Размер</th>
                        <th>Цвят</th>
                        <th>Клиент</th>
                        <th>Тел</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(rm_and_order, orderNum) in mrp_on_hold_ord" :key="orderNum">
                        <td>Задържани</td>
                        <td>{{orderNum}}</td>
                        <td>
                            <div v-for="(each_rm, index) in rm_and_order[0]" :key="index">
                                <div>
                                    {{each_rm.title_translation}}
                                </div>

                            </div>
                        </td>
                        <td>
                            <div v-for="(each_order_line, index) in rm_and_order[3]" :key="index">
                                <div>
                                    {{each_order_line.product_name}}
                                </div>

                            </div>
                        </td>
                        <td>
                            <div v-for="(each_order_line, index) in rm_and_order[3]" :key="index">
                                <div>
                                    {{each_order_line.product_name_no_size}}
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
                        <td>
                            <div v-for="(each_order_line, index) in rm_and_order[3]" :key="index">
                                <div>
                                    {{each_order_line.first_name}}-{{each_order_line.last_name}}
                                </div>

                            </div>
                        </td>
                        <td>
                            <div v-for="(each_order_line, index) in rm_and_order[3]" :key="index">
                                <div>
                                    {{each_order_line.phone}}
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
                        <th>Краен2</th>
                        <th>Краен Бр.</th>
                        <th>Размер</th>
                        <th>Цвят</th>
                        <th>Клиент</th>
                        <th>Тел</th>
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
                            <div v-for="(each_order_line, index) in rm_and_order[3]" :key="index">
                                <div>
                                    {{each_order_line.product_name}}
                                </div>

                            </div>
                        </td>
                        <td>
                            <div v-for="(each_order_line, index) in rm_and_order[3]" :key="index">
                                <div>
                                    {{each_order_line.product_name_no_size}}
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
                        <td>
                            <div v-for="(each_order_line, index) in rm_and_order[3]" :key="index">
                                <div>
                                    {{each_order_line.first_name}}-{{each_order_line.last_name}}
                                </div>

                            </div>
                        </td>
                        <td>
                            <div v-for="(each_order_line, index) in rm_and_order[3]" :key="index">
                                <div>
                                    {{each_order_line.phone}}
                                </div>

                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>

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
                cron_status: false,
                load_spinner:true

            }
        },
        computed:{
             checkCronStatus() {
                return this.cron_status
            },
            checkSpnner(){
                 return this.load_spinner
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
                let cur_raw_mat_id;
                let cur_raw_mat;
                let final_product;

                for (let each_ord of orders) {
                    final_product = this.all_final_products.find(item => item.b2c_website_product_id === each_ord.product_id &&
                        item.size === each_ord.product_size.toUpperCase()
                    )
                    if (final_product) {
                        cur_raw_mat_id = final_product.raw_material
                        cur_raw_mat = this.getRawMaterialById(cur_raw_mat_id)
                    } else {
                        cur_raw_mat_id = 682
                        cur_raw_mat = this.getRawMaterialById(cur_raw_mat_id)
                        final_product = this.all_final_products.find(item => item.id === 2825)
                    }
                    let each_fin_prd_copy = final_products_copy.find(item => item.id === final_product.id)

                    if (total_per_order[each_ord.order_id]) {
                        total_per_order[each_ord.order_id][0].push(cur_raw_mat)
                        total_per_order[each_ord.order_id][1].push(final_product)
                        total_per_order[each_ord.order_id][3].push(each_ord)
                        if (each_fin_prd_copy.quantity > 0) {
                            total_per_order[each_ord.order_id][2].push(1)
                            each_fin_prd_copy.quantity -= 1
                        }
                    }
                    else {
                        total_per_order[each_ord.order_id] = [[], [], [], []]
                        total_per_order[each_ord.order_id][0].push(cur_raw_mat)
                        total_per_order[each_ord.order_id][1].push(final_product)
                        total_per_order[each_ord.order_id][3].push(each_ord)
                        if (each_fin_prd_copy.quantity > 0) {
                            total_per_order[each_ord.order_id][2].push(1)
                            each_fin_prd_copy.quantity -= 1
                        }
                    }
                }
                return total_per_order
            }


        },
        async created() {
            this.mrp_processing_rm = {}
            let cron_obj = await this.getCronStatus()
            this.cron_status = cron_obj[0].status
            let all_b2c_orders = await this.getB2C_Orders()
            this.all_final_products = await this.getFinalProducts()
            this.all_raw_materials = await this.getRawMaterials()

            this.order_processing = all_b2c_orders.filter( item => item.order_status === 'processing')
            this.orders_on_hold = all_b2c_orders.filter(item => item.order_status === 'on-hold')
            this.orders_pending = all_b2c_orders.filter(item => item.order_status==='pending')


            this.mrp_processing_ord = this.mrp_plan(this.order_processing)
            console.log(this.mrp_processing_ord, 'orders pricessing')
            this.mrp_on_hold_ord = this.mrp_plan(this.orders_on_hold)
            this.mrp_pending_ord = this.mrp_plan(this.orders_pending)
            this.load_spinner = false




        }
    }
</script>

<style scoped>
    .loader {
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
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
        font-size: 13px;
        text-transform: uppercase;
        width: auto;
        text-align: center;
        position: sticky;
        top: 0;
        background: #545c64;
        color: #fff;
    }
    td{
        font-size: 12px;
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