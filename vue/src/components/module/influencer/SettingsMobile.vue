<template>
  <section class="container-fluid">
    <div class="row p-md-4 pb-md-0">
      <div class="border-around border-md-1 border-0 p-2">
        <div>

          <b :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>

          <influencer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></influencer-menu>
          <header-menu @slideMenu="slideBar()" :is-loading="isLoading"></header-menu>

          <section class="closefriend-hero background-white">
            <div class="container mt-3">
              <div class="row">

                <div class="col-12 col-sm-6 col-md-6 vertical-center mb-2" v-if="isNeedToAddExists">
                  <!-- Here -->

                  <div class="gradient-a border-radius-10 w-100">

                    <div class="bg-animation d-flex p-3 px-3 align-items-center justify-content-between">
                      <div class="d-flex align-items-center">
                        <img class="img-fluid me-2" src="@/assets/images/stella/dash-side-icon.svg">
                        <span class="text-dark font-weight-800 font-size-16">You have new subscribers</span>
                      </div>
                      <div class="d-flex align-items-center">
                        <img class="img-fluid ms-1" src="@/assets/images/stella/arrow-simple-right-black.svg"
                          @click="goToNewSubscription()">
                      </div>
                    </div>

                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-6 vertical-center mb-2">

                  <div class="input-group flex-nowrap stella-group">
                    <span class="input-group-text pe-0"></span>
                    <input type="text" class="form-control stella-group px-0 font-gradient-a font-weight-bold"
                      :value="constructCustomerURL(user.urlSuffix)" readonly id="url-suffix">
                    <span class="input-group-text p-1 pe-2">
                      <button id="copy_id" class="btn py-2 px-3 font-size-18 copy-btn border-radius-12 text-white"
                        @click="copyNow('url-suffix')">{{ copyLabel }}</button>
                    </span>
                  </div>

                </div>
                <div class="col-12"></div>

                <div class="col-12 col-sm-12 col-md-12">
                  <div class="custom-card">
                    <div class="custom-body">
                      <div class="">
                        <div class="form-block blocked-friends-section p-0 p-md-2">
                          <div class="row py-3 mx-1">
                            <div class="col-md-3 col-12">
                              <h5 class="ml-4 mt-2 font-size-24 font-weight-bold">Account Settings</h5>
                            </div>
                          </div>
                          <global-message></global-message>
                          <div class="row  py-md-3 mx-1 pb-0">
                            <div class="col-md-4 col-12 d-flex justify-content-around zoom-8 pe-md-5">
                              <!-- <img v-if="!isAvatarMissing"
                                   :src="imageURL[0]"
                                   class="profile-picture" @error="imageLoadError">
                              <img v-else src="@/assets/images/default_user.png" class="customer-subscribe-image">
                              <button
                                class="btn btn-bg-light-green font-success border-radius-6 font-size-12-14 mt-md-4 mb-md-0 my-4 px-5 py-2 mx-auto"
                                onclick="$('#file_upload').trigger('click')">Change avatar
                              </button>
                              <input type="file" class="form-control stella-group d-none"
                                     id="file_upload" name="file" ref="file" @change="handleFileUpload()"
                                     accept="image/png, image/gif, image/jpeg"> -->

                              <div class="img-wrapper"
                                style="justify-content: center;position: relative;height: fit-content;">
                                <div class="img-wrapper-main">
                                  <img class="img-fluid rounded-circle" v-if="!isAvatarMissing" :src="profileImgURL"
                                    @error="imageLoadError">
                                  <img v-else src="@/assets/images/default_user.png" class="img-fluid rounded-circle">
                                  <input type="file" ref="file" name="image_document" class="d-none" id="file_upload"
                                    accept="image/*" @change="handleFileUpload()">
                                </div>
                                <span style="position: absolute; bottom: 10px; right: 0;" class="edit-icon zoom-8"
                                  @click="$refs.wall.show('dp', imgURL, imgType, true)">
                                  <img class="img-fluid invert-color" src="@/assets/images/stella/edit.png">
                                </span>
                              </div>


                              <div class="img-wrapper text-center mx-2">
                                <div class="img-wrapper-main rounded-coners"
                                  @click="$refs.wall.show(1, wall1ImgURL, wall1ImgType)">
                                  <img class="img-fluid" v-if="!wall1ImgURL"
                                    src="@/assets/images/stella/img-upload-placeholder.png">
                                  <img class="img-fluid" v-else :src="wall1ImgURL + '?ver=' + wall1ImgVer">
                                </div>
                              </div>

                              <div class="img-wrapper text-center mx-2">
                                <div class="img-wrapper-main rounded-coners"
                                  @click="$refs.wall.show(2, wall2ImgURL, wall2ImgType)">
                                  <img class="img-fluid" v-if="!wall2ImgURL"
                                    src="@/assets/images/stella/img-upload-placeholder.png">
                                  <img class="img-fluid" v-else :src="wall2ImgURL + '?ver=' + wall2ImgVer">
                                </div>
                              </div>
                            </div>


                            <div class="col-md-8 col-12 vertical-center justify-content-md-start mt-md-0 mt-3 ">
                              <div class="row px-1 profile-form">
                                <div class="col-12 col-md-6 px-md-1">

                                  <div class="form-group">
                                    <label for="">Name<span class="danger">*</span>
                                    </label>
                                    <input type="text" class="form-control stella-group" placeholder="Example: Adam"
                                      v-model="user.name">
                                    <span class="error invalid-feedback" v-if="isRequired('name')">This is required
                                      field</span>
                                  </div>
                                </div>

                                <div class="col-12 col-md-12 px-md-1">

                                  <div class="form-group">
                                    <label for="">Bio</label>
                                    <input type="text" class="form-control stella-group" placeholder="Bio"
                                      v-model="user.bio">
                                  </div>
                                </div>

                                <div class="col-12 col-md-12 px-md-1">
                                  <div class="form-group">
                                    <label for="">Email<span class="danger">*</span>
                                    </label>
                                    <input type="text" class="form-control stella-group"
                                      placeholder="Example: myemail@com" v-model="user.email">
                                    <span class="error invalid-feedback" v-if="isRequired('email')">This is required
                                      field</span>
                                    <span class="error invalid-feedback" v-if="isValidEmail()">Not a valid email
                                      address</span>
                                  </div>
                                </div>

                                <div class="col-12 col-md-6 px-md-1">
                                  <div class="form-group">
                                    <label for="">Password</label>
                                    <input type="password" class="form-control stella-group full-border"
                                      placeholder="Update password" autocomplete="false" v-model.trim="pwd">
                                    <span v-if="isSubmit && !$v.pwd.required" class="error invalid-feedback">This is
                                      required field</span>
                                  </div>
                                </div>

                                <div class="col-12 col-md-6 px-md-1">
                                  <div class="form-group">
                                    <label for="">Repeat password</label>
                                    <input type="password" class="form-control stella-group full-border"
                                      placeholder="Re-enter new password" v-model.trim="repeatPassword">
                                    <span v-if="isSubmit && !$v.repeatPassword.required"
                                      class="error invalid-feedback">This is required field</span>
                                    <span v-else-if="isSubmit && !$v.repeatPassword.sameAs"
                                      class="error invalid-feedback">Passwords must match</span>
                                  </div>
                                </div>
                                <div class="col-12 col-md-6 px-md-1">
                                  <div class="form-group">
                                    <label>Select subscriptions</label>
                                    <div class="row">
                                      <div class="custom-checkbox custom-control dashboard-checkbox"
                                        v-for="(platform, index) in user.influencerPlatforms" :key="index">
                                        <input type="checkbox" class="custom-control-input" true-value="Active"
                                          false-value="Inactive" :disabled="platform.platform === PLATFORM_STELLA"
                                          v-model="user.influencerPlatforms[index].status" :id="`platform_${index}`">
                                        <label :for="`platform_${index}`" class="custom-control-label">{{
                                          platform.platform }}</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-12 col-md-6 px-md-1">
                                  <div class="form-group">
                                    <label for="">Price (Monthly)<span class="danger">*</span>
                                    </label>
                                    <input type="number" class="form-control stella-group"
                                      :placeholder="`Monthly price(currently $${getUser().monthlyPrice})`"
                                      v-model.trim="user.monthlyPrice" readonly>
                                    <span class="error invalid-feedback" v-if="isRequired('monthlyPrice')">This is
                                      required field</span>
                                  </div>
                                </div>

                                <div class="col-12 col-md-6 px-md-1">
                                  <div class="form-group">
                                    <label for="">Custom Requests Min Price<span class="danger">*</span></label>
                                    <input type="number" class="form-control stella-group"
                                      v-model.trim="user.customRequestMinPrice">
                                    <span class="error invalid-feedback" v-if="isRequired('customRequestMinPrice')">This
                                      is required field</span>
                                  </div>
                                </div>

                                <div class="col-12"></div>

                                <div class="col-12 col-md-12 px-md-1">
                                  <label for="">Links</label>
                                </div>

                                <div class="col-12 col-md-12 px-md-1 my-2"
                                  v-for="(influencerLink, index) in user.influencerLinks" :key="index">

                                  <span v-if="isSubmit && !$v.user.influencerLinks.$each[index].platformName.required"
                                    class="error invalid-feedback">This is required field</span>
                                  <div class="input-group flex-nowrap stella-group">
                                    <input type="text" name="link_title" class="form-control stella-group"
                                      style="color:#000!important" placeholder="Enter a Title"
                                      v-model="user.influencerLinks[index].platformName">
                                    <div class="input-group-prepend input-group-text bg-white p-3">
                                      <!-- add/remove class d-none to show hide  -->
                                      <span
                                        class="bedge link-add-bedge cursor-pointer text-uppercase mx-0 font-family-poppins"
                                        @click="addOrEditLink(index)" v-if="!influencerLink.id">Add url</span>
                                      <span
                                        class="bedge link-edit-bedge cursor-pointer text-uppercase mx-0 font-family-poppins"
                                        v-if="influencerLink.id" @click="addOrEditLink(index)">edit</span>
                                      <!-- add/remove class d-none to show hide  -->
                                    </div>
                                  </div>
                                  <span v-if="isSubmit && !$v.user.influencerLinks.$each[index].url.required"
                                    class="error invalid-feedback">This is required field</span>
                                  <div class="input-group flex-nowrap stella-group mt-2"
                                    v-if="showURLs[index].show || (influencerLink.platformName && !influencerLink.id)">
                                    <input type="text" name="link_title" class="form-control stella-group p-2 px-3"
                                      style=" background: #aaa !important; " placeholder="Enter URL"
                                      v-model="user.influencerLinks[index].url">
                                    <!--                                    <div class="input-group-prepend input-group-text bg-white p-2"
                                                                             style=" background: #aaa !important; ">
                                                                          <span class="bedge link-save-bedge text-uppercase mx-0 font-family-poppins py-1">save</span>
                                                                        </div>-->
                                  </div>

                                  <div class="text-center py-2" v-if="influencerLink.platformName || influencerLink.url">
                                    <span class="text-danger text-uppercase mx-0 cursor-pointer font-family-poppins"
                                      @click="deleteLink(index)">delete</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row py-md-3 pb-3 mx-4">
                            <div class="col-md-2 p-0">
                              <logout-button></logout-button>
                            </div>
                            <div class="col-md-2 p-0 offset-md-8">
                              <button type="button" class="btn rounded-pill text-dark gradient-a btn-lg w-100"
                                @click="save()">Save
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <model-wall ref="wall" @imageChanged="(isAvatar) => {
      if (!isAvatar) {
        loadWallImages();
      } else {
        loadAvatarImg();
      }
    }" />
  </section>
