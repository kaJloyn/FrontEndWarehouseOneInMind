<template>
    <div>
        <div class="scn-result">
            <img class="picture-rm" :src="pic" alt="">
            <article class="data">
                <div class="item-data">{{rm}}</div>
                <div class="item-data">{{size}}</div>
                <div class="item-data">{{color}}</div>
                <div>
                    <input id="quantity" type="number">
                </div>
                <div>
                    <button @click="stockDeduct" > Извади </button>
                </div>
            </article>
        </div>
    </div>
</template>

<script>

    import requestsDataMixin from "../mixins/requestDataMixin";

    export default {
        name:"QRresult-Out",
        mixins:[requestsDataMixin],
        data(){
            return {
                pic:null,
                rm: null,
                size:null,
                color:null,
                scanned_qty:0,
                scanned_id: null,
                rm_qty:null,
                title:null
            }
        },
        methods:{
           async stockDeduct(){
                this.scanned_qty = document.getElementById('quantity')
                this.scanned_id = Number(this.$route.params['result']['id'])
                this.rm_qty = Number(this.$route.params['result']['quantity'])
                let final_qty = this.rm_qty - Number(this.scanned_qty.value)
                if(final_qty < 0 ){
                    confirm(`Вадите по голямо количество ${this.scanned_qty.value} от колкото имате, ще останете с ${final_qty}. Искате да продължите ?`)
                }
                else {
                    confirm(`Вадите количество ${this.scanned_qty.value}`)
                    let raw_matrls = await this.getRawMaterials()
                    let finl_prodcs = await this.getFinalProducts()


                    let scanned_raw_mat = raw_matrls.find(item => item.id ===this.scanned_id && item.title === this.title)
                    let scanned_final_product = finl_prodcs.find(item => item.id ===this.scanned_id && item.title === this.title)
                    if (scanned_raw_mat && !scanned_final_product){
                        await this.updateRawMaterialQauntity(this.scanned_id, final_qty)
                    }
                else if(scanned_final_product && !scanned_raw_mat){
                        await this.updateFinalProductQauntity(this.scanned_id, final_qty)

                    }
                else{
                        window.alert('Не намира обект които да овнови с ново количество')
                    }


                    setTimeout(this.$router.push({name:'qrcode'}), 3000)


                }

            }
        },
        created() {

            this.pic = this.$route.params['result']['pic']
            this.rm = this.$route.params['result']['title'] || this.$route.params['result']['name']
            this.size = this.$route.params['result']['size']
            this.color = this.$route.params['result']['color']
            this.title - this.$route.params['result']['title']
        }
    }
</script>

<style scoped>
    .scn-result{
        display: flex;
        flex-direction: column;
        max-width: 500px;
        background-color: indianred;
    }
    .picture-rm{
        width: 300px;
        height: 300px;
    }
    .data{
        width: 500px;
    }
    .item-data{
        margin-top: 5px;
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
        color: orangered;
        width: 250px;
        height: 50px;
    }


</style>