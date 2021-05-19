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
        }
    },
    methods:{
        async getRawMaterials(){
            const preFix = 'rawMaterials/'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl,{
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            this.rawMaterials = result.data
            this.rawMaterials.sort((a, b) => (a.id - b.id))
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