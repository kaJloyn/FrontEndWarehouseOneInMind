<template>
    <div >

        <div v-if="checkCronStatus">
            <p>
                Поръчките се обновяват на всеки кръгъл час от 7 до 20 часа. Отнема около 10 мин. Моля да опитате пак след 10 мин.
            </p>
        </div>
        <div v-else>
            <div class="loader" v-if="checkSpnner"></div>
            <div v-else>
                <div class="show-processing">
                    <div class="orders-status" style="background-color: darkseagreen;">
                        Обработка
                    </div>
                    <button class="button-show" @click="showProcessingPlan">Покажи / Скрий  </button>
                </div>

                <div class="show-on-hold">
                    <div class="orders-status" style="background-color: darkorange;">
                        Задържани
                    </div>
                    <button class="button-show" @click="showOnHoldPlan">Покажи / Скрий  </button>
                </div>
                <div class="show-pending">
                    <div class="orders-status" style="background-color: dimgrey;">
                        Задържани
                    </div>
                    <button class="button-show" @click="showPendingPlan">Покажи / Скрий  </button>
                </div>

            </div>

            <div class="tables"  v-if="checkShowProcessing">
                <div class="description">ПЛАН ПО ПОРЪЧКИ</div>
                <table v-if="mrp_processing_ord">
                    <thead>
                    <tr>
                        <th v-for="(item, index) in tablePerOrderTh" :key="index"> {{item}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(rm_and_order, orderNum) in mrp_processing_ord" :key="orderNum">
                        <td>ОБРАБОТКА</td>
                        <td>{{orderNum}}</td>
                        <td>
                            <div v-for="(each_rm, index) in rm_and_order[0]" :key="index">
                                <div>
                                    {{each_rm.title}}
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
                <div class="description">ПЛАН ПО ФАБРИКАТИ</div>
                <table v-if="mrp_processing_rm">
                    <thead>
                    <tr>
                        <th v-for="(item, index) in tableTotalRmTh" :key="index">
                            {{item}}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(rm, index) in mrp_processing_rm" :key="index">
                        <td>Обработка</td>
                        <td>{{rm[0]['title']}}</td>

                        <td>{{rm[1][0]}}</td>
                        <td>
                            <div v-for="(final, index) in rm[1][2]" :key="index" >
                                <div>{{final['product_name']}}</div>

                            </div>
                        </td>
                        <td>
                            <div v-for="(final, index) in rm[1][2]" :key="index" >
                                <div>{{final['product_name_no_size']}}</div>

                            </div>
                        </td>
                        <td>{{rm[0]['size']}}</td>
                        <td>{{rm[0]['color']}}</td>
                        <!--                            <td>{{rm[1][2]}}</td>-->
                        <td>
                            <div v-for="(order, index) in rm[1][2]" :key="index">
                                <div>
                                    {{order['order_id']}}
                                </div>
                            </div>
                        </td>


                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="tables"  v-if="checkShowOnHold">
                <div class="description">ПЛАН ПО ПОРЪЧКИ</div>
                <table v-if="mrp_on_hold_ord">
                    <thead>
                    <tr>
                        <th v-for="(item, index) in tablePerOrderTh" :key="index"> {{item}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(rm_and_order, orderNum) in mrp_on_hold_ord" :key="orderNum">
                        <td>ЗАДЪРЖАНИ</td>
                        <td>{{orderNum}}</td>
                        <td>
                            <div v-for="(each_rm, index) in rm_and_order[0]" :key="index">
                                <div>
                                    {{each_rm.title}}
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
                <div class="description">ПЛАН ПО ФАБРИКАТИ</div>
                <table v-if="mrp_on_hold_rm">
                    <thead>
                    <tr>
                        <th v-for="(item, index) in tableTotalRmTh" :key="index">
                            {{item}}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(rm, index) in mrp_on_hold_rm" :key="index">
                        <td>ЗАДЪРЖАНИ</td>
                        <td>{{rm[0]['title']}}</td>

                        <td>{{rm[1][0]}}</td>
                        <td>
                            <div v-for="(final, index) in rm[1][2]" :key="index" >
                                <div>{{final['product_name']}}</div>

                            </div>
                        </td>
                        <td>
                            <div v-for="(final, index) in rm[1][2]" :key="index" >
                                <div>{{final['product_name_no_size']}}</div>

                            </div>
                        </td>
                        <td>{{rm[0]['size']}}</td>
                        <td>{{rm[0]['color']}}</td>
                        <!--                            <td>{{rm[1][2]}}</td>-->
                        <td>
                            <div v-for="(order, index) in rm[1][2]" :key="index">
                                <div>
                                    {{order['order_id']}}
                                </div>
                            </div>
                        </td>


                    </tr>
                    </tbody>
                </table>

            </div>
            <div class="tables"  v-if="checkShowPending">
                <div class="description">ПЛАН ПО ПОРЪЧКИ</div>
                <table v-if="mrp_pending_ord">
                    <thead>
                    <tr>
                        <th v-for="(item, index) in tablePerOrderTh" :key="index"> {{item}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(rm_and_order, orderNum) in mrp_pending_ord" :key="orderNum">
                        <td>ЗАДЪРЖАНИ</td>
                        <td>{{orderNum}}</td>
                        <td>
                            <div v-for="(each_rm, index) in rm_and_order[0]" :key="index">
                                <div>
                                    {{each_rm.title}}
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
                <div class="description">ПЛАН ПО ФАБРИКАТИ</div>
                <table v-if="mrp_pending_rm">
                    <thead>
                    <tr>
                        <th v-for="(item, index) in tableTotalRmTh" :key="index">
                            {{item}}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(rm, index) in mrp_pending_rm" :key="index">
                        <td>ЗАДЪРЖАНИ</td>
                        <td>{{rm[0]['title']}}</td>

                        <td>{{rm[1][0]}}</td>
                        <td>
                            <div v-for="(final, index) in rm[1][2]" :key="index" >
                                <div>{{final['product_name']}}</div>

                            </div>
                        </td>
                        <td>
                            <div v-for="(final, index) in rm[1][2]" :key="index" >
                                <div>{{final['product_name_no_size']}}</div>

                            </div>
                        </td>
                        <td>{{rm[0]['size']}}</td>
                        <td>{{rm[0]['color']}}</td>
                        <!--                            <td>{{rm[1][2]}}</td>-->
                        <td>
                            <div v-for="(order, index) in rm[1][2]" :key="index">
                                <div>
                                    {{order['order_id']}}
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

                mrp_processing_rm: [],
                mrp_processing_ord: [],

                mrp_on_hold_rm: [],
                mrp_on_hold_ord: [],

                mrp_pending_rm: [],
                mrp_pending_ord: [],

                cron_status: false,
                load_spinner:true,
                tablePerOrderTh: ['Статус', 'Поръчка', 'Фабрикат', 'Краен', 'Краен2', 'Краен Бр','Размер', 'Цвят', 'Клиент', 'Тел' ],
                tableTotalRmTh:['Статус', 'Фабрикат', 'Бр', 'Краен', 'Краен2', 'Размер', 'Цвят', 'Поръчки'],

                showProcessing:false,
                showOnHold:false,
                showPending:false



            }
        },
        computed:{
             checkCronStatus() {
                return this.cron_status
            },
            checkSpnner(){
                 return this.load_spinner
            },
            checkShowProcessing(){
                 return this.showProcessing
            },
            checkShowOnHold(){
                 return this.showOnHold
            },
            checkShowPending(){
                 return this.showPending
            }
        },
        methods:{

            showProcessingPlan(){
                this.showProcessing  = !this.showProcessing
            },
            showOnHoldPlan(){
                this.showOnHold = !this.showOnHold
            },
            showPendingPlan(){
                this.showPending = !this.showPending
            },

            getRawMaterialById(id){
                // console.log(id, 'idto')
                return this.all_raw_materials.find(item => item.id === id)

            },
            mrp_plan(orders){
                let final_products_copy = cloneDeep(this.all_final_products)
                let total_per_rm = {}
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


                    // caluclate per order
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

                    // calcualte per rm
                    if (total_per_rm[cur_raw_mat.id]){
                        total_per_rm[cur_raw_mat.id][0] += 1
                        total_per_rm[cur_raw_mat.id][1].push(final_product)
                        total_per_rm[cur_raw_mat.id][2].push(each_ord)

                    }
                    else {
                        total_per_rm[cur_raw_mat.id] = [1, [], []]
                        total_per_rm[cur_raw_mat.id][1].push(final_product)
                        total_per_rm[cur_raw_mat.id][2].push(each_ord)

                    }

                }
                let final_per_rm = []
                for (const [key, value] of Object.entries(total_per_rm)){
                    // console.log(value, 'v')
                    let id = Number(key)
                    let cur_raw_mat = this.getRawMaterialById(id)
                    let sup_el = [cur_raw_mat, value]
                    final_per_rm.push(sup_el)
                }
                return [final_per_rm, total_per_order]
            }


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
            this.mrp_processing_rm =  this.mrp_plan(this.order_processing)[0]



            this.mrp_on_hold_ord = this.mrp_plan(this.orders_on_hold)[1]
            this.mrp_on_hold_rm = this.mrp_plan(this.orders_on_hold)[0]


            this.mrp_pending_ord = this.mrp_plan(this.orders_pending)[1]
            this.mrp_pending_rm =  this.mrp_plan(this.orders_pending)[0]

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
    .show-pending{
        margin-top: 1%;
        display: flex;
        flex-direction: row;
    }

    .show-on-hold{
        margin-top: 1%;
        display: flex;
        flex-direction: row;
    }
    .show-processing{
        margin-top: 1%;
        display: flex;
        flex-direction: row;
    }
    .orders-status{
        margin-left: 3%;
        font-size: 20px;
        border: solid 1px;
        padding: 0.5%;
        border-radius: 10px;
    }
    .button-show{
        font-size: 20px;
        margin-left: 1.5%;
        border-radius: 10px;
    }
    .button-show:hover{
        cursor: pointer;
        color: darkred;
    }
    .description{
        margin-top: 5%;
        margin-left: 30%;
        width: 70%;
        font-weight: bold;
    }


</style>