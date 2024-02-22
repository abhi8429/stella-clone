<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      :pk="pk"
      :sessionId="sessionId"
    >
    </stripe-checkout>
  </div>
</template>

<script>

  import {mapGetters} from "vuex";
  import {StripeCheckout} from '@vue-stripe/vue-stripe';
  import {httpMixin} from "@/mixin/http-mixin";

  export default {
    mixins: [httpMixin],
    components: {
      StripeCheckout
    },
    data() {
      return {
        pk: "",
        sessionId: ""
      }
    },

    created() {
      let stripeCheckoutData = this.$route.params.stripeCheckoutData;
      this.pk = stripeCheckoutData.othersData.pk;
      this.sessionId = stripeCheckoutData.req.id;
    },
    mounted() {
      this.checkout();
    },
    methods: {
      ...mapGetters(['getUser']),
      checkout() {
        this.$refs.checkoutRef.redirectToCheckout();
      }
    }
  }
</script>
