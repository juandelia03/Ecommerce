<template>
  <div>
    <link
      rel="stylesheet"
      href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
      crossorigin="anonymous"
    />
    <div>
      <Navbar :usuario="user" @search="search" />
      <Boody :style="loading" :searchStr="str" @load="test" />
      <div v-if="wait == true" class="loader-wrapper">
        <span class="loader"><span class="loader-inner"></span></span>
      </div>
    </div>
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
      str: null,
      loading: { display: 'none' },
      wait: true,
    }
  },
  methods: {
    search(e) {
      this.str = e
    },
    test() {
      setTimeout(() => {
        var user = firebase.auth().currentUser
        if (user) {
          this.user = firebase.auth().currentUser.email.split('@')[0]
          this.loading = {}
          this.wait = false
        } else {
          this.loading = {}
          this.wait = false
        }
      }, 1)
    },
  },

  created() {
    // setTimeout(() => {
    //   var user = firebase.auth().currentUser
    //   if (user) {
    //     this.user = firebase.auth().currentUser.email.split('@')[0]
    //     this.loading = {}
    //     this.wait = false
    //   } else {
    //     this.loading = {}
    //     this.wait = false
    //   }
    // }, 1900)
  },
}
</script>
<style>
.view {
  height: 130%;
  background: #f5f1ee;
}
.loader-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #242f3f;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  border: 4px solid #fff;
  animation: loader 2s infinite ease;
}
.loader-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: #fff;
  animation: loader-inner 2s infinite ease-in;
}
@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loader-inner {
  0% {
    height: 0%;
  }
  25% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
  75% {
    height: 100%;
  }
  100% {
    height: 0%;
  }
}
</style>
