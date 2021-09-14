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


            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "TableComponentNormal",
        props:{
            tableHeads: {
                type: Array,
                required: true
            },
            items:{
                type: Array,
                required: true
            },
        },
    }
</script>

<style scoped>

</style>