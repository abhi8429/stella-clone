<template>
  <div>
    <stripe-checkout v-if="show" ref="checkoutRef" :pk="pk" :sessionId="sessionId"/>
  </div>
</template>

<script>
import {StripeCheckout} from "@vue-stripe/vue-stripe";
import {SERVICE_DIRECT_MESSAGE, SERVICE_IDENTIY} from "@/properties/micro-service";
import {paymentOtherStatus, paymentPaid} from "@/common/analytics-service";
import {mapActions} from "vuex";
import {modelHttpMixin} from "@/mixin/model-http-mixin";

export default {
  name: "MessagePayment",
  mixins: [modelHttpMixin],
  components: {StripeCheckout},
  data() {
    return {
      //Strip
      pk: "",
      sessionId: "",
      show: false,
    }
  },
  methods: {
    ...mapActions(['setPayInfluencer']),
    pay(influencerId, customerId, chatMessageId, messageType, mode = 'Offline') {

      let URL = `${SERVICE_IDENTIY}/api/v1/influencers/${influencerId}`;
      this.getData(URL, (inf) => {
        let influencer = inf;
        this.setPayInfluencer(influencer);
        //Make Offline payment
        URL = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/customers/${customerId}/${chatMessageId}/purchase?mode=${mode}`;
        this.postData(URL, {}, (stripeCheckoutData) => {

          let otherData = stripeCheckoutData.othersData;
          let status = stripeCheckoutData.status;
          this.pk = otherData.pk;
          this.sessionId = stripeCheckoutData.req.id;

          if (status === 'Success') {
            paymentPaid(this, messageType, influencer);
            this.$emit('paymentSuccess')
          } else if (status === 'InProgress') {
            if (otherData.offlineCheckoutError) {
              this.$emit('paymentFailed', otherData.offlineCheckoutError.trim());
            }
            this.show = true;
            this.$nextTick(() => {
              this.$refs.checkoutRef.redirectToCheckout();
            });
          } else {
            paymentOtherStatus(this, status, messageType, influencer);
            this.$emit('paymentFailed', status);
          }
        }, () => {
          console.log()
          this.$emit('paymentFailed', this.globalErrors);
        });
      });
    },
  }
}
</script>

