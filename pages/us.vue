<template>
  <div class="flex flex-col justify-center items-center m-24">
    <h1 class="title">About us</h1>

    <div class="view-1">
      <p class="who my-12">Who we are</p>
      <p class="content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis illo
        ipsum iusto doloribus possimus quisquam laudantium ullam, architecto,
        tenetur dolor aliquid excepturi! Minus eligendi porro, recusandae quod
        incidunt reprehenderit dolorem? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Debitis illo ipsum iusto doloribus possimus quisquam
        laudantium ullam, architecto, tenetur dolor aliquid excepturi! Minus
        eligendi porro, recusandae quod incidunt reprehenderit dolorem?
      </p>
    </div>
    <div class="view-1">
      <p class="who my-12">We are are different than the rest</p>
      <p class="content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis illo
        ipsum iusto doloribus possimus quisquam laudantium ullam, architecto,
        tenetur dolor aliquid excepturi! Minus eligendi porro, recusandae quod
        incidunt reprehenderit dolorem? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Debitis illo ipsum iusto doloribus possimus quisquam
        laudantium ullam, architecto, tenetur dolor aliquid excepturi! Minus
        eligendi porro, recusandae quod incidunt reprehenderit dolorem?
      </p>
    </div>
  </div>
</template>

<script>
import Nav from '../components/Navbar.vue'
export default {}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
* {
  font-family: roboto;
}
.title {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 12px;
}
.who {
  font-family: roboto;
  font-size: 24px;
  font-weight: 600;
}
.view-1 {
  width: 800px;
}
.content {
  font-weight: 300;
}
</style>
