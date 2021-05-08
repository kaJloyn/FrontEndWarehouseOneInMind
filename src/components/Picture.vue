<template>
    <div >
        <h1 class="raw-mat-picture">
            {{this.$route.query.name}}
        </h1>
        <img :src="this.$route.query.pic" alt="">
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
        width: 100vw;
        }

</style>