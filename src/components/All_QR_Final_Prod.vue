<template>
    <div>
        <section class="search">
            <input @blur="onSearch" @keyup.enter="onSearch" id="search-data" type="text">
            <button @click="onSearch">Търси</button>
            <button @click="showAll" class="show-all"> покажи всички</button>
        </section>
        <table>
            <thead>
            <tr>
                <th class = "name-rm">име</th>
                <th>размер</th>
                <th>QR Code</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="final_prd in final_products" :key="final_prd.id">
                <td class = "name-rm">{{final_prd.name}}</td>
                <td>{{final_prd.size}}</td>
                <td>{{final_prd.color}}</td>
                <td>
                    <img :src="final_prd.qr_code" alt="" @click="onPictureClick(
                        final_prd.name, final_prd.qr_code, final_prd.size, final_prd.color, final_prd.image
                        )">
                </td>
                <td>
                    <img :src="final_prd.image" alt="" >
                </td>

            </tr>
            </tbody>
        </table>


    </div>
</template>

<script>

    import requestDataMixin from "@/mixins/requestDataMixin";
    export default {
        name: "All_QR_Raw_Mat",
        mixins:[requestDataMixin],
        data(){
            return{
                final_products:[],
            }
        },

        methods:{
            onPictureClick(item_name, item_qr, item_size, item_color, item_pic){
                this.$router.push({name:'picture',
                    query:{ name:item_name, qr:item_qr, size: item_size, color:item_color, pic:item_pic}})
            },
            onSearch(){
                let allRows = document.querySelectorAll('tbody>tr')
                let input = document.getElementById('search-data').value
                for (const eacRow of allRows) {
                    if(!((eacRow.textContent).toLocaleLowerCase()).includes(input.toLocaleLowerCase()) && input != '' ){
                        eacRow.setAttribute('class', 'hidden')
                    }
                }

            },
            showAll(){
                let input = document.getElementById('search-data')
                input.value = ''
                let allRows = document.querySelectorAll('tbody>tr')
                for (const eacRow of allRows) {
                    eacRow.classList.remove('hidden')
                }
            }
        },

        async created() {
            this.final_products = await this.getFinalProducts()
            console.log(this.final_products)

        },
    }
</script>

<style scoped>
    .name-rm{
        width: 200px;
    }
    table{
        margin-top: 1rem;
    }
    img{
        width: 100px;
        height: auto;
    }
    img:hover{
        cursor: pointer;
    }

    tr{
        text-align: center;
    }
    th{
        font-size: 20px;
        text-transform: uppercase;
        width: 20px;
        text-align: center;
        position: sticky;
        top: 0;
        background: #545c64;
        color: #fff;
    }
    .search{
        position: sticky;
        margin-top: 2%;
    }
    .search input{
        width: 10vw;
        height: 26px;
    }
    .search button{
        font-size: 20px;
        width: 100px;
        height: 30px;
        margin-left: 10px;
        background-color: #545c64;
        color: #f1f1e8;
    }
    .search button:hover{
        cursor: pointer;
        color: mediumseagreen;
    }
    .hidden{
        display: none;
    }

    button.show-all{
        font-size: 20px;
        width: 170px;
        height: 30px;
        margin-left: 10px;
        background-color: #545c64;
        color: #f1f1e8;
    }


</style>