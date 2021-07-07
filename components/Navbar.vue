<template>
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
        />
        <button class="p-2">
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
      <div class="world flex gap-4 items-center" v-else>
        <h3>{{ usuario }}</h3>
        <i class="fas fa-user remove"></i>
      </div>
      <nuxt-link to="cart">
        <i class="fas fa-shopping-cart cart"></i>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    datos: Object,
    usuario: String,
  },
  methods: {},
  created() {
    console.log(this.user)
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
  border-bottom: solid;
  border-color: lightgray;
  border-width: 1px;
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
.world {
  transition: 0.22s;
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
