<template>
  <div>
    <link
      rel="stylesheet"
      href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
      crossorigin="anonymous"
    />
    <Navbar :usuario="user" />
    <div v-if="store.length > 0" class="view flex justify-center pt-24">
      <div class="flex flex-col items-center">
        <h2 class="cart-t">YOUR CART</h2>
        <div class="line"></div>
        <div style="margin-top: 80px">
          <div class="lines" v-if="store.length != 0"></div>
          <Item
            v-for="(product, index) in store"
            :key="index"
            :name="product.name"
            :price="product.price"
            :pic="product.thumbnail"
            :i="index"
            :amount="product.amount"
            @itemDeleted="dlt"
          />
          <div class="total" v-if="store.length > 0">
            <p class="tot">Continue to checkout</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    <div v-else class="view flex justify-center pt-24">
      <h2 class="cart-t">YOUR CART IS CURRENTLY EMPTY</h2>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
import auth from 'firebase/auth'
const db = firebase.firestore()

import Navbar from '../components/Navbar.vue'
import Item from '../components/item.vue'
export default {
  components: [Navbar, Item],

  data() {
    return {
      store: [],
    }
  },
  methods: {
    dlt(e) {
      var user = firebase.auth().currentUser
      let newS = []
      // this.store.splice(
      //   this.store.findIndex((item) => item.name === e),
      //   1
      // )
      var docRef = db
        .collection('users')
        .doc(user.email.split('@')[0])
        .collection('carrito')
      docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          newS.push(doc.data().cart[0])
        })
      })
      setTimeout(() => {
        this.store = newS
      }, 300)
    },
  },
  created() {
    var user = firebase.auth().currentUser
    if (user) {
      var docRef = db
        .collection('users')
        .doc(user.email.split('@')[0])
        .collection('carrito')

      docRef.get().then((querySnapshot) => {
        //this.store = doc.data().cart
        querySnapshot.forEach((doc) => {
          this.store.push(doc.data().cart[0])
        })
      })
    } else {
      console.log('No user is signed in.')
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
  font-family: roboto;
}
.view {
  background: #f5f1ee;
  height: 100vh;
}
.cart-t {
  font-family: roboto;
  font-size: 24px;
  font-weight: 600;
}
.line {
  border-bottom: solid;
  padding: 12px;
  border-color: #00c58e;
  width: 80px;
}
.lines {
  background: lightgray;
  height: 1px;
  width: 700px;
}
.total {
  display: flex;
  height: 70px;
  width: 1000px;
  border: solid;
  border-color: lightgray;
  border-top: none;
  border-width: 1px;
  background-color: white;
  align-items: center;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
}
.tot {
  font-size: 24px;
  font-weight: 400;
  margin: auto;
  cursor: pointer;
}
.tot:hover {
  color: #00c58e;
}
</style>
