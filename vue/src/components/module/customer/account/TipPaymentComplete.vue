<template>
  <div>

    <header-help :is-loading="isLoading"></header-help>

    <section class="closefriend-hero background-white">
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
            <div class="custom-card">
              <div class="custom-body">
                <div class="form-outline pb-md-0 pb-3 mb-3" >
                  <div class="form-block p-0 p-md-2">
                    <div class="row py-3 mx-1">
                      <div class="col-md-12 col-12">
                        <div class="congrets-center">
                          <div class="text-center">
<!--                            <img src="@/assets/images/" class="customer-subscribe-image invisible" >-->
                            <div style="white-space: nowrap;" class="font-black font-weight-600 py-3">@{{invitee.name}}</div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div class="row py-md-3 mx-1 pb-0">
                      <div class="col-md-12 col-12 vertical-center justify-content-md-start mt-md-0 mt-3 p-0">
                        <div class="row px-1 checkout-form m-0 p-0">
                          <div class="col-md-12 text-center">
                            <img src="@/assets/images/congrets.png"
                                 :style="(isSnapchat || isTikTok)? 'filter: invert(0%) saturate(0%) hue-rotate(159deg) brightness(75%) contrast(1000%);' : ''">
                            <h1>Awesome!</h1>
                            <h5 class="font-size-14">You donate ${{this.$route.params.tip}} to {{invitee.urlSuffix}}!</h5>
                            <p class="font-size-12 font-grey">@{{invitee.urlSuffix}} has been notified of your generous donation and support!</p>
                          </div>
                          <div class="col-12 col-md-12 my-3 invisible"></div>
                          <div class="col-md-12 p-0 mx-md-0 mx-3">
                            <button type="button" class="btn btn-block btn-lg btn-block mt-md-3 mt-3 font-size-16 btn-mobile  btn-payment"
                            :class="buttonColor"
                            @click="finish()">Finish</button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
<!--    -->

  </div>
</template>

<script>

import {mapActions} from 'vuex';
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import LoadingModal from "@/components/module/shared/LoadingModal";
import HeaderHelp from "@/components/module/influencer/shared/HeaderHelp";
import {igValidationMixin} from "@/mixin/ig-validation-mixin";
import {customerAccountMixin} from "@/mixin/customer-account/customer-account-mixin";
import titleMixin from "../../../../mixin/title-mixin";
import {paymentPaid, TIP} from "@/common/analytics-service";

export default {
  name: 'TipPaymentComplete',
  title: 'Tip payment complete',
  mixins: [igValidationMixin, customerAccountMixin, titleMixin],
  components: {GlobalMessage, LoadingModal, HeaderHelp},
  data() {
    return {
      invitee: {name: ''},
    }
  },
  created() {
    this.invitee = this.getInvitee;
    this.setMessage('PAYMENT.SUCCESSFUL');
  },
  mounted() {
    paymentPaid(this, TIP, this.invitee);
  },
  methods: {
    ...mapActions(['setMessage']),
    finish() {

      let donate = this.$route.query.donate;
      if (this.getCreatePlatform || donate) {
        this.showCustomerContent();
      } else {
        this.$router.replace({name: 'CreateAccountComplete'});
      }
    }
  }
}
;
</script>

