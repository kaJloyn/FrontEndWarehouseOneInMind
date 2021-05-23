<template>
    <div>
    </div>
</template>

<script>
    import productionApiMixin from "../mixins/productionApiMixin";

    export default {
        name: "BOM",
        mixins:[productionApiMixin],

        methods:{
        },
        async created() {
            console.log(await this.getAbsoluteRawMaterialSuppliers())

        }

    }

</script>

<style scoped>

</style>