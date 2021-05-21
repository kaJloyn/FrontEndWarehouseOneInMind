<template>
    <div>
        <p class="decode-result">Last result: <b>{{ result }}</b></p>

        <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
            <div v-show="cameraForzen" class="validation-layer">
                <div class="validation-notice" v-if="validating">
                    Long validation in progress...
                </div>
            </div>
        </qrcode-stream>
    </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'


export default {
    name: "Qrcode",
    components: {
        QrcodeStream,
    },
    methods:{
        async onDecode (content) {
            this.result = content

            this.stopCamera()
            window.setTimeout(() => {
                this.startCamera()
            }, 2000)
        }
    },

}
</script>

<style scoped>

</style>