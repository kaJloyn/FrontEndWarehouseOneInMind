<template>
  <div class="loginForm">

      <h1>Login</h1>

      <form class="form">
          <p class="field email">
            <label>Username:</label>
            <input type="text"  placeholder="some Username" v-model="$v.formData.username.$model">
          </p>
          <p class="field password">
            <label>Password:</label>
            <input type="password" v-model="$v.formData.password.$model">
          </p>
          <button class="btn" @click.prevent="loginSubmit">Submit</button>

      </form>


  </div>
</template>

<script>
import axios from "axios";
import { required } from 'vuelidate/lib/validators'
import baseUrl from "../common/settings";

export default {
  name: "Login",
  data(){
    return{
      formData:{
          username:'',
          password:'',
          response:'',

      },
    }
  },
  validations:{
    formData:{
      username: {required},
      password: {required},
    },
  },
  methods:{

    async loginSubmit(){
        const {formData} = this.$v
        this.$v.$touch()
        const preFix = 'login/'
        const finalUrl = baseUrl + preFix
      const dataObj = {
        username:formData.$model.username,
        password:formData.$model.password
      }
      try{
        const result = await axios.post(finalUrl, dataObj)
          sessionStorage.setItem('authToken', result.data.token)
          sessionStorage.setItem('username', result.data.username)
          sessionStorage.setItem('email', result.data.email)
        this.$store.commit('updateCurrentUsername', sessionStorage.getItem('username'))
        await this.$router.push({name: 'home'})
      }
      catch (error){
         if(error.response.status === 400){
             window.alert('Your credentials are wrong please try again')
             document.getElementById('loginForm').reset()
         }
         else{
             window.alert('There was some other mistake')
             document.getElementById('loginForm').reset()
         }

      }

    },


  },
}
</script>



<style scoped>
    h1{
        margin-left: 50%;
    }
    label{
        font-size: 25px
    }
    .form{
        display: inline-block;
        margin-top: 1%;
        margin-left: 40%;

        width: 50vh;
        height: 30vh;
    }

    button{
        position: relative;
        left: 140px;
        cursor: pointer;
        background: #545c64;;
        color: #fff;
        width: 120px;
        height:30px;
        border-radius: 5px;
        box-shadow: 4px 18px 34px -9px #000000;
        object-fit: cover;

    }
    button:hover{
        /*background: slategrey;*/
        color: mediumseagreen;
    }
    input{
        margin-left: 20px;
        width: 150px;
        height: 30px;
    }

</style>
