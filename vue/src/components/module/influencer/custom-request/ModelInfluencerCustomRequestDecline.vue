<template>
  <div id="influencer_custom_request_decline" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-header border-0 align-items-baseline">
          <button type="button" class="modal-back close invisible">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
          <h4 class="modal-title mx-auto font-size-16 font-weight-bold">Are You Sure?</h4>
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
            <div class="font-grey mt-2 mb-4 px-md-5 px-2">
              <span class="font-size-14">By declining this request, you will no longer be able to change your answer and this request will be deleted.</span>
            </div>
<!--            <required-field v-if="isRequired('requestDeclineDescription')"/>-->
            <textarea
              class="form-control stella-group my-2 p-2 border-dark border-radius-6 " rows="3"
              placeholder="Reason for decline"
              v-model="customRequest.requestDeclineDescription"></textarea>
            <button
                  class="btn stella-btn w-100 text-dark btn-danger rounded-pill"
                  @click="decline()">Decline</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {influencerCustomRequestMixin} from "@/mixin/influencer-custom-request-mixin";
import {clone} from "@/common/Utils";
import RequiredField from "@/components/module/shared/RequiredField";

export default {
  name: "ModelInfluencerCustomRequestDecline",
  components: {RequiredField},
  mixins: [influencerCustomRequestMixin],
 /* validations: {
    customRequest: {
      requestDeclineDescription: {required},
    }
  },*/
  methods: {
    show(customRequest) {
      this.clearMessages();
      this.customRequest = clone(customRequest);
      $('#influencer_custom_request_decline').modal();
    },
    hide() {
      $('#influencer_custom_request_decline').modal('hide');
    },
    decline() {
     /* this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }*/

      let influencerId = this.customRequest.influencer.id;
      let id = this.customRequest.id;
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${influencerId}/custom-request/${id}/deny-offer`;
      this.patchData(url, this.customRequest, (customRequest) => {
        this.customRequest = customRequest;
        this.hide();
        this.$emit("declinedSuccess");
      });

    }
  }
}
</script>

<style scoped>

</style>
