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
            <tr v-for="rawMat in raw_mats" :key="rawMat.id">
                <td class = "name-rm">{{rawMat.title}}</td>
                <td>{{rawMat.size}}</td>
                <td>{{rawMat.color}}</td>
                <td>
                    <img :src="rawMat.qr_code" alt="" @click="onPictureClick(
                        rawMat.title, rawMat.qr_code, rawMat.size, rawMat.color
                        )">
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
                raw_mats:[],
            }
        },

        methods:{
            onPictureClick(item_name, item_picture, item_size, item_color){
                this.$router.push({name:'picture',
                    query:{ name:item_name, pic:item_picture, size: item_size, color:item_color}})
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
            this.raw_mats = await this.getRawMaterials()
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