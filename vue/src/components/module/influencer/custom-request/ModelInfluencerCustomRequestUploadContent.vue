<template>
  <div>
    <div id="influencer_custom_request_upload_content" class="modal fade" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLiveLabel" style="display: none;" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content closefriend-modal">
          <div class="modal-header border-0 align-items-baseline">
            <button type="button" class="modal-back close invisible">
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
            <h4 class="modal-title mx-auto font-size-16 font-weight-bold">Complete Custom Request</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <span class="danger ml-2" v-if="isError">Select either file to upload or enter URL</span>
            <div class="form-group text-center" onclick="document.getElementById('fileInput').click();"
                 id="upload_image_section">
              <img data-upload="group" src="@/assets/images/upload-image.svg">
              <div data-upload="group" class="font-grey font-size-16 font-weight-bold">Upload File</div>
              <div data-upload="group" class="mt-1 font-grey font-size-12"><i>File must be less than xMB</i></div>
              <input type="file" class="d-none" id="fileInput" ref="file" @change="loadFile($event)"
                     accept="image/x-png,image/jpeg">
              <img v-show="isImage"
                   src=""
                   id="user_upload_image"
                   class="placeholder-image">
              <video v-show="isVideo"
                     controls oncontextmenu="return false;" controlsList="nodownload"
                     id="user_upload_video"
                     style="max-width: 100%;max-height: 400px;">
                <!--  <source src="" type="video/mp4" id="user_upload_video">-->
              </video>
              <!--              fileName-->
              <div data-upload="group" class="font-grey font-size-14 font-weight-bold">OR</div>
            </div>
            <div class="row d-flex align-items-center mb-3">
              <div class="col-3 px-2 text-right">
                <div data-upload="group" class="mt-1 font-grey font-size-12"><i>Enter URL:</i></div>
              </div>
              <div class="col-6 p-0">
                <input type="text" class="form-control py-2" name="" v-model="URL" @change="changedURL()">
              </div>
              <div class="col-3 px-2 text-left">
                <button @click="next()"
                  class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
                  >Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {influencerCustomRequestMixin} from "@/mixin/influencer-custom-request-mixin";
import {mapActions} from "vuex";
import {
  CONTENT_TYPE_APPLICATION,
  CONTENT_TYPE_IMAGE,
  CONTENT_TYPE_URL,
  CONTENT_TYPE_VIDEO
} from "@/properties/content-type";

export default {
  name: "ModelInfluencerCustomRequestUploadContent",
  mixins: [influencerCustomRequestMixin],
  data() {
    return {
      isFileSelected: false,
      isURLPresent: false,
      file: null,
      URL: null,
      contentType: null,
    }
  },
  computed: {
    isError() {
      return !(this.isFileSelected || this.isURLPresent ) && this.isLoading;
    },
    isVideo() {
      return this.contentType === CONTENT_TYPE_VIDEO;
    },
    isImage() {
      return this.contentType === CONTENT_TYPE_IMAGE;
    },
    isApp() {
      return this.contentType === CONTENT_TYPE_APPLICATION;
    },
    isFileSelected() {
      if (this.$refs.file) {
        return this.$refs.file.files[0];
      }
      return false;
    }
  },
  methods: {
    ...mapActions(['setImageFile']),
    show(customRequest) {
      this.clearMessages();
      this.customRequest = customRequest;
      this.file = null;
      this.URL = null;
      // document.getElementById("upload").value = "";
      this.clearImgAndVideoSrc();

      $('#influencer_custom_request_upload_content').modal();
    },
    simpleShow() {
      $('#influencer_custom_request_upload_content').modal();
    },
    hide() {
      $('#influencer_custom_request_upload_content').modal('hide');
    },
    loadFile() {
      this.file = this.$refs.file.files[0];
      this.isFileSelected = !!this.file;
      this.URL = null;

      if (this.$refs.file.files[0].type.includes('video')) {
        // this.isVideo = true;
        this.contentType = CONTENT_TYPE_VIDEO;
        $('#user_upload_image').prop('src', "");
        $("#user_upload_video").attr("src", URL.createObjectURL(this.$refs.file.files[0]));
      } else if(this.$refs.file.files[0].type.includes('image')) {
        // this.isVideo = false;
        this.contentType = CONTENT_TYPE_IMAGE;
        $('#user_upload_image').prop('src', URL.createObjectURL(this.$refs.file.files[0]));
      } else {
        this.contentType = CONTENT_TYPE_APPLICATION;
        this.clearMessages();
      }

    },
    changedURL() {

      this.clearImgAndVideoSrc();
      this.isURLPresent = !!this.URL;
      this.contentType = CONTENT_TYPE_URL;
      if (this.$refs.file) {
        if (this.$refs.file.files[0]) {
          this.file = null;
        }
      }
    },
    clearImgAndVideoSrc() {
      $('#user_upload_image').prop('src', "");
      $("#user_upload_video").attr("src", "");
    },
    next() {
      this.isLoading = true;
      if (this.isError) {
        return;
      }

      this.file = this.$refs.file.files[0];

      this.hide();
      this.$emit('customRequestUploaded', this.customRequest, {file: this.file, URL: this.URL});
    }

  }
}
</script>

<style scoped>

</style>
