<template>
  <section class="container-fluid">

    <div class="row  pb-md-0  h-100 px-2 d-flex flex-column">

      <!--        <header-help />-->

      <div class="col-lg-5 col-12  mx-auto">
        <logo></logo>
        <div
          :class="isDigis?'text-dark text-center font-size-18  mt-1 px-3 px-md-4 font-weight-500':'text-white text-center font-size-18  mt-1 px-3 px-md-4'">
          Set up your profile
        </div>
        <div
          :class="isDigis?' text-center text-dark font-size-14 text-white  px-3 px-md-4 mb-5 font-weight-500':'text-center text-white font-size-14 text-white  px-3 px-md-4 mb-5'">
          <span :style="isDigis?'color:black;font-size-14':'color: #c2c2c2;'">This is what your public profile will display.</span>
        </div>
      </div>

      <!--      style="height: 100%; padding: 0"  when images is showed-->
      <!--      style="height: 200px; padding: 0 when images is not visisble"-->
      <div class="col-lg-4 offset-lg-4 mt-2 position-relative"
           @click.self="showCover()"
           :class="isDigis?'new-input-bg-color-digis':'new-input-bg-color'"
           :style="coverStyle">
        <img :src="wall1ImgURL"
             id="wall_upload_image"
             class="img-fluid rounded" width="100%"
             v-if="wall1ImgURL"
             @click="showCover()">
        <p v-else class="text-center font-weight-500 position-absolute"
           style="top:40%; left: 50%;color: #b2a0e2"
           @click="showCover()">Upload Cover Photo</p>
        <div class="rounded" :class="isDigis?'img-profile-class-digis':'img-profile-class'"
             style="left: 3%;top:30%;position: absolute"
             @click.stop="showProfile()">
          <img :src="imgURL" v-if="imgURL"
               id="profile_upload_image"
               class="rounded img-fluid object-fit-contain"
               style="width: 80px; height: 80px;">
          <span v-else
                class="text-dark position-absolute font-size-12 font-weight-500"
                style="top: 10px; left: 0">Upload a profile picture</span>
        </div>
      </div>


      <div class="col-lg-5 col-12 mx-auto px-md-4" style="margin-top: .2rem; padding: 0">
        <global-message/>
      </div>
      <div class="col-lg-12 col-12 padding-manage-class" style="padding:0">
        <div
          class="col-lg-4 offset-lg-4 col-12 mx-auto mt-4 d-md-flex flex-md-row justify-content-md-between padding-manage-class"
          style="padding:0">
          <div class=" col-lg-4 padding-manage-class" style="padding:0">
            <span :class="isDigis?'text-dark font-size-14 font-weight-700':'text-white font-size-14 font-weight-700'">Bio</span>
            <p class="font-size-12 font-weight-500 mt-1" :style="isDigis?'color:#000':'color: #c2c2c2'">This will be
              shown on your public Stella
              page.</p>
          </div>
          <div class=" col-lg-7 padding-manage-class" style="padding:0">
            <div class="rounded" :style="isDigis?'':'background: #191919'">
              <!--          <input class="" placeholder="A short blurb that describes what your Stella is all about!">-->
              <textarea class=" py-3  font-size-14 col-12 rounded"
                        :style="isDigis?'border:2px solid #000;color:#000;':'color:#fff;background:#191919; border: 0px'"
                        v-model="user.bio"
                        placeholder="A short blurb that describes what your Stella is all about!"></textarea>
            </div>
            <p class="font-size-12 font-weight-500 mt-1" :style="isDigis?'color: #000':'color: #c2c2c2'">40/150</p>
          </div>

        </div>
        <div class="col-lg-4 col-12 offset-lg-4" style="margin-bottom: 5rem; padding: 0">
          <div class="col-12 col-md-6 d-none">
            <div class="form-group">
              <label class="text-white">Select subscriptions</label>
              <div class="row manage-padding">
                <div class="custom-checkbox custom-control dashboard-checkbox"
                     v-for="(platform, index) in user.influencerPlatforms" :key="index">
                  <input type="checkbox" class="custom-control-input"
                         true-value="Active"
                         false-value="Inactive" :disabled="platform.platform === PLATFORM_STELLA"
                         v-model="user.influencerPlatforms[index].status" :id="`platform_${index}`">
                  <label :for="`platform_${index}`" class="custom-control-label font-weight-400" style="color: #c2c2c2">
                    {{ platform.platform }}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="text-white font-size-14 font-weight-500">
            <span :class="isDigis?'text-dark font-size-14 font-weight-500':'text-white font-size-14 font-weight-500'">Links</span>
            <p :class="isDigis?'text-dark font-size-14 font-weight-400':'text-white font-size-14 font-weight-300'">Add
              links to your socials or other relevant URLs.</p>
          </div>
          <div
            class="col-12 d-md-flex flex-md-column justify-content-md-start  font-size-14 font-weight-400"
            style="padding:0"
            v-for="(influencerLink, index) in user.influencerLinks" :key="index">
            <required-field v-if="isSubmit && !$v.user.influencerLinks.$each[index].platformName.required"/>
            <input type="text" placeholder="Link title"
                   class="col-12 mb-3"
                   :class="isDigis?'setUpProfile-input-class-digis  text-dark dark-placeholder':'setUpProfile-input-class text-white white-placeholder'"
                   v-model="user.influencerLinks[index].platformName">
            <required-field v-if="isSubmit && !$v.user.influencerLinks.$each[index].url.required"/>
            <input type="text" placeholder="URL" class="col-12 mb-3"
                   :class="isDigis?'setUpProfile-input-class-digis  text-dark dark-placeholder':'setUpProfile-input-class text-white white-placeholder'"
                   v-model="user.influencerLinks[index].url">
            <div class="text-center py-2"
                 v-if="influencerLink.platformName || influencerLink.url">
              <span class="text-danger text-uppercase mx-2 cursor-pointer font-family-poppins"
                    @click="deleteLink(index)">delete</span>
            </div>
          </div>
          <!-- This is for mobile -->
          <div class="mb-2 font-size-14 font-weight-400 d-flex flex-column d-none">
            <input type="text" placeholder="Link title" class="mb-2"
                   :class="isDigis?'setUpProfile-input-class-digis  text-dark':'setUpProfile-input-class text-white '">
            <input type="text" placeholder="URL" class=" mb-3"
                   :class="isDigis?'setUpProfile-input-class-digis  text-dark':'setUpProfile-input-class text-white '">
            <input type="text" placeholder="Link title" class="mb-2"
                   :class="isDigis?'setUpProfile-input-class-digis  text-dark':'setUpProfile-input-class text-white '">
            <input type="text" placeholder="URL" class="mb-3"
                   :class="isDigis?'setUpProfile-input-class-digis  text-dark':'setUpProfile-input-class text-white '">
            <input type="text" placeholder="Link title" class="mb-2"
                   :class="isDigis?'setUpProfile-input-class-digis  text-dark':'setUpProfile-input-class text-white '">
            <input type="text" placeholder="URL" class="mb-2"
                   :class="isDigis?'setUpProfile-input-class-digis  text-dark':'setUpProfile-input-class text-white '">
          </div>

        </div>
      </div>


      <div class="col-lg-8  button-media-query d-flex flex-row justify-content-between pt-2 alignment-fix">
        <cancel-button @cancel="$router.back()"></cancel-button>
        <save-button @saved="save()"></save-button>
      </div>
    </div>

    <model-cropper ref="wall"
                   @imageChanged="imageChanged"
                   @imageDeleted="imageDeleted"/>
  </section>
