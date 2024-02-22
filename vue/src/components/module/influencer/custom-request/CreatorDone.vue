<template>
  <div class="container-fluid hv-100">
    <div class="row  p-md-4 pb-md-0 h-100">

      <div class="col-lg-4 col-12 mx-auto">

        <!--        <div class="small-device-img-class">-->
        <!--          <img class="img-fluid mt-5" src="@/assets/images/stella/logo-stella-white.png">-->
        <!--        </div>-->
        <logo></logo>
        <div
          :class="isDigis?'text-dark font-size-16 font-family-poppins mt-5':'text-white font-size-16 font-family-poppins mt-5'">
          <span
            :class="isDigis?'text-dark font-size-20 font-weight-500':'text-white font-size-20'">You’re all done!</span>
        </div>

        <div
          :class="isDigis?'text-dark font-size-12 font-family-poppins mt-1':'text-white font-size-12 font-family-poppins mt-1'">
          <span :style="isDigis?'color:#000':'color: #b2b2b2'" class="font-size-16 font-weight-500">
            Copy and share your profile with this link {<span id="url-suffix"
                                                              :style="isDigis?'color:#b2a0e2':'color:#ff6ec7'">{{ youLink }}</span>}
          </span>
        </div>

        <button :class="isDigis?'gradient-new-class-digis mt-3 text-white':'gradient-new-class mt-3'"
                @click="copyLink('url-suffix')">{{copyLabel}} Link
        </button>
        <p class="mt-3" :style="isDigis?'color:#b2a0e2':'color:#ff6ec7'"
           @click="goToDashboard()">Go To Dashboard</p>
      </div>

    </div>
  </div>
</template>
<script>
import Logo from "@/components/module/shared/Logo";
import {mapActions, mapGetters} from "vuex";
import {constructCustomerURL} from "@/common/baseURL-service";

export default {
  name: 'CreatorDone',
  components: {Logo},
  data() {
    return {
      copied: false,
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    youLink() {
      return constructCustomerURL(this.getUser.urlSuffix);
    },
    copyLabel() {
      return this.copied ? 'Copied' : 'Copy';
    }
  },
  methods: {
    ...mapActions(['setAgentName']),
    copyLink(id) {
      this.copied = true;
      let copyText = document.getElementById(id);
      let textArea = document.createElement("textarea");
      textArea.value = copyText.textContent.trim();
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      document.execCommand("Copy");
      textArea.remove();

      setTimeout(() => {
        this.copied = false;
      }, 2000);
    },
    goToDashboard() {
      this.setAgentName(null);
      this.$router.replace({name: 'CreatorDashboardMobile'})
    },
  }

}
</script>


<style scoped>
/*for small mobile device under with 375px*/

@media only screen and (max-width: 378px) {

  .small-device-img-class {
    margin-top: 7rem;
  }

}

@media only screen and (min-width: 380px) {

  .small-device-img-class {
    margin-top: 7rem;
  }

}

@media only screen and (min-width: 380px) and (max-width: 568px) {

  .small-device-img-class {
    margin-top: 15rem;
  }

}

</style>
