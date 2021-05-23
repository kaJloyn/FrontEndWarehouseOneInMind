<template>
    <div>
    </div>
</template>

<script>
    import productionApiMixin from "../mixins/productionApiMixin";

    export default {
        name: "BOM",
        mixins:[productionApiMixin],
        data(){
            return{
                absoluteRawMaterialSuppliers:'',
                billOfMaterialAttribute:'',
                absoluteRawMaterialsInventory:'',
                absoluteRawMaterialOrders:'',


            }
        },

        methods:{
            async setAbsoluteRawMaterialSuppliers(){
                this.absoluteRawMaterialSuppliers = await this.getAbsoluteRawMaterialSuppliers()
            },
            async setBillOfMaterialAttribute(){
                this.billOfMaterialAttribute = await this.getBillOfMaterialAttribute()
            },
  
        },
        async created() {
            await this.setAbsoluteRawMaterialSuppliers()
            await this.setBillOfMaterialAttribute()

        }

    }

</script>

<style scoped>

</style>