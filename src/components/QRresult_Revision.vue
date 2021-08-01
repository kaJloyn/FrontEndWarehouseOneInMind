<template>
    <div>
        <div class="scn-result">
            <img class="picture-rm" :src="pic" alt="">
            <article class="data">
                <div class="item-data">{{item_name}}</div>
                <div class="item-data">{{size}}</div>
                <div class="item-data">{{color}}</div>
                <div>
                    <input id="quantity" type="number">
                </div>
                <div>
                    <button @click="stockDeduct" > Ревизия </button>
                </div>
            </article>
        </div>
    </div>
</template>

<script>

    import requestsDataMixin from "../mixins/requestDataMixin";

    export default {
        name:"QRresult-Revision",
        mixins:[requestsDataMixin],
        data(){
            return {
                pic:null,
                item_name: null,
                size:null,
                color:null,
                input_qty:0,
                scanned_id: null,
                item_qty:null,
            }
        },
        methods:{
           async stockDeduct(){
               this.input_qty = document.getElementById('quantity')
                let final_qty = Number(this.input_qty.value)
                if(final_qty < 0 ){
                    confirm(`Заприхождавате отрицателно число ${this.input_qty.value}  Искате да продължите ?`)
                }
                else {
                    confirm(`Заприхождаване на Ревизия ${this.input_qty.value}`)
                    let raw_matrls = await this.getRawMaterials()
                    let finl_prodcs = await this.getFinalProducts()


                    let scanned_raw_mat = raw_matrls.find(item => item.id ===this.scanned_id && item.title === this.item_name)
                    let scanned_final_product = finl_prodcs.find(item => item.id ===this.scanned_id && item.name === this.item_name)
                    if (scanned_raw_mat && !scanned_final_product){
                        await this.updateRawMaterialQauntity(this.scanned_id, final_qty)
                    }
                    else if(scanned_final_product && !scanned_raw_mat){
                        await this.updateFinalProductQauntity(this.scanned_id, final_qty)

                    }
                    else{
                        console.log(this.scanned_id, 'scanned id')
                        console.log(this.title, 'object name')
                        window.alert('Не намира обект които да овнови с ново количество')
                    }


                    setTimeout(this.$router.push({name:'qrcode-in'}), 3000)


                }

            }
        },
        created() {

            this.scanned_id = Number(this.$route.params['result']['id'])
            this.item_qty = Number(this.$route.params['result']['quantity'])
            this.pic = this.$route.params['result']['pic']
            this.item_name = this.$route.params['result']['title'] || this.$route.params['result']['name']
            this.size = this.$route.params['result']['size']
            this.color = this.$route.params['result']['color']
        }
    }
</script>

<style scoped>
    .scn-result{
        display: flex;
        flex-direction: column;
        max-width: 500px;
        background-color: royalblue;

    }
    .picture-rm{
        width: 300px;
        height: 300px;
    }
    .data{
        width: 500px;
    }
    .item-data{
        padding-top: 5px;
        font-size: 20px;
        max-width: 250px;

    }
    input{
        margin-top: 5px;
        background-color: darkgrey;
        width: 250px;
        height: 50px;
        font-size: 30px;
    }
    button{
        margin-top: 5px;
        font-size: 30px;
        font-weight: bold;
        color: royalblue;
        width: 250px;
        height: 50px;
    }


</style>