<template>
  <div class="modal fade" id="upload-media" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <loading-modal :is-loading="isLoading"/>
    <div class="modal-dialog modal-dialog-centered modal-lg ">
      <div class="modal-content" style="background:#000; border: 1px solid #2f2f2f;">
        <div class="modal-header" style="border-bottom: 1px solid #1f1f1f;">
          <h5 class="modal-title text-white font-weight-500 font-size-20" id="exampleModalLabel">Upload Media</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <!-- <span aria-hidden="true">&times;</span> -->
          </button>
        </div>
        <div class="modal-body" style="background: #000;">
          <div class="contianer-fluid">
            <div class="row">
              <span class="danger ml-2" v-if="!isFileSelected">Please select a file</span>
              <div class="col-sm-12 ml-2 border border-dark mt-3 mb-3 d-flex flex-row justify-content-between rounded"
                   onclick="document.getElementById('fileInput').click();" style="width: 95%; height: 20vh;">
                <div class="rounded " style="width: 94px ; height:20vh; padding-top: 2rem">
                  <img v-show="!isVideo && isFileSelected" id="user_upload_image" src="@/assets/images/stella/no_avatar.png" alt="image"
                       style="width: 94px;" height="82px" class="rounded img-fluid">
                </div>
                <video v-show="isVideo && isFileSelected" controls oncontextmenu="return false;" controlsList="nodownload"
                       id="user_upload_video" style="max-width: 100%;max-height: 400px;">
                </video>
                <div v-if="!isFileSelected" class="upload-file-class col-12" style="color: #ff59d4; margin-top: 1rem; text-align: center">
                  <span class="glyphicon glyphicon-upload"></span>Browse for Media
                </div>
              </div>
              <input type="file" class="d-none" id="fileInput" accept="image/*,video/*,.pdf,.zip,.docx" ref="file"
                     @change="loadFile($event)">
              <div class="col-sm-12">
                <span>Message</span>
                <input type="text" class="coloredInput2 w-100 text-white mt-1" v-model="contentChatMessage.message"
                       placeholder="Enter message">
              </div>

              <required-field v-if="isSubmitted && isMessage && !$v.contentChatMessage.content.price.required"/>
              <div class="col-sm-12 mt-2">
                <span>Price to unlock media</span>
                <input type="number" class="coloredInput2 w-100 text-white mt-1"
                       v-model="contentChatMessage.content.price"
                       placeholder="Amount">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer" style="border-top: 1px solid #000;">
          <button type="button" class="btn  button-class font-weight-600"
                  style="width: 100%; padding: 12px 16px; border-radius: 12px;" @click="sendMsg()">Upload
          </button>
          <button type="button" class="btn btn-outline-secondary font-weight-600 text-white"
                  style="width: 100%; padding: 12px 16px; border-radius: 12px;" data-dismiss="modal">Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {httpMixin} from "@/mixin/http-mixin";
import {mapGetters} from "vuex";
import {SERVICE_DIRECT_MESSAGE} from "@/properties/micro-service";
import LoadingModal from "@/components/module/shared/LoadingModal";
import {required} from "vuelidate/lib/validators";
import RequiredField from "@/components/module/shared/RequiredField";
import '@/assets/styles/direct-message/direct-message-common.css';

export default {
  name: 'UploadMedia',
  props: {
    messageType: {
      default: 'message'
    }
  },
  mixins: [httpMixin],
  components: {RequiredField, LoadingModal},
  data() {
    return {
      contentChatMessage: {content: {}},
      messageSetting: null,
      receiverId: null,
      filterId: null,
      isFileSelected: false,
      isSubmitted: false,
      isVideo: false,
    }
  },
  validations: {
    contentChatMessage: {
      content: {price: {required}},
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    isMessage() {
      return this.messageType === 'message';
    },
  },
  methods: {
    show(receiverId, filterId) {
      $('#upload-media').modal();
      $("#user_upload_image").attr("src", require('@/assets/images/stella/no_avatar.png'));
      this.contentChatMessage = {content: {}};
      this.receiverId = receiverId;
      this.filterId = filterId;
      this.$refs.file.value = null;
      this.isFileSelected = false;
      this.isSubmitted = false;
      this.isVideo = false;
      this.getMessageSetting();
    },
    loadFile(event) {
      this.isFileSelected = !!this.$refs.file.files[0];
      if (!this.isFileSelected) {
        $('#user_upload_image').prop('src', "");
      }
      if (this.$refs.file.files[0].type.includes('video')) {
        this.isVideo = true;
        $('#user_upload_image').prop('src', "");
        $("#user_upload_video").attr("src", URL.createObjectURL(this.$refs.file.files[0]));
      } else {
        this.isVideo = false;
        $('#user_upload_image').prop('src', URL.createObjectURL(this.$refs.file.files[0]));
      }
    },
    hide() {
      $('#upload-media').modal('hide');
    },
    getMessageSetting() {
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/message-settings/influencers/${this.getUser.id}`;
      this.getData(url, (messageSetting) => {
        this.messageSetting = messageSetting;
        if (messageSetting) {
          this.contentChatMessage.content = {price: messageSetting.pricePerFile};
        }
      })
    },
    sendMsg() {
      if (this.isMessage) {
        this.sendMessage();
      } else {
        this.filterMessage();
      }
    },
    filterMessage() {
      this.isSubmitted = true;
      if (this.$v.$invalid || !this.$refs.file.files[0]) {
        return;
      }

      let infId = this.getUser.id;
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/filter-messages/influencers/${infId}/filter/${this.filterId}/content`

      let contentChatStr = JSON.stringify(this.contentChatMessage);
      let formData = new FormData();
      formData.append('file', this.$refs.file.files[0]);
      formData.append('contentFilterMessage', contentChatStr);
      this.uploadData(url, formData, (message) => {
        this.hide();
        this.$emit('messageSent', message);
      });
    },

    sendMessage() {
      this.isSubmitted = true;
      if (this.$v.$invalid || !this.$refs.file.files[0]) {
        return;
      }
      this.contentChatMessage.receiverId = this.receiverId;
      this.contentChatMessage.senderId = this.getUser.id;
      this.contentChatMessage.status = 'S';
      let contentChatStr = JSON.stringify(this.contentChatMessage);

      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/influencers/${this.getUser.id}/content`;
      let formData = new FormData();
      formData.append('file', this.$refs.file.files[0]);
      formData.append('contentChatMessage', contentChatStr);
      this.uploadData(url, formData, (message) => {
        this.hide();
        this.$emit('messageSent', message);
      });
    },
  }
}
</script>

<style scoped>
.upload-file-class {
  position: relative;
  /* width: 102px; */
  /* height: 10px; */
  overflow: hidden;
  cursor: pointer;
  padding-top: 3rem;
}

.upload-file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 10;
  background: #000;
}

.input-file-btn {
  display: block;
  position: absolute;
  top: 29%;
  left: 50%;
  /* width: 100%; */
  /* padding: 10px 8px; */
  background-color: #000;
  color: #E53BB9;
  text-decoration: none;
  cursor: pointer;
  /* font-size: 20px; */
}

@media only screen and (min-width: 1024px) {
  .dropdown > input {
    width: 90%;
  }

  .input-file-btn {
    display: block;
    position: absolute;
    top: 30%;
    left: 0;
    /* width: 100%; */
    /* padding: 10px 8px; */
    background-color: #000;
    color: #E53BB9;
    text-decoration: none;
    cursor: pointer;
    font-size: 20px;
  }
}
</style>
