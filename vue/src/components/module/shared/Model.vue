<template>
  <div id="added_model" class="modal fade mx-4" tabindex="-1" role="dialog" style="display: none;">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-body text-center">
          <h4 class="pt-3 font-size-24">Close Friend <span class="font-success">{{title}}</span></h4>
          <p class="pt-3 pb-3">{{ text }}</p>
          <button type="button" 
                  class="btn w-100 mx-0 font-family-poppins stella-modal-btn text-white stella-modal-btn-dark"
                  data-dismiss="modal" @click="$emit('cancel' )">Cancel
          </button>
          <button type="button" 
                  class="btn w-100 mx-0 font-family-poppins stella-modal-btn gradient-a"
                  @click="$emit('confirm')">Confirm
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Model",
  data() {
    return {
      title: '',
      text: ''
    }
  },
  methods: {
    cancel() {

    },
    show(title, text) {
      this.title = title;
      this.text = text;
      $('#added_model').modal();
    },
    hide() {
      $('#added_model').modal('toggle');
    }
  }
}
</script>

<style scoped>

</style>
