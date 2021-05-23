<template>
    <div>
        <div id="reader" width="600px"></div>
    </div>
</template>

<script>



export default {
    name: "Qrcode",
    data(){
        return{}
    },
    components: {

    },
    methods:{
        onScanSuccess(qrMessage) {
    // handle the scanned code as you like, for example:
    console.log(`QR matched = ${qrMessage}`);
    },

    onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`QR error = ${error}`);
    },


    },

}
</script>

<style scoped>

</style>