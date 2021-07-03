<template>
    <div>
        <qrcode-stream :key="_uid" :track="this.paintOutline" @init="logErrors, onInit" @decode="onDecode">
        <div v-show="showScanConfirmation" class="scan-confirmation">
            <img src="../withBase/checkmark.svg" alt="Checkmark" width="128px" />
        </div>

        </qrcode-stream>
    </div>
</template>

<script>
    import { QrcodeStream } from 'vue-qrcode-reader'
    import requestsDataMixin from "../mixins/requestDataMixin";

    export default {
        name:"qrcode_out",
        components: { QrcodeStream },
        mixins:[requestsDataMixin],

        data() {
            return{
                camera: 'auto',
                result: '',
                showScanConfirmation: false,
                color: 'red'

            }
        },
        methods: {
            async onInit (promise) {
                try {
                    await promise
                } catch (e) {
                    console.error(e)
                } finally {
                    this.showScanConfirmation = this.camera === "off"
                }
            },
            async onDecode(content) {

                if (content){
                    this.color = 'green'
                    // let searched_id = Number(content)
                    let searched_id = 1413

                    let raw_matrls = await this.getRawMaterials()
                    let finl_prodcs = await this.getFinalProducts()

                    let current_raw = raw_matrls.find(item => item.id === searched_id)
                    let current_final_product = finl_prodcs.find(item => item.id === searched_id)
                    if( current_raw && !current_final_product){
                        this.result = current_raw
                    }
                    else if(current_final_product && !current_raw){
                        this.result = current_final_product
                    }
                    else if (!current_raw && !current_final_product){
                        window.alert('Този QR не е от полуфабрикати или крайни изделия')
                        console.log('are deee')
                        await this.$router.push({name:'home'})
                        return null
                    }
                    else if(current_final_product && current_raw){
                        if (current_final_product.raw_material === searched_id){
                            this.result = current_raw
                        }
                        else{
                            window.alert('ГРЕШКА: еднакви id на полуфаб. и крайни. ОБАДИ СЕ НА КАЛОЯН')
                            await this.$router.push({name:'home'})
                            return null
                        }
                    }

                }
                this.$router.push({name:'QRresult_Out', params:{
                    result: this.result
                    }})
                this.pause()

                // this.unpause()
            },
            paintOutline(detectedCodes, ctx) {
                let detectedCode = detectedCodes[0]
                // for (const detectedCode of detectedCodes) {
                    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints
                    ctx.strokeStyle = this.color;
                    ctx.beginPath();
                    ctx.moveTo(firstPoint.x, firstPoint.y);
                    for (const {x, y} of otherPoints) {
                        ctx.lineTo(x, y);
                    }
                    ctx.lineTo(firstPoint.x, firstPoint.y);
                    ctx.closePath();
                    ctx.stroke();
                    this.pause()
                // }
            },
            logErrors(promise) {
                promise.catch(console.error)
            },
            pause () {
                this.camera = 'off'
            },
        },
        async created() {

            // console.log( await this.getFinalProducts())
            await this.getRawMaterials()

        },
        mounted() {
        }
    }
</script>


<style scoped>
    .scan-confirmation {
        position: absolute;
        width: 100%;
        height: 100%;

        background-color: rgba(255, 255, 255, .8);

        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
</style>