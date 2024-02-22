<template>
  <div id="edit_delete_model" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="edit_delete_modelLabel" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal m-4">
        <div class="modal-body text-center p-4">
          <button type="button"
                  style=" margin: -18px -8px 0px 0; font-size: 30px; "
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="$emit('cancel' )">
            <span aria-hidden="true">×</span>
          </button >
          <div class="my-4">
            <button type="button"  @click="$emit('edit' )"
                    class="btn w-100 font-family-poppins stella-modal-btn text-white stella-modal-btn-dark"
                    data-dismiss="modal">Edit</button>
            <button type="button" @click="$emit('archive' )"
              class="btn stella-btn w-100 text-dark btn-danger rounded-pill"
            >Archive</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "ModelEditDelete",
  methods: {
    show() {
      $('#edit_delete_model').modal();
    },
    hide() {
      $('#edit_delete_model').modal('hide');
    }
  }
}
</script>

<style scoped>

</style>
