<template>
  <div id="img_cropper" class="modal fade" tabindex="-1" role="dialog" style="display: none;"
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
            <img id="wall_upload_image" v-else ref="wallUploadImage"
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
    show(wall, urlOrFile, imageType, isAvatar = false) {
      console.log('WALL', wall);
      this.wall = wall;
      this.url = null;
      this.imageType = imageType;
      this.profileImgVer = Math.random();
      this.file = null;
      this.isAvatar = isAvatar;
      this.blobUrl = null;
      this.aspectRatio = this.isAvatar ? 1 : 4 / 3;

      if (urlOrFile instanceof File) {
        this.blobUrl = URL.createObjectURL(urlOrFile);
        this.file = urlOrFile;
      } else if (urlOrFile) {
        this.url = urlOrFile + '?ver=' + this.profileImgVer;
        // this.isLoading = true;
      }
      $('#img_cropper').modal();
    },
    hide() {
      $('#img_cropper').modal('hide');
    },
    loadFile() {
      this.isLoading = true;
      $('#wall_upload_image').prop('src', URL.createObjectURL(this.$refs.file.files[0]));
      this.blobUrl = URL.createObjectURL(this.$refs.file.files[0]);
      this.file = this.$refs.file.files[0];
      // this.$emit('imageChanged', this.isAvatar, this.$refs.file.files[0]);
    },
    cancelUpload() {
      this.request.cancel();
      this.$refs.progress.hide();
    },
    deleteWall() {
      if (this.url || this.file) {
        this.$emit('imageDeleted', this.isAvatar);
        this.changeWallToDefault();
        this.hide();
      }
    },
    changeWallToDefault() {
      // $('#wall_upload_image').prop('src', require('../../../assets/images/default_user.png'));
      this.url = '';
      this.blobUrl = null;
      this.profileImgVer++;
      this.$nextTick(() => {
        this.$refs.wallUploadImage.src = require('../../../assets/images/default_user.png');
      })
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
        console.log('this.file', this.file);
        this.file = new File([blob], this.file.name, {type});
        if (this.blobUrl) {
          URL.revokeObjectURL(this.blobUrl);
        }
        this.hide();
        this.$emit('imageChanged', this.isAvatar, this.file);
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
