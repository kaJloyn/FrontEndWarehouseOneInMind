<template>
    <div>
        <p>QR SCAN</p>
        <qrcode-stream @decode="onDecode"></qrcode-stream>
    </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'


export default {
    name: "Qrcode",
    components: {
        QrcodeStream,
    },
    methods: {
        onDecode (decodedString) {
            console.log(decodedString)
        }
    }
}
</script>

<style scoped>

</style>