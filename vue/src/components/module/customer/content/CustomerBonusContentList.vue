<template>
  <section class="container-fluid">
    <div class="row p-md-4 pb-md-0">
      <div class="border-around border-md-1 border-0 p-2">
        <div>

          <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>


          <customer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></customer-menu>
          <header-menu :is-loading="isLoading" @slideMenu="slideBar()"></header-menu>

          <section class="closefriend-hero background-white">
            <div class="container mt-4">
              <div class="row">
                <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
                  <div class="login-card">
                    <h3 class="font-size-20 mb-4 text-center text-white mx-2 font-family-poppins">Bonus Content</h3>
                    <p class="font-size-14 font-grey pr-5 mt-2 mx-2">Welcome to Stella! Your favorite creator will
                      be
                      adding you to their close friends list on Instagram. Please be patient as it can take several days
                      for
                      everyone to be added. Enjoy some bonus content while you wait!</p>
                    <global-message></global-message>
                    <pending-custom-requests/>
                    <!-- post start -->
                    <template v-for="(content, index) in contents">
                      <div class="mb-3 mx-1 mt-4">
                        <div class="row d-flex align-items-center justify-content-center">
                          <div class="col-md-12 pindiv" v-if="content.pinned"><!-- 21 Oct Change  -->
                            <img class="pinImg" src="@/assets/images/pin.svg">
                            <span class="pinText font-grey">Pinned Post</span>
                          </div>
                          <influencer-avatar :content="content"
                            @customRequest="submitCustomRequest(content.influencer)"></influencer-avatar>

                          <div class="col-md-5 col-5 p-1" @click="submitCustomRequest(content.influencer)">
                            <b class="font-black">{{ content.influencer.name }}</b>
                          </div>
                          <div class="col-md-4 col-4 p-0 text-right">
                            <b class="font-grey">{{ timeSince(content.updatedAt) }} ago</b>
                          </div>
                        </div>
                        <span class="content-locked" v-if="!content.cdnUrl">
                          <img src="@/assets/images/stella/swipe-lock.png">
                          <div class="my-2 font-size-18 font-white">${{ content.price }}</div>
                          <button class="btn rounded-pill text-dark gradient-a btn-lg px-4"
                            @click="unLock(index)">Unlock</button>
                        </span>
                        <template v-if="content.cdnUrl">
                          <img id="image_1" v-if="content.type === CONTENT_TYPE_IMAGE"
                            class="my-2 content-image border-radius-10" :src="content.cdnUrl"
                            @click="$refs.imageView.show(content.cdnUrl)">
                          <video v-else-if="content.type === CONTENT_TYPE_VIDEO" :id="`video${index}`"
                            oncontextmenu="return false;" controlsList="nodownload"
                            style="max-width:100%;height:400px;width:100%;" controls :src="content.cdnUrl"
                            @click="showVideo($event, content.cdnUrl)">
                          </video>
                          <div v-else class="form-group text-center bonus-content-others" id="upload_image_section">
                            <div>
                              <img src="@/assets/images/download.png" class="mt-4 mb-3" style="width: 64px;height: 64px;">
                              <div class="font-grey font-size-16 font-weight-bold">download File</div>
                            </div>
                            <div class="mt-1 font-grey font-size-12"><i>
                                <a :href="content.cdnUrl" target="_blank">{{
                                  content.fileName + '.' + content.ext
                                }}</a></i>
                            </div>
                          </div>
                        </template>
                        <img id="image_2" v-else style="filter: blur(10px);" class="my-2 content-image border-radius-10"
                          src="@/assets/images/stella/card-bg.png">


                        <p class="text-left mx-2 font-grey">{{ content.description }}</p>
                        <div class="d-flex flex-row justify-content-start col-12">
                          <div class="col-2" style="display: flex;flex-direction: row;justify-content: start;left: -1.5rem;">
                        <button v-if="content.cdnUrl" class="btn rounded-pill text-dark gradient-a btn-lg px-4"
                          :style="!content.liked ? 'background: rgba(255, 255, 255, 0.9);' : ''" @click="likeIt(index)">
                          <img style="width:24px;height: 27px;" src="@/assets/images/stella/like.png" />
                          {{ content.likedCount }}
                        </button>
                        <button v-else class="btn rounded-pill text-dark gradient-a btn-lg px-4"
                          style="background: rgba(255, 255, 255, 0.9);" disabled>
                          <img style="width:24px;height: 27px;" src="@/assets/images/stella/like.png" />
                          {{ content.likedCount }}
                        </button>
                          </div>
                          <div class="mt-2 col-10 mobile-manage-class">
                          <img src="@/assets/images/gift.png"
                               style="width:25px; height: 25px"
                             @click="submitCustomRequest(content.influencer)">
                          <span class="d-sm-block d-none"
                                @click="submitCustomRequest(content.influencer)">Custom request</span>
                          <img src="@/assets/images/custome-request2.png"
                               style="width:25px; height: 25px"
                               @click="goToTip(content.influencer)">
                            <span class="d-sm-block d-none"
                                  @click="goToTip(content.influencer)">Send Tip</span>
                          <img src="@/assets/images/send-message.png"
                               style="width:25px; height: 25px"
                               @click="$router.push({ name: 'CustomerDirectMessage'})">
                            <span class="d-sm-block d-none"
                                  @click="$router.push({ name: 'CustomerDirectMessage'})">Send message</span>
                          </div>
                        </div>
                      </div>

                      <hr class="my-4 mx-2" v-if="!(index + 1 === contents.length)">
                    </template>

                  </div>

                </div>
              </div>
            </div>
          </section>

          <infinite-loading v-if="showPendingCustomRequests" @infinite="loadData">
            <div slot="no-more"></div>
            <div slot="no-results"></div>
          </infinite-loading>

          <model-confirm-purchase ref="pay" title="Confirm your purchase" :text="confirmPurchaseText"
            confirm-btn-txt="Pay" @confirm="pay()" />
          <model-image-view ref="imageView" />
          <model-video-view ref="videoView" />

          <!-- Custom request -->
          <model-customer-custom-request-submit ref="customRequestConfirm" @savedCustomRequest="(customRequest) => {
            $refs.customRequestDone.show(customRequest);
          }" @submittedCustomRequestOption="(customRequest) => {
  $refs.customRequestOption.show(customRequest, user.id);
}" />

          <model-customer-custom-request-option-info ref="customRequestOption" @savedCustomRequestOption="(customRequest) => {
            if (customRequest.status === CR_STATUS_ACCEPTED) {
              $refs.customRequestAccepted.show(customRequest);
            } else if (customRequest.status === CR_STATUS_READY) {
              $refs.customRequestDone.show(customRequest, true);
            }
          }" @back="() => {
  $refs.customRequestConfirm.simpleShow();
}" />

          <model-customer-custom-request-accepted ref="customRequestAccepted" />

          <model-customer-custom-request-done ref="customRequestDone" @doneCustomRequest="() => {
          }" />

          <stripe-checkout v-if="show" ref="checkoutRef" :pk="pk" :sessionId="sessionId" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import CustomerMenu from "@/components/module/customer/shared/CustomerMenu";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import { SERVICE_CONTENT, SERVICE_IDENTIY, SERVICE_PAYMENT } from "@/properties/micro-service";
