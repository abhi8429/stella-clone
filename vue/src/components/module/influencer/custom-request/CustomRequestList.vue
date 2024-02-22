<template>
<section class="container-fluid">
  <div class="row p-md-4 pb-md-0">
    <div class="border-around border-md-1 border-0 p-2">
      <div>

        <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>


        <influencer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></influencer-menu>
        <header-menu @slideMenu="slideBar()" :is-loading="isLoading"></header-menu>

        <section class="closefriend-hero background-white">
          <div class="container mt-3">
            <global-message></global-message>
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
                      <img class="img-fluid ms-1" src="@/assets/images/stella/arrow-simple-right-black.svg"  @click="goToNewSubscription()">
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
                  <span  class="input-group-text p-1 pe-2">
                    <button
                      id="copy_id"
                      class="btn py-2 px-3 font-size-18 copy-btn border-radius-12 text-white"
                      @click="copyNow('url-suffix')">{{ copyLabel }}</button>
                  </span>
                </div>

              </div>
              <div class="col-12 col-sm-12 col-md-12">

                <div class="custom-request-list-head row">
                  <div class="col-4 col-md-2 font-grey font-size-12 font-weight-bold asc1">CURRENT AMOUNT</div>
                  <div class="col-4 col-md-8 font-grey font-size-12 font-weight-bold  px-1">USERNAME</div>
                  <div class="col-4 col-md-2 font-grey font-size-12 font-weight-bold desc1 text-center">STATUS</div>
                </div>

                <div class="custom-request-list ">
                  <template v-for="customRequest in customRequests">
                    <div class="row">
                      <div class="col-4 col-md-2 d-flex align-items-center justify-content-between">
                        <span data-toggle="popover" data-placement="top" data-trigger="hover" :data-content="desc(customRequest)">
                          ${{ customRequest.counterOfferPrice ? customRequest.counterOfferPrice : customRequest.offerPrice }}
                        </span>
                        <span data-toggle="popover" data-placement="top" data-trigger="hover" :data-content="desc(customRequest)">
                          <img :class="customRequest.favorite ? 'saved show' : 'saved'" src="@/assets/images/stella/stella-uploaded.png">
                        </span>
                      </div>
                      <div class="col-4 col-md-8 d-flex align-items-center px-1">
                        <span data-toggle="popover" data-placement="top" data-trigger="hover" :data-content="desc(customRequest)">
                          {{ customRequest.customer.name }}
                        </span>
                      </div>
                      <div class="col-4 col-md-2 d-flex align-items-center justify-content-end">
                        <span @click="statusAction(customRequest)"
                                class="bedge"
                                :class="CR_STATUS_COLOR[getStatus(customRequest.status)]">
                          {{ getStatus(customRequest.status) }}</span>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!--  Model for custom request counter  -->
        <model-influencer-custom-request-counter-offer
          ref="customRequestCounterOffer"
          @acceptedCustomRequest="acceptedCustomRequest"
          @declineCustomRequest="(customRequest) => {
            $refs.customRequestDecline.show(customRequest)
          }"
          @saveForLaterCustomRequest="(customRequest) => {
            loadCustomRequest();
          }"
          @counterOffer="(customRequest) => {
            $refs.counterOfferSubmit.show(customRequest);
          }"
        />

        <model-influencer-custom-request-accepted
          ref="customRequestAcceptedDone"
          @customRequestAcceptedDone="() => {
              // loadCustomRequest();
          }"
        />

        <model-influencer-custom-request-decline
          ref="customRequestDecline"
          @declinedSuccess="() => {
            loadCustomRequest();
          }"/>

        <model-influencer-custom-request-counter-offer-submit
          ref="counterOfferSubmit" @counterOfferSubmitted="() => {
            $refs.counterOfferComplete.show();
            loadCustomRequest();
          }
        "/>

        <model-influencer-custom-request-counter-offer-complete
          ref="counterOfferComplete"/>

        <!--  Model for custom request content  -->
        <model-influencer-custom-request-upload-content
          ref="customRequestUploadContent"
          @customRequestUploaded="(customRequest, uploadData) => {
            $refs.customRequestUploadComplete.show(customRequest, uploadData)
          }"/>

        <model-influencer-custom-request-upload-complete
          ref="customRequestUploadComplete"
          @back="$refs.customRequestUploadContent.simpleShow()"
          @customRequestUploadCompleted="() => {
            $refs.customRequestUploadComplete.hide();
            loadCustomRequest();
          }"
        />

        <model-complete-custom-request-thank-you ref="customRequestUploadDone"/>
        <model-image-view ref="imageView"/>
        <model-video-view ref="videoView"/>
        <model-link ref="linkView"/>

      </div>
    </div>
  </div>
</section>
</template>

<script>

import {mapGetters} from "vuex";

import {httpMixin} from "@/mixin/http-mixin";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import InfluencerHeader from "@/components/module/influencer/shared/InfluencerHeader";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {newSubscriptionMixin} from "@/mixin/new-subscription-mixin";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {
  CR_STATUS_ACCEPTED,
  CR_STATUS_COLOR,
  CR_STATUS_COUNTER,
  CR_STATUS_CUSTOMER_COUNTER,
  CR_STATUS_PENDING,
  CR_STATUS_READY,
  CR_STATUS_REVIEW
} from "@/properties/custom-request-status";
import ModelInfluencerCustomRequestCounterOffer
  from "@/components/module/influencer/custom-request/ModelInfluencerCustomRequestCounterOffer";
