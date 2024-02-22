import {mapActions, mapGetters} from "vuex";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {httpMixin} from "@/mixin/http-mixin";

export const subscriptionMixin = {
  mixins: [httpMixin],
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
        this.imageURL = imageURL;
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