import ModelConfirmPurchase from "@/components/module/customer/shared/ModelBasic";
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import { igValidationMixin } from "@/mixin/ig-validation-mixin";
import ModelImageView from "@/components/module/shared/ModelImageView";
import ModelVideoView from "@/components/module/shared/ModelVideoView";
import { timeSince } from "@/common/datetime-service";
import { mapActions, mapGetters } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import InfluencerAvatar from "@/components/module/customer/content/InfluencerAvatar";
import ModelCustomerCustomRequestConfirm
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestConfirm";
import ModelCustomerCustomRequestDone from "@/components/module/customer/custom-request/ModelCustomerCustomRequestDone";
import ModelCustomerCustomRequestSubmit
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestSubmit";
import { CONTENT_TYPE_IMAGE, CONTENT_TYPE_VIDEO } from "@/properties/content-type";
import ModelCustomerCustomRequestOptionInfo
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestOptionInfo";
import PendingCustomRequests from "@/components/module/customer/shared/PendingCustomRequests";
import { isUserActive } from "@/common/comm-service";
import { geDecodedToken, getTokenExp, isRole, isTokenExpired } from "@/common/http-common";
import { ACCESS_TOKEN } from "@/properties/close-friend";
import { CR_STATUS_ACCEPTED, CR_STATUS_READY } from "@/properties/custom-request-status";
import ModelCustomerCustomRequestAccepted
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestAccepted";
import titleMixin from "../../../../mixin/title-mixin";
import {
  BONUS_CONTENT,
  paymentCancelled,
  paymentInProgress,
  paymentOtherStatus,
  paymentPaid
} from "@/common/analytics-service";

