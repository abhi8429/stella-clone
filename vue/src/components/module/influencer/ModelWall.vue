<template>
  <div id="profile_img_change" class="modal fade" tabindex="-1" role="dialog" style="display: none;"
       data-backdrop="static">
    <loading-modal :is-loading="isLoading"></loading-modal>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content outline-gradient-a border-radius-24" style="border-width:4px;">
        <div class="modal-body text-center ">
          <div class="py-2 text-end" @click="hide()">
            <img src="@/assets/images/stella/close.png"
                 class="img-fluid zoom-14">
          </div>
          <div class="pt-2 pb-4 font-size-24">
            <!--            <img id="wall_upload_image" v-if="url"
                             :src="url + '?ver=' + profileImgVer" class="img-fluid remove-img">-->
            <!--                     :src="require('../../../assets/images/tree.jpg')"-->
            <cropper ref="cropper" v-if="url || blobUrl"
                     :src="blobUrl ? blobUrl : url"
                     @ready="isLoading = false"
                     :stencil-props="{ aspectRatio}"
                     class="cropper"/>
            <img id="wall_upload_image" v-else
                 src="@/assets/images/default_user.png" class="img-fluid remove-img">
          </div>
          <input type="file" class="d-none" id="fileInput"
                 accept="image/*" ref="file" @change="loadFile($event)">
          <button type="button"
                  class="btn w-100 mx-0 font-family-poppins bg-white text-dark stella-modal-btn"
                  onclick="document.getElementById('fileInput').value = '';document.getElementById('fileInput').click();">
            Change photo
          </button>
          <div class="vertical-center">
            <button type="button"
                    class="btn w-100 font-family-poppins stella-modal-btn text-white stella-modal-btn-dark m-0"
                    @click="hide()">
              Cancel
            </button>
            <button type="button"
                    class="btn w-100 mx-0 font-family-poppins bg-white text-dark stella-modal-btn"
                    @click="cropWall()">
              Crop
            </button>
          </div>
          <div v-if="!isAvatar"
               class="text-danger text-center font-family-poppins my-3 cursor-pointer"
               @click="deleteWall()">Delete
          </div>
        </div>
      </div>
    </div>
    <model-progress ref="progress" v-if="isLoading"
                    :upload-percentage="uploadPercentage"
                    :text="progressText"
                    @cancel="cancelUpload()"/>
  </div>
</template>

<script>
import {Cropper} from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

import {SERVICE_CONTENT} from "@/properties/micro-service";
import axios from "axios";
import {ACCESS_TOKEN} from "@/properties/close-friend";
import {getBaseURL, getToken} from "@/common/http-common";
import {modelHttpMixin} from "@/mixin/model-http-mixin";
import ModelProgress from "@/components/module/shared/ModelProgress";
import {mapGetters} from "vuex";
import LoadingModal from "@/components/module/shared/LoadingModal";


export default {
  name: "ModelWall",
  mixins: [modelHttpMixin],
  components: {ModelProgress, LoadingModal, Cropper},
  data() {
    return {
      isFileSelected: false,
      profileImgVer: 0,
      uploadPercentage: 0,
      request: null,
      progressText: undefined,
      wall: null,
      url: null,
      imageType: null,
      blobUrl: null,
      file: null,
      isAvatar: false,
      aspectRatio: 0
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    show(wall, url, imageType, isAvatar = false) {
      this.wall = wall;
      this.url = url;
      this.imageType = imageType;
      this.profileImgVer = Math.random();
      this.file = null;
      this.isAvatar = isAvatar;
      this.blobUrl = null;
      this.aspectRatio = this.isAvatar ? 1 : 4 / 3;

      if (url) {
        this.url = this.url + '?ver=' + this.profileImgVer;
        this.isLoading = true;
      }
      $('#profile_img_change').modal();
    },
    hide() {
      $('#profile_img_change').modal('hide');
    },
    loadFile() {
      this.isLoading = true;
      $('#wall_upload_image').prop('src', URL.createObjectURL(this.$refs.file.files[0]));
      this.blobUrl = URL.createObjectURL(this.$refs.file.files[0]);
      this.file = this.$refs.file.files[0];
      // this.$emit('imageChanged', this.isAvatar, this.$refs.file.files[0]);
    },
    saveWall() {
      if (!this.file) {
        return;
      }
      console.log('handleFileUpload - start');
      this.isSubmitted = true;
      this.isLoading = true;
      this.isFileSelected = !!this.file;

      let url;
      if (!this.isAvatar) {
        url = `${SERVICE_CONTENT}/api/v1/influencers/${this.getUser.id}/wall?wallName=wall${this.wall}`;
      } else {
        url = `${SERVICE_CONTENT}/api/v1/influencers/${this.getUser.id}/avatar`;
      }
      //Add the form data we need to submit
      let formData = new FormData();
      formData.append('file', this.file);

      const axiosSource = axios.CancelToken.source();
      this.request = {cancel: axiosSource.cancel, msg: "Loading..."};
      axios.post(url, formData,
        {
          baseURL: getBaseURL(),
          headers: {
            'Authorization': `Bearer ${getToken(ACCESS_TOKEN)}`,
            'Content-Type': 'multipart/form-data'
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
        console.log('handleFileUpload - done');
        this.url = response.data;
        // this.$refs.progress.hide();
        this.isSubmitted = false;
        this.isLoading = false;
        this.profileImgVer = Math.random();
        this.url = this.url + '?ver=' + this.profileImgVer;
        this.blobUrl = null;
        this.$emit('imageChanged', this.isAvatar);
      }).catch((e) => {
        // this.$refs.progress.hide();
        this.isSubmitted = false;
        this.isLoading = false;
        this.catchError(e);
        this.warning = 'UPLOAD.CANCELLED';
      });
    },
    cancelUpload() {
      this.request.cancel();
      this.$refs.progress.hide();
    },
    deleteWall() {
      if (!this.url) {
        return;
      }

      let splits = this.url.split('/');
      let fileName = splits[splits.length - 1];
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.getUser.id}/wall/${fileName}`;
      this.delete(url, (data) => {
        this.$emit('imageChanged', this.isAvatar);
        this.changeWallToDefault();
      });
    },
    changeWallToDefault() {
      $('#wall_upload_image').prop('src', '');
      this.url = '';
      this.blobUrl = null;
      this.profileImgVer++;
    },
    cropWall() {

      let {canvas} = this.$refs.cropper.getResult();
      if (!canvas) {
        return;
      }

      let type;
      if (this.file) {
        type = this.file.type;
      } else {
        type = this.imageType;
      }
      canvas.toBlob((blob) => {
        this.file = new File([blob], `wall${this.wall}.jpg`, {type});
        if (this.blobUrl) {
          URL.revokeObjectURL(this.blobUrl);
        }
        // this.blobUrl = URL.createObjectURL(this.file);
        if (this.getUser.id) {
          this.saveWall();
        } else {
          this.$emit('imageChanged', this.isAvatar, this.file);
        }
      }, type);
    },
  }
}
</script>

<style scoped>
.cropper {
  min-height: 300px;
  width: 100%;
}

</style>
