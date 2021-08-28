<template>
    <div>
        <div v-for="(month, index) in Object.keys(var_costs)" :key="index">
            <div v-if="var_costs[`${month}`].length > 1" @click="handleMonthClick($event ,var_costs[`${month}`][0], month)" class="month">
                {{month}} {{var_costs[`${month}`][0].show ? '-' : '+'}}
                <div v-if="var_costs[`${month}`][0].show" class="tables">

                    <table>
                        <thead>
                        <tr>
                            <th v-for="(head, index) of tableHeadsVC" :key="index">{{head}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(translation, index) of getSetOfTranslationsForEachMonth(month)" :key="index">
                            <td class="td-normal">{{translation}}</td>
                            <td class="td-normal">{{totalCostForEachTranslation(month, translation, 'cost_no_VAT')}}</td>
                            <td class="td-normal">{{totalCostForEachTranslation(month, translation, 'VAT')}}</td>
                            <td class="td-normal">{{
                                sumTwoNumbersAndRoundThem(totalCostForEachTranslation(month, translation, 'cost_no_VAT'), totalCostForEachTranslation(month, translation, 'VAT'))
                                }}
                            </td>
                            <div class="td-special" >
                                <div v-for="(cost, index) of getAllCostsPerTranslation(var_costs[`${month}`].slice(1), translation)" :key="index">
                                    <td class="td-data">
                                        {{cost.supplier_name}}-{{(Number(cost.cost_no_VAT) + Number(cost.VAT)).toFixed(0)}}
                                    </td>
                                </div>
                            </div>
                            <td class="total-cost-per-type" v-if="index===0">
                                {{totalCostPerMonth(var_costs[`${month}`].slice(1), 'cost_no_VAT', 'VAT')}}
                            </td>

                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <thead>
                        <tr>
                            <th v-for="(head, index) of tableHeadsFC" :key="index">{{head}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(cost, index) of fixed_costs[`${month}`].slice(1)" :key="index">
                            <td class="td-normal">{{cost.supplier_name}}</td>
                            <td class="td-normal">{{cost.cost}}</td>
                            <td class="td-normal">{{cost.dds}}</td>
                            <td class="td-normal">{{
                                sumTwoNumbersAndRoundThem(cost.cost, cost.dds)
                                }}
                            </td>
                            <td class="total-cost-per-type"  v-if="index===0">
                                {{totalCostPerMonth(fixed_costs[`${month}`].slice(1), 'cost', 'dds')}}
                            </td>

                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <thead>
                        <tr>
                            <th v-for="(head, index) of tableHeadsSummary" :key="index">{{head}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="total-costs" style="color: indianred; font-weight: bold">{{sumTwoNumbersAndRoundThem(
                                totalCostPerMonth(fixed_costs[`${month}`].slice(1), 'cost', 'dds'),
                                totalCostPerMonth(var_costs[`${month}`].slice(1), 'cost_no_VAT', 'VAT')
                                )}}</td>
                            <td class="total-costs" style="color: orange; font-weight: bold">
                                {{getRevenueForMonth(month)}}
                            </td>
                            <td class="total-costs">
                                {{(cogs[`${month}`][1] * 1.2).toFixed(0) }}
                            </td>
                            <td class="total-costs">
                                {{cogs[`${month}`][0]}}
                            </td>
                            <td class="total-costs" style="color: forestgreen; font-weight: bold" >
                                {{Number(getRevenueForMonth(month))-  Number(
                                sumTwoNumbersAndRoundThem(totalCostPerMonth(fixed_costs[`${month}`].slice(1), 'cost', 'dds'),
                                totalCostPerMonth(var_costs[`${month}`].slice(1), 'cost_no_VAT', 'VAT')))
                                }}
                            </td>

                        </tr>


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import requestDataMixin from "@/mixins/requestDataMixin";
    import {months} from "../contexts/dates";


    export default {
        name: "Financial",
        mixins:[requestDataMixin],

        data(){
            return {
                var_costs: {
                    'January':[{show:false},],
                    'February': [{show:false},],
                    'March': [{show:false},],
                    'April':[{show:false},],
                    'May':[{show:false},],
                    'June':[{show:false},],
                    'July':[{show:false},],
                    'August':[{show:false},],
                    'September':[{show:false},],
                    'October':[{show:false},],
                    'November':[{show:false},],
                    'December':[{show:false},],
                },
                fixed_costs:{
                    'January':[{show:false},],
                    'February': [{show:false},],
                    'March': [{show:false},],
                    'April':[{show:false},],
                    'May':[{show:false},],
                    'June':[{show:false},],
                    'July':[{show:false},],
                    'August':[{show:false},],
                    'September':[{show:false},],
                    'October':[{show:false},],
                    'November':[{show:false},],
                    'December':[{show:false},],
                },
                revenues:[],

                counterparties:[],
                months:[],
                tableHeadsVC: ['Основание', 'Сума', 'ДДС', 'Общо', 'Контрагент', 'Общ Разход с ДДС',],
                tableHeadsFC: ['Основание', 'Сума', 'ДДС', 'Общо', 'Общ Разход с ДДС',],
                tableHeadsSummary:['Общо разходи с ДДС', 'Оборот с ДДС', 'Оборот Сайт', 'COGS', 'Разлика'],
                currentMonth:'',
                raw_cogs: [],
                cogs :{
                    'January':[],
                    'February':[],
                    'March':[],
                    'April':[],
                    'May':[],
                    'June':[],
                    'July':[],
                    'August':[],
                    'September':[],
                    'October':[],
                    'November':[],
                    'December':[],
                }
            }
        },

        methods:{
            totalCostForEachTranslation(month, translation, property){
                let result = 0
                let arr = this.var_costs[`${month}`].slice(1)
                let interested_arr = arr.filter(item => item.translation === translation)
                for(let item of interested_arr){
                    let value = item[`${property}`]
                    if(Number(value)){
                        result += Number(value)
                    }
                }
                return result.toFixed(0)

            },
            getAllCostsPerTranslation(arr, transaction){
                return arr.filter(item => item.translation === transaction)
            },

            getCounterpartyTranslation(name){
                let counterParty = this.counterparties.find(item => item.supplier_name === name)
                if (counterParty){
                    return counterParty.translation
                }
                else{
                    return 'unknown'
                }
            },
            getSetOfTranslationsForEachMonth(month){
                return [... new Set(this.var_costs[`${month}`].slice(1).map(item => item.translation))]
            },
            sumTwoNumbersAndRoundThem(num1, num2){
                let num_1= Number(num1)
                let num_2 = Number(num2)
                let result = num_1 + num_2
                return result.toFixed(0)
            },
            handleMonthClick(event, obj, month){
                if(event.target.className === 'month'){
                    obj.show = !obj.show
                    this.currentMonth = month
                }


            },
            totalCostPerMonth(arr, prop1, prop2){
                let cost_no_vat = arr.reduce((a, b) => a + Number(b[`${prop1}`]) , 0).toFixed(0)
                let vat = arr.reduce((a, b) => a + Number(b[`${prop2}`]) , 0).toFixed(0)
                let result = Number(cost_no_vat) + Number(vat)
                return result
            },
            conductVarCosts(costs){
                for (let month of Object.keys(this.var_costs)){
                    let cur_month_costs = costs.filter(item => item.month === month)
                    if(cur_month_costs){
                        for (let cost of cur_month_costs){
                            let found_item = this.var_costs[`${month}`].find(item => item.supplier_name === cost.supplier_name)
                            if(found_item){
                                found_item.cost_no_VAT = Number(found_item.cost_no_VAT)
                                found_item.cost_no_VAT += Number(cost.cost_no_VAT)

                                found_item.VAT = Number(found_item.VAT)
                                found_item.VAT += Number(cost.VAT)


                                Object.assign(found_item, {translation: this.getCounterpartyTranslation(found_item.supplier_name)})
                            }
                            else{
                                Object.assign(cost, {translation: this.getCounterpartyTranslation(cost.supplier_name)})
                                this.var_costs[`${month}`].push(cost)
                            }
                        }
                    }
                }
            },
            sortVarCosts(){
                for (let costs of Object.values(this.var_costs)){
                    costs.sort((a, b) => (b.cost_no_VAT - a.cost_no_VAT))

                }
            },
            conductFixedCosts(costs){
                for (let month of Object.keys(this.fixed_costs)){
                    let cur_month_costs = costs.filter(item => item.month === month)
                    if(cur_month_costs){
                        for (let cost of cur_month_costs){
                            let found_item = this.fixed_costs[`${month}`].find(item => item.supplier_name === cost.supplier_name)
                            if(found_item){
                                found_item.cost = Number(found_item.cost)
                                found_item.cost += Number(cost.cost)

                                found_item.dds = Number(found_item.dds)
                                found_item.dds += Number(cost.dds)
                            }
                            else{
                                this.fixed_costs[`${month}`].push(cost)
                            }
                        }
                    }
                }
            },
            getRevenueForMonth(month){
                let foundObj = this.revenues.find(item => item.month === month)
                    if(foundObj){
                        return Number(foundObj.revenue_with_VAT).toFixed(0)
                        }
                    return undefined
                },
            conductCogs(){
                let year = new Date().getFullYear()
                for (let cog of Object.values(this.raw_cogs[0])){
                    if (typeof cog == "string"){
                        cog = cog.replace('[', '')
                        cog = cog.replace(']', '')
                        cog = cog.split(',')
                        cog = cog.map(item => Number(item))
                        if(cog[3] === year){
                            let strMonth = months[`${cog[2]}`]
                            let cog_and_rev = cog.slice(0, 2)
                            this.cogs[`${strMonth}`] = cog_and_rev
                        }
                    }
                }
                console.log(this.cogs)
            }

        },
        async created() {
            let raw_var_costs = await this.getVariableCosts()
            let raw_fixed_costs = await this.getFixedCostsCosts()
            this.revenues =  await this.getRevenue()
            this.counterparties = await this.getCounterParties()
            this.raw_cogs = await this.getGogs()


            this.conductVarCosts(raw_var_costs)
            this.conductFixedCosts(raw_fixed_costs)
            this.sortVarCosts()

            this.conductCogs()



        }
    }
</script>

<style scoped>
    table{
        margin: 10px;
    }
    th{
        font-size: 11px;
        text-transform: uppercase;
        width: auto;
        height: auto;
        text-align: center;
        position: sticky;
        top: 0;
        background: #545c64;
        color: #fff;
        margin-left: 10px;
        padding: 10px;
    }
    tr{
        text-align: center;
        margin-left: 10px;
    }
    .td-special{
        font-size: 15px;
        text-align: center;
        border: 1px solid  dimgrey;
        border-radius: 5px;
        padding: 2px;
    }
    .td-normal{
        font-size: 15px;
        text-align: center;
        border: 1px solid dimgrey ;
        padding: 2px;
        border-radius: 5px;
    }
    .tables{
        display: flex;
        flex-direction: row;
       justify-content: space-between;
        align-items: flex-start;
    }
    .total-cost-per-type{
        color: dodgerblue;
        font-weight: bold;
        border-radius: 5px;
        border: solid 1px dimgrey;
        font-size: 20px;
    }
    .total-costs{
        border: solid 1px dimgrey;
        border-radius: 5px;
        font-size: 25px;
    }
    .month{
        margin: 1%;
        font-size: 25px;
        border: solid 1px black;
        border-radius: 3px;
        text-align: center;
        cursor: pointer;
        color: black;
        background-color: lightgrey;
    }
</style>