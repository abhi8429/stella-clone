<template>
  <section class="container-fluid">
    <div class="row p-md-4 pb-md-0">
      <div class="border-around border-md-1 border-0 p-2">
        <div>

          <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>


          <customer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></customer-menu>
          <header-menu @slideMenu="slideBar()"></header-menu>

          <section class="closefriend-hero background-white">
            <div class="container mt-3">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-12 py-3">
                  <span class="font-size-16 font-weight-bold px-3">Send a Custom Request</span>
                </div>

                <div class="col-12 send-cutom-request">
                  <div class="row submit-subscribe-button" v-for="(influencer, index) in influencers" :key="index">
                    <custom-request-influencer-avatar :influencer="influencer"
                                                      @customRequest="submitCustomRequest(influencer)"/>
                    <div class="col-4 col-md-3 d-flex align-items-center justify-content-lg-start">
                      <button @click="submitCustomRequest(influencer)"
                              :class="isUserActive(influencer) ? 'btn-bg-light-green font-success' : 'btn-bg-grey font-grey'"
                              class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
                      >Submit
                      </button>
                    </div>
                  </div>
                </div>


                <div class="col-12 col-sm-12 col-md-12 py-3 mt-3">
                  <span class="font-size-16 font-weight-bold px-3">Pending Requests</span>
                </div>
                <div class="col-12 col-sm-12 col-md-12">
                  <global-message></global-message>
                  <div class="custom-request-list-head row">
                    <div class="col-4 col-md-2 font-grey font-size-12 font-weight-bold asc">CURRENT PRICE</div>
                    <div class="col-3 col-md-7 font-grey font-size-12 font-weight-bold  px-1">USERNAME</div>
                    <div class="col-4 col-md-2 font-grey font-size-12 font-weight-bold desc text-center">STATUS</div>
                  </div>
                  <div class="custom-request-list mb-4">
                    <div class="row" v-for="(customRequest, index) in customRequests" :key="index">
                      <div
                        class="col-3 col-md-2 d-flex align-items-center justify-content-md-start justify-content-center">
                        <!--                      <span data-toggle="popover" title="" :id="`IG-${index}`"
                                                    data-content="Copied" @click="showCopiedPopover(`IG-${index}`)">
                                                    {{ customerSubscription.instagramHandle }}
                                                  </span>-->
                        <span data-toggle="popover" data-placement="top" data-trigger="hover"
                              :data-content="desc(customRequest)">${{
                            customRequest.counterOfferPrice ? customRequest.counterOfferPrice : customRequest.offerPrice
                          }}</span>
                      </div>
                      <div class="col-4 col-md-7 d-flex align-items-center px-1">
                      <span data-toggle="popover" data-placement="top" data-trigger="hover"
                            :data-content="desc(customRequest)">
                        {{ customRequest.influencer.name }}
                      </span>
                      </div>
                      <div class="col-4 col-md-2 d-flex align-items-center justify-content-end">
                        <button @click="statusAction(customRequest)"
                                class="btn btn-sm border-radius-6 font-size-12-14"
                                :class="CR_STATUS_COLOR[getStatus(customRequest.status)]">
                          {{ getStatus(customRequest.status) }}
                        </button>
                        <!--                    <template v-if="customRequest.content">
                                              <a id="test"  target="_blank" :href="customRequest.content.fileName"></a>
                                            </template>-->
                      </div>
                      <div class="col-1 px-1" v-if="customRequest.status === CR_STATUS_REVIEW">
                        <button
                          class="btn btn-sm fan-remove-request-btn-bg font-danger font-weight-bold font-size-12"
                          @click="confirmDeleteCustomRequest(customRequest.id)">X
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <model-customer-custom-request-submit
            ref="customRequestConfirm"
            @savedCustomRequest="(customRequest) => {
            loadCustomRequest();
            $refs.customRequestDone.show(customRequest);
         }"
            @submittedCustomRequestOption="(customRequest) => {
            $refs.customRequestOption.show(customRequest, user.id);
          }"/>

          <model-customer-custom-request-option-info
            ref="customRequestOption"
            @savedCustomRequestOption="(customRequest) => {
            loadCustomRequest();
            if(customRequest.status === CR_STATUS_ACCEPTED){
               $refs.customRequestAccepted.show(customRequest);
            } else if(customRequest.status === CR_STATUS_READY) {
               $refs.customRequestDone.show(customRequest, true);
            }
          }"
            @back="() => {
             $refs.customRequestConfirm.simpleShow();
          }"
          />

          <model-customer-custom-request-done
            ref="customRequestDone" @doneCustomRequest="() => {
            // loadCustomRequest();
          }"/>


          <model-customer-custom-request-counter-offer
            ref="customRequestCounterOffer"
            @accepted="loadCustomRequest()"
            @counterOffer="(customRequest) => {
             $refs.counterOfferSubmit.show(customRequest);
          }"/>
          <model-customer-custom-request-accepted ref="customRequestAccepted"/>

          <!-- Counter offer start   -->
          <model-customer-custom-request-counter-offer-submit
            :type="CR_TYPE_CUSTOMER"
            ref="counterOfferSubmit" @counterOfferSubmitted="() => {
            loadCustomRequest();
            $refs.counterOfferComplete.show();
          }
        "/>
          <model-customer-custom-request-counter-offer-complete
            :type="CR_TYPE_CUSTOMER"
            ref="counterOfferComplete"/>
          <!-- Counter offer end   -->

          <model-delete ref="deleteCustomRequest" @delete="deleteCustomRequest()"/>

          <model-image-view ref="imageView"/>
          <model-video-view ref="videoView"/>
          <model-link ref="linkView"/>

        </div>
      </div>
    </div>
  </section>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

