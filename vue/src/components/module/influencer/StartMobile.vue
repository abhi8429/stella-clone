<template>

  <!--  -->
  <div>
    <header class="sticky fixed-top">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand">
            <img src="../../../assets/images/stella/logo-stella-white.png" class="img-fluid"
                 style="margin-right: 100px; width:130px; display: inline; pointer-events: none;">
          </a>

          <span class="float-right">
                    <button class="btn login-btn" style="" @click.prevent="login()">Login</button>
                    <button class="btn sign-up-btn" style="" @click.prevent="signUp()">Sign Up</button>
                </span>
        </div>
      </nav>
    </header>
    <section class="fixed-top-space"></section>
    <section id="slide" class="slide closefriend-hero background-white">
      <div class="content-bottom">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-5 offset-md-1 col-sm-12 col-12">

              <h1 class="desktop-title">Turn Followers<br>Into <span class="success">Subscribers</span></h1>

              <h1 class="mobile-title">Turn Followers<br>Into <span class="success">Subscribers</span></h1>
              <h5 class="font-grey font-size-15-18">with CloseFriend Stories on Instagram</h5>
              <span class="hero-buttons row">
		 					<button class="col-md-5 col-sm-12 col-12 btn sign-up-btn px-3" style="" @click.prevent="signUp()">Creator Sign Up</button>
	 					</span>
            </div>
            <div class="col-md-5 col-sm-12 col-12">
              <div class="hero-image d-none d-md-block">
                <img v-if="isAgency(AGENCY_SOMNIUM)" src="../../../assets/images/somnium_signup.webp"
                     class="img-fluid d-block mx-auto">
                <img v-else src="../../../assets/images/hero-image.webp" class="img-fluid d-block mx-auto">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="my-md-5 pb-5 pt-4">
      <div class="container">
        <div class="row align-items-center home-grey-section mx-1 mx-md-0">
          <div class="col-md-4 col-sm-12 col-12 mb-md-0 mb-5">
            <h2 class="mb-md-4 pb-md-3">1. Create your Link</h2>
            <img src="../../../assets/images/home-img-1.webp" class="img-fluid d-block">
          </div>
          <div class="col-md-4 col-sm-12 col-12 mb-md-0 mb-5">
            <h2 class="mb-md-4 pb-md-3">2. Share your Link</h2>
            <img src="../../../assets/images/home-img-2.webp" class="img-fluid d-block">
          </div>
          <div class="col-md-4 col-sm-12 col-12 mb-md-0 mb-4">
            <h2 class="mb-md-4 pb-md-3">3. Add Subs on IG</h2>
            <img src="../../../assets/images/home-img-3.webp" class="img-fluid d-block">
          </div>
        </div>
      </div>
    </section>

    <section class="slide closefriend-hero background-white my-md-5 py-md-4 mb-5">
      <div class="container">
        <div class="row justify-content-center px-md-0 px-2">
          <div class="col-md-5 col-sm-12 col-12 m-md-0 p-md-0 px-3">
            <img src="../../../assets/images/home-img-4.webp" style="width:500px;object-fit: contain;"
                 class="img-fluid d-block">
          </div>
          <div class="col-md-5 col-sm-12 col-12 offset-md-1 order-first order-md-last">
            <h1 class="font-size-50 mb-4">Recurring Income<br>Every Month</h1>
            <p class="font-grey font-size-14 home-para">Subscriptions provide recurring income that growsevery single
              month. Close Friend helps process and manage all of your paying subscribers.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="slide closefriend-hero background-white my-md-5 py-md-4 mb-5">
      <div class="container">
        <div class="row align-items-center justify-content-center px-md-0 px-2">
          <div class="col-md-5 col-sm-12 col-12 m-md-0 p-md-0 px-3">
            <img src="../../../assets/images/home-img-5.webp" style="width:400px;object-fit: contain;"
                 class="img-fluid d-block">
          </div>
          <div class="col-md-6 col-sm-12 col-12 order-first order-md-first">
            <h1 class="font-size-50 mb-4">Exclusive Content<br>on Instagram</h1>
            <p class="font-grey font-size-14 home-para">Share behind the scenes, Q&A, exclusive merch drops, and more
              directly on Instagram. No need to sign up for another platform.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="slide closefriend-hero background-white my-md-5 py-md-4 mb-5">
      <div class="container">
        <div class="row align-items-center justify-content-center px-md-0 px-2">
          <div class="col-md-5 col-sm-12 col-12 m-md-0 p-md-0 px-3">
            <img src="../../../assets/images/home-img-6.webp" style="width:450px;object-fit: contain;"
                 class="img-fluid d-block">
          </div>
          <div class="col-md-5 col-sm-12 col-12 offset-md-1 order-first order-md-last">
            <h1 class="font-size-50 mb-4 d-none d-md-block">Easy for you. <br>Easy for your <br>followers</h1>
            <h1 class="font-size-50 mb-4 d-block d-md-none">Easy for you. Easy <br>for your followers </h1>
            <p class="font-grey font-size-14 home-para">Brand sponsorships are a great source of revenue, but let’s be
              honest...your audience wants less #ads and more original content.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="slide closefriend-hero background-white my-md-5 py-md-4 mb-5">
      <div class="container">
        <div class="row align-items-center justify-content-center px-md-0 px-2">
          <div class="col-md-5 col-sm-12 col-12 m-md-0 p-md-0 px-3">
            <img src="../../../assets/images/home-img-7.webp" style="width:450px;object-fit: contain;"
                 class="img-fluid d-block">
          </div>
          <div class="col-md-6 col-sm-12 col-12 order-first order-md-first">
            <h1 class="font-size-50 mb-4 home-para">The Best Revenue Split</h1>
            <p class="font-grey font-size-14 home-para">On top of everything else, we give you the most revenue out of
              any other tool or platform.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="my-md-5 py-md-4 px-md-0 px-3">
      <div class="container">
        <div class="row align-items-center justify-content-center home-grey-section p-4">
          <div class="col-12 text-center">
            <h1 class="mb-3 font-size-30">Get Started in 1 Minute</h1>
          </div>
          <button class="btn sign-up-btn m-0 font-size-15" style="" @click.prevent="signUp()">Creator Sign Up</button>
        </div>
      </div>
    </section>

    <footer>
      <div class="mt-5 pb-4">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-8 col-sm-12 col-12 copyright">
              Copyright ©CloseFriend.io 2020
            </div>
            <div class=" col-md-4 col-sm-12 col-12 order-first order-md-last">
              <ul class="nav justify-content-center">
                <li class="nav-item">
                  <img class="footer-social-icon fb" src="@/assets/images/fb.svg">
                </li>
                <li class="nav-item">
                  <img class="footer-social-icon tw" src="@/assets/images/tw.svg">
                </li>
                <li class="nav-item">
                  <img class="footer-social-icon ig" src="@/assets/images/ig.svg">
                </li>
                <li class="nav-item">
                  <img class="footer-social-icon dc" src="@/assets/images/dc.svg">
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>

