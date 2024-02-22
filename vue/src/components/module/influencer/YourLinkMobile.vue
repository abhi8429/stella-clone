<template>
  <div>


    <HeaderHelp :is-loading="isLoading"></HeaderHelp>
    <section class="closefriend-hero background-white">
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
            <div class="custom-card">
              <div class="py-4 text-center">
                <h1>Here’s Your Link</h1>
              </div>
              <global-message></global-message>
              <div class="custom-body">
                <div class="input-group mt-3">
                  <input type="text" class="form-control link" name="number" id="url-suffix"
                         :value="constructCustomerURL(user.urlSuffix)">
                  <div class="input-group-prepend">
                                        <span class="input-group-text copy-link">
                                            <span id="copy_id" class="btn btn-copy-link" @click="copyNow('url-suffix')">{{ copyLabel }}</span>
                                        </span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="float-left my-2">
                    <p>
                      1. Add this link to your Instagram bio
                      <br>
                      2. Share this link in your swipe-up stories
                      <br>
                      3. Log in to closefriend.io to see who you need to add to your IG close friend. We’ll email you a reminder if you forget
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3 position-bottom ">
            <div class="row justify-content-center mx-md-0 mx-1">
              <div class="col-md-4 col-6 px-1 ">
                <button type="button" class="btn btn-disbled-outline btn-lg btn-block mt-3 btn-mobile font-size-15-18"
                        @click="previous()">Previous
                </button>
              </div>
              <div class="col-md-4 offset-md-4 col-6 px-1 ">
                <button type="button" class="btn btn-success btn-lg btn-block mt-3 btn-mobile font-size-15-18"
                        @click="continueForward()">Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import {httpMixin} from "@/mixin/http-mixin";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import HeaderHelp from "@/components/module/influencer/shared/HeaderHelp";
import {copy} from '@/common/Utils';
import {constructCustomerURL} from "@/common/baseURL-service";
import {getLoginBody, storeToken} from "@/common/login-service";
import {AXIOS_LOGIN} from "@/common/http-common";
import {commMsg} from "@/properties/common-messages";
import titleMixin from "../../../mixin/title-mixin";

export default {
  name: 'YourLinkMobile',
  title: 'Your link',
  components: {HeaderHelp, GlobalMessage},
  mixins: [httpMixin, titleMixin],
  data() {
    return {
      user: {},
      copied: false
    }
  },
  created() {
    this.user = this.getUser();
  },
  computed: {
    copyLabel() {
      return this.copied ? 'Copied' : 'Copy';
    }
  },
  methods: {
    ...mapActions(['setUser', 'setImageFile','pushGlobalError','setMessage']),
    ...mapGetters(['getUser', 'getImageFile']),
    copy,
    copyNow(urlSuffix) {
      this.copy(urlSuffix);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    },
    constructCustomerURL,
    previous() {
      this.setUser(this.user);
      this.$router.push({name: 'SetPriceMobile'});
    },
    continueForward() {

      console.log('this.getImageFile()', this.getImageFile());
      this.postUnsecureData('identity/api/v1/influencers/', this.user, (data) => {
        this.setUser(data);
        this.login(data.id);
      });
    },
    uploadImage(userId) {

      let url = `content/api/v1/influencers/${userId}/avatar`;
      let formData = new FormData();
      //Add the form data we need to submit
      formData.append('file', this.getImageFile());

      this.uploadData(url, formData, (data) => {
        this.setImageFile(null);
      });

    },
    goTo() {
      this.setMessage('Saved successfully');
      this.$router.replace({name: 'CreatorDashboardMobile', params: {isSaved: true}});
    },
    login(id) {
      this.isLoading = true;
      let body = getLoginBody(this.user.email, this.user.password);

      AXIOS_LOGIN.post('identity/oauth/token', body)
        .then(response => {
          this.isLoading = false;
          storeToken(response);
          if (this.getImageFile()) {
            this.uploadImage(id);
          }
          this.goTo();
        })
        .catch(error => {
          this.isLoading = false;
          if (error.response) {
            if (error.response.status === 400) {
              // this.error = commMsg['Login.Invalid'];
              this.pushGlobalError(commMsg['Login.Invalid']);
            } else {
              // this.error = error.response.data;
              this.pushGlobalError(error.response.data);
            }
          } else if (error.request) {
            this.pushGlobalError(commMsg['Login.Invalid']);
          } else {
            // Something happened in setting up the request that triggered an Error
            this.pushGlobalError(error.message);
          }
        })
    }
  }
}
;
</script>

