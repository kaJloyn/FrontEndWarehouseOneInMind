<template>
    <div>
        <p class="decode-result">Last result: <b>{{ result }}</b></p>
<!--        <p>-->
<!--            Track function:-->
<!--            <select v-model="selected">-->
<!--                <option v-for="option in options" :key="option.text" :value="option">-->
<!--                    {{ option.text }}-->
<!--                </option>-->
<!--            </select>-->
<!--        </p>-->

        <qrcode-stream :key="_uid" :track="this.paintOutline" @init="logErrors, onInit" @decode="onDecode">
        <div v-show="showScanConfirmation" class="scan-confirmation">
            <img src="../withBase/checkmark.svg" alt="Checkmark" width="128px" />
        </div>

        </qrcode-stream>
    </div>
</template>

<script>
    import { QrcodeStream } from 'vue-qrcode-reader'

    export default {

        components: { QrcodeStream },

        data() {
            return{
                camera: 'auto',
                result: null,
                showScanConfirmation: false,
                color: 'red'
            }

        },

        methods: {
            selected (){
                return this.options[1]
            },
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
                this.result = content
                if (this.result){
                    this.color = 'green'
                }
                // await this.timeout(500)
                this.$router.push({name:'QRresult', params:{
                    result: this.result
                    }})
                this.pause()

                // this.unpause()
            },
            paintOutline(detectedCodes, ctx) {
                console.log(detectedCodes)
                let detectedCode = detectedCodes[0]
                // for (const detectedCode of detectedCodes) {
                    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints
                    ctx.strokeStyle = this.color;
                    ctx.beginPath();
                    ctx.moveTo(firstPoint.x, firstPoint.y);
                    for (const {x, y} of otherPoints) {
                        console.log('ti li sa puskash')
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
            timeout(ms) {
                return new Promise(resolve => {
                    window.setTimeout(resolve, ms)
                })
            },
            pause () {
                this.camera = 'off'
            },
            unpause () {
                this.camera = 'auto'
            },
        },
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