import {httpMixin} from "@/mixin/http-mixin";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {newSubscriptionMixin} from "@/mixin/new-subscription-mixin";
import {SERVICE_CONTENT, SERVICE_IDENTIY, SERVICE_SUBSCRIPTION} from "@/properties/micro-service";
import CustomerMenu from "@/components/module/customer/shared/CustomerMenu";
import CustomRequestInfluencerAvatar from "@/components/module/customer/custom-request/CustomRequestInfluencerAvatar";
import ModelCustomerCustomRequestConfirm
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestConfirm";
import ModelCustomerCustomRequestDone from "@/components/module/customer/custom-request/ModelCustomerCustomRequestDone";
import ModelCustomerCustomRequestSubmit
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestSubmit";
import {
  CR_STATUS_ACCEPTED,
  CR_STATUS_ACTION,
  CR_STATUS_COLOR,
  CR_STATUS_COMPLETED,
  CR_STATUS_COUNTER,
  CR_STATUS_CUSTOMER_COUNTER,
  CR_STATUS_EXPIRED,
  CR_STATUS_PENDING,
  CR_STATUS_READY,
  CR_STATUS_RESUBMIT,
  CR_STATUS_REVIEW,
  CR_TYPE_CUSTOMER
} from "@/properties/custom-request-status";
import ModelDelete from "@/components/module/influencer/content/ModelDelete";
import ModelCustomerCustomRequestCounterOffer
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestCounterOffer";
import ModelCustomerCustomRequestAccepted
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestAccepted";
import ModelCustomerCustomRequestCounterOfferSubmit
  from "@/components/module/shared/custom-request/ModelCustomRequestCounterOfferSubmit";
import ModelCustomerCustomRequestCounterOfferComplete
  from "@/components/module/shared/custom-request/ModelCustomRequestCounterOfferComplete";
