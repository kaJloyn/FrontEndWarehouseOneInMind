<template>
    <div>
        <p>{{returnAbsoluteRawMaterialSuppliers}}</p>
    </div>
</template>

<script>
    import productionApiMixin from "../mixins/productionApiMixin";

    export default {
        name: "BOM",
        mixins:[productionApiMixin],
        methods:{
            async returnAbsoluteRawMaterialSuppliers(){
                return await this.getAbsoluteRawMaterialSuppliers()
            }
        }

    }

</script>

<style scoped>

</style>