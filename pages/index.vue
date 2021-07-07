<template>
  <div>
    <link
      rel="stylesheet"
      href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
      crossorigin="anonymous"
    />
    <Navbar :datos="datos" :usuario="user" />
    <Boody />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Boody from '../components/Boody.vue'
import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
import auth from 'firebase/auth'
export default {
  components: [Navbar, Boody],
  data() {
    return {
      user: null,
    }
  },
  methods: {},
  created() {
    var user = firebase.auth().currentUser

    if (user) {
      this.user = firebase.auth().currentUser.email.split('@')[0]
    } else {
      console.log('No user is signed in.')
    }
  },
}
</script>
<style>
.view {
  height: 130%;
  background: #f5f1ee;
}
</style>
