<template>
  <div>
    <template v-if="isDigis">
      <div class="text-center p-3 p-md-4">
        <img class="img-fluid mt-5 pt-3 logo-size-class" src="@/assets/images/digis-logo.png">
      </div>
<!--      <div class="text-dark text-center font-size-18 font-weight-600  mt-1 px-3 px-md-4">Create your account</div>-->
<!--      <div class="text-center text-dark font-size-14 text-white  px-3 px-md-4 mb-4">-->
<!--        <span class="text-dark font-weight-500">We recommend choosing a handle that’s the same as the one you use on other social platforms.</span>-->
<!--      </div>-->
    </template>

    <template v-else>
      <div class="text-center p-3 p-md-4">
        <img class="img-fluid mt-5 pt-4" src="@/assets/images/stella/logo-stella-white.png">
      </div>
<!--      <div class="text-white text-center font-size-18  mt-1 px-3 px-md-4">Create your account</div>-->
<!--      <div class="text-center text-white font-size-14 text-white  px-3 px-md-4 mb-4">-->
<!--        <span style="color: #c2c2c2">We recommend choosing a handle that’s the same as the one you use on other social platforms.</span>-->
<!--      </div>-->
    </template>

  </div>
</template>

<script>
export default {
  name: "Logo"
}
</script>

<style scoped>

.logo-size-class {
  width: 12rem;
}
</style>
