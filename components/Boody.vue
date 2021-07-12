<template>
  <div class="view">
    <div class="flex justify-center pb-10 pt-10 mx-20 flex-wrap gap-40">
      <div class="flex" style="width: 3200px">
        <h3 class="stelar" style="width: 3000px; margin: auto">
          OUR STELAR PRODUCTS
        </h3>
      </div>
      <Form :style="style" @hide="hide" @refresh="refresh" />
      <Product :add="true" @open="form" @added="refresh()" />
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
      console.log(this.ProductsDos)
      const fuse = new Fuse(this.productsDos, options)
      console.log(fuse.search('bass'))
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
</style>
Product