export default {
  name: 'CustomerBonusContentList',
  mixins: [igValidationMixin, titleMixin],
  props: ['id'],
  title: 'Customer bonus content',
  components: {
    HeaderMenu, CustomerMenu,
    GlobalMessage, ModelConfirmPurchase, InfiniteLoading,
    StripeCheckout, ModelImageView, ModelVideoView, InfluencerAvatar,
    ModelCustomerCustomRequestConfirm,
    ModelCustomerCustomRequestDone,
    ModelCustomerCustomRequestSubmit,
    ModelCustomerCustomRequestOptionInfo,
    PendingCustomRequests,
    ModelCustomerCustomRequestAccepted
  },
  data() {
    return {
      user: {},
      showSlideBar: false,
      isSubmit: false,
      isVideo: false,
      contents: [],
      contentIndex: null,
      userIG: '',

      pageNumber: 0,
      noOfItems: 10,

      //Strip
      pk: "",
      sessionId: "",
      show: false,
      confirmPurchaseText: '',
      tapped: false,
      isInvalidIG: false,
      showPendingCustomRequests: false,

      CONTENT_TYPE_IMAGE,
      CONTENT_TYPE_VIDEO,

      CR_STATUS_ACCEPTED,
      CR_STATUS_READY
    }
  },
  created() {
    this.setRedirectedFrom(null);
    this.checkTokenValidity(() => {
      let tokenExp = getTokenExp(ACCESS_TOKEN);
      if (tokenExp && !isTokenExpired(ACCESS_TOKEN) && !isRole('INFLUENCER')) {
        if (!this.getUser()) {
          let customerId = geDecodedToken(ACCESS_TOKEN).id;
          let url = `${SERVICE_IDENTIY}/api/v1/customers/${customerId}`;
          this.getData(url, (customer) => {
            this.setUser(customer);
            this.onCreated();
          });
        } else {
          this.onCreated();
        }
      } else {
        this.setRedirectedFrom(this.$route.path);
        this.$router.replace({ name: 'LoginMobile' });
      }
    }, true);

  },
  methods: {
    ...mapGetters(['getUser', 'getCustomRequestInfluencer', 'getCustomRequestIndex', 'getPayInfluencer']),
    ...mapActions(['pushGlobalError', 'setRedirectedFrom', 'setUser', 'setPayInfluencer', 'setInvitee']),
    onCreated() {
      this.showPendingCustomRequests = true;
      this.user = this.getUser();
      if (this.$route.query.status === 'cancelled') {
        paymentCancelled(this, BONUS_CONTENT, this.getPayInfluencer());
        let clientReferenceId = this.$route.query.clientReferenceId;
        let URL = `${SERVICE_PAYMENT}/api/v1/stripe/checkout/cancel/${clientReferenceId}`
        this.postUnsecureData(URL, {}, (data) => {
          this.showMessage('PAYMENT.CANCELLED');
        });
      } else if (this.$route.query.status === 'success') {
        paymentPaid(this, BONUS_CONTENT, this.getPayInfluencer());
        this.showMessage('PAYMENT.SUCCESSFUL');
      } else if (this.$route.query.status) {
        paymentOtherStatus(this, this.$route.query.status, BONUS_CONTENT, this.getPayInfluencer());
      }
      if (this.$route.query.saved) {
        this.showMessage('SAVED.SUCCESSFULLY');
      }
      this.showSelectedCustomRequest();
    },
    showMessage(msgCode) {
      this.setMessage(msgCode);
      this.scrollToGlobalError();
    },
    timeSince,
    confirmIG() {
      this.isInvalidIG = !this.isInvalidIG;
      /*this.getData(`${SERVICE_IDENTIY}/api/v1/customers/${this.getUser().id}/invalidIg`, (isInvalidIg) => {
        if (isInvalidIg) {
          this.isInvalidIG = isInvalidIg;
        }
      });*/
    },
    showSelectedCustomRequest() {
      console.log(`showSelectedCustomRequest - inside with value ${this.getCustomRequestInfluencer()}`);
      this.$nextTick(() => {
        if (this.getCustomRequestInfluencer() != null) {
          this.submitCustomRequest(this.getCustomRequestInfluencer())
          if (isUserActive(this.getCustomRequestInfluencer())) {
            console.log('showSelectedCustomRequest - show');
            if (this.getCustomRequestIndex() != null) {
              this.$refs.customRequestConfirm.chosenCustomRequestOption(this.getCustomRequestIndex());
            } else {
              this.$refs.customRequestConfirm.chosenCustomRequest();
            }
          }
        }
      })
    },
    submitCustomRequest(influencer) {
      if (isUserActive(influencer)) {
        this.$refs.customRequestConfirm.show(influencer.id, this.user.id, influencer.customRequestMinPrice);
      }
    },
    loadData($state) {

      let url = `${SERVICE_CONTENT}/api/v1/customers/${this.user.id}/content/page?pageNumber=${this.pageNumber}&numberOfItems=${this.noOfItems}`;
      this.getData(url, (page) => {
        if (!page.empty) {
          this.contents.push(...page.content);
          this.pageNumber += 1;
          $state.loaded();
        } else {
          $state.complete();
          console.log('complete');
        }
        if (this.pageNumber === 0) {
          this.initIGValidity();
        }
        this.setUpTapEventForMobile();
      });
    },

    setUpTapEventForMobile() {
      if (this.isMobile()) {
        this.$nextTick(() => {
          for (let i = 0; i < this.contents.length; i++) {
            let video = document.getElementById(`video${i}`);
            if (video) {
              video.addEventListener('touchstart', (e) => {
                if (!this.tapped) { //if tap is not set, set up single tap
                  this.tapped = setTimeout(() => {
                    this.tapped = null
                    //insert things you want to do when single this.tapped
                  }, 300);   //wait 300ms then run single click code

                } else {    //this.tapped within 300ms of last tap. double tap
                  clearTimeout(this.tapped); //stop single tap callback
                  this.tapped = null
                  //insert things you want to do when double tapped
                  let id = e.target.id;
                  let index = id.substring(5, id.length);
                  this.showVideo(e, this.contents[index].cdnUrl);
                }
                // e.preventDefault(); //This blocks scrolling
              });

            }
          }
        });
      }
    },
    unLock(index) {
      this.contentIndex = index;
      this.confirmPurchaseText = `You will be charged ${this.contents[this.contentIndex].price}`
      this.$refs.pay.show();
    },
    likeIt(index) {
      let content = this.contents[index];
      content.liked = !content.liked;
      if (content.liked) {
        ++content.likedCount;
      } else {
        --content.likedCount;
      }
      let URL = `${SERVICE_CONTENT}/api/v1/customers/${this.user.id}/content/${content.id}?liked=${content.liked}`;
      this.patchData(URL, {}, (contentLike) => {
      });
    },
    showVideo(event, url) {
      console.log(url);
      this.$refs.videoView.show(url);
      if (!this.isMobile()) {
        //If not mobile prevent the video in the background from playing.
        // We want only the video in model to play
        event.preventDefault();
      }
    },
    pay() {
      this.$refs.pay.hide();
      let URL = `${SERVICE_CONTENT}/api/v1/customers/${this.user.id}/content/${this.contents[this.contentIndex].id}/purchase`;
      let influencer = this.contents[this.contentIndex].influencer;
      this.setPayInfluencer(influencer);

      this.postData(URL, {}, (stripeCheckoutData) => {

        let otherData = stripeCheckoutData.othersData;
        let status = stripeCheckoutData.status;
        this.pk = otherData.pk;
        this.sessionId = stripeCheckoutData.req.id;

        if (status === 'Success') {
          paymentPaid(this, BONUS_CONTENT, influencer);
          let maxItems = this.pageNumber === 0 ? this.noOfItems : (this.pageNumber * this.noOfItems);
          let url = `${SERVICE_CONTENT}/api/v1/customers/${this.user.id}/content/page?pageNumber=0&numberOfItems=${maxItems}`;
          this.getData(url, (page) => {
            this.showMessage("PAYMENT.SUCCESSFUL");
            if (!page.empty) {
              this.contents = page.content;
              this.setUpTapEventForMobile();
            }
          });
        } else if (status === 'InProgress') {
          if (otherData.offlineCheckoutError) {
            this.pushGlobalError(otherData.offlineCheckoutError.trim());
          }
          setTimeout(() => {
            this.show = true;
            this.$nextTick(() => {
              this.$refs.checkoutRef.redirectToCheckout();
            });
          }, 2000);
        } else {
          paymentOtherStatus(this, status, BONUS_CONTENT, influencer);
        }
      });
    },
    goToTip(influencer) {
      this.setInvitee(influencer);
      this.$router.push({name: 'TipPayment', query: {donate: true}});
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },

  }
}

</script>

<style scoped>
.bonus-content-others {
  background: #726f6f;
  padding: 40px 60px;
  margin-top: -5px;
  max-width: 100%;
  width: 100%;
}
@media only screen and (max-width: 767px){
.mobile-manage-class{
  margin-left: 2rem;
  display:flex;
  flex-direction:row;
  justify-content: space-around;
}
}
@media only screen and (min-width: 768px){
  .mobile-manage-class{

    display:flex;
    flex-direction:row;
    justify-content: space-between;
  }
}
</style>



