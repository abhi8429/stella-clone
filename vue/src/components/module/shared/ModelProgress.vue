<template>
  <div id="progress_model" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="progress_modelLabel" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal m-3">

        <div class="modal-body text-center p-3">
          <span><b>{{ text }}</b></span>
          <div class="progress">
            <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar"
                 :aria-valuenow="uploadPercentage" aria-valuemin="0" aria-valuemax="100" :style="`width:${uploadPercentage}%`">
              {{ uploadPercentage }}%
            </div>
          </div>
          <div class="my-3">
            <button type="button" @click="$emit('cancel')"
                    class="btn w-100 mx-0 font-family-poppins stella-modal-btn text-white stella-modal-btn-dark"
                    >Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "ModelProgress",
  props: {
    text: {type: String,
      default: 'Progress...'
    },
    uploadPercentage: Number
  },
  methods: {
    show() {
      $('#progress_model').modal();
    },
    hide() {
      $('#progress_model').modal('hide');
    }
  }
}
</script>

<style scoped>

</style>
