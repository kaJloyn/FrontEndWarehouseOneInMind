<template>
    <qrcode-stream @decode="onDecode"></qrcode-stream>
</template>

<script>

import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    name: "Qrcode",
    data(){
        return{}
    },
    components: {
        QrcodeStream,

    },
    methods:{
        onDecode () {
            // ...
        }
    },

}
</script>

<style scoped>

</style>