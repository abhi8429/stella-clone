<template>
<section class="w-100 front-section">
  <div class="container-fluid hv-100">

    <div class="row p-md-4 pb-md-0 p-3" style="overflow-x:hidden;">
      <div class="border-around-rounded p-3">
        <FrontHeader></FrontHeader>

        <div class="py-5 invisible">&nbsp;</div>

        <div class="row justify-content-center">
          <div class="col-md-5 col-12">

          <div class="d-block text-center">
            <h3 class="text-white font-family-poppins mb-4">Frequently Asked questions</h3>
            <p class="font-grey font-size-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet volutpat quam. Etiam quis quam diam. Quisque ut diam maximus, rutrum ipsum non, semper ipsum. </p>
          </div>

          <div class="py-2 invisible">&nbsp;</div>


          <div id="accordion" class="faq-accordion">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <div class="font-grey" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Is it free to use?
                  </div>
                </h5>
              </div>

              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header" id="headingTwo">
                <h5 class="mb-0">
                  <div class="font-grey collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Returns and Refunds
                  </div>
                </h5>
              </div>
              <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-header" id="headingThree">
                <h5 class="mb-0">
                  <div class="font-grey collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    What is your returns policy?
                  </div>
                </h5>
              </div>
              <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
          </div>






          </div>
        </div>
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
  name: 'FAQ',
  title: 'FAQ',
  mixins: [titleMixin],
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
