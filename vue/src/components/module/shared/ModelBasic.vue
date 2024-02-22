<template>
  <div id="model_basic" class="modal fade mx-4" tabindex="-1" role="dialog" style="display: none;">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-body text-center">
          <h4 class="pt-3 font-size-24">{{title}}</h4>
          <p class="pt-3 pb-3">{{ text }}</p>
          <button type="button" class="btn w-100 mx-0 font-family-poppins stella-modal-btn text-white stella-modal-btn-dark"
                  data-dismiss="modal" @click="$emit('cancel' )">Cancel
          </button>
          <button type="button" :class="`btn w-100 mx-0 font-family-poppins stella-modal-btn ${buttonColor}`"
                  @click="$emit('confirm')">{{confirmBtnTxt}}
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModelBasic",
  props: {
    title: String,
    text:  String,
    buttonColor:  String,
    confirmBtnTxt: {
      type: String,
      default: 'Confirm'
    }
  },
  methods: {
    show() {
      $('#model_basic').modal();
    },
    hide() {
      $('#model_basic').modal('hide');
    }
  }
}
</script>

<style scoped>

</style>
