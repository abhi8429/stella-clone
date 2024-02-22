<template>
<section class="w-100 front-section">
  <div class="container-fluid hv-100">

    <div class="row p-md-4 pb-md-0 p-3" style="overflow-x:hidden;">
      <div class="border-around-rounded p-3">
        <FrontHeader></FrontHeader>

        <div class="py-md-5 py-3 invisible">&nbsp;</div>

        <div class="row justify-content-center">
          <div class="col-md-5 col-12">

            <div class="blog-list">

              <!-- blog post 1 -->
              <div class="blog-block mb-3" >

                <div class="d-block text-center">
                  <p class="font-grey font-size-14 mb-2">Oct 25th</p>
                  <h3 class="text-white font-family-poppins mb-2">New Branding Release</h3>
                  <p class="font-grey font-size-14 mb-md-2 mb-4">Expanding our focus to help teams come together in new ways.</p>
                </div>

                <img src="@/assets/images/stella/front/blog-2.png" class="img-fluid mb-3">

                <div class="text-white font-size-20 mb-3">This is a headline</div>
                <p class="font-grey font-family-poppins font-size-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus urna vel viverra tristique. Nulla at efficitur lectus. Ut congue interdum diam quis faucibus. </p>
                <p class="font-grey font-family-poppins font-size-12">Etiam vitae dolor at erat iaculis tempor. Ut nec leo vel arcu egestas molestie in quis velit. Cras ultrices pretium purus, nec lobortis elit tincidunt vitae. Suspendisse fringilla nunc vitae semper rutrum. Ut fringilla tincidunt urna, porta porta mi tristique eget.</p>

                <div class="d-flex h-100 align-items-end" style="width:150px">
                  <p class="font-grey font-family-poppins font-size-10 me-2">Read more</p>
                  <p class="mb-2 pb-1">
                    <img src="@/assets/images/stella/front/arrow-simple-right.png" class="img-fluid zoom-5">
                  </p>
                </div>
              </div>
              <!-- blog post 1 -->

              <!-- blog post 2 -->
              <div class="blog-block mb-3" >
                <div class="d-block text-center">
                  <p class="font-grey font-size-14 mb-2">Oct 25th</p>
                  <h3 class="text-white font-family-poppins mb-2">New Branding Release</h3>
                  <p class="font-grey font-size-14 mb-md-2 mb-4">Expanding our focus to help teams come together in new ways.</p>
                </div>

                <img src="@/assets/images/stella/front/blog-1.png" class="img-fluid mb-3">

                <div class="text-white font-size-20 mb-3">This is a headline</div>
                <p class="font-grey font-family-poppins font-size-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus urna vel viverra tristique. Nulla at efficitur lectus. Ut congue interdum diam quis faucibus. </p>
                <p class="font-grey font-family-poppins font-size-12">Etiam vitae dolor at erat iaculis tempor. Ut nec leo vel arcu egestas molestie in quis velit. Cras ultrices pretium purus, nec lobortis elit tincidunt vitae. Suspendisse fringilla nunc vitae semper rutrum. Ut fringilla tincidunt urna, porta porta mi tristique eget.</p>

                <div class="d-flex h-100 align-items-end" style="width:150px">
                  <p class="font-grey font-family-poppins font-size-10 me-2">Read more</p>
                  <p class="mb-2 pb-1">
                    <img src="@/assets/images/stella/front/arrow-simple-right.png" class="img-fluid zoom-5">
                  </p>
                </div>
              </div>
              <!-- blog post 2 -->


            </div>


          </div>
        </div>



        <div class="py-5 invisible d-md-block d-none">&nbsp;</div>



      </div>



    </div>

  </div>
  <FrontFooter></FrontFooter>
</section>


</template>

<script>

import FrontHeader from '@/components/module/front/FrontHeader'
import FrontFooter from '@/components/module/front/FrontFooter'
import titleMixin from "../../../mixin/title-mixin";


export default {
  name: 'BlogList',
  title: 'Blogs',
  mixins:[titleMixin],
  components: {FrontFooter,FrontHeader},
  created() {
  },
  beforeMount() {
  },
  computed: {},
  methods: {
  }
};
</script>

<style scoped>
</style>
