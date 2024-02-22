<template>
  <div class="row">
        <div class="col-md-12 d-md-flex d-none align-content-center justify-content-between px-3" >

        <!--        <a class="navbar-brand" href="#" @click="home()">-->
        <router-link class="navbar-brand" :to="{name: 'HomePage'}" replace>
          <img src="@/assets/images/stella/logo-stella-white.png" class="img-fluid"
               style="margin-right: 100px; display: inline; pointer-events: none;">
        </router-link>
        <!--        </a>-->

        </div>

    <loading-modal :is-loading="isLoading"></loading-modal>
  </div>
</template>

<script>
import {isRole} from "@/common/http-common";
import LoadingModal from "@/components/module/shared/LoadingModal";

export default {
  name: "HeaderHelp",
  props: ['isLoading'],
  components: {LoadingModal},
  methods: {
    doIt() {
      console.log('there');
    },
    home() {
      this.$router.replace({name: 'HomePage'});
    },
    help() {
      if (isRole('INFLUENCER')) {
        this.$router.push({name: 'HelpMobile'})
      }
    }
  }
}
</script>

<style scoped>

</style>
