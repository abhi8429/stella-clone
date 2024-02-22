<template>
  <div>

    <header-help :is-loading="isLoading"></header-help>
    <section class="closefriend-hero background-white">
      <div class="container mt-3">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
            <div class="custom-card">
              <div class="pb-4">
                <h3 class="customer-subscribe-title text-center py-3 invisible">Subscription</h3>

                <!--                <div class="text-center">
                                  <img src="@/assets/images/sign-in-user.png" class="customer-subscribe-image" >
                                  <div style="white-space: nowrap;" class="font-black font-weight-600 py-3">@LexyPanterra</div>
                                </div>-->

                <global-message></global-message>
                <div class="text-center">
                  <img v-if="!isAvatarMissing" :src="imageURL" class="customer-subscribe-image" @error="imageLoadError">
                  <img v-else src="@/assets/images/default_user.png" class="customer-subscribe-image">
                  <div style="white-space: nowrap;" class="font-black font-weight-600 py-3">@{{ invitee.name }}</div>
                </div>
                <h2 class="join-title text-center">Join My {{ label }}</h2>
              </div>


              <SnapchatSub v-if="isSnapchat || isTikTok" :invitee="invitee" @monthly="monthly" />
              <InstagramSub v-else :invitee="invitee" @monthly="monthly" />

            </div>
          </div>
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 subsribe-button-margin subscribe-button-width mb-md-2">
            <div class="row justify-content-center mx-md-0 mx-1">
              <div class="col-md-11 col-11 px-1 ">
                <button type="button" class="btn btn-mobile btn-lg btn-block mt-3 btn-mobile font-size-15-18"
                  :class="buttonColor" @click="subscribe()" :disabled="paymentButtonClicked">Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--    -->

    <stripe-checkout v-if="show" ref="checkoutRef" :pk="pk" :sessionId="sessionId">
    </stripe-checkout>
  </div>
</template>

<script>

import { StripeCheckout } from '@vue-stripe/vue-stripe';
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import LoadingModal from "@/components/module/shared/LoadingModal";
import { mapActions } from "vuex";
import { customerAccountMixin } from "@/mixin/customer-account/customer-account-mixin";
import HeaderHelp from "@/components/module/influencer/shared/HeaderHelp";
import SnapchatSub from "@/components/module/customer/account/SnapchatSubscription";
import InstagramSub from "@/components/module/customer/account/InstagramSubscription";
import titleMixin from "../../../../mixin/title-mixin";
import { paymentCancelled, SUBSCRIPTION } from "@/common/analytics-service";

export default {
  name: 'SnapchatSubscription',
  title: 'Subscription',
  mixins: [customerAccountMixin, titleMixin],
  components: {
    GlobalMessage, StripeCheckout,
    LoadingModal, HeaderHelp, SnapchatSub, InstagramSub
  },
  data() {
    return {
      invitee: { name: '' },
      isMonthly: false,
      pk: "",
      sessionId: "",
      show: false,
      paymentButtonClicked: false,
    }
  },
  created() {
    this.invitee = this.getInvitee;
    this.loadAvatarImg(this.invitee.urlSuffix);
    if (this.$route.query.cancelled) {
      //If no name then it means, that user has not completed the sign up
      if (!this.getUser.name) {
        this.setMessage('PAYMENT.CANCELLED.RETRY.PASSWORD');
      } else {
        this.setMessage('PAYMENT.CANCELLED.RETRY');
      }
      paymentCancelled(this, SUBSCRIPTION, this.invitee);
      let clientReferenceId = this.$route.query.clientReferenceId;
      let URL = `payment/api/v1/stripe/checkout/cancel/${clientReferenceId}`
      this.postUnsecureData(URL, {}, (data) => {
      });
    } else if (this.$route.query.saved) {
      this.setMessage('SAVED.SUCCESSFULLY');
      this.$router.push({name: 'CustomerDirectMessage', params: {customerId:this.invitee.id}});
    }
  },
  methods: {
    /*...mapGetters(/!*['getInvitee']),*!/*/
    ...mapActions(['setMessage', 'setSource']),

    subscribe() {
      this.paymentButtonClicked = true;
      let putData = {
        influencerId: this.invitee.id,
        type: this.isMonthly ? 'MONTHLY' : 'ANNUALLY',
        price: this.isMonthly ? this.invitee.monthlyPrice : this.invitee.monthlyPrice * 10,
        influencerPlatformId: this.getInfluencerPlatformId,
        source: this.getSource
      }

      this.setSource(null);
      let URL = `subscription/api/v1/customers/${this.getUser.id}/subscriptions/`;
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
    },
    monthly(bool) {
      this.isMonthly = bool;
    }
  }
}

</script>
<style scoped>
@media (min-width: 1200px) {
  .subsribe-button-margin {
    margin-left: 13%;
  }

  .subscribe-button-width{

    flex: 0 0 auto;
    width: 73%;
  }
}
</style>


<!--<style scoped>
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
.btn.customer-pricing-toggle:not(:disabled):not(.disabled).active > .customer-pricing{
  color: #FFFA37;
}
.btn.customer-pricing-toggle:not(:disabled):not(.disabled).active > .per-month{
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
.form-outline {
  border: 1px solid #FFFA37 !important;
  border-radius: 18px;
}
.select-tags.active {
  background: #000;
  border: 0.2px solid #53535363;
  box-sizing: border-box;
  border-radius: 5px;
}
</style>-->
