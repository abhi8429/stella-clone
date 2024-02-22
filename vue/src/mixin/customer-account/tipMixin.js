import {httpMixin} from "@/mixin/http-mixin";
import {required} from "vuelidate/lib/validators";
import {mapActions, mapGetters} from "vuex";
import {SERVICE_CONTENT, SERVICE_SUBSCRIPTION} from "@/properties/micro-service";


export const tipMixin = {
  mixins: [httpMixin],
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
    donate(routeTo) {

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
          this.$router.replace({name: routeTo, params: {tip: this.tip.amount}})
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
