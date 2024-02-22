<template>
  <div :id="id" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="buy_modelLabel" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal m-4">
        <div class="modal-body text-center p-4">
          <button type="button"
                  style=" margin: -18px -8px 0px 0; font-size: 30px; " class="close invisible"
                  data-dismiss="modal" aria-label="Close"
                  @click="$emit('cancel' )">
            <span aria-hidden="true">×</span>
          </button>
          <div class="my-2">
            <h4 class="font-size-20" v-if="title">{{ title }}</h4>
            <p class="font-size-14 font-grey"> {{ text }}</p>
            <button type="button" 
                    class="btn w-100 font-family-poppins stella-modal-btn text-white stella-modal-btn-dark"
                    data-dismiss="modal" @click="$emit('cancel' )">Cancel</button>
            <button type="button" @click="$emit('confirm' )"
                    class="btn w-100 font-family-poppins stella-modal-btn text-dark btn-success"
                    :class="`${buttonColor}`"><i>{{ confirmBtnTxt }}</i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModelBasic",
  props: {
    id: {
      type: String,
      default: 'basic_model'
    },
    title: String,
    text:  String,
    buttonColor:  {
      type: String,
      default: 'btn-success' //btn-danger-closefriend
    },
    confirmBtnTxt: {
      type: String,
      default: 'Confirm'
    }
  },
  methods: {
    show() {
      $(`#${this.id}`).modal();
    },
    hide() {
      $(`#${this.id}`).modal('hide');
    }
  }
}
</script>

<style scoped>

</style>
