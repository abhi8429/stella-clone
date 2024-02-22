<template>
  <div>
    <header-help :is-loading="isLoading"></header-help>
    <section class="closefriend-hero background-white">
      <div class="container mt-3">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
            <div class="custom-card">
              <div class="pb-4">
                <h4 class="text-center font-weight-bold py-3">Add a tip to support {{ invitee.name }}?</h4>
                <global-message></global-message>
              </div>
              <div class="custom-body">
                <div class="row justify-content-center">
                  <div class="col-12 text-center">
                    <div class="btn-group btn-group-toggle flex-wrap" data-toggle="buttons">
                      <span :class="isActive(25)" class="btn select-tags" for="option1"
                            @click="selectedTip(25)">
                                            <input type="radio" id="option1" name="radio-group">
                                            <label for="option1">$ 25</label>
                                        </span>
                      <span class="btn select-tags" for="option2" :class="isActive(20)"
                            @click="selectedTip(20)">
                                            <input type="radio" id="option2" name="radio-group">
                                            <label for="option2">$ 20</label>
                                        </span>
                      <span class="btn select-tags" for="option3" :class="isActive(15)"
                            @click="selectedTip(15)">
                                            <input type="radio" id="option3" name="radio-group">
                                            <label for="option3">$ 15</label>
                                        </span>
                      <span class="btn select-tags" for="option4" :class="isActive(10)"
                            @click="selectedTip(10)">
                                            <input type="radio" id="option4" name="radio-group">
                                            <label for="option4">$ 10</label>
                                        </span>
                    </div>
                  </div>

                  <div class="col-md-7 col-7 mt-4">
                    <div class="form-group text-center ">
                      <label for="" class="font-size-12 font-weight-bold">Custom Amount</label>
                      <span class="danger ml-2" v-if="isRequired('amount')">This is required field</span>
                      <div class="input-group dollar-text group-bg-white border-radius-0">
                        <div class="input-group-prepend border-0">
                          <div class="input-group-text border-0 font-grey group-bg-white">$</div>
                        </div>
                        <input type="number"
                               class="form-control border-0 pl-1 py-2 group-bg-white"
                               v-model="tip.amount">
                      </div>
                    </div>
                  </div>

                  <div class="col-md-7 col-11 mt-4 px-3">
                    <textarea
                      class="form-control border-radius-0 py-2"
                      rows="4"
                      placeholder="Donation Message"
                      v-model="tip.message"></textarea>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div
            class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3 mb-md-2">
            <div class="row justify-content-center mx-md-0 mx-1">
              <div class="col-md-7 col-12 px-3">
                <button type="button" :class="buttonColor"
                        class="btn btn-mobile btn-lg btn-block mt-3 font-size-20 py-3"
                        @click="donate()">Donate
                </button>
              </div>
              <div class="col-md-12 col-12 px-1 text-center">
                <button type="button" :class="isSnapchat? 'btn-outline-grey bg-yellow' : 'btn-bg-white-important'"
                        class="btn  mt-3 btn-outline-grey py-1 font-size-15-18"
                        v-if="!$route.query.donate"
                        @click="skip()">Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <stripe-checkout
      v-if="isShow"
      ref="checkoutRef"
      :pk="pk"
      :sessionId="sessionId"
    />

  </div>
</template>

<script>

import {StripeCheckout} from '@vue-stripe/vue-stripe';
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import LoadingModal from "@/components/module/shared/LoadingModal";
import {customerAccountMixin} from "@/mixin/customer-account/customer-account-mixin";
import {required} from "vuelidate/lib/validators";
import {mapActions} from "vuex";
import {SERVICE_SUBSCRIPTION} from "@/properties/micro-service";
import HeaderHelp from "@/components/module/influencer/shared/HeaderHelp";
import titleMixin from "../../../../mixin/title-mixin";

export default {
  name: 'TipPayment',
  title: 'Tip payment',
  mixins: [customerAccountMixin, titleMixin],
  components: {GlobalMessage, LoadingModal, StripeCheckout, HeaderHelp},
  data() {
    return {
      invitee: {},
      tip: {},
      isSubmit: false,
      pk: "",
      sessionId: "",
      isShow: false,
      paymentButtonClicked: false,
    }
  },
  validations: {
    tip: {
      amount: {required}
    }
  },
  created() {
    this.invitee = this.getInvitee;
  },
  methods: {
    // ...mapGetters(['getInvitee', 'getCreatePlatform']),
    ...mapActions(['setMessage']),
    isRequired(attrib) {
      return this.isSubmit && !this.$v.tip[attrib].required;
    },
    selectedTip(value) {
      this.$set(this.tip, 'amount', value);
      this.tip.amount = value;
    },
    isActive(value) {
      let tip = parseFloat(this.tip.amount);
      if (tip === value) {
        return `active ${this.buttonColor}`;
      } else {
        return '';
      }
    },
    skip() {
      let donate = this.$route.query.donate;
      if (this.getCreatePlatform || donate) {
        this.showCustomerContent();
      } else {
        this.$router.replace({name: 'CreateAccountComplete'});
      }
    },
    donate() {
      this.isSubmit = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      console.log('donete');
      this.tip.influencer = {id: this.invitee.id};
      this.tip.customer = {id: this.getUser.id};
      let url = `${SERVICE_SUBSCRIPTION}/api/v1/customers/${this.getUser.id}/tip`;
      this.postData(url, this.tip, (tip) => {
        this.tip = tip;
        let stripeCheckoutData = tip.transaction;

        let otherData = stripeCheckoutData.othersData;
        let status = stripeCheckoutData.status;
        this.pk = otherData.pk;
        this.sessionId = stripeCheckoutData.req.id;

        if (status === 'Success') {
          this.$router.replace({name: 'TipComplete', params: {tip: this.tip.amount}})
        } else if (status === 'InProgress') {
          this.pushGlobalError(otherData.offlineCheckoutError);
          setTimeout(() => {
            this.isShow = true;
            this.$nextTick(() => {
              this.$refs.checkoutRef.redirectToCheckout();
            });
          }, 2000);
        }
      });

    }
  }
}
</script>

<style scoped>

.btn.customer-pricing-toggle:not(:disabled):not(.disabled) {
  border: 2px solid #000;
}

.btn.focus, .btn:focus {
  outline: 0;
  box-shadow: none;
}

.select-tags.active {
  background: #000;
  border: 0.2px solid #53535363;
  box-sizing: border-box;
  border-radius: 5px;
}
</style>



