<template>
  <div id="confirm_customer_offer" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style="display: none;" aria-hidden="true">
    <loading-modal :is-loading="isLoading"></loading-modal>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-header border-0 align-items-baseline">
          <button type="button" class="modal-back close" @click="back()">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
          <h4 class="modal-title mx-auto font-size-16 font-weight-bold">Confirm Custom Request</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div class="modal-body text-center">
          <model-global-message
            :global-errors="globalErrors"
            :message="message"
            @clearMessages="clearMessages()"/>
          <div class="form-group text-center">
            <div class="font-grey mt-3 mb-5 px-md-5 px-2">
              <span class="font-size-14">You will not be charged until the creator accepts your request.  If your bank requires verification, we will notify you to complete the purchase.  The creator may also decline or send you a counter-offer.</span>
            </div>
            <button
              class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
              @click="saveCustomRequest()">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {customerCustomRequestMixin} from "@/mixin/customer-custom-request-mixin";
import {SERVICE_CONTENT} from "@/properties/micro-service";

export default {
  name: "ModelCustomerCustomRequestConfirm",
  mixins: [customerCustomRequestMixin],
  methods: {
    show(customRequest, customerId) {
      this.clearMessages();
      this.customRequest = customRequest;
      this.customerId = customerId;
      $('#confirm_customer_offer').modal();
    },
    hide() {
      $('#confirm_customer_offer').modal('hide');
    },
    saveCustomRequest() {

      //api/v1/customers/{customerId}/custom-request/
      console.log(this.customRequest);
      let url = `${SERVICE_CONTENT}/api/v1/customers/${this.customerId}/custom-request/`;
      this.postData(url, this.customRequest, (data) => {
        this.hide();
        this.$emit("savedCustomRequest", this.customRequest);
      });
     /* this.hide();
      this.$emit("savedCustomRequest", this.customRequest);*/
    },
    back() {
      this.hide();
      this.$emit('back');
    }
  }
}
</script>

<style scoped>

</style>
