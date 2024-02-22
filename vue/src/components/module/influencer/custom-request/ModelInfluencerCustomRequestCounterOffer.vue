<template>
  <div id="influencer_custom_request_counter_offer" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style="display: none;" aria-hidden="true">
    <loading-modal :is-loading="isLoading"></loading-modal>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-header border-0 align-items-baseline">
          <button type="button" class="btn btn-sm border-radius-6 btn-bg-light-orange font-orange font-size-12-14">
            <u>2 days remaining</u>
          </button>
          <h4 class="modal-title mx-auto font-size-16 font-weight-bold"></h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body text-center pt-0">
          <model-global-message
            :global-errors="globalErrors"
            :message="message"
            @clearMessages="clearMessages()"/>
          <br>
          <div class="form-group text-center mb-2">
            <p class="font-size-12 font-grey">{{customRequest.customer.name}}</p>
            <div class="row">
              <div class="col-3 font-size-12 font-grey pr-2 text-right">
                Request:
              </div>
              <div class="col-9 font-size-12 text-left font-grey font-weight-bold p-0">
                {{desc}}
              </div>
            </div>
            <div class="font-size-14 my-3"><b>${{ customRequest.counterOfferPrice ? customRequest.counterOfferPrice : customRequest.offerPrice }}</b></div>
            <div class="d-flex align-items-center justify-content-center mt-3">
              <button
                class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
                @click="acceptCounterOffer()">Accept</button>
              <button
                @click="counterOffer()"
                class="btn btn-bg-white btn-outline-black border-radius-6 font-size-12 px-3 py-2 mx-1 font-weight-bold">Counter-offer</button>
            </div>
            <div class="d-flex align-items-center justify-content-center align-items-center mt-3">

              <div class="mx-2" >
                <img src="@/assets/images/star.png" :class="customRequest.favorite ? 'show' : ''">
                <span class="mx-2 cursor-pointer" @click="saveForLater()">Save for later</span>
              </div>
              <div class="mx-4 pb-1">
                <a href="javascript:;" @click="declineCounterOffer()"
                  class="btn stella-btn w-100 text-dark btn-danger rounded-pill"
                >Decline</a>
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
import {clone} from "@/common/Utils";

export default {
  name: "ModelInfluencerCustomRequestCounterOffer",
  mixins: [influencerCustomRequestMixin],
  data() {
    return {
      influencerId: null,
      id: null
    }
  },
  computed: {
    isOptions() {
      return !!this.customRequest.options;
    },
    desc() {
      if (this.isOptions) {
        return this.customRequest.options.title + ' - ' + this.customRequest.requestDescription;
      } else {
        return this.customRequest.requestDescription;
      }
    }
  },
  methods: {
    show(customRequest) {
      this.clearMessages();
      this.customRequest = clone(customRequest);
      this.influencerId = this.customRequest.influencer.id;
      this.id = this.customRequest.id

      $('#influencer_custom_request_counter_offer').modal();
    },
    hide() {
      $('#influencer_custom_request_counter_offer').modal('hide');
    },
    acceptCounterOffer() {

      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.influencerId}/custom-request/${this.id}/accept-offer`;
      this.patchData(url, this.customRequest, (customRequest) => {
        this.$emit("acceptedCustomRequest", customRequest);
      });
    },
    saveForLater() {

      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.influencerId}/custom-request/${this.id}/favorite/true`;
      this.patchData(url, this.customRequest, (customRequest) => {
        this.customRequest = customRequest;
        this.hide();
        this.$emit("saveForLaterCustomRequest", this.customRequest);
      });

    },
    declineCounterOffer() {
      this.hide();
      this.$emit("declineCustomRequest", this.customRequest);
    },
    counterOffer() {
      this.hide();
      this.$emit('counterOffer', this.customRequest);
    }
  }
}
</script>

<style scoped>

</style>
