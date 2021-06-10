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
        name:"QRresult",
        mixins:[requestsDataMixin],
        data(){
            return {
                pic:null,
                rm: null,
                size:null,
                color:null,
                scanned_qty:0,
                rm_id: null,
                rm_qty:null,
            }
        },
        methods:{
           async stockDeduct(){
                this.scanned_qty = document.getElementById('quantity')
                this.rm_id = Number(this.$route.params['result']['id'])
                this.rm_qty = Number(this.$route.params['result']['quantity'])
                let final_qty = this.rm_qty - Number(this.scanned_qty.value)
                if(final_qty < 0 ){
                    confirm(`Вадите по голямо количество ${this.scanned_qty.value} от колкото имате, ще останете с ${final_qty}. Искате да продължите ?`)
                }
                else {
                    confirm(`Вадите количество ${this.scanned_qty.value}`)
                    await this.updateRawMaterialQauntity(this.rm_id, final_qty)
                    setTimeout(this.$router.push({name:'qrcode'}), 3000)


                }

            }
        },
        created() {

            this.pic = this.$route.params['result']['pic']
            this.rm = this.$route.params['result']['title']
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
        font-size: 30px;
        width: 500px;
        height: 50px;
    }
    input{
        margin-top: 5px;
        background-color: darkgrey;
        width: 500px;
        height: 100px;
        font-size: 30px;
    }
    button{
        margin-top: 5px;
        font-size: 30px;
        font-weight: bold;
        color: orangered;
        width: 500px;
        height: 100px;
    }


</style>