import ModelImageView from "@/components/module/shared/ModelImageView";
import ModelVideoView from "@/components/module/shared/ModelVideoView";
import {
  CONTENT_TYPE_APPLICATION,
  CONTENT_TYPE_IMAGE,
  CONTENT_TYPE_URL,
  CONTENT_TYPE_VIDEO
} from "@/properties/content-type";
import ModelLink from "@/components/module/customer/custom-request/ModelLink";
import {geDecodedToken, getTokenExp, isRole, isTokenExpired} from "@/common/http-common";
import {ACCESS_TOKEN} from "@/properties/close-friend";
import ModelCustomerCustomRequestOptionInfo
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestOptionInfo";
import {customRequestDesc, isUserActive} from "@/common/comm-service";
import titleMixin from "../../../../mixin/title-mixin";
import {CUSTOM_REQUEST, paymentCancelled, paymentOtherStatus, paymentPaid} from "@/common/analytics-service";

export default {
  name: 'CustomerCustomRequestList',
  title: 'Customer custom requests',
  mixins: [httpMixin, newSubscriptionMixin, titleMixin],
  components: {
    HeaderMenu, CustomerMenu,
    GlobalMessage, CustomRequestInfluencerAvatar,
    ModelCustomerCustomRequestConfirm,
    ModelCustomerCustomRequestDone,
    ModelCustomerCustomRequestSubmit,
    ModelCustomerCustomRequestCounterOffer,
    ModelCustomerCustomRequestAccepted,
    ModelCustomerCustomRequestOptionInfo,
    ModelImageView, ModelVideoView,
    ModelDelete, ModelLink,
    ModelCustomerCustomRequestCounterOfferSubmit,
    ModelCustomerCustomRequestCounterOfferComplete
  },
  data() {
    return {
      influencers: [],
      customRequests: [],
      showSlideBar: false,
      deleteCustomRequestId: null,

      pageNumber: 0,
      noOfItems: 999,
      CR_STATUS_COLOR,
      CR_STATUS_REVIEW,
      CR_TYPE_CUSTOMER,

      CR_STATUS_ACCEPTED,
      CR_STATUS_READY

    }
  },
  created() {

    //Payment status when redirected by stripe after making payment for custom request
    if (this.$route.query.status) {
      if(this.$route.query.status === 'success') {
        paymentPaid(this, CUSTOM_REQUEST, this.getPayInfluencer());
        this.setMessage('PAYMENT.SUCCESSFUL');
      } else if (this.$route.query.status === 'cancelled') {
        paymentCancelled(this, CUSTOM_REQUEST, this.getPayInfluencer());
        this.setMessage('PAYMENT.CANCELLED');
      } else {
        paymentOtherStatus(this, this.$route.query.status, CUSTOM_REQUEST, this.getPayInfluencer());
        this.setMessage(this.$route.query.status);
      }
    }

    this.setRedirectedFrom(null);
    if (this.$route.params.urlPrefix) {
      this.checkTokenValidity(() => {
        let tokenExp = getTokenExp(ACCESS_TOKEN);
        if (tokenExp && !isTokenExpired(ACCESS_TOKEN) && !isRole('INFLUENCER')) {
          this.onCreate();
        } else {
          this.redirectedByInfluencerSuffix();
        }
      }, true);
    } else {
      this.onCreate();
    }

  },
  methods: {
    ...mapGetters(['getUser', 'getPayInfluencer']),
    ...mapActions(['setUser', 'setRedirectedFrom', 'setMessage', 'setPayInfluencer']),
    isUserActive,
    onCreate() {

      let urlPrefix = this.$route.params.urlPrefix;
      if (!this.getUser()) {
        let customerId = geDecodedToken(ACCESS_TOKEN).id;
        let url = `${SERVICE_IDENTIY}/api/v1/customers/${customerId}`;
        this.getData(url, (customer) => {
          this.setUser(customer);
          this.initLoad(urlPrefix);
        });
      } else {
        this.initLoad(urlPrefix);
      }
    },
    redirectedByInfluencerSuffix() {
      let invitee = this.$route.params.urlPrefix;
      this.getUnSecureData(`${SERVICE_IDENTIY}/api/v1/influencers/urlSuffix/${invitee}`, (data) => {
        if (!isUserActive(data)) {
          this.$router.replace({name: 'DisabledAccount'});
        } else {
          this.setRedirectedFrom(this.$route.path);
          this.$router.replace({
            name: 'LoginMobile',
            params: {urlPrefix: invitee}
          });
        }
      });
    },
    initLoad(urlPrefix) {
      this.user = this.getUser();
      //api/v1/customers/{customerId}/subscriptions/
      let url = `${SERVICE_SUBSCRIPTION}/api/v1/customers/${this.user.id}/subscriptions/influencers`;
      this.getData(url, (influencers) => {
        this.influencers = influencers;
        if (urlPrefix && influencers.length > 0) {
          let influencer = influencers.find((inf) => inf.urlSuffix === urlPrefix);
          if (influencer) {
            this.submitCustomRequest(influencer);
          }
        }
      })
      this.loadCustomRequest();
    },
    desc: customRequestDesc,
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },
    upperCaseFirstLetter(status) {
      return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    },
    loadCustomRequest() {
      console.log('HERE...loadCustomRequest');
      let url = `${SERVICE_CONTENT}/api/v1/customers/${this.user.id}/custom-request/page?pageNumber=${this.pageNumber}&numberOfItems=${this.noOfItems}`;
      this.getData(url, (page) => {
        this.customRequests.splice(0);
        this.customRequests.push(...page.content);
        this.$nextTick(() => {
          $('[data-toggle="popover"]').popover();
        });
      })
    },
    submitCustomRequest(influencer) {
      if (isUserActive(influencer)) {
        this.$refs.customRequestConfirm.show(influencer.id, this.user.id, influencer.customRequestMinPrice);
      }
    },
    confirmDeleteCustomRequest(id) {
      this.deleteCustomRequestId = id;
      this.$refs.deleteCustomRequest.show();
    },
    deleteCustomRequest() {
      this.$refs.deleteCustomRequest.hide();
      let url = `${SERVICE_CONTENT}/api/v1/customers/${this.user.id}/custom-request/${this.deleteCustomRequestId}`;
      this.getDelete(url, (date) => {
        this.setMessage('DELETED.SUCCESSFULLY');
        this.loadCustomRequest();
      });
    },
    statusAction(customRequest) {
      if (customRequest.status === CR_STATUS_COUNTER) {
        this.$refs.customRequestCounterOffer.show(customRequest);
      } else if (customRequest.status === CR_STATUS_ACCEPTED) {
        this.$refs.customRequestAccepted.show(customRequest);
      } else if (customRequest.status === CR_STATUS_COMPLETED) {
        let content = customRequest.content;

        if (content.type === CONTENT_TYPE_IMAGE && content.cdnUrl) {
          this.$refs.imageView.show(content.cdnUrl);
        } else if (content.type === CONTENT_TYPE_VIDEO && content.cdnUrl) {
          this.$refs.videoView.show(content.cdnUrl);
        } else if (content.type === CONTENT_TYPE_URL || content.type === CONTENT_TYPE_APPLICATION) {
          this.$refs.linkView.show(content);
        }
      } else if (customRequest.status === CR_STATUS_EXPIRED) {
        this.$refs.customRequestConfirm.resubmitShow(customRequest);
      }
    },
    getStatus(status) {
      if (status === CR_STATUS_COUNTER || status === CR_STATUS_ACCEPTED) {
        return CR_STATUS_ACTION;
      } else if (status === CR_STATUS_READY || status === CR_STATUS_CUSTOMER_COUNTER) {
        return CR_STATUS_PENDING;
      } else if (status === CR_STATUS_EXPIRED) {
        return CR_STATUS_RESUBMIT;
      } else {
        return status;
      }
    }
  }
}
;
</script>

<style scoped>

@media only screen and (max-width: 768px) {
  .submit-subscribe-button
  {
    padding: 8px 0px;
  }

  }
</style>

