<template>
  <div>

    <header-help :is-loading="isLoading"></header-help>
    <section class="closefriend-hero background-white">
      <div class="container mt-3">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
            <div class="custom-card">
              <div class="pb-4">
                <h3 class="customer-subscribe-title text-center py-3">Subscription</h3>
                <global-message></global-message>
                <div class="text-center">
                  <img v-if="!isAvatarMissing"
                       :src="imageURL"
                       class="customer-subscribe-image" @error="imageLoadError">
                  <img v-else src="@/assets/images/default_user.png" class="customer-subscribe-image">
                  <div style="white-space: nowrap;" class="font-black font-weight-600 py-3">@{{ invitee.name }}</div>
                </div>

              </div>
              <div class="custom-body">

                <div class="btn-group btn-group-toggle closefriends-payment-plans" data-toggle="buttons">
                  <label class="btn btn-outline customer-pricing-toggle" @click="isMonthly = true">
                    <input type="radio" name="options" id="option1">
                    <!--                    <h3 class="customer-subscribe-title text-center d-md-block d-none">Subscription</h3>-->
                    <button class="btn btn-bg-light-green font-green font-size-12 border-radius-6 px-3 mb-2 invisible">
                      50% OFF
                    </button>
                    <span class="customer-pricing justify-content-center">$<h1>{{ invitee.monthlyPrice }}</h1></span>
                    <p class="font-grey">Charged Monthly</p>
                    <!--                    <button class="btn btn-bg-grey font-black font-size-16 btn-block font-weight-600 border-radius-6 d-md-block d-none"
                                                @click="subscribe(true)">Subscribe</button>-->
                  </label>
                  <label class="btn btn-outline customer-pricing-toggle active order-first order-md-last"
                         @click="isMonthly = false">
                    <input type="radio" name="options" id="option1">
                    <!--                    <h3 class="customer-subscribe-title text-center d-md-block d-none">Subscription</h3>-->
                    <button class="btn btn-bg-light-green font-green font-size-12 border-radius-6 px-3 mb-2">2 Months
                      Discount
                    </button>
                    <span class="customer-pricing justify-content-center">$<h1>{{
                        invitee.monthlyPrice * 10
                      }}</h1></span>
                    <p class="font-grey">Charged Annually</p>
                    <!--                    <button class="btn btn-bg-grey font-black font-size-16 btn-block font-weight-600 border-radius-6 d-md-block d-none"
                                        @click="subscribe(false)">Subscribe</button>-->
                  </label>
                </div>
                <!--<div class="text-center font-size-14 pt-4 font-weight-600">
                  Exclusive Poster - only a few remaining!
                </div>-->
              </div>
            </div>
          </div>

          <div
            class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3 position-bottom mb-md-2">
            <div class="row justify-content-center mx-md-0 mx-1">
              <div class="col-md-12 col-12 px-1 ">
                <button type="button"
                        class="btn btn-success btn-mobile btn-lg btn-block mt-3 btn-mobile font-size-15-18"
                        @click="subscribe()"
                        :disabled="paymentButtonClicked">Pay by stripe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <stripe-checkout
      v-if="show"
      ref="checkoutRef"
      :pk="pk"
      :sessionId="sessionId"
    >
    </stripe-checkout>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import {httpMixin} from "@/mixin/http-mixin";
import {StripeCheckout} from '@vue-stripe/vue-stripe';
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import LoadingModal from "@/components/module/shared/LoadingModal";
import HeaderHelp from "@/components/module/influencer/shared/HeaderHelp";
import {SERVICE_CONTENT} from "@/properties/micro-service";

export default {
  name: 'CustomerSubscriptionMobile',
  mixins: [httpMixin],
  components: {GlobalMessage, StripeCheckout, LoadingModal, HeaderHelp},
  data() {
    return {
      invitee: {},
      isMonthly: false,
      pk: "",
      sessionId: "",
      show: false,
      paymentButtonClicked: false,
      imageURL: '',
      isAvatarMissing: false,
    }
  },
  created() {
    this.invitee = this.getInvitee();
    this.loadAvatarImg();
    if (this.$route.query.cancelled) {
      this.setMessage('Payment cancelled, do you want to retry?');
      let clientReferenceId = this.$route.query.clientReferenceId;
      let URL = `payment/api/v1/stripe/checkout/cancel/${clientReferenceId}`
      this.postUnsecureData(URL, {}, (data) => {
      });
    }
  },
  methods: {
    ...mapGetters(['getUser', 'getInvitee']),
    ...mapActions(['setMessage']),
    imageLoadError(event) {
      this.isAvatarMissing = true;
    },
    loadAvatarImg() {
      let url = `${SERVICE_CONTENT}/api/v1/influencers/urlSuffix/${this.invitee.urlSuffix}/avatar`;
      this.getUnSecureData(url, (imageURL) => {
        this.imageURL = imageURL.replace('dp', 'dp_150X150');
        this.isAvatarMissing = false;
      });
    },
    subscribe() {
      this.paymentButtonClicked = true;
      let putData = {
        influencerId: this.invitee.id,
        type: this.isMonthly ? 'MONTHLY' : 'ANNUALLY',
        price: this.isMonthly ? this.invitee.monthlyPrice : this.invitee.monthlyPrice * 10
      }

      let URL = `subscription/api/v1/customers/${this.getUser().id}/subscriptions/`
      this.postUnsecureData(URL, putData, (data) => {
        let customerSubscription = data;
        let subscriptionId = customerSubscription.id;
        let URL = `payment/api/v1/stripe/subscription/${subscriptionId}`
        console.log('subscriptionId', subscriptionId);
        this.postUnsecureData(URL, {}, (stripeCheckoutData) => {
          // this.$router.replace({name: 'CustomerStripeCheckout', params: {customerSubscription, stripeCheckoutData}})
          this.pk = stripeCheckoutData.othersData.pk;
          this.sessionId = stripeCheckoutData.req.id;
          console.log(stripeCheckoutData);
          this.show = true;
          this.$nextTick(() => {
            this.$refs.checkoutRef.redirectToCheckout();
          });
          // this.$router.push({name: 'CustomerStripeCheckout', params: {pk: this.pk}});
        });
      })
    }
  }
}
;
</script>

<style type="text/css">
@media (min-width: 320px) and (max-width: 575px) { 
  .closefriends-payment-plans{
    transform: scale(0.7);
  }
}
</style>