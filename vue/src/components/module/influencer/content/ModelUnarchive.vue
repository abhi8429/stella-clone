<template>
  <div id="edit_archive_model" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="edit_archive_modelLabel" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal m-4">
        <div class="modal-body text-center p-4">
          <button type="button"  @click="$emit('cancel' )"
                  style=" margin: -18px -8px 0px 0; font-size: 30px; " class="close"
                  data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <div class="my-3">
            <p class="font-size-14">This file is archived and not visible</p>
            <button type="button"  @click="$emit('confirm' )"
                    class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
                    >Unarchive</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "ModelUnarchive",
  methods: {
    show() {
      $('#edit_archive_model').modal();
    },
    hide() {
      $('#edit_archive_model').modal('hide');
    }
  }
}
</script>

<style scoped>

</style>
