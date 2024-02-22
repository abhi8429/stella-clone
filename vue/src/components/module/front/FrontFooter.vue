<template>
<!-- footer for desktop -->
<footer class="gradient-a">
<div class="footer d-md-block footer-bg">

  <div class="footer-top-coners"></div>
  <div class="container-fluid">
    <div class="row p-md-5 px-2 pb-4">

        <div class="col-md-6 col-12 d-block">
          <div class="mb-4 mt-3">
            <img class="img-fluid" style="width:100px; filter:invert(1)" src="@/assets/images/stella/logo-stella-white.png">
          </div>
          <div class="my-1 zoom-13">
            <button class="btn font-dark btn-outline-dark text-uppercase rounded-pill font-size-20">We would love</button>
          </div>
          <div class="my-1 ms-4 zoom-13">
            <span class="text-uppercase font-dark font-size-20">
              <span class="text-uppercase font-dark font-size-20 me-2">//</span>to hear From you!</span>
          </div>
        </div>

        <div class="col-md-6 col-12 d-flex align-items-center justify-content-end">
          <div class="my-1 ms-4 d-flex align-items-center">
            <span class="text-lowercase text-underline font-family-space-grotesk font-weight-bold font-dark d-none d-md-block font-size-50">hello@stella.so</span>
            <span class="text-lowercase text-underline font-family-space-grotesk font-weight-bold font-dark d-block d-md-none font-size-40">hello@stella.so</span>
            <div>
              <img class="img-fluid zoom-14" style="filter:invert(1)" src="@/assets/images/stella/arrow-right.png">
            </div>
          </div>
        </div>

    </div>

    <div class="row p-md-3">
        <div class="col-md-12 d-md-flex align-content-center justify-content-between px-3" >
            <div class="navbar navbar-expand-sm footer-border-top mt-md-0 mt-5">
              <div class="navbar-nav align-items-center flex-row" style="flex-flow:wrap;">
<!--                <a class="nav-item nav-link text-dark mx-2 btn" @click.prevent="faq">FAQ</a>-->
<!--                <a class="nav-item nav-link text-dark mx-2 btn" @click.prevent="about">About</a>-->
<!--                <a class="nav-item nav-link text-dark mx-2 btn" @click.prevent="blog">Blog</a>-->
<!--                <a class="nav-item nav-link text-dark mx-2" href="#">Press</a>-->
                <a class="nav-item nav-link text-dark mx-2" href="#">Privacy</a>
                <a class="nav-item nav-link text-dark mx-2 btn" @click.prevent="tos">Terms</a>
              </div>
            </div>


            <div class="navbar navbar-expand-sm">
              <div class="navbar-nav align-items-center flex-row flex-wrap">
                <a class="nav-item nav-link font-family-space-grotesk text-dark mx-2 d-md-block d-none" href="#">© Copyright 2021 Stella</a>
                <div class="nav-item nav-link d-flex">
                  <a class="nav-item nav-link text-white mx-2" href="#">
                    <span class="text-dark d-block d-md-none">Twitter</span>
                    <img class="img-fluid d-none d-md-block" src="@/assets/images/stella/footer-tw.png">
                  </a>
                  <a class="nav-item nav-link text-white mx-2" href="#">
                    <span class="text-dark d-block d-md-none">Instagram</span>
                    <img class="img-fluid d-none d-md-block" src="@/assets/images/stella/footer-ig.png">
                  </a>
                  <a class="nav-item nav-link text-white mx-2" href="#">
                    <span class="text-dark d-block d-md-none" >Discord</span>
                    <img class="img-fluid d-none d-md-block" src="@/assets/images/stella/footer-discord.png">
                  </a>
                </div>
                <a class="nav-item nav-link font-family-space-grotesk text-dark mx-2 d-md-none d-block" href="#">© Copyright 2021 Stella</a>
              </div>
            </div>

        </div>
      </div>
  </div>

</div>
</footer>
<!-- footer for desktop -->

</template>

<script>
export default {
  name: "FrontFooter",
  methods: {
    blog() {
      this.$router.push({name: 'BlogList'})
    },
    faq() {
      this.$router.push({name: 'FAQ'})
    },
    tos() {
      this.$router.push({name: 'TermsOfService'})
    },
    about() {
      this.$router.push({name: 'AboutPage'})
    }
  }
}
</script>

<style scoped>

</style>
