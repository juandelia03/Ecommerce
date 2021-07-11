<template>
  <div>
    <div class="item flex items-center container">
      <div
        style="
          width: 100px;
          display: flex;
          justify-content: center;
          margin: 10px;
        "
      >
        <img :src="pic" alt="" />
      </div>
      <div class="name-c">
        <span class="name">{{ name }}</span>
      </div>
      <div class="amount flex gap-4 justify-center items-center">
        <p>{{ counter }}</p>
        <i class="fas fa-plus" @click="plus"></i>
        <i class="fas fa-minus" @click="minus"></i>
      </div>
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          border-right: solid;
          height: 80px;
          border-width: 1px;
          width: 25%;
          border-color: lightgray;
          margin: auto;
          border-right: none;
        "
      >
        <p>USD $ {{ precio }}</p>
      </div>
      <div class="tacho" @click="dlt">
        <i class="fas fa-trash fa-lg"></i>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import auth from 'firebase/auth'
import firestore from 'firebase/firestore'
const db = firebase.firestore()

export default {
  name: 'item',
  props: {
    name: String,
    price: String,
    pic: String,
    i: Number,
    amount: Number,
  },
  data() {
    return {
      counter: 1,
      precio: this.price.split('USD $')[1],
    }
  },
  created() {
    const user = firebase.auth().currentUser
    var docRef = db
      .collection('users')
      .doc(user.email.split('@')[0])
      .collection('carrito')
      .doc(this.name)

    docRef.get().then((doc) => {
      this.counter = doc.data().cart[0].amount
    })
  },
  methods: {
    plus() {
      this.counter++
      this.precio = this.price.split('USD $')[1] * this.counter
      const user = firebase.auth().currentUser
      db.collection('users')
        .doc(user.email.split('@')[0])
        .collection('carrito')
        .doc(this.name)
        .update({
          cart: [
            {
              amount: this.counter,
              price: 'USD $' + this.precio,
              name: this.name,
              thumbnail: this.pic,
            },
          ],
        })
    },
    minus() {
      if (this.counter > 1) {
        this.counter = this.counter - 1
        this.precio = this.price.split('USD $')[1] * this.counter
        const user = firebase.auth().currentUser
        db.collection('users')
          .doc(user.email.split('@')[0])
          .collection('carrito')
          .doc(this.name)
          .update({
            cart: [
              {
                amount: this.counter,
                price: 'USD $' + this.precio,
                name: this.name,
                thumbnail: this.pic,
              },
            ],
          })
      }
    },
    dlt() {
      const user = firebase.auth().currentUser
      db.collection('users')
        .doc(user.email.split('@')[0])
        .collection('carrito')
        .doc(this.name)
        .delete()
      this.$emit('itemDeleted', this.name)
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
  font-family: roboto;
}
.item {
  width: 1000px;
  height: 100px;
  background: white;
  border: solid;
  border-width: 1px;
  border-top: 0px;
  border-color: lightgray;
}
img {
  height: 78px;
  /* border-right: solid;
  border-width: 1px; */
  padding: 0px 10px;
  /* border-color: lightgray;
  border-left: none;
  border-bottom: none;
  border-top: none; */
}
.name {
  border: none;
  font-weight: 400;
  font-size: 20px;
}
.name-c {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-weight: 400;
  font-size: 20px;

  border-width: 1px;
  height: 80px;
  width: 25%;
  border-color: lightgray;
}
p {
  font-size: 24px;
  font-weight: 400;
}
.tacho {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 10%;
  height: 100%;
}
.tacho:hover {
  color: #00c58e;
}
.amount {
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: solid;
  height: 80px;
  width: 30%;
  border-width: 0px;
  border-color: lightgray;
}
</style>
