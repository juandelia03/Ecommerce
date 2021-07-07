<template>
  <div class="card" :style="style">
    <div class="box">
      <i class="fas fa-long-arrow-alt-left fa-lg" @click="$emit('hide')"></i>
      <h1 class="add">Add a Product</h1>
    </div>
    <div class="wrapper">
      <div class="item">
        <label for="" class="text">Product's Name</label>
        <input
          type="text"
          placeholder="Name"
          class="inputText"
          v-model="name"
        />
      </div>
      <div class="item">
        <label for="" class="text">Product's Description</label>
        <input
          type="text"
          placeholder="Description"
          class="inputText"
          v-model="description"
        />
      </div>
      <div class="item">
        <label for="" class="text">Product's Price</label>
        <input
          type="text"
          placeholder="Price"
          class="inputText"
          v-model="price"
        />
      </div>
      <div class="item">
        <label for="" class="text">Product's Thumbnail</label>
        <input
          type="text"
          placeholder="Thumbnail (link)"
          class="inputText"
          v-model="thumbnail"
        />
      </div>
    </div>
    <button class="boton" @click="add">Add</button>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
const db = firebase.firestore()
export default {
  name: 'form',
  props: {
    style: Object,
  },
  data() {
    return {
      name: '',
      description: '',
      price: '',
      thumbnail: '',
    }
  },
  methods: {
    add() {
      const product = {
        name: this.name,
        description: this.description,
        price: 'USD $' + this.price,
        thumbnail: this.thumbnail,
      }
      if (
        this.name != '' &&
        this.description != '' &&
        this.price != '' &&
        this.thumbnail != ''
      ) {
        db.collection('products').add(product)
      }
      this.name = ''
      this.description = ''
      this.price = ''
      this.thumbnail = ''
      this.$emit('hide')
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
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: 700px;
  width: 600px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
}
.add {
  margin: 40px;
  font-size: 40px;
  font-weight: 800;
  border-bottom: solid;
  border-bottom-width: 5px;
  border-color: #00c58e;
}
.inputText {
  margin: 10px;
  border: solid;
  border-color: lightgray;
  outline: none;
  border-radius: 5px;
  width: 200px;
  height: 50px;
  padding-left: 10px;
  margin-left: auto;
}
.text {
  font-size: 24px;
  font-weight: 600;
}
.item {
  display: flex;
  align-items: center;
  width: 490px;
  height: 100px;
}
.wrapper {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.inputText:focus {
  border-color: #00c58e;
}
:focus::placeholder {
  color: #00c58e;
}
.boton {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #00c58e;
  color: white;
  font-weight: 600;
  padding: 5px 15px;
  border-radius: 50px;
  width: 70px;
  height: 70px;
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
i {
  cursor: pointer;
}
i:hover {
  color: #00c58e;
}
</style>
