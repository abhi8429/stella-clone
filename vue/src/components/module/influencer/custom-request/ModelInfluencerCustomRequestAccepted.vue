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
              <span class="font-size-14">Request has been accepted.</span>
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
  name: "ModelInfluencerCustomRequestAccepted",
  mixins: [customerCustomRequestMixin],
  methods: {
    show() {
      $('#done_customer_offer').modal();
    },
    hide() {
      $('#done_customer_offer').modal('hide');
    },
    done() {
      this.hide();
      this.$emit("customRequestAcceptedDone");
    }
  }
}
</script>

<style scoped>

</style>
