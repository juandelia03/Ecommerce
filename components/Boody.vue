<template>
  <div class="view">
    <div class="flex justify-center pb-10 pt-10 mx-20 flex-wrap gap-40">
      <div class="flex" style="width: 3200px">
        <h3 class="stelar" style="width: 3000px; margin: auto">
          OUR STELAR PRODUCTS
        </h3>
        <label class="switch">
          <p class="admin-view">admin view</p>
          <input type="checkbox" @click="adminToggle" />
          <span class="slider round"></span>
        </label>
      </div>
      <Form :style="style" @hide="hide" @refresh="refresh" />
      <Product
        v-if="isAdmin === true"
        :add="true"
        @open="form"
        @added="refresh()"
      />
      <Product
        v-for="(product, index) in productsDos"
        v-bind:key="index"
        :description="product.description"
        :name="product.name"
        :price="product.price"
        :thumbnail="product.thumbnail"
      />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
import Fuse from 'fuse.js'
import Product from './Product.vue'
import Form from './Form.vue'
export default {
  components: { Product, Form },
  name: 'Boody',
  components: [Product],
  props: {
    searchStr: String,
  },
  methods: {
    form() {
      this.style = { visibility: 'visible' }
    },
    refresh() {
      this.productsDos = []
      var db = firebase.firestore()
      db.collection('products')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.productsDos.push(doc.data())
          })
        })
    },
    hide() {
      this.style = { visibility: 'hidden' }
    },
    search() {
      const options = {
        includeScore: true,
        useExtendedSearch: true,
        keys: ['name'],
      }
      const fuse = new Fuse(this.productsDos, options)
    },
    adminToggle() {
      this.isAdmin = !this.isAdmin
    },
  },
  watch: {
    searchStr: function (newStr) {
      if (newStr !== '' && newStr !== null) {
        const options = {
          includeScore: true,
          useExtendedSearch: true,
          keys: ['name', 'description'],
        }
        const fuse = new Fuse(this.lookHere, options)
        let result = fuse.search(newStr)
        var db = firebase.firestore()
        this.productsDos = []
        result.forEach((e) => this.productsDos.push(e.item))
      } else {
        this.productsDos = []
        var db = firebase.firestore()
        db.collection('products')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.productsDos.push(doc.data())
            })
          })
      }
    },
  },
  data() {
    return {
      productsDos: [],
      style: { visibility: 'hidden' },
      isLogged: false,
      lookHere: [],
      isAdmin: false,
    }
  },
  created() {
    var db = firebase.firestore()
    db.collection('products')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.productsDos.push(doc.data())
        })
      })
    this.lookHere = this.productsDos
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
  font-family: roboto;
}
.admin-view {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 80px;
  width: 100px;
  height: 34px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-weight: 300;
  font-size: 20px;
}
.view {
  width: 100vw;
}
.ml-32 {
  margin-left: 190px;
}
.stelar {
  border-bottom: solid;
  border-bottom-width: 3px;
  border-color: #00c58e;
  max-width: 270px;
  font-size: 24px;
  font-weight: 400;
  height: 50px;
  cursor: pointer;
}
/* The switch - the box around the slider */
.switch {
  position: absolute;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #00c58e;
}

input:focus + .slider {
  box-shadow: 0 0 1px #00c58e;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
Product