</template>
<script>

import { mapActions, mapGetters } from "vuex";

import { httpMixin } from "@/mixin/http-mixin";
import { clone, isStringWithOnlySpaces } from "@/common/Utils";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import InfluencerHeader from "@/components/module/influencer/shared/InfluencerHeader";
import { email, required, sameAs, requiredIf } from "vuelidate/lib/validators";
import { constructCustomerURL } from "@/common/baseURL-service";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import { newSubscriptionMixin } from "@/mixin/new-subscription-mixin";
import LogoutButton from "@/components/module/shared/LogoutButton";
import { SERVICE_CONTENT, SERVICE_IDENTIY } from "@/properties/micro-service";
import ModelWall from "@/components/module/influencer/ModelWall";
import { PLATFORM_STELLA } from "@/properties/close-friend";
import titleMixin from "../../../mixin/title-mixin";

export default {
  name: 'SettingsMobile',
  title: 'Creator settings',
  mixins: [httpMixin, newSubscriptionMixin, titleMixin],
  components: {
    HeaderMenu, InfluencerMenu, InfluencerHeader,
    GlobalMessage, LogoutButton, ModelWall
  },
  data() {
    return {
      user: {},
      pwd: '',
      repeatPassword: '',
      showURLs: [],
      showSlideBar: false,
      profileImgVer: 0,
      wall1ImgVer: 0,
      wall2ImgVer: 0,
      isSubmit: false,
      isAvatarMissing: false,
      imageURL: '',
      wallImgURLs: [],
      PLATFORM_STELLA,
    }
  },
  validations() {
    return {
      user: {
        name: { required },
        email: { required, email },
        /*   password: {required},*/
        monthlyPrice: { required },
        customRequestMinPrice: { required },
        influencerLinks: {
          required,
          $each: {
            platformName: {
              required: requiredIf((link) => {
                return !!link.url;
              })
            },
            url: {
              required: requiredIf((link) => {
                return !!link.platformName;
              })
            },
          }
        }
      },
      repeatPassword: {
        required: requiredIf(() => {
          return !!this.pwd;
        }),
        sameAs: sameAs(() => {
          return this.pwd;
        })
      },
      pwd: {
        required: requiredIf(() => {
          return !!this.repeatPassword;
        }),
      },
    }
  },
  created() {
    this.user = clone(this.getUser());
    this.user.password = '';
    this.checkLinks();
    this.checkNewSubscription(this.user.id);
    this.loadAvatarImg();
    this.loadWallImages();
  },
  computed: {
    copyLabel() {
      return this.copied ? 'Copied' : 'Copy';
    },
    wall1ImgURL() {
      if (this.wallImgURLs.length === 0) {
        return '';
      } else {
        return this.wallImgURLs[0][0];
      }
    },
    wall1ImgType() {
      if (this.wallImgURLs.length === 0) {
        return '';
      } else {
        return this.wallImgURLs[0][1];
      }
    },
    wall2ImgURL() {
      if (this.wallImgURLs.length === 0 || this.wallImgURLs.length === 1) {
        return '';
      } else {
        return this.wallImgURLs[1][0];
      }
    },
    wall2ImgType() {
      if (this.wallImgURLs.length === 0 || this.wallImgURLs.length === 1) {
        return '';
      } else {
        return this.wallImgURLs[1][1];
      }
    },
    profileImgURL() {
      if (this.imageURL.length !== 0) {
        return this.imageURL[0].replace('dp', 'dp_150X150');
      }
      return '';
    },
    imgURL() {
      if (this.imageURL.length !== 0) {
        return this.imageURL[0];
      }
      return '';
    },
    imgType() {
      if (this.imageURL.length !== 0) {
        return this.imageURL[1];
      }
      return '';
    },
  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapActions(['setUser', 'setMessage']),
    loadWallImages() {
      this.wallImgURLs.splice(0);
      let url = `${SERVICE_CONTENT}/api/v1/public/influencers/${this.user.id}/wall`;
      this.getUnSecureData(url, (wallImgURLs) => {
        this.wall1ImgVer = Math.random();
        this.wall2ImgVer = Math.random();
        let wall1 = wallImgURLs.find(e => e[0].includes('wall1.'));
        let wall2 = wallImgURLs.find(e => e[0].includes('wall2.'));
        if (wall1) {
          this.wallImgURLs.push(wall1);
        }
        if (wall2) {
          this.wallImgURLs.push(wall2);
        }
      });
    },
    checkLinks() {
      let len = this.user.influencerLinks.length;
      //Only three URL supported as of now, if more found then remove it
      if (len > 3) {
        this.user.influencerLinks.splice(3, len - 3);
      }
      for (let i = 0; i < (3 - len); i++) {
        this.user.influencerLinks.push({ id: null, platformName: '', url: '' });
      }
      this.showURLs.push(...[{ show: false }, { show: false }, { show: false }]);
    },
    constructCustomerURL,
    loadAvatarImg() {
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/crop-avatar`;
      this.getUnSecureData(url, (imageURL) => {
        if (imageURL.length !== 0) {
          this.profileImgVer = Math.random();
          this.imageURL = imageURL;
          this.imageURL[0] = this.imageURL[0] + '?ver=' + this.profileImgVer++;
          this.isAvatarMissing = false;
        } else {
          this.isAvatarMissing = true;
        }
      });
    },
    handleFileUpload() {

      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/avatar`;
      let formData = new FormData();
      //Add the form data we need to submit
      formData.append('file', this.$refs.file.files[0]);

      this.uploadData(url, formData, (data) => {
        this.loadAvatarImg();
      });
    },
    isRequired(attrib) {
      return this.isSubmit && !this.$v.user[attrib].required;
    },
    isValidEmail() {
      return this.isSubmit && !this.$v.user.email.email;
    },

    save() {
      this.isSubmit = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log('failed', this.$v);
        return;
      }

      this.user.password = this.pwd;
      this.user.annuallyPrice = this.user.monthlyPrice * 10;
      this.$set(this.user, 'email', this.user.email);
      this.$set(this.user, 'influencerPlatforms', this.user.influencerPlatforms);
      this.$set(this.user, 'influencerLinks', this.user.influencerLinks);
      this.removeEmptyLinks();

      this.patchData(`${SERVICE_IDENTIY}/api/v1/influencers/${this.user.id}`, this.user, (data) => {
        this.user = data;
        this.pwd = this.repeatPassword = '';
        this.isSubmit = false;
        this.setUser(data);
        this.checkLinks();
        this.setMessage('SAVED.SUCCESSFULLY');
      });
    },
    removeEmptyLinks() {
      // let len = this.user.influencerLinks.length;
      let filtered = this.user.influencerLinks.filter((influencerLink) => {
        return (influencerLink.platformName && influencerLink.url)
      });
      /* for (let i = 0; i < len; i++) {
         if (!this.user.influencerLinks[i].platformName && !this.user.influencerLinks[i].url) {
           this.user.influencerLinks.splice(i, 1);
         }
       }*/
      this.user.influencerLinks.splice(0);
      this.user.influencerLinks.push(...filtered);
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },
    imageLoadError(event) {
      this.isAvatarMissing = true;
    },
    addOrEditLink(index) {
      //this.links[index].addURL = true;
      this.showURLs[index].show = true;
    },
    deleteLink(index) {
      this.user.influencerLinks.splice(index, 1);
      this.user.influencerLinks.push({ id: null, platformName: '', url: '' });
    }
  }
}
  ;
</script>


