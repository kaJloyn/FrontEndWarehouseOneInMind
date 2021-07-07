<template>
    <div >
        <h1 class="raw-mat-picture">
            {{this.$route.query.name}}
        </h1>
        <h1 class="raw-mat-picture">
            {{this.$route.query.size}}
        </h1>
        <h1 class="raw-mat-picture">
            {{this.$route.query.color}}
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
        margin-left: 40%;
        width: 500px;
        }

</style>