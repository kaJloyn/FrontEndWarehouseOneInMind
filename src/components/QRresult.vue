<template>
    <div>
        <div>
            <img class="picture-rm" :src="pic" alt="">
            <article>
                <span>{{rm}}</span>
                <span>{{size}}</span>
                span{{color}}
            </article>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                pic:null,
                rm: null,
                size:null,
                color:null,
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

</style>