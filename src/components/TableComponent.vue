<template>
    <div>
        <table>
            <thead>
            <tr>
                <th v-for="(item, index) in tableHeads" :key="index">
                    {{item}}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(rm, index) in rawMaterialsByOrders" :key="index">
                <td>{{typeOfOrders}}</td>
                <td>
                    <div v-for="(final, index) in rm[1][2]" :key="index" >
                        <div>{{rm[0]['title']}}</div>
                    </div>
                </td>

                <td>
                    <div v-for="(final, index) in rm[1][0]" :key="index" >
                        <div>{{final}}</div>
                    </div>
                </td>
                <td>
                    <div v-for="(final, index) in rm[1][0]" :key="index" >
                        <div>{{sumArray(rm[1][0])}}</div>
                    </div>
                </td>
                <td>
                    <div v-for="(final, index) in rm[1][2]" :key="index" >
                        <div>{{final['product_name']}}</div>
                    </div>
                </td>
                <td>
                    <div v-for="(final_qty, index) in rm[1][3]" :key="index" >
                        <div>{{final_qty}}</div>
                    </div>
                </td>
                <td>
                    <div v-for="(final, index) in rm[1][1]" :key="index" >
                        <div>{{final.size}}</div>
                    </div>
                </td>
                <td>
                    <div v-for="(final, index) in rm[1][2]" :key="index" >
                        <div>{{rm[0]['color']}}</div>
                    </div>
                </td>
                <!--                            <td>{{rm[1][2]}}</td>-->
                <td>
                    <div v-for="(order, index) in rm[1][2]" :key="index">
                        <div>
                            {{order['order_id']}}
                        </div>
                    </div>
                </td>
                <td>
                    <div v-for="(final, index) in rm[1][1]" :key="index" >
                        <div>{{final.foil_or_print}}</div>
                    </div>
                </td>
                <td>
                    <div v-for="(final, index) in rm[1][1]" :key="index" >
                        <div>{{final.foil_type}}</div>
                    </div>
                </td>
                <td>
                    <div v-for="(final, index) in rm[1][1]" :key="index" >
                        <div>{{final.foil_color}}</div>
                    </div>
                </td>
                <td>
                    <div v-for="(final, index) in rm[1][1]" :key="index" >
                        <div>{{final.foil_size}}</div>
                    </div>
                </td>
                <td>
                    <div v-for="(final, index) in rm[1][1]" :key="index" >
                        <div>{{final.letters_or_frame}}</div>

                    </div>
                </td>
                <td>
                    <div v-for="(final, index) in rm[1][1]" :key="index" >
                        <div>{{final.label}}</div>
                    </div>
                </td>
                <td>
                    <div v-for="(final, index) in rm[1][1]" :key="index" >
                        <div>{{final.ribbon_strip}}</div>
                    </div>
                </td>
                <td>
                    <div v-for="(final, index) in rm[1][1]" :key="index" >
                        <div>{{final.back_print}}</div>
                    </div>
                </td>
                <td>
                    <div v-for="(final, index) in rm[1][1]" :key="index" >
                        <div>{{final.front_print}}</div>
                    </div>
                </td>

                <td>
                    <div v-for="(final, index) in rm[1][1]" :key="index" >
                        <div>{{final.other_specifications}}</div>
                    </div>
                </td>


            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "TableComponent",
        props:{
            tableHeads: {
                type: Array,
                required: true
            },
            rawMaterialsByOrders:{
                type: Array,
                required: true
            },
            typeOfOrders:{
                type: String,
                required: true,
            },
        },
        methods:{
            sumArray(arr){
                let result = 0
                for (let num of arr){
                    result += Number(num)
                }
                return result
            },
        },
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
        padding: 5px;
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