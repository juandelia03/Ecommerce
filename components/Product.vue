<template>
  <div class="card">
    <div v-if="add === true" class="admin">
      <div class="circulo" @click="form">
        <p class="add">+</p>
      </div>
    </div>
    <img :src="thumbnail" alt="" class="thumbnail" />
    <p class="description">{{ description }}</p>
    <h3 class="name">{{ name }}</h3>
    <div class="price">
      <p>{{ price }}</p>
      <button class="boton" v-if="name != null" @click="adds">
        Add to cart
      </button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
const db = firebase.firestore()

import store from '../store'
export default {
  name: 'Card',
  props: {
    description: String,
    name: String,
    price: String,
    thumbnail: String,
    add: Boolean,
  },
  methods: {
    form() {
      this.$emit('open')
    },

    adds() {
      var user = firebase.auth().currentUser
      console.log(user)
      if (user) {
        const username = firebase.auth().currentUser.email.split('@')[0]
        db.collection('users')
          .doc(username)
          .collection('carrito')
          .doc(this.name)
          .set({
            cart: firebase.firestore.FieldValue.arrayUnion({
              name: this.name,
              price: this.price,
              thumbnail: this.thumbnail,
              amount: 1,
            }),
          })
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
* {
  font-family: roboto;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  background-color: white;
  min-height: 450px;
  height: auto;
  width: 320px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
}
.thumbnail {
  height: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.description {
  margin: 0px 40px;
  margin-top: 20px;
  margin-bottom: 5px;
  color: rgb(182, 181, 181);
  font-weight: 300;
}
.name {
  font-size: 24px;
  font-weight: 500;
  margin: 0px 20px;
}
.price {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}
.boton {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #00c58e;
  color: white;
  font-weight: 300;
  padding: 5px 15px;
  border-radius: 5px;
}
.circulo {
  background-color: #00c58e;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.add {
  color: white;
  font-size: 50px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.admin {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 120px;
}
</style>