</template>

<script>

import LoginMobile from "@/components/module/influencer/LoginMobile";
import {AGENCY_SOMNIUM} from "@/properties/agency";
import {mapActions} from "vuex";
import {getTokenExp, isRole, isTokenExpired} from "@/common/http-common";
import {ACCESS_TOKEN} from "@/properties/close-friend";
import {httpMixin} from "@/mixin/http-mixin";

export default {
  name: 'StartMobile',
  mixins: [httpMixin],
  components: {},
  data() {
    return {
      buildInfo: {projectVersion: '1.0.0', buildNumber: 1},
      AGENCY_SOMNIUM
    };
  },
  created() {
    let urlPrefix = this.$route.params.urlPrefix
    if (urlPrefix) {
      console.log('urlPrefix', urlPrefix);
      this.$router.replace({name: 'Platform', params: {urlPrefix}});
    } else {
      this.checkTokenValidity(() => {
        let tokenExp = getTokenExp(ACCESS_TOKEN);
        if (tokenExp && !isTokenExpired(ACCESS_TOKEN)) {
          if (isRole('INFLUENCER')) {
            this.$router.replace({name: 'CreatorDashboardMobile'});
          } else {
            this.$router.replace({name: 'CustomerRouter'});
          }
        }
      });
    }

  },
  beforeMount() {
  },
  computed: {},
  methods: {
    ...mapActions(['setAgentName']),
    imageURL() {
      let baseURL = '../../../assets/images';
      if (this.isAgency(AGENCY_SOMNIUM)) {
        console.log(`${baseURL}/somnium_signup.png`);
        return `${baseURL}/somnium_signup.png`;
      } else {
        return `${baseURL}/hero-image.png`;
      }
    },
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
    }
  }
};
</script>

<style scoped>

html, body {
  overflow-x: auto;
}

@media (min-width: 320px) {
  .home-para {
    width: 100%;
  }
}

@media (min-width: 641px) {
  .home-para {
    width: 85%;
  }
}

</style>
