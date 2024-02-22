<template>
      <!-- header for desktop -->
      <div class="col-md-12 d-md-flex align-content-center justify-content-between px-3" >
          <div>
            <img class="img-fluid mt-2 mt-md-0" style="width:120px" src="@/assets/images/stella/logo-stella-white.png">
          </div>

          <div class="navbar navbar-expand-md d-md-block d-none">
            <div class="navbar-nav align-items-center">
<!--              <a class="nav-item nav-link text-white mx-2 btn" @click.prevent="about">About us</a>
              <a class="nav-item nav-link text-white mx-2 btn" href="#">Community</a>
              <a class="nav-item nav-link text-white mx-2 btn" @click.prevent="blog">Blog</a>-->
<!--              <div class="d-flex align-items-center px-4">
                <a :href="STELLA_URL" class="font-dark-grey font-family-poppins font-size-18 me-4">For Stella 2.0</a>
                <button class="btn btn-gradient text-white font-family-poppins font-size-18 border-radius-12 px-3 py-2" @click="goTo">Click Here</button>
              </div>-->
              <a class="nav-item nav-link text-white btn outline-gradient-a mx-2 rounded-pill px-4 py-2" @click.prevent="login">Login</a>
              <a class="nav-item nav-link text-white btn outline-gradient-a mx-2 rounded-pill px-4 py-2" @click.prevent="signUp">Sign up</a>
            </div>
          </div>

          <span class="closefriend-header-top-btn-wrapper hamburger d-block d-md-none">
              <span class="hamburger-menu" data-trigger="here">
                  <!-- <img class="btn-close"src="@/assets/images/stella/close.png" @click="$emit('close')"> -->
                  <img src="@/assets/images/stella/front/menu-open.png" @click="showSlideBar = true">
              </span>
          </span>

            <aside class="menu-bg" :class="showSlideBar ? 'offcanvas offcanvas-right show' : 'offcanvas offcanvas-right '" id="side_bar">
                <div class="text-right py-4 mx-2">
                  <img src="@/assets/images/stella/logo-stella-white.png" class="img-fluid"
                     style="margin-right: 100px;display: inline;pointer-events: none;width: 140px;">
                  <img class="btn-close" src="@/assets/images/stella/close.png" @click="showSlideBar = fasle">
                </div>

              <div class="navbar-nav align-items-start px-4 py-3">
<!--                  <a class="nav-item nav-link text-white mx-2 btn" @click.prevent="about">About us</a>
                  <a class="nav-item nav-link text-white mx-2 btn" href="#">Community</a>
                  <a class="nav-item nav-link text-white mx-2 btn" @click.prevent="blog">Blog</a>-->
                  <div class="d-flex py-2">
                    <a class="nav-item my-2 nav-link text-white btn outline-gradient-a mx-2 rounded-pill px-4 py-2" @click.prevent="login">Login</a>
                    <a class="nav-item my-2 nav-link text-white btn outline-gradient-a mx-2 rounded-pill px-4 py-2" @click.prevent="signUp">Sign up</a>
                  </div>
              </div>
            </aside>

      </div>
      <!-- header for desktop -->
</template>

<script>
import {httpMixin} from "@/mixin/http-mixin";
import {mapActions} from "vuex";
export default {
  name: "FrontHeader",
  mixins: [httpMixin],
  data() {
    return {
      showSlideBar: false,
      STELLA_URL: process.env.VUE_APP_STELLA_URL
    }
  },
  methods: {
    ...mapActions(['setAgentName']),
    login() {
      this.$router.push({name: 'LoginMobile'});
    },

    isAgency(name) {
      let agencyName = this.$route.params.agencyName;
      return agencyName && agencyName.toLowerCase() === name;
    },

    signUp() {
      this.setAgentName(this.$route.params.agencyName);
      this.$router.push({name: 'CreateAccountMobile'})
    },

    about() {
      this.$router.push({name: 'AboutPage'})
    },

    blog() {
      this.$router.push({name: 'BlogList'})
    },
    goTo() {
      window.location = this.STELLA_URL;
    }
  },
}
</script>

<style scoped>
.btn-gradient{
  background-image: -webkit-linear-gradient(90deg, #DE8371 0%, #C56FD1 25.31%, #2F4FE9 74.27%, #56A0CB 100%)!important;
  background-image:    -moz-linear-gradient(90deg, #DE8371 0%, #C56FD1 25.31%, #2F4FE9 74.27%, #56A0CB 100%)!important;
  background-image:     -ms-linear-gradient(90deg, #DE8371 0%, #C56FD1 25.31%, #2F4FE9 74.27%, #56A0CB 100%)!important;
  background-image:      -o-linear-gradient(90deg, #DE8371 0%, #C56FD1 25.31%, #2F4FE9 74.27%, #56A0CB 100%)!important;
  background-image:         linear-gradient(90deg, #DE8371 0%, #C56FD1 25.31%, #2F4FE9 74.27%, #56A0CB 100%)!important;
  background-size: 104%;
  background-position-x: -4px;
}

</style>
