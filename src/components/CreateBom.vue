<template>
    <div>
        <form action="/">
            <select class="form-control">
                <option value="" selected disabled>Select Raw Material</option>
                <option v-for="rawMat in rawMaterals" :value="`${rawMat.title}`" :key="rawMat.id">{{rawMat.title}}-{{rawMat.color}}-{{rawMat.size}}</option>
            </select>
            <button>add</button>
        </form>



    </div>
</template>

<script>

    import productionApiMixin from "../mixins/productionApiMixin";
    import requestsDataMixin from "../mixins/requestDataMixin";

    export default {
        name: "CreateBom",
        mixins:[productionApiMixin, requestsDataMixin],

        data(){
            return{
                rawMaterals: '',
            }
        },
        methods:{
            async setAllRawMat(){
                this.rawMaterals = this.rawMaterials
            },
        },
        async created() {
            await this.getRawMaterials()
            await this.setAllRawMat()

        }
    }
</script>

<style scoped>

</style>