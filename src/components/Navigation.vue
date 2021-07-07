<template>
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <nav>
            <ul id="all-links">
                <li>
                    <router-link class="link-r" :to="{name:'home'}">Home</router-link>
                </li>
                <li>
                    <router-link class="link-r" :to="{name:'login'}" v-show="!this.checkIfLoggedIn()">Вход</router-link>
                </li>
                <li v-show="this.checkIfLoggedIn()" >
                    <router-link :key="$route.path" class="link-r" :to="{name:'qrcode_out'}"   >QR -</router-link>
                </li>
                <li v-show="this.checkIfLoggedIn()">
                    <router-link :key="$route.path" class="link-r" :to="{name:'qrcode-in'}" >QR +</router-link>
                <li>
                <li v-show="this.checkIfLoggedIn()">
                    <router-link class="link-r" :to="{name:'inventory'}">Нал. Полу-Фаб.</router-link>
                </li>
                <li v-show="this.checkIfLoggedIn()">
                    <router-link class="link-r" :to="{name:'Inventory_Final_Prd'}">Нал. Кр. Изделия</router-link>
                </li>
                <li v-show="this.checkIfLoggedIn()">
                    <router-link class="link-r" :to="{name:'stockOrders'}">Пор.Дост.</router-link>
                </li>


<!--                <li v-show="this.checkIfLoggedIn()">-->
<!--                    <router-link class="link-r" :to="{name:'bill of materials'}" >BOM</router-link>-->
<!--                </li>-->
<!--                <li v-show="this.checkIfLoggedIn()">-->
<!--                    <router-link class="link-r" :to="{name:'create bom'}" >Create BOM</router-link>-->
<!--                </li>-->

                <li v-show="this.checkIfLoggedIn()">
                    <router-link class="link-r" :to="{name:'All_QR_Raw_Mat'}" >QR Полу-Фаб.</router-link>
                </li>
                <li v-show="this.checkIfLoggedIn()">
                    <router-link class="link-r" :to="{name:'All_QR_Final_Prod'}" >QR Kр.Изделия</router-link>
                </li>
                <li v-show="this.checkIfLoggedIn()">
                    <router-link class="link-r" :to="{name:'MRP'}">MRP</router-link>
                </li>
                <span class="welcome-msg" v-show="this.checkIfLoggedIn()">
                    <li class="link-r" >
                          Hello {{this.currentUsername()}} !
                    </li>
                </span>
                <li>
                    <a @click="logOut" class="link-r" v-show="this.checkIfLoggedIn()"> Изход</a>
                </li>

            </ul>
        </nav>
    </div>


</template>

<script>

import axios from "axios";
import getUserToken from "@/common/userToken";
import baseUrl from "../common/settings";
export default {
    name: "Navigation",
    data(){
        return {
            username: '',
            mobileView:false,
            showNav: false,
            screenWith: window.screen.width

        }
    },
    computed:{

    },

    methods:{
        async logOut(){

            const preFix = 'logout/'
            const finalUrl = baseUrl + preFix
            try{
                window.alert('Are you suer that you want to logout')
                await axios.get(finalUrl, {
                    headers: {
                        'Authorization': `token ${getUserToken()}`
                    }
                })
                sessionStorage.removeItem('authToken')
                sessionStorage.removeItem('username')
                sessionStorage.removeItem('email')
                this.$store.commit('updateCurrentUsername', sessionStorage.getItem('username'))
                this.$router.push({name:'home'})
            }
            catch (error){
                console.log(error)
            }
        },
        checkIfLoggedIn(){
            return this.$store.getters.getIsUserLoggedIn

        },
        currentUsername(){
            return this.$store.getters.getCurrentUsername
        },
        hamburger() {
            let x = document.getElementById("all-links");
            if (x.style.display === "block") {
                x.style.display = "none";
            } else {
                x.style.display = "block";
                }
            },
        getScreenWith(){
            window.addEventListener('resize', () => {
                this.screenWith = window.screen.width
            })
        }
    },


    created() {


    },
    mounted() {
        this.$store.commit('updateCurrentUsername', sessionStorage.getItem('username'))
        this.getScreenWith()

    }

}

</script>

<style scoped>
    *{
        text-decoration: none;
        list-style: none;
    }

    nav {
        background: #545c64;;
        border: solid 1px;
        height: auto;
    }

    nav ul{
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        align-items: baseline;
    }
    li{
        display: flex;
        color: #fff;
        padding-left: 1px;
        font-size: 15px;
        cursor: pointer;
        border-left: solid 1px;

    }
    a{
        color: #fff;
        padding: 5px;
    }
    .welcome-msg{;
        flex-basis: 20%;
        margin-left: auto;
    }
    a:hover{
        color: mediumseagreen;
    }

@media screen and (max-width: 1024px) {
    nav{
        display: flex;
        flex-flow: column;
        flex-wrap: wrap;
        min-width: 100%;
        min-height: 20%;
        overflow: hidden;
        background-color: #333;
        position: relative;
        align-content: flex-start;
    }
    .link-r{
        color: white;
        text-decoration: none;
        font-size: 12px;
        display: flex;
    }
}



</style>