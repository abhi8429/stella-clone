<template>
  <div id="customer_counter_offer_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-header border-0 align-items-baseline">
          <button type="button"  class="modal-back close invisible">x</button>
          <h4 class="modal-title mx-auto font-size-16 font-weight-bold"></h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body text-center pt-0">
          <div class="form-group text-center mb-2">
            <div class="font-size-25 text-white mb-3">You Received A Counter-offer</div>
            <div class="row justify-content-center">
              <div class="col-9 font-size-12 text-center font-grey p-0">
                {{customRequest.counterOfferDescription}}
              </div>
            </div>
            <div class="font-size-16 my-3"><b>${{ customRequest.counterOfferPrice }}</b></div>
            <div class="d-block align-items-center justify-content-center mt-3">
              <button @click="acceptOffer()" 
              class="btn stella-btn gradient-a w-100 text-dark rounded-pill">Pay</button>
              <button
                @click="counterOffer()"
                class="btn w-100 font-family-poppins stella-modal-btn text-white stella-modal-btn-dark mx-0"
                >Counter-offer</button>
                <button href=""  
                class="btn w-100 font-family-poppins stella-modal-btn text-white stella-modal-btn-dark m-0"
                @click.prevent="declineOffer()">Decline</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {customerCustomRequestMixin} from "@/mixin/customer-custom-request-mixin";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {clone} from "@/common/Utils";

export default {
  name: "ModelCustomerCustomRequestCounterOffer",
  mixins: [customerCustomRequestMixin],
  methods: {
    show(customRequest) {
      this.clearMessages();
      this.customRequest = clone(customRequest);
      $('#customer_counter_offer_modal').modal();
    },
    hide() {
      $('#customer_counter_offer_modal').modal('hide');
    },
    acceptOffer() {

      let customerId = this.customRequest.customer.id;
      let customRequestId = this.customRequest.id;
      ///api/v1/customers/${customerId}/custom-request/${customRequestId}/accept-counter-offer
      let url = `${SERVICE_CONTENT}/api/v1/customers/${customerId}/custom-request/${customRequestId}/accept-counter-offer`;
      this.patchData(url, this.customRequest, (data) => {
        this.hide();
        this.$emit('accepted');
      });
    },
    counterOffer() {
      this.hide();
      this.$emit('counterOffer', this.customRequest);
    },
    declineOffer() {

      let customerId = this.customRequest.customer.id;
      let customRequestId = this.customRequest.id;
      //api/v1/customers/${customerId}/custom-request/${customRequestId}/deny-counter-offer
      let url = `${SERVICE_CONTENT}/api/v1/customers/${customerId}/custom-request/${customRequestId}/deny-counter-offer`;
      this.patchData(url, this.customRequest, (data) => {
        this.hide();
        this.$emit('declined');
      });
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
