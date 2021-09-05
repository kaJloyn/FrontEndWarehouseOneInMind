<template>
    <div class="wrapper" >
        <h1 class="raw-mat-picture">
            {{this.$route.query.name}}
        </h1>
        <h1 class="raw-mat-picture">
            {{this.$route.query.size}}
        </h1>
        <h1 class="raw-mat-picture">
            {{this.$route.query.color}}
        </h1>
        <div class="pictures">
            <img  class="qr" :src="this.$route.query.qr" alt="">
            <img class="pr-pic" :src="this.$route.query.pic" alt="">
        </div>

    </div>
</template>

<script>
    export default {
        name: "Picture",

    }

</script>


<style scoped>
    h1{
        margin-left: 40%;
        font-weight: bold;
    }
    img{
        /*margin-left: 40%;*/
        width: 20%;
        height: 20%;
        }
    .pictures{
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: baseline;
    }
    .qr{
        margin-left: 10%;
    }
    .pr-pic{
        margin-right: 10% !important
    }

</style>