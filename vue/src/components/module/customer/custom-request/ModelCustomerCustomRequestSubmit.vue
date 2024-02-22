<template>

  <div id="submit_customer_offer" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel"
       style="display: none;" aria-hidden="true">
    <loading-modal :is-loading="isLoading"></loading-modal>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-header border-0 align-items-baseline">
          <button type="button" class="modal-back close invisible">x</button>
          <h4 class="modal-title mx-auto font-size-16 font-weight-bold">Submit Custom Request</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body text-center pt-0">

          <div class="form-group text-center mb-2">
            <div class="row align-items-center">
              <div class="col-2 p-0 d-none d-sm-block">
                <div class="col-auto p-0 text-right"></div>
              </div>
              <div class="col-md-8 col-sm-12 text-left">
                <div class="w-100 btn-group-vertical creator-side py-3" role="group" >
                  <button type="button"
                  @click="chosenCustomRequestOption(index)"
                  :class="isActive(index)"
                  :key="index"
                  v-for="(customRequestOption, index) in customRequestOptions"
                  class="btn btn-custom-request">
                    <span>{{customRequestOption.title}}</span>
                    <span >${{customRequestOption.price}}</span>
                  </button>
                </div>
              </div>

              <div class="col-2 "></div>

              <div class="col-2 p-0">
                <div class="col-auto p-0 text-right"></div>
              </div>
              <div class="col-md-8 col-10">
                <required-field v-if="isRequired('requestDescription')"/>
                <textarea
                          class="form-control stella-group my-2 p-2 border-dark border-radius-6 " rows="3"
                          :placeholder="`Custom ($${minRequired} min required)`"
                          v-model="customRequest.requestDescription"
                          @click="chosenCustomRequest()"></textarea>
              </div>
              <div class="col-12 my-2">
                <required-field v-if="isRequired('offerPrice')"/>
                <span class="danger ml-2" v-else-if="this.isSubmitted && !isOfferPriceValid">Offer price should be more than ${{
                    minRequired
                  }}</span>
              </div>

              <template v-if="showSubmitAndPrice">
                <div class="col-2 p-0 offer-section">
                  <div class="col-auto p-0 text-right mb-4">Offer:</div>
                  <div class="col-auto p-0 text-right mb-4 py-2 invisible">Offer:</div>
                </div>
                <div class="col-md-8 col-10 offer-section">
                  <div class="row">
                    <div class="col-6 text-left">
                      <div class="input-group dollar-text  border-dark border-radius-6">
                        <div class="input-group-prepend border-0">
                          <div class="input-group-text border-0 font-grey py-2 pr-0 font-weight-bold">$</div>
                        </div>
                        <input type="number" onclick="$(this).parent().addClass('outline-success')"
                               class="form-control border-0 px-1 py-2"
                               v-model="customRequest.offerPrice" @click="chosenCustomRequest()">
                      </div>
                      <small class="font-size-10 font-weight-bold font-grey">${{minRequired}} min required</small>
                    </div>
                    <div class="col-12 pl-0">
                      <!-- onclick="$('.modal').modal('hide');$('#congrets_modal').modal();"                    -->
                      <button
                        class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
                        @click="submitCustomRequest()">Submit
                      </button>
                    </div>
                  </div>
                </div>
              </template>


              <div class="col-8 mx-auto my-2 continue-btn" v-if="!showSubmitAndPrice">
                <button onclick="$('.modal').modal('hide');$('#finalize_custom_request_modal').modal();"
                        class="btn w-100 stella-modal-btn text-dark gradient-a"
                        @click="continueWithCustomRequestOption()"
                        >Continue
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
import {required} from "vuelidate/lib/validators";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import RequiredField from "@/components/module/shared/RequiredField";
import {mapActions} from "vuex";

export default {
  name: "ModelCustomerCustomRequestSubmit",
  components: {RequiredField},
  mixins: [customerCustomRequestMixin],
  data() {
    return {
      minRequired: 0,
      customRequestOptions: [],
      selectedIndex: null,
      showSubmitAndPrice: true
    }
  },
  validations: {
    customRequest: {
      requestDescription: {required},
      offerPrice: {required}
    }
  },
  computed: {
    isOfferPriceValid() {
      return (parseFloat(this.customRequest.offerPrice) >= parseFloat(this.minRequired));
    },
    isCustomRequest() {
      return !!(this.customRequest.offerPrice || this.customRequest.requestDescription);
    }
  },
  methods: {
    ...mapActions(['setCustomRequestInfluencer', 'setCustomRequestIndex']),
    show(influencerId, customerId, minRequired) {
      this.clearMessages();
      this.influencerId = influencerId;
      this.customRequest = {};
      this.customRequest.influencer = {id: influencerId};
      this.customerId = customerId;
      this.minRequired = minRequired
      this.selectedIndex = null;
      this.showSubmitAndPrice = true;
      $('#submit_customer_offer').modal();
      this.loadCustomRequestOptions();
    },
    resubmitShow(customRequest) {
      let influencerId = customRequest.influencer.id;
      let customerId = customRequest.customer.id;
      let minRequired = customRequest.influencer.customRequestMinPrice;
      this.show(influencerId, customerId, minRequired);
      this.customRequest.requestDescription = customRequest.requestDescription;
      this.customRequest.offerPrice = customRequest.offerPrice;
    },
    simpleShow() {
      $('#submit_customer_offer').modal();
    },
    hide() {
      $('#submit_customer_offer').modal('hide');
    },
    loadCustomRequestOptions() {
      // /api/v1/influencers/{influencerId}/custom-request-options/
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.influencerId}/custom-request-options/`;
      this.getData(url, (customRequestOptions) => {
        this.customRequestOptions = customRequestOptions;
      });
    },
    chosenCustomRequest() {
      this.showSubmitAndPrice = true;
      this.selectedIndex = null
      this.setCustomRequestInfluencer(null);
    },
    chosenCustomRequestOption(index) {
      this.selectedIndex = index;
      this.$set(this.customRequest, 'requestDescription', null);
      this.$set(this.customRequest, 'offerPrice', null);
      this.showSubmitAndPrice = false;
      this.isLoading = false;
      this.isSubmitted = false;
      this.setCustomRequestInfluencer(null);
    },
    isActive(index) {
      if (this.isCustomRequest) {
        return '';
      } else if (this.selectedIndex === index) {
        return 'active';
      } else {
        return '';
      }
    },
    submitCustomRequest() {
      console.log('submitCustomRequest');
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid || !this.isOfferPriceValid) {
        return;
      }
      let url = `${SERVICE_CONTENT}/api/v1/customers/${this.customerId}/custom-request/`;
      this.postData(url, this.customRequest, (data) => {
        this.hide();
        this.$emit("savedCustomRequest", this.customRequest);
      });
    },
    continueWithCustomRequestOption() {
      let optionId = this.customRequestOptions[this.selectedIndex].id;
      this.customRequest.options = {id: optionId};
      this.$emit("submittedCustomRequestOption", this.customRequest);
    }
  }
}
</script>

<style scoped>

button>span{
  margin-left: 0px;
}
</style>
