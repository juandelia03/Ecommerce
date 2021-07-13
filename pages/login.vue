<template>
  <div class="flex flex-col justify-center items-center m-32">
    <h1 class="title">Login</h1>
    <p class="errHandler">{{ error }}</p>
    <form
      class="flex flex-col justify-center items-center"
      @submit.prevent="login"
    >
      <input
        class="user-data"
        type="text"
        placeholder="email"
        v-model="email"
      />
      <input
        class="user-data"
        type="password"
        placeholder="password"
        v-model="password"
      />
      <nuxt-link to="/" v-if="redirect === true">
        <input class="submit" type="submit" value="Login" />
      </nuxt-link>
      <input
        class="submit"
        type="submit"
        value="Login"
        v-if="redirect === false"
      />
    </form>
    <div class="flex gap-4 mt-8">
      <p style="font-weight: 200">don't have a user?</p>
      <nuxt-link to="/register"><p class="register">Sign up</p></nuxt-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import auth from 'firebase/auth'
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      redirect: false,
      error: '',
    }
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          //window.location.href = '/'
          // Signed in
          var user = userCredential.user
          this.redirect = true
          // ...
        })
        .catch((error) => {
          var errorCode = error.code
          var errorMessage = error.message
          this.error = errorMessage
        })
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
* {
  font-family: roboto;
}
.title {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 12px;
}
.user-data {
  margin: 10px;
  border: solid;
  border-color: lightgray;
  outline: none;
  border-radius: 5px;
  width: 350px;
  height: 50px;
  padding-left: 10px;
}
.submit {
  margin-top: 24px;
  background-color: #00c58e;
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 24px;
  width: 350px;
}
.user-data:focus {
  border-color: #00c58e;
}
.register {
  cursor: pointer;
  font-weight: 200;
}
.register:hover {
  color: #00c58e;
}
.errHandler {
  margin: 24px;
  color: red;
  font-weight: 200;
}
</style>
