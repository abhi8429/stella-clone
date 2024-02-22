<template>
  <div id="custom_request_counter_offer_complete" class="modal fade" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLiveLabel" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-header border-0 align-items-baseline">
          <button type="button" class="modal-back close invisible">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
          <h4 class="modal-title mx-auto font-size-16 font-weight-bold">Thanks!</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <div class="form-group text-center">
            <div class="font-grey mt-3 mb-5 px-md-5 px-2">
              <span class="font-size-14">Your counter-offer has been submitted to the {{submittedTo}} and if they accept, you will see the new offer in your custom requests dashboard.  If they decline, there is no further action required on your part.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {CR_TYPE_INFLUENCER} from "@/properties/custom-request-status";
import {influencerCustomRequestMixin} from "@/mixin/influencer-custom-request-mixin";

export default {
  name: "ModelCustomRequestCounterOfferComplete",
  props: {
    type: {
      type: String,
      default: CR_TYPE_INFLUENCER
    }
  },
  mixins: [influencerCustomRequestMixin],
  computed: {
    submittedTo() {
      return this.type === CR_TYPE_INFLUENCER ? 'customer' : 'creator';
    }
  },
  methods: {
    show(customRequest) {
      this.clearMessages();
      this.customRequest = customRequest;
      $('#custom_request_counter_offer_complete').modal();
    },
    hide() {
      $('#custom_request_counter_offer_complete').modal('hide');
    },
  }
}
</script>

<style scoped>

</style>