import ModelInfluencerCustomRequestDecline
  from "@/components/module/influencer/custom-request/ModelInfluencerCustomRequestDecline";
import ModelInfluencerCustomRequestCounterOfferSubmit
  from "@/components/module/shared/custom-request/ModelCustomRequestCounterOfferSubmit";
import ModelInfluencerCustomRequestCounterOfferComplete
  from "@/components/module/shared/custom-request/ModelCustomRequestCounterOfferComplete";
import ModelInfluencerCustomRequestUploadContent
  from "@/components/module/influencer/custom-request/ModelInfluencerCustomRequestUploadContent";
import ModelInfluencerCustomRequestUploadComplete
  from "@/components/module/influencer/custom-request/ModelInfluencerCustomRequestUploadComplete";
import ModelCompleteCustomRequestThankYou
  from "@/components/module/influencer/custom-request/ModelCompleteCustomRequestThankYou";
import ModelInfluencerCustomRequestAccepted
  from "@/components/module/influencer/custom-request/ModelInfluencerCustomRequestAccepted";
import ModelImageView from "../../shared/ModelImageView";
import ModelVideoView from "../../shared/ModelVideoView";
import ModelLink from "../../customer/custom-request/ModelLink";
import {CR_STATUS_COMPLETED} from "../../../../properties/custom-request-status";
import {
  CONTENT_TYPE_APPLICATION,
  CONTENT_TYPE_IMAGE,
  CONTENT_TYPE_URL,
  CONTENT_TYPE_VIDEO
} from "../../../../properties/content-type";
import {constructCustomerURL} from "@/common/baseURL-service";
import {customRequestDesc} from "@/common/comm-service";
import titleMixin from "../../../../mixin/title-mixin";


export default {
  name: 'CustomRequestList',
  title: 'Creator custom requests',
  mixins: [httpMixin, newSubscriptionMixin, titleMixin],
  components: {
    HeaderMenu, InfluencerMenu,
    InfluencerHeader, GlobalMessage,
    ModelInfluencerCustomRequestCounterOffer,
    ModelInfluencerCustomRequestDecline,
    ModelInfluencerCustomRequestCounterOfferSubmit,
    ModelInfluencerCustomRequestCounterOfferComplete,
    ModelInfluencerCustomRequestUploadContent,
    ModelInfluencerCustomRequestUploadComplete,
    ModelCompleteCustomRequestThankYou,
    ModelInfluencerCustomRequestAccepted, ModelImageView,
    ModelVideoView, ModelLink
  },
  data() {
    return {
      user: [],
      customRequests: [],
      showSlideBar: false,
      CR_STATUS_COLOR,

      pageNumber: 0,
      noOfItems: 999,
    }
  },
  created() {

    this.user = this.getUser();
    this.loadCustomRequest();
    this.checkNewSubscription(this.user.id);

  },
  computed: {
    copyLabel() {
      return this.copied ? 'Copied' : 'Copy';
    }
  },
  methods: {
    ...mapGetters(['getUser']),
    constructCustomerURL,
    statusAction(customRequest) {

      if (customRequest.status === CR_STATUS_REVIEW ||
        customRequest.status === CR_STATUS_CUSTOMER_COUNTER ) {
        this.$refs.customRequestCounterOffer.show(customRequest);
      } else if (customRequest.status === CR_STATUS_READY) {
        this.$refs.customRequestUploadContent.show(customRequest);
      } else if (customRequest.status === CR_STATUS_COMPLETED) {
        let content = customRequest.content;

        if (content.type === CONTENT_TYPE_IMAGE && content.cdnUrl) {
          this.$refs.imageView.show(content.cdnUrl);
        } else if (content.type === CONTENT_TYPE_VIDEO && content.cdnUrl) {
          this.$refs.videoView.show(url);
        } else if (content.type === CONTENT_TYPE_URL || content.type === CONTENT_TYPE_APPLICATION) {
          this.$refs.linkView.show(content);
        }
      }
    },
    acceptedCustomRequest(customRequest) {
      this.$refs.customRequestCounterOffer.hide();
      this.loadCustomRequest();
      if (customRequest.status === CR_STATUS_READY) {
        this.$refs.customRequestUploadContent.show(customRequest);
      } else {
        this.$refs.customRequestAcceptedDone.show();
      }
    },
    loadCustomRequest() {
      // /api/v1/influencers/{influncerId}/custom-request/
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/custom-request/page?pageNumber=${this.pageNumber}&numberOfItems=${this.noOfItems}`;
      this.getData(url, (page) => {
        this.customRequests.splice(0);
        this.customRequests.push(...page.content);
        this.$nextTick(() => {
          $('[data-toggle="popover"]').popover();
        });
      })
    },
    desc: customRequestDesc,
    getStatus(status) {
      if (status === CR_STATUS_COUNTER) {
        return CR_STATUS_PENDING;
      } else if (status === CR_STATUS_ACCEPTED) {
        return CR_STATUS_PENDING;
      } else if (status === CR_STATUS_CUSTOMER_COUNTER) {
        return CR_STATUS_REVIEW;
      } else {
        return status;
      }
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    }
  }
}
;
</script>


