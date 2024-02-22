<template>
  <div id="complete_custom_request" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-header border-0 align-items-baseline">
          <button type="button" class="modal-back close">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
          <h4 class="modal-title mx-auto font-size-16 font-weight-bold">Complete Custom Request</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <div class="form-group text-center" onclick="document.getElementById('fileInput').click();" id="upload_image_section">
            <img data-upload="group" src="./assets/images/upload-image.svg">
            <div data-upload="group" class="font-grey font-size-16 font-weight-bold">Upload File</div>
            <div data-upload="group" class="mt-1 font-grey font-size-12"><i>File must be less than xMB</i></div>
            <input type="file" class="d-none" id="fileInput" onchange="loadFile(event)" accept="image/x-png,image/jpeg">
            <div data-upload="group" class="font-grey font-size-14 font-weight-bold">OR</div>
          </div>
          <div class="row d-flex align-items-center mb-3">
            <div class="col-3 px-2 text-right">
              <div data-upload="group" class="mt-1 font-grey font-size-12"><i>Enter URL:</i></div>
            </div>
            <div class="col-6 p-0">
              <input type="text" class="form-control py-2" name="">
            </div>
            <div class="col-3 px-2 text-left">
              <button onclick="$('.modal').modal('hide');$('#complete_custom_request_file_name').modal();" 
                    class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
                    >Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModelCompleteCustomRequest",
  methods: {
    show() {
      $('#complete_custom_request').modal();
    },
    hide() {
      $('#complete_custom_request').modal('hide');
    }
  }
}
</script>

<style scoped>

</style>
