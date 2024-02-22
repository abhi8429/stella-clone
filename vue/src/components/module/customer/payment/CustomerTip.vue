<template>
  <div>

    <header-help :is-loading="isLoading"></header-help>
    <section class="closefriend-hero background-white">
      <div class="container mt-3">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
            <div class="custom-card">
              <div class="pb-4">
                <h4 class="text-center font-weight-bold py-3">Add a tip to support {{ invitee.name }}</h4>
                <global-message></global-message>
              </div>
              <div class="custom-body">

                <div class="row justify-content-center">

                  <div class="col-12 text-center">

                    <div class="btn-group btn-group-toggle flex-wrap" data-toggle="buttons">
                      <span class="btn select-tags" for="tip_25" :class="isActive(25)"
                            @click="selectedTip(25)">
                          <input type="radio" @click="selectedTip(25)"
                                 id="tip_25"
                                 name="radio-group">
                          <label for="tip_25">$ 25</label>
                      </span>
                      <span class="btn select-tags" for="tip_20" :class="isActive(20)"
                            @click="selectedTip(20)">
                                            <input type="radio"
                                                   id="tip_20"
                                                   name="radio-group">
                                            <label for="tip_20">$ 20</label>
                                        </span>
                      <span class="btn select-tags" for="tip_15" :class="isActive(15)"
                            @click="selectedTip(15)">
                                            <input type="radio"
                                                   id="tip_15"
                                                   name="radio-group">
                                            <label for="tip_15">$ 15</label>
                                        </span>
                      <span class="btn select-tags" for="tip_10" :class="isActive(10)"
                            @click="selectedTip(10)">
                                            <input type="radio"
                                                   id="tip_10"
                                                   name="radio-group">
                                            <label for="tip_10">$ 10</label>
                                        </span>
                    </div>
                  </div>

                  <div class="col-md-7 col-7 mt-4">
                    <div class="form-group text-center ">
                      <label for="" class="font-size-12 font-weight-bold">Custom Amount</label>
                      <div class="input-group dollar-text group-bg-white border-radius-0">
                        <div class="input-group-prepend border-0">
                          <div class="input-group-text border-0 font-grey group-bg-white">$</div>
                        </div>
                        <span class="danger ml-2" v-if="isRequired('amount')">This is required field</span>
                        <input type="number"
                               class="form-control border-0 pl-1 py-2 group-bg-white"
                               v-model="tip.amount">
                      </div>
                    </div>
                  </div>

                  <div class="col-md-7 col-11 mt-4">
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
              <div class="col-md-7 col-12 px-1 ">
                <button type="button"
                        class="btn btn-success btn-mobile btn-lg btn-block mt-3 font-size-20 py-3"
                        @click="donate()">
                  Donate
                </button>
              </div>
              <div class="col-md-12 col-12 px-1 text-center">
                <button type="button"
                        class="btn btn-bg-white-important mt-3 btn-outline-grey py-1 font-size-15-18"
                        @click="skip()">
                  Skip
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

import {mapActions, mapGetters} from 'vuex';
import {httpMixin} from "@/mixin/http-mixin";
import {StripeCheckout} from '@vue-stripe/vue-stripe';
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import LoadingModal from "@/components/module/shared/LoadingModal";
import HeaderHelp from "@/components/module/influencer/shared/HeaderHelp";
import {SERVICE_CONTENT, SERVICE_SUBSCRIPTION} from "@/properties/micro-service";
import {required} from "vuelidate/lib/validators";

export default {
  name: 'CustomerTip',
  mixins: [httpMixin],
  components: {GlobalMessage, LoadingModal, HeaderHelp, StripeCheckout},
  data() {
    return {
      invitee: {},
      tip: {},

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
    this.invitee = this.getInvitee();
    console.log('HERE....');
    this.setMessage('SAVED.SUCCESSFULLY');

    /*  if (this.$route.query.cancelled) {
        this.setMessage('Payment cancelled, do you want to retry?');
        let clientReferenceId = this.$route.query.clientReferenceId;
        let URL = `payment/api/v1/stripe/checkout/cancel/${clientReferenceId}`
        this.postUnsecureData(URL, {}, (data) => {
        });
      }*/
  },
  methods: {
    ...mapGetters(['getUser', 'getInvitee']),
    ...mapActions(['setMessage']),
    isRequired(attrib) {
      return this.isLoading && !this.$v.tip[attrib].required;
    },
    selectedTip(value) {
      this.$set(this.tip, 'amount', value);
      this.tip.amount = value;
    },
    isActive(value) {
      let tip = parseFloat(this.tip.amount);
      if (tip === value) {
        return 'active';
      } else {
        return '';
      }
    },
    skip() {
      let url = `${SERVICE_CONTENT}/api/v1/customers/${this.getUser().id}/content/available`;
      this.getData(url, (contentAvailable) => {
        //Check if their are contents, if yes, then show contents
        if (contentAvailable) {
          this.$router.replace({name: 'CustomerBonusContentList'});
        } else {
          this.$router.replace({name: 'CustomerDashboardMobile'});
        }
      });
    },
    donate() {

      this.isLoading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.tip.influencer = {id: this.invitee.id};
      this.tip.customer = {id: this.getUser().id};
      let url = `${SERVICE_SUBSCRIPTION}/api/v1/customers/${this.getUser().id}/tip`;
      this.postData(url, this.tip, (tip) => {
        this.tip = tip;
        let stripeCheckoutData = tip.transaction;

        let otherData = stripeCheckoutData.othersData;
        let status = stripeCheckoutData.status;
        this.pk = otherData.pk;
        this.sessionId = stripeCheckoutData.req.id;

        if (status === 'Success') {
          this.$router.replace({name: 'CustomerTipComplete', params: {tip: this.tip.amount}})
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
;
</script>

