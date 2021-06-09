<template>
    <div>
        <div class="scn-result">
            <img class="picture-rm" :src="pic" alt="">
            <article class="data">
                <div class="item-data">{{rm}}</div>
                <div class="item-data">{{size}}</div>
                <div class="item-data">{{color}}</div>
                <div>
                    <input type="number">
                </div>
                <div>
                    <button> Извади </button>
                </div>
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
    .scn-result{
        display: flex;
        flex-direction: column;
        max-width: 500px;
    }
    .picture-rm{
        width: 300px;
        height: 300px;
    }
    .data{
        width: 500px;
    }
    .item-data{
        width: 500px;
        height: 50px;
    }
    input{
        width: 500px;
        height: 100px;
    }
    button{
        width: 500px;
        height: 100px;
    }


</style>