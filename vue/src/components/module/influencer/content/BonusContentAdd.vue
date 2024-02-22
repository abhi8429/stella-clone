<template>
  <div>

    <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>


    <influencer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></influencer-menu>
    <header-menu @slideMenu="slideBar()" :is-loading="isLoading"></header-menu>

    <section class="closefriend-hero background-white">
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
            <div class="login-card">
              <global-message></global-message>
              <div class="login-body">
                <div class="custom-body mb-3">

                  <div class="input-group flex-nowrap stella-group">
                    <span class="input-group-text pe-0"></span>
                    <input type="text" class="form-control stella-group px-0 font-gradient-a font-weight-bold"
                    :value="constructCustomerURL(user.urlSuffix)"
                           readonly id="url-suffix">
                    <span class="input-group-text p-1 pe-2">
                      <button
                        id="copy_id"
                        class="btn py-2 px-3 font-size-18 copy-btn border-radius-12 text-white"
                        @click="copyNow('url-suffix')">{{ copyLabel }}</button>
                    </span>
                  </div>

                </div>


                <div status="upload" class="stella-upload-card text-center" onclick="document.getElementById('fileInput').click();">
                  <div class="img-wrapper-main">
                    <div class="upload-placeholder"></div>
                    <div data-upload class="font-grey font-size-16">Upload file</div>
                    <div data-uploading class="font-grey font-size-16">Uploading...</div>
                    <div data-uploaded class="font-grey font-size-16">File uploaded</div>
                    <div data-upload class="font-dark-grey font-size-14 mt-2">File must be less than xMB</div>
                    <div data-uploading class="font-dark-grey font-size-14 mt-2">The photo will be displayed as 4:5 ratio</div>
                    <!-- <div data-uploaded class="font-dark-grey font-size-14 mt-2">happybirthdayjack.mov</div> -->
                    <input type="file" class="d-none" id="fileInput" accept="image/*,video/*,.pdf,.zip,.docx" ref="file" @change="loadFile($event)">
                  </div>
                </div>
                <div class="upload-data mt-4" onclick="document.getElementById('fileInput').click();">
                  <img v-show="!isVideo"
                       src="@/assets/images/loading.svg"
                       id="user_upload_image"
                       class="img-fluid">
                  <video v-show="isVideo"
                         controls oncontextmenu="return false;" controlsList="nodownload"
                         id="user_upload_video"
                         style="max-width: 100%;max-height: 400px;">
                  </video>
                  <!-- <div class="remove-img rounded-pill">
                    <img class="zoom-7" src="@/assets/images/close.png">
                    <span class="ms-1 font-family-poppins font-size-14 font-dark-grey">Remove</span>
                  </div> -->
                </div>

                <span class="danger ml-2" v-if="!isFileSelected">Please select a file</span>

                <label for="description" class="font-grey">
                  <required-field v-if="isRequired('description')"/>
                </label>
                <div class="form-group">
                  <textarea
                         class="form-control stella-group"
                         placeholder="Description"
                         v-model="description"></textarea>
                </div>

                <div class="form-group">
                  <label for="price" class="font-grey">
                    <required-field v-if="isPaid && isRequired('price')"/>
                  </label>
                  <input type="number"
                         :placeholder="pricePlaceHolder"
                         class="form-control"
                         id="price_section"
                         v-model="price" :readonly="!isPaid">
                  <button type="button" id="toggle_price"
                          data-custom-position="true"
                          class="float-right btn btn-toggle-custom-bonus"
                          data-toggle="button" aria-pressed="true"
                          autocomplete="off" @click="toggle()">
                    <div class="handle"></div>
                  </button>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox"
                           class="custom-control-input"
                           tabindex="3" name="pinned" v-model="pinned" id="pinned-id">
                    <label class="custom-control-label" for="pinned-id">Pin this post to top of your page?</label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox"
                           class="custom-control-input"
                           name="pinned" v-model="notifySubscribers"
                           tabindex="3" id="notify-id">
                    <label class="custom-control-label" for="notify-id">Notify Subscribers?</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3  ">
            <div class="row justify-content-center mx-md-0 mx-0 mb-5">
              <div class="col-md-12 col-12 px-1 ">
                <button type="submit" @click="handleFileUpload()"
                        class="btn rounded-pill text-dark gradient-a btn-lg w-100">Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <model-progress ref="progress"
                    :upload-percentage="uploadPercentage"
                    :text="progressText"
                    @cancel="cancelUpload()"/>

  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

