<template>

  <div id="custom_request_option_info" class="modal fade" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLiveLabel" style="display: none;" aria-hidden="true">
    <loading-modal :is-loading="isLoading"></loading-modal>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">

        <div class="modal-header border-0 align-items-baseline">
          <button type="button" class="modal-back close" @click="back()">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
          <button type="button" class="modal-back close invisible">x</button>
          <h4 class="modal-title mx-auto font-size-16 font-weight-bold"> Submit Custom Request</h4>
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
            <div class="row align-items-center">

              <div class="col-2 p-0">
                <div class="col-auto p-0 text-right"></div>
              </div>
              <div class="col-md-8 col-10 text-left">
                <div class="w-100 btn-group-vertical creator-side py-3" role="group" >
                  <button type="button" class="btn btn-custom-request">
                    <span>{{customRequestOption.title}}</span>
                    <span>${{customRequestOption.price}}</span>
                  </button>
                </div>
              </div>

              <div class="col-2 "></div>

              <div class="col-2 p-0"></div>
              <div class="col-md-8 col-10">
                <label class="font-size-14 font-weight-bold">Please add any additional info like names or any other
                  information {{influencerName}} will require to complete your request:
                </label>
                <required-field v-if="isRequired('requestDescription')"/>
                <textarea class="form-control stella-group my-2 p-2 border-dark border-radius-6" rows="4"
                 v-model="customRequest.requestDescription"></textarea>
              </div>
              <div class="col-12 my-2"></div>

              <div class="col-12 my-2 continue-btn">
                <button
                class="btn stella-btn gradient-a w-100 text-dark rounded-pill" @click="saveCustomRequest()">Submit
                </button>
              </div>


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
import {required} from "vuelidate/lib/validators";
import RequiredField from "@/components/module/shared/RequiredField";

export default {
  name: "ModelCustomerCustomRequestOptionInfo",
  mixins: [customerCustomRequestMixin],
  components: {RequiredField},
  data() {
    return {
      customRequestOption: {},
      influencerName: ''
    }
  },
  validations: {
    customRequest: {
      requestDescription: {required},
    }
  },
  methods: {
    show(customRequest, customerId) {
      this.clearMessages();
      this.customRequest = customRequest;
      this.customerId = customerId;
      this.customRequest.offerPrice = null;
      this.customRequest.requestDescription = null;
      this.loadData();
      $('#custom_request_option_info').modal();
    },
    hide() {
      $('#custom_request_option_info').modal('hide');
    },
    loadData() {
      let optionId = this.customRequest.options.id;
      let influencerId = this.customRequest.influencer.id;
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${influencerId}/custom-request-options/${optionId}`;
      this.getData(url, (customRequestOption) => {
        this.customRequestOption = customRequestOption;
        this.influencerName = customRequestOption.influencer.name;
      });

    },
    saveCustomRequest() {

      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.customRequest.offerPrice = this.customRequestOption.price;
      let url = `${SERVICE_CONTENT}/api/v1/customers/${this.customerId}/custom-request/`;
      this.postData(url, this.customRequest, (customRequest) => {
        this.hide();
        this.$emit("savedCustomRequestOption", customRequest);
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
