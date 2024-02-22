<template>
  <div id="done_customer_offer" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-header border-0 align-items-baseline">
<!--          <button type="button" class="modal-back close">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </button>-->
          <h4 class="modal-title mx-auto font-size-16 font-weight-bold">Congrats!</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <div class="form-group text-center">
            <div class="font-grey mt-3 mb-5 px-md-5 px-2">
              <span class="font-size-14">Your request has been submitted!  It may take several days for the creator to {{accepted ? 'complete.' : 'accept, decline, or send a counter.'}}</span>
            </div>
            <button
              class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
              @click="done()">Done</button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {customerCustomRequestMixin} from "@/mixin/customer-custom-request-mixin";

export default {
  name: "ModelCustomerCustomRequestDone",
  mixins: [customerCustomRequestMixin],
  data() {
    return {
      accepted: false
    }
  },
  methods: {
    show(customRequest, accepted = false) {
      this.clearMessages();
      this.accepted = accepted;
      this.customRequest = customRequest;
      $('#done_customer_offer').modal();
    },
    hide() {
      $('#done_customer_offer').modal('hide');
    },
    done() {
      this.hide();
      this.$emit("doneCustomRequest", this.customRequest);
    }
  }
}
</script>

<style scoped>

</style>