</template>

<script>

import {httpMixin} from "@/mixin/http-mixin";
import titleMixin from "@/mixin/title-mixin";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import InfluencerHeader from "@/components/module/influencer/shared/InfluencerHeader";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import LogoutButton from "@/components/module/shared/LogoutButton";
import {PLATFORM_STELLA} from "@/properties/close-friend";
import {email, required, requiredIf} from "vuelidate/lib/validators";
import {mapActions, mapGetters} from "vuex";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {constructCustomerURL} from "@/common/baseURL-service";
import RequiredField from "@/components/module/shared/RequiredField";
import ModelCropper from "@/components/module/influencer/ModelCropper";
import Logo from "@/components/module/shared/Logo";
import CancelButton from "@/components/module/shared/CancelButton";
import SaveButton from "@/components/module/shared/SaveButton";
import {clone} from '@/common/Utils'

export default {
  name: 'CreatorSetUpProfile',
  title: 'Creator settings',
  mixins: [httpMixin, titleMixin],
  components: {
    SaveButton,
    CancelButton,
    Logo,
    RequiredField,
    HeaderMenu, InfluencerMenu, InfluencerHeader,
    GlobalMessage, LogoutButton, ModelCropper
  },
  data() {
    return {
      user: {},
      showURLs: [],
      showSlideBar: false,
      profileImgVer: 0,
      wall1ImgVer: 0,
      wall2ImgVer: 0,
      isSubmit: false,
      isAvatarMissing: false,
      imageURL: [],
      wallImgURLs: [],
      PLATFORM_STELLA,

      imageFile: null,
      wall1File: null,
    }
  },
  validations() {
    return {
      user: {
        name: {required},
        email: {required, email},
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
      }
    }
  },
  created() {
    this.user = clone(this.getUser());
    /*  if (this.getUser() && !this.getUser().id) {
        this.user = this.getUser();
      }*/
    if (this.user.id) {
      this.loadAvatarImg();
      this.loadWallImages();
    } else {
      this.imageFile = this.getImageFile();
      this.wall1File = this.getImageWall1();
    }
    this.checkLinks();
    this.loadPlatforms();
  },
  computed: {
    copyLabel() {
      return this.copied ? 'Copied' : 'Copy';
    },
    wall1ImgURL() {
      if (this.wall1File) {
        return URL.createObjectURL(this.wall1File);
      } else if (this.wallImgURLs.length !== 0) {
        return this.wallImgURLs[0][0];
      }
      return '';
    },
    wall1ImgType() {
      if (this.wallImgURLs.length === 0) {
        return '';
      } else {
        return this.wallImgURLs[0][1];
      }
    },
    /*    profileImgURL() {
          if (this.imageURL.length !== 0) {
            return this.imageURL[0].replace('dp', 'dp_150X150');
          }
          return '';
        },*/
    imgURL() {
      if (this.imageFile) {
        return URL.createObjectURL(this.imageFile);
      } else if (this.imageURL.length !== 0) {
        return this.imageURL[0];
      }
      return '';
    },
    imgType() {
      if (this.imageFile) {
        return this.imageFile.type;
      } else if (this.imageURL.length !== 0) {
        return this.imageURL[1];
      }
      return '';
    },
    coverStyle() {
      let style = '';
      if (this.isDigis) {
        style = 'border-radius:8px;';
      } else {
        style = 'border-radius:8px;';
      }
      //If images
      if (this.wall1ImgURL) {
        style = style + 'height:100%;padding:0;';
      } else {
        style = style + 'height:200px;padding:0;border:2px solid #000;';
      }
      return style;
    },
  },
  methods: {
    ...mapGetters(['getUser', 'getImageFile', 'getImageWall1']),
    ...mapActions(['setUser', 'setMessage', 'setImageFile', 'setImageWall1', 'setImageWall2']),
    imageChanged(isAvatar, file) {
      //Let us look into this latter
      if (isAvatar) {
        this.imageFile = file;
        this.$nextTick(() => {
          $('#profile_upload_image').prop('src', URL.createObjectURL(this.imageFile));
          $('#wall_upload_image').prop('src', URL.createObjectURL(this.wall1File));
        });
      } else {
        this.wall1File = file;
        this.$nextTick(() => {
          $('#wall_upload_image').prop('src', URL.createObjectURL(this.wall1File));
        });
      }
    },
    imageDeleted(isAvatar) {
      if (this.user.id && !isAvatar) {
        let splits = this.url.split('/');
        let fileName = splits[splits.length - 1];
        let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.getUser.id}/wall/${fileName}`;
        this.delete(url, (data) => {
          this.wall1File = null;
          this.$nextTick(() => {
            $('#wall_upload_image').prop('src', '');
          });
        });
      } else if (!isAvatar) {
        this.wall1File = null;
        this.$nextTick(() => {
          $('#wall_upload_image').prop('src', '');
        });
      }
    },
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
    checkLinks() {
      let len = this.user.influencerLinks.length;
      //Only three URL supported as of now, if more found then remove it
      if (len > 3) {
        this.user.influencerLinks.splice(3, len - 3);
      }
      for (let i = 0; i < (3 - len); i++) {
        this.user.influencerLinks.push({id: null, platformName: '', url: ''});
      }
      this.showURLs.push(...[{show: false}, {show: false}, {show: false}]);
    },
    constructCustomerURL,
    handleFileUpload() {

      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/avatar`;
      let formData = new FormData();
      //Add the form data we need to submit
      formData.append('file', this.$refs.file.files[0]);

      this.uploadData(url, formData, (data) => {
        this.loadAvatarImg();
      });
    },
    save() {
      this.isSubmit = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log('failed', this.$v);
        return;
      }

      this.removeEmptyLinks();
      this.setImageFile(this.imageFile);
      this.setImageWall1(this.wall1File);
      this.setUser(this.user);
      this.$router.push({name: 'SetPriceMobile'});
    },

    removeEmptyLinks() {
      // let len = this.user.influencerLinks.length;
      let filtered = this.user.influencerLinks.filter((influencerLink) => {
        return (influencerLink.platformName && influencerLink.url)
      });
      this.user.influencerLinks.splice(0);
      this.user.influencerLinks.push(...filtered);
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
      this.user.influencerLinks.push({id: null, platformName: '', url: ''});
    },
    loadPlatforms() {
      let found = this.user.influencerPlatforms.some((platform) => platform.platform === PLATFORM_STELLA);
      if (found === true) return true;
      this.getUnSecureData('identity/api/v1/lookup/platforms', (platforms) => {
        let stellaPlatform = platforms.find((platform) => platform.name === PLATFORM_STELLA);
        let infPlatform = {platform: stellaPlatform.name, platformId: stellaPlatform.id, status: 'Active'};
        this.user.influencerPlatforms.push(infPlatform);
      });
    },
    showCover() {
      let urlOrFile = this.wall1File ? this.wall1File : this.wall1ImgURL;
      this.$refs.wall.show('wall1', urlOrFile, this.wall1ImgType);
    },
    showProfile() {
      let urlOrFile = this.imageFile ? this.imageFile : this.imgURL;
      this.$refs.wall.show('dp', urlOrFile, this.imgType, true);
    },
  }

}
</script>


