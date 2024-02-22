<template>
  <div id="custom_request_counter_offer_submit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style="display: none;" aria-hidden="true">
    <loading-modal :is-loading="isLoading"></loading-modal>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-header border-0 align-items-baseline">
          <button type="button"  class="modal-back close invisible">x</button>
          <h4 class="modal-title mx-auto font-size-16 font-weight-bold">Submit Counter Offer</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body text-center pt-0">
          <model-global-message
            :global-errors="globalErrors"
            :message="message"
            @clearMessages="clearMessages()"/>
          <div class="form-group text-center mb-2">
            <div class="row">
              <div class="col-md-8 offset-md-2 col-12">
                <textarea class="form-control my-2 p-2" rows="3"
                          placeholder="(Optional)"
                          v-model="customRequest.counterOfferDescription"></textarea>
              </div>
              <div class="col-12 my-2"></div>
              <div class="col-2 p-0">
                <div class="col-auto p-0 text-right">Offer: </div>
              </div>
              <div class="col-md-8 col-10">
                <span class="danger ml-2" v-if="isRequired('counterOfferPrice')">This is required field</span>
                <div class="row">
                  <div class="col-6 text-left">
                    <div class="input-group dollar-text">
                      <div class="input-group-prepend border-0">
                        <div class="input-group-text border-0 font-grey py-2 pr-0 font-weight-bold">$</div>
                      </div>
                      <input type="number"
                             class="form-control border-0 px-1 py-2"
                             v-model="customRequest.counterOfferPrice">
                    </div>
                  </div>
                  <div class="col-12 pl-0">
                    <button  @click="submitCounterOffer()" 
                    class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
                    >Submit</button>
                  </div>
                  <br>
                  <small class="font-size-10 font-weight-bold font-grey">Original Offer ${{customRequest.offerPrice}}, {{counterOfferPrice ? `Counter offer $${counterOfferPrice}` : ''}} </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {influencerCustomRequestMixin} from "@/mixin/influencer-custom-request-mixin";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {required} from "vuelidate/lib/validators";
import {CR_TYPE_INFLUENCER} from "@/properties/custom-request-status";
import {clone} from "@/common/Utils";

export default {
  name: "ModelCustomRequestCounterOfferSubmit",
  props: {
    type: {
      type: String,
      default: CR_TYPE_INFLUENCER
    }
  },
  mixins: [influencerCustomRequestMixin],
  data() {
    return {
      counterOfferPrice: null
    }
  },
  validations: {
    customRequest: {
      counterOfferPrice: {required},
    }
  },
  methods: {
    show(customRequest) {
      this.clearMessages();
      this.customRequest = customRequest;
      this.counterOfferPrice = clone(this.customRequest.counterOfferPrice);
      console.log('counterOfferPrice', this.counterOfferPrice);
      this.customRequest.counterOfferDescription = null;
      this.customRequest.counterOfferPrice = null;
      $('#custom_request_counter_offer_submit').modal();
    },
    hide() {
      $('#custom_request_counter_offer_submit').modal('hide');
    },
    submitCounterOffer() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      let id = this.customRequest.id;
      let url;
      if (this.type === CR_TYPE_INFLUENCER) {
        let influencerId = this.customRequest.influencer.id;
        url = `${SERVICE_CONTENT}/api/v1/influencers/${influencerId}/custom-request/${id}/counter-offer`;
      } else {
        let customerId = this.customRequest.customer.id;
        url = `${SERVICE_CONTENT}/api/v1/customers/${customerId}/custom-request/${id}/counter-offer`;
      }

      this.patchData(url, this.customRequest, (customRequest) => {
        this.customRequest = customRequest;
        this.hide();
        this.$emit("counterOfferSubmitted");
      });
    }
  }
}
</script>

<style scoped>

</style>
