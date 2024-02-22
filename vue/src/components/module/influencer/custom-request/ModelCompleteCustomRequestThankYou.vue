<template>
  <div id="influencer_custom_request_thank_you" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-header border-0 align-items-baseline">
          <button type="button" class="modal-back close">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
          <h4 class="modal-title mx-auto font-size-16 font-weight-bold">Thanks!</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <div class="form-group text-center">
            <div class="font-grey mt-3 mb-5">
              <span class="font-size-14">You have completed the request and the money will be in the next available payout.</span>
            </div>
            <div class="d-flex align-items-center justify-content-center">
<!--              <button class="btn btn-bg-dark-grey font-white border-radius-6 font-size-12 px-3 py-2 mx-1">Edit</button>-->
              <button 
                class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
                @click="hide()">Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModelCompleteCustomRequestThankYou",
  methods: {
    show() {
      this.clearMessages();
      $('#influencer_custom_request_thank_you').modal();
    },
    hide() {
      $('#influencer_custom_request_thank_you').modal('hide');
    }
  }
}
</script>

<style scoped>

</style>
