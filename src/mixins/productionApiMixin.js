import axios from "axios";
import getUserToken from "@/common/userToken";
import baseUrl from "../common/settings";
const productionApiMixin = {

    methods: {
        async getAbsoluteRawMaterial() {
            const preFix = 'absoluteRawMaterial/'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },
        async getAbsoluteRawMaterialById(id) {
            const preFix = `absoluteRawMaterial/${id}`
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },

        async getAbsoluteRawMaterialSuppliers() {
            const preFix = 'absoluteRawMaterialSupplier/'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },
        async getAbsoluteRawMaterialSupplierById(id) {
            const preFix = `absoluteRawMaterialSupplier/${id}`
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },
        async updateAbsoluteRawMaterialSupplier(id, data) {
            const preFix = `absoluteRawMaterialSupplier/${id}`
            const finalUrl = baseUrl + preFix
            const result = await axios.put(finalUrl, data, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },
        async getBillOfMaterialAttribute() {
            const preFix = 'billOfMaterialAttribute/'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },
        async getBillOfMaterialAttributeById(id) {
            const preFix = `billOfMaterialAttribute/${id}`
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },
        async createBillOfMaterialAttribute(data) {
            const preFix = `createBillOfMaterialAttribute`
            const finalUrl = baseUrl + preFix
            const result = await axios.post(finalUrl, data, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },
        async updateBillOfMaterialAttribute(id, data) {
            const preFix = `billOfMaterialAttribute/${id}`
            const finalUrl = baseUrl + preFix
            const result = await axios.put(finalUrl, data, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },
        async getAbsoluteRawMaterialsInventory() {
            const preFix = 'absoluteRawMaterialsInventory/'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },
        async getAbsoluteRawMaterialsInventoryById(id) {
            const preFix = `absoluteRawMaterialsInventory/${id}`
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },
        async updateAbsoluteRawMaterialsInventory(id, data) {
            const preFix = `absoluteRawMaterialsInventory/${id}`
            const finalUrl = baseUrl + preFix
            const result = await axios.put(finalUrl, data, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },
        async getAbsoluteRawMaterialOrders() {
            const preFix = 'absoluteRawMaterialOrders/'
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },
        async getAbsoluteRawMaterialOrdersById(id) {
            const preFix = `absoluteRawMaterialOrders/${id}`
            const finalUrl = baseUrl + preFix
            const result = await axios.get(finalUrl, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },
        async updateAbsoluteRawMaterialOrders(id, data) {
            const preFix = `absoluteRawMaterialOrders/${id}`
            const finalUrl = baseUrl + preFix
            const result = await axios.put(finalUrl, data, {
                headers: {
                    'Authorization': `token ${getUserToken()}`
                }
            })
            return result.data
        },

    }
}
export default productionApiMixin


