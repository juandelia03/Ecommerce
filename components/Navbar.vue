<template>
  <div class="wrapper">
    <div class="nav-bar flex gap-10 items-center justify-around">
      <div class="flex gap-10 items-center">
        <div class="flex items-center remove">
          <nuxt-link to="/">
            <img src="../static/logo.jpg" alt="logo" class="img"
          /></nuxt-link>
        </div>

        <div class="world flex gap-4 items-center">
          <h3>SHIPPING ALL OVER THE WORLD</h3>
          <i class="fas fa-globe-americas remove"></i>
        </div>
        <div class="world flex gap-4 items-center">
          <h3>DEALS</h3>
          <i class="fas fa-tags remove"></i>
        </div>
        <nuxt-link to="/us"><h3>OUR STORY</h3></nuxt-link>
      </div>
      <div class="flex gap-10 items-center">
        <div class="search flex items-center">
          <input
            type="text"
            style="margin-left: 10px"
            placeholder="Search products"
            v-model="content"
            @keyup.enter="$emit('search', content)"
          />
          <button class="p-2" @click="$emit('search', content)">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"
              />
            </svg>
          </button>
        </div>
        <nuxt-link to="/login" v-if="usuario == null">
          <div class="world flex gap-4 items-center">
            <h3>LOGIN</h3>
            <i class="fas fa-user remove"></i>
          </div>
        </nuxt-link>
        <div class="world flex gap-4 items-center" v-else @click="popUp">
          <h3>{{ usuario }}</h3>
          <i class="fas fa-user remove"></i>
        </div>
        <nuxt-link to="cart">
          <div class="flex items-center">
            <i class="fas fa-shopping-cart cart"></i>
            <div class="numerito">
              <h6>{{ amount }}</h6>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="pop" @click="logout" :style="visibility">
      <p>Log out</p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import auth from 'firebase/auth'
import firestore from 'firebase/firestore'
const db = firebase.firestore()
export default {
  name: 'NavBar',
  props: {
    usuario: String,
  },
  created() {
    setTimeout(() => {
      let username = firebase.auth().currentUser.email.split('@')[0]
      db.collection('users')
        .doc(username)
        .collection('carrito')
        .onSnapshot(() => {
          this.number()
        })
    }, 1000)
    this.number()
  },
  methods: {
    async number() {
      const username = firebase.auth().currentUser.email.split('@')[0]
      db.collection('users')
        .doc(username)
        .collection('carrito')
        .get()
        .then((querySnapshot) => {
          this.amount = []
          querySnapshot.forEach((doc) => {
            this.amount.push(doc)
          })
          this.amount = this.amount.length
        })
    },
    logout() {
      firebase.auth().signOut()
      location.reload()
    },
    popUp() {
      if (this.open === false) {
        this.visibility = { visibility: 'visible ' }
        this.open = true
      } else {
        this.visibility = { visibility: 'hidden' }
        this.open = false
      }
    },
  },
  data() {
    return {
      content: '',
      visibility: { visibility: 'hidden' },
      open: false,
      amount: 0,
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@keyframes color {
  from {
    color: black;
  }
  to {
    color: #00c58e;
  }
}
input {
  outline: none;
  height: 38px;
  width: 600px;
}
input:focus-visible {
  outline: none;
}
.nav-bar {
  height: auto;
  border: none;
  border-color: lightgray;
  border-width: 1px;
}
.numerito {
  position: relative;
  right: 23px;
  top: 10px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: #00c58e;
  color: white;
  width: 16px;
  height: 16px;
}

h3 {
  font-weight: 400;
  font-family: roboto;
  cursor: pointer;
  transition: 0.22s;
}
.i {
  transition: 0.22s;
}
.pop {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 8rem;
  height: 4rem;
  position: absolute;
  right: 0px;
  margin-right: 7rem;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
p {
  cursor: pointer;
  font-weight: 650;
}
p:hover {
  color: #00c58e;
}
.world {
  transition: 0.22s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.img {
  width: 200px;
  height: 100px;
}
button {
  background: #00c58e;
  height: 38px;
}
.search {
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  outline: none;
}

svg {
  fill: white;
}
h3:hover {
  color: #00c58e;
}
.world:hover h3 {
  color: #00c58e;
}

.world:hover i {
  color: #00c58e;
}
.cart {
  cursor: pointer;
  transition: 0.22s;
}
.cart:hover {
  color: #00c58e;
}
.cart:hover + .numerito {
  background-color: black;
}

@media (max-width: 1712px) {
  input {
    width: 500px;
  }
  .justify-arround {
    justify-content: normal;
  }
}
@media (max-width: 1612px) {
  input {
    width: 200px;
  }
}
@media (max-width: 1165px) {
  .gap-10 {
    gap: 1rem;
  }
}
@media (max-width: 985px) {
  .remove {
    display: none;
  }
  .nav-bar {
    height: 100px;
  }
}
@media (max-width: 800px) {
  h3 {
    display: none;
  }
  input {
    width: 400px;
  }
  .pop {
    display: none;
  }
}
@media (max-width: 530px) {
  input {
    width: 300px;
  }
  .gap-10 {
    gap: 0rem;
  }
}
</style>
