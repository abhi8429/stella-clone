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
                    <input type="text" class="form-control stella-group stella-group px-0 font-gradient-a font-weight-bold"
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

                <div id="show_image_here" class="text-center mb-3" style="cursor:pointer;">
                  <img v-if="content.type === TYPE_IMAGE"
                       :src="content.cdnUrl"
                       id="user_upload_image"
                       class="placeholder-image border-radius-10 ">
                  <video v-else oncontextmenu="return false;" controlsList="nodownload"
                         controls :src="content.cdnUrl"
                         id="user_upload_video"
                         style="max-width: 100%;max-height: 400px;">
                  </video>
                </div>
                <label for="description" class="font-grey">
                  <required-field v-if="isRequired('description')"/>
                </label>
                <div class="form-group">
                  <input type="text"
                         class="form-control stella-group"
                         placeholder="Description"
                         v-model="content.description">
                </div>

                <div class="form-group">
                  <label for="price" class="font-grey">
                    <required-field v-if="isPaid && isRequired('price')"/>
                  </label>
                  <input type="number"
                         :placeholder="pricePlaceHolder"
                         class="form-control stella-group"
                         id="price_section"
                         v-model="content.price" :readonly="!isPaid">
                  <button type="button" id="toggle_price"
                          data-custom-position="true"
                          class="float-right btn btn-toggle-custom-bonus"
                          data-toggle="button" aria-pressed="true"
                          autocomplete="off" @click="toggle()">
                    <div class="handle"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3  mt-5 pt-5 ">

            <div class="btn-group-lg ios-ui-select btn-group-vertical upload-section w-100" role="group" aria-label="Basic example">
              <button type="button" class="btn font-family-poppins btn-dark border-radius-10 " @click="archiveContent()">Archive</button>
              <button type="button" class="btn font-family-poppins btn-dark border-radius-10" @click="deleteContent()">Delete</button>
            </div>
            <div class="row justify-content-center mx-md-0 mx-0 mt-3 mb-5">
              <div class="col-md-12 col-12 px-1 ">
                <button type="submit" @click="save()"
                        class="btn rounded-pill text-dark gradient-a btn-lg w-100">Submit
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

import {mapActions, mapGetters} from "vuex";

import {httpMixin} from "@/mixin/http-mixin";
import {newSubscriptionMixin} from "@/mixin/new-subscription-mixin";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import InfluencerHeader from "@/components/module/influencer/shared/InfluencerHeader";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import RequiredField from "@/components/module/shared/RequiredField";
import {required} from "vuelidate/lib/validators";
import {constructCustomerURL} from "@/common/baseURL-service";
import {clone} from "@/common/Utils";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import titleMixin from "../../../../mixin/title-mixin";

const TYPE_IMAGE = 'IMAGE';

export default {
  name: 'BonusContentEdit',
  title: 'Edit bonus content',
  mixins: [httpMixin, newSubscriptionMixin, titleMixin],
  components: {
    HeaderMenu, InfluencerMenu,
    InfluencerHeader, GlobalMessage, RequiredField
  },
  data() {
    return {
      user: {},
      content: {},
      oldContent: {},
      showSlideBar: false,
      isSubmit: false,
      isVideo: false,
      isPaid: false,
      TYPE_IMAGE
    }
  },
  validations() {
    if (this.isPaid) {
      return {
        content: {
          description: {required},
          price: {required}
        }
      }
    } else {
      return {
        content: {
          description: {required}
        }
      }
    }
  },
  created() {
    this.clearGlobalMessages();
    this.user = this.getUser();
    let contentId = this.$route.params.contentId
    let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/content/${contentId}`;
    this.getData(url, (data) => {
      this.oldContent = clone(data);
      this.setUpData(data, true);
    });
  },
  computed: {
    copyLabel() {
      return this.copied ? 'Copied' : 'Copy';
    },
    pricePlaceHolder() {
      return this.isPaid ? 'Price' : 'Free';
    }
  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapActions(['setUser', 'setMessage', 'clearGlobalMessages']),
    constructCustomerURL,
    setUpData(data, toggle) {
      this.content = data;
      if (this.content.price > 0) {
        this.isPaid = true;
        // If it was paid earlier then keep it as paid,
        // otherwise toggle will make it as free
        if (toggle) {
          this.switchOnToggle();
        }
      } else {
        this.content.price = null;
        this.isPaid = false;
      }
    },
    switchOnToggle() {
      this.$nextTick(() => {
        $('#toggle_price').button('toggle');
      });
    },
    save() {

      this.isSubmit = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log('failed', this.$v);
        return;
      }

      this.content.price = this.content.price ? this.content.price : '0'
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/content/${this.content.id}`;
      this.patchData(url, this.content, (data) => {
        this.setUpData(data, !(this.oldContent.price > 0));
        this.setMessage('SAVED.SUCCESSFULLY');
      });
    },
    deleteContent() {

      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/content/${this.content.id}`;
      this.getDelete(url, (data) => {
        this.$router.replace({name: 'BonusContentList', params: {isDeleted: true}});
      });
    },
    archiveContent() {
      this.oldContent.price = this.oldContent.price ? this.oldContent.price : '0'
      this.oldContent.active = false;
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/content/${this.oldContent.id}`;
      this.patchData(url, this.oldContent, (data) => {
        this.$router.replace({name: 'BonusContentList', params: {isArchived: true}});
      });
    },
    isRequired(attrib) {
      return this.isSubmit && !this.$v.content[attrib].required;
    },
    toggle() {
      this.isPaid = !this.isPaid;
      this.content.price = !this.isPaid ? null : this.content.price;
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },
  }
}
;
</script>



