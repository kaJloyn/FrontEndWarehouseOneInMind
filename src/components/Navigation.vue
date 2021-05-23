<template>
    <div>
        <nav>
            <ul>
                    <li>
                        <router-link :to="{name:'home'}">Home</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'inventory'}">Inventory</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'stockOrders'}">Orders</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'login'}" v-show="!this.checkIfLoggedIn()">Login</router-link>
                    </li>
                    <li @click="logOut" v-show="this.checkIfLoggedIn()" class="wtf">
                        Logout
                    </li>
                <li>
                    <router-link :to="{name:'qrcode'}" >QR</router-link>
                </li>
                <li>
                    <router-link :to="{name:'bill of materials'}" >BOM</router-link>
                </li>
                <span class="welcome-msg" v-show="this.checkIfLoggedIn()">
                    <li >
                        Hello {{this.currentUsername()}} !
                    </li>
                </span>


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
            username: ''
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
    },
    mounted() {
        this.$store.commit('updateCurrentUsername', sessionStorage.getItem('username'))
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
    }
    li{
        display: flex;
        color: #fff;
        padding-left: 1%;
        font-size: 20px;
        cursor: pointer;

    }
    a{
        color: #fff;
    }
    .welcome-msg{;
        flex-basis: 20%;
        margin-left: auto;
    }
    a:hover{
        color: mediumseagreen;
    }





</style>