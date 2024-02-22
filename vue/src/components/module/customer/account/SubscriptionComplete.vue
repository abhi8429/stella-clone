<template>

  <div>

    <header-help :is-loading="isLoading"></header-help>
    <section class="closefriend-hero background-white">
      <div class="container mt-5">
        <div class="container mt-5">
          <global-message></global-message>
          <br>
        </div>
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
            <div class="custom-card">
              <div class="custom-body">
                <div class="pb-md-0 pb-3 mb-3">
                  <div class="form-block p-0 p-md-2">
                    <div class="row py-3 mx-1">
                      <div class="col-md-12 col-12">
                        <div class="congrets-center">
                          <div class="text-center">
                            <img class="customer-subscribe-image invisible">
                            <div style="white-space: nowrap;" class="font-black font-weight-600 py-3">
                              @{{ inviteeName }}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div class="row py-md-3 mx-1 pb-0">
                      <div class="col-md-12 col-12 vertical-center justify-content-md-start mt-md-0 mt-3 p-0">
                        <div class="row px-1 checkout-form m-0 p-0">
                          <div class="col-md-12 text-center">
                            <img src="@/assets/images/congrets.png"
                                 :style="(isSnapchat || isTikTok)?  'filter: invert(0%) saturate(0%) hue-rotate(159deg) brightness(75%) contrast(1000%);' : '' ">
                            <h1>Congrats!</h1>
                            <h5 class="font-size-14">You’re subscribed to {{ inviteeName }}!</h5>
                            <p class="font-size-12 font-grey">@{{ inviteeName }} has been notified and it typically
                              takes 24-48 hours to add you to their private {{ label }}! You can view more content while
                              you
                              wait to be added:</p>
                          </div>
                          <div class="col-md-12 py-0 mx-md-0 px-3">
                            <button type="button"
                                    class="btn btn-block btn-lg btn-block mt-md-3 mt-3 font-size-16 btn-mobile btn-payment"
                                    :class="buttonColor"
                                    @click="onContinue()">Continue
                            </button>
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

    <!-- Custom request -->
    <!-- New  -->
    <model-customer-custom-request-submit
      ref="customRequestConfirm"
      @savedCustomRequest="(customRequest) => {
        $refs.customRequestDone.show(customRequest);
     }"
      @submittedCustomRequestOption="(customRequest) => {
        $refs.customRequestOption.show(customRequest, getUser().id);
      }"/>

    <model-customer-custom-request-option-info
      ref="customRequestOption"
      @savedCustomRequestOption="(customRequest) => {
        if(customRequest.status === CR_STATUS_ACCEPTED){
               $refs.customRequestAccepted.show(customRequest);
            } else if(customRequest.status === CR_STATUS_READY) {
               $refs.customRequestDone.show(customRequest, true);
            }
      }"
      @back="() => {
         $refs.customRequestConfirm.simpleShow();
      }"
    />

    <model-customer-custom-request-accepted ref="customRequestAccepted"/>

    <model-customer-custom-request-done
      ref="customRequestDone" @doneCustomRequest="() => {
        $router.replace({name: 'CustomerCustomRequestList'});
      }"/>

  </div>

</template>

<script>
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import LoadingModal from "@/components/module/shared/LoadingModal";
import {mapActions, mapGetters} from "vuex";
import HeaderHelp from "@/components/module/influencer/shared/HeaderHelp";
import {customerAccountMixin} from "@/mixin/customer-account/customer-account-mixin";
import {isSuffixCustomRequest} from "@/common/comm-service";
import ModelCustomerCustomRequestConfirm
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestConfirm";
import ModelCustomerCustomRequestDone from "@/components/module/customer/custom-request/ModelCustomerCustomRequestDone";
import ModelCustomerCustomRequestSubmit
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestSubmit";
import ModelCustomerCustomRequestOptionInfo
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestOptionInfo";
import {CR_STATUS_ACCEPTED, CR_STATUS_READY} from "@/properties/custom-request-status";
import ModelCustomerCustomRequestAccepted
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestAccepted";
import titleMixin from "../../../../mixin/title-mixin";
import {paymentPaid, SUBSCRIPTION} from "@/common/analytics-service";

export default {

  name: "SubscriptionComplete",
  mixins: [customerAccountMixin, titleMixin],
  title: 'Subscription complete',
  components: {
    GlobalMessage, LoadingModal, HeaderHelp,
    ModelCustomerCustomRequestConfirm,
    ModelCustomerCustomRequestDone,
    ModelCustomerCustomRequestSubmit,
    ModelCustomerCustomRequestOptionInfo,
    ModelCustomerCustomRequestAccepted
  },
  data() {
    return {
      inviteeName: '',

      CR_STATUS_ACCEPTED,
      CR_STATUS_READY
    }
  },
  computed: {
    ...mapGetters(['getInvitee', 'getRedirectedFrom']),
    isSuffixCustomRequest() {
      return isSuffixCustomRequest(this.getRedirectedFrom);
    },
  },
  created() {
    this.inviteeName = this.getInvitee.name;
    /*console.log('HERE....');
    this.setMessage('SAVED.SUCCESSFULLY');*/

    /*   if (this.$route.query.cancelled) {
         this.setMessage('Payment cancelled, do you want to retry?');
         let clientReferenceId = this.$route.query.clientReferenceId;
         let URL = `payment/api/v1/stripe/checkout/cancel/${clientReferenceId}`
         this.postUnsecureData(URL, {}, (data) => {
         });
       }*/
  },
  mounted() {
    paymentPaid(this, SUBSCRIPTION, this.getInvitee);
  },
  methods: {
    ...mapActions(['setMessage']),
    onContinue() {
      if (this.isSuffixCustomRequest) {
        this.submitCustomRequest(this.invitee);
      } else {
        this.$router.replace({name: 'TipPayment'});
      }
    },
    submitCustomRequest(influencer) {
      this.$refs.customRequestConfirm.show(influencer.id, this.getUser().id, influencer.customRequestMinPrice);
    },
  }
}
</script>

<style scoped>

.alert-snapchat-danger {
  border: 0;
  border-radius: 0;
  background: #FF7D7D;
}

.custom-control-label::before {
  background: transparent;
  border: 2px solid black;
}

.btn.customer-pricing-toggle:not(:disabled):not(.disabled).active {
  border: 2px solid #ff7d7d;
  background: #000;
}

.btn.customer-pricing-toggle:not(:disabled):not(.disabled).active > .customer-pricing {
  color: #FFFA37;
}

.btn.customer-pricing-toggle:not(:disabled):not(.disabled).active > .per-month {
  color: #FF7D7D !important;
  opacity: 0.5;
}

.btn.customer-pricing-toggle:not(:disabled):not(.disabled) {
  border: 2px solid #000;
}

.btn.focus, .btn:focus {
  outline: 0;
  box-shadow: none;
}
/*
.form-outline {
  border: 1px solid #FFFA37 !important;
  border-radius: 18px;
}
*/
.select-tags.active {
  background: #000;
  border: 0.2px solid #53535363;
  box-sizing: border-box;
  border-radius: 5px;
}
</style>
