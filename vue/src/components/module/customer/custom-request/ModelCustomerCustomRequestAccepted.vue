<template>
  <div>
    <div id="customer_request_accepted_modal" class="modal fade" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLiveLabel" style="display: none;" aria-hidden="true">
      <loading-modal :is-loading="isLoading"></loading-modal>
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content closefriend-modal">
          <div class="modal-header border-0 align-items-baseline">
            <button type="button" class="modal-back close invisible">x</button>
            <h4 class="modal-title mx-auto font-size-16 font-weight-bold"></h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body text-center pt-0">
            <div class="form-group text-center mb-2">
              <model-global-message
                :global-errors="globalErrors"
                :message="message"
                @clearMessages="clearMessages()"/>
              <div class="font-size-14 mb-3"><b>Your Request Was Accepted!</b></div>
              <div class="row justify-content-center">
                <div class="col-9 font-size-12 text-center font-grey p-0">Please complete checkout and we will notify
                  the creator to proceed with the custom request.
                </div>
              </div>
              <div class="font-size-14 my-3"><b>${{customRequest.counterOfferPrice ? customRequest.counterOfferPrice : customRequest.offerPrice}}</b></div>
              <div class="d-flex align-items-center justify-content-center mt-3">
                <button @click="pay()"
                        :disabled="isPayBtnDisabled"
                  class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
                        >Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <stripe-checkout
      v-if="showCheckOut"
      ref="checkoutRef"
      :pk="pk"
      :sessionId="sessionId"/>
  </div>
</template>

<script>
import {customerCustomRequestMixin} from "@/mixin/customer-custom-request-mixin";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {StripeCheckout} from "@vue-stripe/vue-stripe";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ModelCustomerCustomRequestAccepted",
  mixins: [customerCustomRequestMixin],
  components: {
    StripeCheckout
  },
  data() {
    return {
      //Strip
      pk: "",
      sessionId: "",
      showCheckOut: false,
      isPayBtnDisabled: false
    }
  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapActions(['setPayInfluencer']),
    show(customRequest) {
      this.clearMessages();
      this.customRequest = customRequest;
      $('#customer_request_accepted_modal').modal();
    },
    hide() {
      $('#customer_request_accepted_modal').modal('hide');
    },
    saveCustomRequest() {

      //api/v1/customers/{customerId}/custom-request/
      let url = `${SERVICE_CONTENT}/api/v1/customers/${this.customerId}/custom-request/`;
      this.postData(url, this.customRequest, (data) => {
        this.hide();
        this.$emit("savedCustomRequest", this.customRequest);
      });
    },
    back() {
      this.hide();
      this.$emit('back');
    },
    pay() {
      this.isPayBtnDisabled = true;
      let userId = this.getUser().id;
      let contentId = this.customRequest.content.id;
      this.setPayInfluencer(this.customRequest.influencer);
      let URL = `${SERVICE_CONTENT}/api/v1/customers/${userId}/content/${contentId}/purchase?mode=Online`;
      this.postData(URL, {}, (stripeCheckoutData) => {

        let otherData = stripeCheckoutData.othersData;
        let status = stripeCheckoutData.status;
        this.pk = otherData.pk;
        this.sessionId = stripeCheckoutData.req.id;

        this.showCheckOut = true;
        this.$nextTick(() => {
          this.$refs.checkoutRef.redirectToCheckout();
        });

    /*    if (status === 'Success') {
            this.message = "PAYMENT.SUCCESSFUL";
          setTimeout(() => {
            this.hide();
          }, 2000);
        } else if (status === 'InProgress') {
          this.pushGlobalError(otherData.offlineCheckoutError);
          setTimeout(() => {
            this.showCheckOut = true;
            this.$nextTick(() => {
              this.$refs.checkoutRef.redirectToCheckout();
            });
          }, 2000);
        }*/
      });
    },
  }
}
</script>

<style scoped>

</style>
