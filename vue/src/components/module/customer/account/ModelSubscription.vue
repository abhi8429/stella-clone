<template>
  <div class="modal" id="subscribe_modal" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content stella-modal">
        <div class="modal-body text-center py-4">
          <div class="modal-width-340">

            <div class="creator-img rounded-circle">
              <img v-if="imageURL"
                   :src="imageURL"
                   class="img-fluid">
              <img v-else
                   class="img-fluid"
                   src="@/assets/images/default_user.png">
            </div>
            <div class="d-flex justify-content-between">
              <div class="text-white font-size-24">Subscribe to
                <div class="font-gradient-a font-family-space-grotesk font-size-24">
                  {{ invitee.name ? `@${invitee.name}` : '' }}
                </div>
              </div>
              <div>
                <img @click="close()" class="img-fluid float-end d-block zoom-12 menu-close"
                     src="@/assets/images/stella/close.png">
              </div>
            </div>
            <model-global-message
              :global-errors="globalErrors"
              :message="message"
              @clearMessages="clearMessages()"/>
            <div class="text-start font-dark-grey font-size-18 my-3">
              before submitting a custom request
            </div>


            <!-- select custom request  -->
            <div>
              <div class="w-100 btn-group-vertical" role="group">
                <button
                  type="button"
                  class="btn btn-custom-request subscribe"
                  :class="!isMonthly? 'active' : ''"
                  @click="isMonthly = false">
                  <span class="font-size-18" :class="!isMonthly? 'text-black' : 'text-white'">12 months</span>
                  <span>
                  <span class="rounded-pill price-discount">50% OFF</span>
                </span>
                  <span class="plan-amount font-size-20">${{ invitee.monthlyPrice * 10 }}</span>
                </button>
                <button
                  type="button"
                  class="btn btn-custom-request subscribe"
                  :class="isMonthly? 'active' : ''"
                  @click="isMonthly = true">
                  <span class="font-size-18" :class="isMonthly? 'text-black' : 'text-white'">Per month</span>
                  <span class="plan-amount font-size-20">${{ invitee.monthlyPrice }}</span>
                </button>
              </div>

              <div class="row my-4">
                <div class="col-12">
                  <!-- to disable button add this class -> "btn-disabled" -->
                  <button @click="subscribe()"
                          class="btn stella-btn btn-lg gradient-a w-100 rounded-pill font-weight-700"
                          :disabled="paymentButtonClicked">Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <stripe-checkout
      v-if="isShow"
      ref="checkoutRef"
      :pk="pk"
      :sessionId="sessionId"
    >
    </stripe-checkout>

  </div>

</template>

<script>
import {modelHttpMixin} from "@/mixin/model-http-mixin";
import {mapActions, mapGetters} from "vuex";
import ModelGlobalMessage from "@/components/module/shared/ModelGlobalMessage";
import {StripeCheckout} from "@vue-stripe/vue-stripe";

export default {
  name: "ModelSubscription",
  props: ['imageURL', 'invitee'],
  mixins: [modelHttpMixin],
  components: {ModelGlobalMessage, StripeCheckout},
  data() {
    return {
      isShow: false,
      isMonthly: false,
      pk: "",
      sessionId: "",
      paymentButtonClicked: false
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getInfluencerPlatformId'])
  },
  methods: {
    ...mapActions(['setMessage']),
    show() {
      $('#subscribe_modal').modal();
    },
    hide() {
      $('#subscribe_modal').modal('hide');
    },
    close() {
      if (!this.paymentButtonClicked) {
        this.hide();
      }
    },
    subscribe() {

      this.paymentButtonClicked = true;
      let putData = {
        influencerId: this.invitee.id,
        type: this.isMonthly ? 'MONTHLY' : 'ANNUALLY',
        price: this.isMonthly ? this.invitee.monthlyPrice : this.invitee.monthlyPrice * 10,
        influencerPlatformId: this.getInfluencerPlatformId
      }

      let URL = `subscription/api/v1/customers/${this.getUser.id}/subscriptions/`
      this.postUnsecureData(URL, putData, (customerSubscription) => {
        let subscriptionId = customerSubscription.id;
        let URL = `payment/api/v1/stripe/subscription/${subscriptionId}`
        console.log('subscriptionId', subscriptionId);
        this.postUnsecureData(URL, {}, (stripeCheckoutData) => {
          // this.$router.replace({name: 'CustomerStripeCheckout', params: {customerSubscription, stripeCheckoutData}})
          this.pk = stripeCheckoutData.othersData.pk;
          this.sessionId = stripeCheckoutData.req.id;
          console.log(stripeCheckoutData);
          this.isShow = true;
          this.$nextTick(() => {
            this.$refs.checkoutRef.redirectToCheckout();
          });
          // this.$router.push({name: 'CustomerStripeCheckout', params: {pk: this.pk}});
        });
      })
    }
  }
}
</script>

<style scoped>

</style>
