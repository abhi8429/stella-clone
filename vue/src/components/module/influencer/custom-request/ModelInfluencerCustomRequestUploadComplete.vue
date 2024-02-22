<template>
  <div>
    <div id="influencer_custom_request_upload_complete" class="modal fade" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLiveLabel" style="display: none;" aria-hidden="true">
      <loading-modal :is-loading="isLoading"></loading-modal>
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content closefriend-modal">
          <div class="modal-header border-0 align-items-baseline">
            <button type="button" class="modal-back close" @click="back()">
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
            <h4 class="modal-title mx-auto font-size-16 font-weight-bold">Complete Custom Request</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <model-global-message
              :global-errors="globalErrors"
              :message="message"
              :warning="warning"
              @clearMessages="clearMessages()"/>
            <div class="form-group text-center">
              <div class="font-grey mt-3 mb-5">
                <span class="font-size-14 font-weight-bold">Uploaded File: </span>
                <span class="font-size-12"><i>{{ fileNameOrURL }}</i></span>
              </div>
              <button @click="handleFileUpload()"
                  class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
                >Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <model-progress ref="progress"
                    :upload-percentage="uploadPercentage"
                    :text="progressText"
                    @cancel="cancelUpload()"/>

  </div>
</template>

<script>
import axios from "axios";
import {influencerCustomRequestMixin} from "@/mixin/influencer-custom-request-mixin";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {getBaseURL, getToken} from "@/common/http-common";
import {ACCESS_TOKEN} from "@/properties/close-friend";
import ModelProgress from "@/components/module/shared/ModelProgress";

export default {
  name: "ModelInfluencerCustomRequestUploadComplete",
  mixins: [influencerCustomRequestMixin],
  components: {
    ModelProgress
  },
  data() {
    return {
      uploadData: {},

      uploadPercentage: 0,
      request: null,
      progressText: undefined
    }
  },
  computed: {
    fileNameOrURL() {
      if (this.uploadData.file) {
        return this.uploadData.file.name;
      } else {
        return this.uploadData.URL;
      }
    }
  },
  methods: {
    show(customRequest, uploadData) {
      this.clearMessages();
      this.customRequest = customRequest;
      this.uploadData = uploadData;
      $('#influencer_custom_request_upload_complete').modal();
    },
    hide() {
      $('#influencer_custom_request_upload_complete').modal('hide');
    },
    cancelUpload() {
      this.request.cancel();
      this.$refs.progress.hide();
      this.warning = 'UPLOAD.CANCELLED';
    },
    handleFileUpload() {

      let influencerId = this.customRequest.influencer.id;
      let id = this.customRequest.id;

      ///api/v1/influencers/${influencerId}/custom-request/${id}/complete
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${influencerId}/custom-request/${id}/complete`;
      let formData = new FormData();
      //Add the form data we need to submit
      if (this.uploadData.file) {
        this.$refs.progress.show();
        formData.append('file', this.uploadData.file);
      } else {
        formData.append('fileName', this.uploadData.URL);
      }
      const axiosSource = axios.CancelToken.source();
      this.request = {cancel: axiosSource.cancel, msg: "Loading..."};
      axios.patch(url, formData,
        {
          baseURL: getBaseURL(),
          headers: {
            'Authorization': `Bearer ${getToken(ACCESS_TOKEN)}`,
            'Content-Type': 'multipart/form-data',
            'base-url': getBaseURL()
          },
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100));
            if (this.uploadPercentage === 100) {
              this.progressText = 'Upload complete, please wait for sync up'
            }
          }.bind(this),
          cancelToken: axiosSource.token
        }
      ).then((response) => {
        this.$refs.progress.hide();
        console.log('Successful upload');
        this.$nextTick(() => {
          this.$emit('customRequestUploadCompleted');
        })
      }).catch((e) => {
        console.log('Unsuccessful upload');
        this.$refs.progress.hide();
        this.catchError(e);
      });
    },
    back() {
      this.hide();
      this.$emit('back');
    }
  }
}
</script>

<style scoped>

</style>
