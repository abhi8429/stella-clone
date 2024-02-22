<template>
  <section class="container-fluid">
    <div class="row p-md-4 pb-md-0">
      <div class="border-around border-md-1 border-0 p-2">
        <div class="hv-100">

          <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>


          <influencer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></influencer-menu>
          <header-menu @slideMenu="slideBar()" :is-loading="isLoading"></header-menu>
          <div class="container mt-5">
            <div class="row">
              <div class="col-12 col-sm-6 col-md-6 vertical-center mb-2" v-if="isNeedToAddExists">
                <!-- Here            -->
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
                  <input type="text" class="form-control px-0 font-gradient-a font-weight-bold"
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

            </div>
            <div class="row">
              <div class="col-md-4 col-12 mx-auto">
                <global-message></global-message>
                <div class="w-100 btn-group-vertical" role="group" aria-label="Button group with nested dropdown">
                  <button type="button" class="btn btn-custom-request"
                          @click="editCustomRequestOption(customRequestOption)"
                          v-for="(customRequestOption, index) in customRequestOptions" :key="index">
                    <span>{{ customRequestOption.title }}</span>
                    <span>${{ customRequestOption.price }}</span>
                  </button>
                </div>
                <div class="w-100 text-center">
                  <a href=""
                     class="font-size-16 text-white font-weight-bold"
                     @click.prevent="addCustomRequestOption()">Create a New Custom Request </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

import {httpMixin} from "@/mixin/http-mixin";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {constructCustomerURL} from "@/common/baseURL-service";
import {newSubscriptionMixin} from "@/mixin/new-subscription-mixin";
import titleMixin from "../../../../mixin/title-mixin";


export default {
  name: 'CustomRequestOptionList',
  title: 'Custom request options',
  mixins: [newSubscriptionMixin, titleMixin],
  components: {
    HeaderMenu, InfluencerMenu,
    GlobalMessage,

  },
  data() {
    return {
      user: [],
      customRequestOptions: [],
      showSlideBar: false,

    }
  },
  computed: {
    copyLabel() {
      return this.copied ? 'Copied' : 'Copy';
    }
  },
  created() {

    if (this.$route.query.saved) {
      this.setMessage('SAVED.SUCCESSFULLY');
    } else if (this.$route.query.deleted) {
      this.setMessage('DELETED.SUCCESSFULLY');
    }

    this.user = this.getUser();
    this.loadCustomRequestOptions();
    this.checkNewSubscription(this.user.id);

  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapActions(['setMessage']),
    constructCustomerURL,
    addCustomRequestOption() {
      this.$router.replace({name: 'CustomRequestOptionCreate'});
    },
    loadCustomRequestOptions() {
      // /api/v1/influencers/{influencerId}/custom-request-options/
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/custom-request-options/`;
      this.getData(url, (customRequestOptions) => {
        this.customRequestOptions = customRequestOptions;
      });
    },
    editCustomRequestOption(customRequest) {
      this.$router.replace({name: 'CustomRequestOptionCreate', params: {customRequestOptionId: customRequest.id}})
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    }
  }
}
;
</script>
<style scoped>
button>span{
  margin-left: 5%;
}

</style>