<style scoped>


.content-creator-p p {

  font-weight: 500;
  font-family: 16px;
  color: #1e1c18;
}

.img-profile-class {
  width: 80px;
  height: 80px;
  background: #303030;
  padding-top: 10px;
  padding-bottom: 6px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
}

.img-profile-class-digis {
  width: 80px;
  height: 80px;
  background: #b2a0e2;
  /*padding-top: 10px;*/
  /*padding-bottom: 6px;*/
  font-size: 12px;
  font-weight: 500;
  text-align: center;
}

.setUpProfile-input-class {
  background: #191919;
  border-radius: 8px;
  padding: 10px;
  border: 0px;
}

.setUpProfile-input-class-digis {
  background: #f2f2f2;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #f2f2f2;
}

.button-media-query2 {
  left: 17%;
  right: 17%;
}


@media only screen and (max-width: 767px) {
  .padding-manage-class {
    padding: 0;
    margin: 0;
  }

  .alignment-fix {
    padding: 0px;
  }


  .button-media-query2 {
    left: 0;
    right: 0;
  }

  .button-media-query {
    /*position:fixed;*/
    bottom: 0.8rem;
    /*left: 17%;*/
    /*right: 17%;*/
    border-top: 2px solid #1f1f1f;
  }

  .flex-class {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }
}


@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .button-media-query {
    /*position: fixed;*/
    bottom: 0.8rem;
    left: 0%;
    right: 0%;
    border-top: 2px solid #1f1f1f;
  }

  .manage-padding {
    margin-left: 0.2rem;
  }

  .button-media-query2 {


    left: 0%;
    right: 17%;
    /*border-top: 2px solid #1f1f1f;*/
  }

  .flex-class {
    display: flex;
    flex-direction: row;
    justify-content: start;
  }
}

@media only screen  and (min-width: 1024px) {
  .button-media-query {
    /*position:fixed;*/
    bottom: 0.8rem;
    left: 17%;
    right: 17%;
    border-top: 2px solid #1f1f1f;
  }

  .flex-class {
    display: flex;
    flex-direction: row;
    justify-content: start;
  }

  .manage-padding {
    margin-left: 0.2rem;
  }
}

</style>