import {httpMixin} from "@/mixin/http-mixin";
import {newSubscriptionMixin} from "@/mixin/new-subscription-mixin";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import InfluencerHeader from "@/components/module/influencer/shared/InfluencerHeader";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import ModelProgress from "@/components/module/shared/ModelProgress";
import RequiredField from "@/components/module/shared/RequiredField";
import {required} from "vuelidate/lib/validators";
import {constructCustomerURL} from "@/common/baseURL-service";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import axios from "axios";
import {ACCESS_TOKEN, BASE_URL} from "@/properties/close-friend";
import {getBaseURL, getToken} from "@/common/http-common";
import {tipMixin} from "../../../../mixin/customer-account/tipMixin";

export default {
  name: 'BonusContentAdd',
  title: 'Add bonus content',
  mixins: [httpMixin, newSubscriptionMixin, tipMixin],
  components: {
    HeaderMenu, InfluencerMenu, ModelProgress,
    InfluencerHeader, GlobalMessage, RequiredField
  },
  data() {
    return {
      user: {},
      description: null,
      price: null,
      pinned: false,
      showSlideBar: false,
      isSubmit: false,
      isVideo: false,
      isPaid: false,
      isFileSelected: true,

      uploadPercentage: 0,
      request: null,
      progressText: undefined,
      notifySubscribers: true
    }
  },
  validations() {
    if (this.isPaid) {
      return {
        description: {required},
        price: {required}
      }
    } else {
      return {
        description: {required},
      }
    }
  },
  created() {
    this.user = this.getUser();
  },
  computed: {
    copyLabel() {
      return this.copied ? 'Copied' : 'Copy';
    },
    pricePlaceHolder() {
      return this.isPaid ? 'Price' : 'Free for subscribers';
    }
  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapActions(['setUser', 'setMessage', 'setWarning']),
    constructCustomerURL,
    cancelUpload() {
      this.request.cancel();
      this.$refs.progress.hide();
    },
    handleFileUpload() {

      this.isSubmit = true;
      this.isFileSelected = !!this.$refs.file.files[0];
      this.$v.$touch();
      if (this.$v.$invalid || !this.$refs.file.files[0]) {
        return;
      }

      this.$refs.progress.show();
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/content/`;
      let formData = new FormData();
      //Add the form data we need to submit
      formData.append('file', this.$refs.file.files[0]);
      formData.append('title', 'title');
      formData.append('description', this.description);
      formData.append('price', this.price ? this.price : '0');
      formData.append('pinned', this.pinned);
      formData.append('notifySubscribers', this.notifySubscribers);
      console.log(this.price ? this.price : '0');

      const axiosSource = axios.CancelToken.source();
      this.request = {cancel: axiosSource.cancel, msg: "Loading..."};
      axios.post(url, formData,
        {
          baseURL: getBaseURL(),
          headers: {
            'Authorization': `Bearer ${getToken(ACCESS_TOKEN)}`,
            'Content-Type': 'multipart/form-data',
            'base-url': BASE_URL
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
        this.$router.replace({name: 'BonusContentList', params: {isSaved: true}});
      }).catch((e) => {
        this.$refs.progress.hide();
        this.catchError(e, true);
        this.setWarning('UPLOAD.CANCELLED');
      });
    },
    isRequired(attrib) {
      return this.isSubmit && !this.$v[attrib].required;
    },
    toggle() {
      this.isPaid = !this.isPaid;
      this.price = !this.isPaid ? null : this.price;
    },
    loadFile() {
      $('.stella-upload-card').attr('status', 'uploading');

      this.isFileSelected = !!this.$refs.file.files[0];

      setTimeout(() => {

        $('.stella-upload-card').attr('status', 'uploaded');

        if (this.$refs.file.files[0].type.includes('video')) {
          this.isVideo = true;
          $('#user_upload_image').prop('src', "");
          $("#user_upload_video").attr("src", URL.createObjectURL(this.$refs.file.files[0]));
        } else {
          this.isVideo = false;
          $('#user_upload_image').prop('src', URL.createObjectURL(this.$refs.file.files[0]));
        }
        setTimeout(function(){
          $('.stella-upload-card').attr('status', 'hide');
        }, 500);

      }, 1000);
    },

    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },
  }
}

</script>



