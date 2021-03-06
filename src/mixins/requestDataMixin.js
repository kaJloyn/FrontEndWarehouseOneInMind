import axios from "axios";
import getUserToken from "@/common/userToken";
import baseUrl from "../common/settings";
const requestsDataMixin = {
    data() {
        return {
            rawMaterials: [],
            stockOrders: [],
            ordersData: [],
            suppliers:[],
            year : new Date().getFullYear()
        }
    },
    methods:{
        async getKpiB2cShipments(){
            const preFix = 'kpi/b2cshipments'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl,{
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return  result.data
        },
        async getGogs(){
            const preFix = 'cogs'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl,{
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return  result.data
        },
        async getCronStatus(){
            const preFix = 'CronStatus'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl,{
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return  result.data
        },
        async getVariableCosts(){
            const preFix = `variable-costs/${this.year}/`
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl,{
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            if(result.data === 422){
                this.$router.push({name:'home'})
                return true
            }
            else{
                return  result.data
            }
        },
        async getFixedCostsCosts(){
            const preFix = `fixed-costs/${this.year}/`
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl,{
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            if(result.data === 422){
                this.$router.push({name:'home'})
                return true
            }
            else{
                return  result.data
            }
        },
        async getCounterParties(){
            const preFix = 'counterparty'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl,{
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            if(result.data === 422){
                this.$router.push({name:'home'})
                return true
            }
            else{
                return  result.data
            }
        },
        async getRevenue(){
            const preFix = `revenue/${this.year}/`
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl,{
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            if(result.data === 422){
                this.$router.push({name:'home'})
                return true
            }
            else{
                return  result.data
            }
        },
        async getB2C_Orders(){
            const preFix = 'b2c-orders/'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl,{
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return  result.data
        },
        async getRawMaterials(){
            const preFix = 'rawMaterials/'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl,{
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            this.rawMaterials = result.data
            return  result.data
        },
        async getFinalProducts(){
            const preFix = 'finalProducts/'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl,{
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return  result.data
        },

        async getStockOrders(){
            const preFix = 'stockOrders/'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            this.stockOrders = result.data
            this.stockOrders.sort((a, b) => (b.id - a.id))
            return  result.data
        },
        async getOrdersData(){
            const preFix = 'ordersData/'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            this.ordersData = result.data
            this.ordersData.sort((a, b) => (a.id - b.id))
            return  result.data
        },
        async stockOrderById(orderId){
            const preFix = `stockOrders/${orderId}/`
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl, {
                    headers: {
                        'Authorization': `token ${getUserToken()}`
                    }})
            return result.data
        },

        async getSuppliers(){
            const prefix = 'suppliers/'
            const finalUrl = baseUrl + prefix
            const result = await axios.get(finalUrl, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            this.suppliers = result.data
            return  result.data
        },
        async changeOrderStatus(orderId, status,){
            const prefix = `stockOrders/${orderId}/`
            const finalUrl = baseUrl + prefix
            await axios.put(finalUrl, {
                arrived: status,
            }, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
        },

        async updateRawMaterialQauntity(id, newQuantity){
            const prefix = `rawMaterials/${id}/`
            const finalUrl = baseUrl + prefix
            await axios.put(finalUrl, {
                quantity:newQuantity
            },{headers: {'Authorization': `token ${getUserToken()}`}})
        },
        async updateFinalProductQauntity(id, newQuantity){
            const prefix = `finalProducts/${id}/`
            const finalUrl = baseUrl + prefix
            await axios.put(finalUrl, {
                quantity:newQuantity
            },{headers: {'Authorization': `token ${getUserToken()}`}})
        }

    }
}
export default requestsDataMixin





//interceptors
// axios.interceptors.request.use(
//     function(config) {
//         console.log("Info from request interceptor", config);
//         return config;
//     },
//     function(error) {
//         console.warn("Error from request interceptor", error);
//         return Promise.reject(error);
//     }
// );
//
// axios.interceptors.response.use(
//     function(config) {
//         console.log("Info from response interceptor", config);
//         return config;
//     },
//     function(error) {
//         console.warn("Error from response interceptor", error);
//         return Promise.reject(error);
//     }
// );