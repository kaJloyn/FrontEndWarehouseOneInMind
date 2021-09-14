<template>
    <div>
        Absolute raw materials stock
    </div>
</template>



<script>
import productionApiMixin from "../mixins/productionApiMixin";
// import TableComponentNormal from "../components/TableComponentNormal";

    export default {
        name: "AbsoluteRawMaterialsStock",
        mixins:[productionApiMixin],
        data(){
            return {
                abs_raw_mat_stock: '',

            }
        },
        methods:{
           async getAllRawMaterials(){
                let result = []
                for (let stock of this.abs_raw_mat_stock){
                    let id = stock.absolute_raw_material
                    let raw_mat = await this.getAbsoluteRawMaterialById(id)
                    result.push(raw_mat)
                }
                return result
            }
        },
        async created(){
            this.abs_raw_mat_stock = await this.getAbsoluteRawMaterialsInventory()


            console.log(await this.getAllRawMaterials() )

        }
    }

</script>

<style scoped>

</style>