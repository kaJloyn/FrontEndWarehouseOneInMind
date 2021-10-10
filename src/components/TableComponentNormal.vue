<template>
    <div>
        <table>
            <thead>
            <tr>
                <th v-for="(item, index) in tableHeads" :key="index" :class="getCurrentStyle(index)">
                    {{item}}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td v-for="(key, index) in keys " :key="index" :class="getCurrentStyle(index)">
                    {{returnDesiredItemOutput(item[`${key}`])}}
                </td>



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
            keys:{
                type: Array,
                required: true
            },
            items:{
                type: Array,
                required: true
            },
            special_case:{
                type: String,
                required:false,
            },
            styles:{
                type: Array,
                required: false
            },
        },
        methods:{
            returnDesiredItemOutput(item){
                if(this.special_case === 'countArray'){
                    if(Array.isArray(item)){
                        return item.length
                    }
                    return item
                }
            },
            getCurrentStyle(index){
                if(this.styles){
                    for (let style of this.styles){
                        if(index >= style.lower_limit && index <= style.upper_limit){
                            return style.color
                        }
                    }
                }
                return ''
            }
        },
    }
</script>

<style scoped lang="scss">

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    table{
        margin-top: 1rem;
    }

    tr{
        text-align: center;
    }
    th{
        font-size: 13px;
        text-transform: uppercase;
        width: auto;
        text-align: center;
        position: sticky;
        top: 0;
        background: #545c64;
        color: #fff;
    }
    td{
        font-size: 12px;
        padding: 5px;
        border: 1px solid black;
        border-collapse: collapse;

    }
    .blue{
        background-color: cornflowerblue;
    }
    .green{
        background-color: forestgreen;
    }
    .orange{
        background-color: orange;
    }
    .grey{
        background-color: grey;
    }
    .red{
        background-color: indianred;
    }



</style>