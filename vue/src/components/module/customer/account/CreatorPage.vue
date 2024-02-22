<template>
  <div>
    <section class="container-fluid">
      <div class="row p-md-4 pb-md-0 p-3">

        <div class="col-md-5 mx-auto pt-3">
          <div class="creator-top-bar">
            <!--            <div>
                          <img class="img-fluid float-start" src="@/assets/images/stella/arrow-left.png">
                        </div>-->
            <!--            <div>
                          <img v-if="notificaiton" class="img-fluid float-end" src="@/assets/images/stella/bell-active.png">
                          <img v-else class="img-fluid float-end" src="@/assets/images/stella/bell.png">
                        </div>-->
          </div>

          <div id="creator-carousel" class="creator-slider">
            <div class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button aria-current="true" v-if="wall2ImgURL"
                        aria-label="Slide 1"
                        data-bs-slide-to="0"
                        data-bs-target="#creator-carousel" type="button"
                        :class="wallItemIndex === 0 ? 'active':''"
                        @click="wallItemIndex = 0"></button>
                <button aria-label="Slide 2" v-if="wall2ImgURL"
                        data-bs-slide-to="1"
                        data-bs-target="#creator-carousel"
                        :class="wallItemIndex === 1 ? 'active':''"
                        type="button"
                        @click="wallItemIndex = 1"></button>
              </div>

              <div class="carousel-inner">
                <div class="carousel-item" v-if="wall1ImgURL"
                     :class="wallItemIndex === 0 ? 'active':''">
                  <img class="img-fluid main-img d-block w-100" :src="wall1ImgURL  + '?ver=' + imageVersion">
                </div>
                <div class="carousel-item" v-if="wall2ImgURL"
                     :class="wallItemIndex === 1 ? 'active':''">
                  <img class="img-fluid main-img d-block w-100" :src="wall2ImgURL + '?ver=' + imageVersion">
                </div>
              </div>
            </div>

            <div class="creator-slider-info">

              <img v-if="!isAvatarMissing"
                   :src="imageURL"
                   class="img-fluid creator-img rounded-circle mb-2"
                   @error="imageLoadError">
              <img v-else
                   class="img-fluid creator-img rounded-circle mb-2"
                   src="@/assets/images/default_user.png">
              <div class="font-size-24 font-family-poppins mb-2 creator-name" :class="isDigis?'text-dark':'text-white'">
                {{ inviteeName ? `@${inviteeName}` : '' }}
              </div>
              <!--              <div v-if="!isExclCustomRequestInfluencer"
                              class="font-dark-grey font-size-20 font-family-poppins mb-2 creator-tag-line">
                              {{ bio ? `${bio} ➳` : '' }}
                            </div>-->
              <div class="text-white font-size-24 font-family-poppins mb-2 creator-social-media d-flex flex-wrap ">
                <template v-for="(influencerLink, index) in influencerLinks">
                  <a :class="isDigis?'text-dark font-size-20 text-capitalize font-family-poppins':'text-white font-size-20 text-capitalize font-family-poppins'"
                     :href="anchorHref(influencerLink)" target="_blank">{{ influencerLink.platformName }}</a>
                  <span class="font-dark-grey mx-2" v-if="index < influencerLinks.length - 1">/</span>
                </template>
                <!--                <a class="text-white font-size-20 text-capitalize font-family-poppins" href="#">twitter</a>
                                <span class="font-dark-grey mx-2">/</span>
                                <a class="text-white font-size-20 text-capitalize font-family-poppins" href="#">instagram</a>
                                <span class="font-dark-grey mx-2">/</span>
                                <a class="text-white font-size-20 text-capitalize font-family-poppins" href="#">discord</a>-->
              </div>

            </div>
          </div>

          <global-message/>
          <div class="row py-3 g-4 w-100 mx-auto">
            <div
              :class="isDigis?'text-dark font-size-20 font-family-poppins mb-2 creator-tag-line':'font-dark-grey font-size-20 font-family-poppins mb-2 creator-tag-line'">
              {{ bio ? `${bio}` : '' }}
            </div>
            <button class="btn border-radius-10 py-3 btn-lg btn-dark text-white"
                    v-if="isUserLoggedIn"
                    @click="$router.replace({name: 'TipPayment', query: {donate: true}})">Donate <img
              src="@/assets/images/stella/emoji-dollar-bag.png"></button>
            <button v-for="(influencerPlatform, index) in influencerPlatforms"
                    :key="index" @click="checkPlatform(influencerPlatform)"
                    class="btn border-radius-10 py-3 btn-lg  text-white" :class="isDigis?'btn-dark-digis':'btn-dark'">
              {{ getButtonLabel(influencerPlatform) }}
            </button>
          </div>

          <div class="row py-3 g-2" v-if="contents.length > 0">
            <div class="font-family-poppins  font-size-24" :class="isDigis?'text-dark':'text-white'">Bonus Content</div>
            <div class="font-family-poppins font-dark-grey font-size-16">
              {{ contents.length === 0 ? 'This creator has no content as of now' : 'Get access to everything below' }}
            </div>
          </div>


          <div class="py-3">
            <div id="custom-request-carousel" class="side-slider carousel slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button v-for="(content, index) in contents" :key="index" :aria-label="`Slide ${index}`"
                        :class="crItemIndex === index ? 'active':''" :data-bs-slide-to="index"
                        aria-current="true" data-bs-target="#custom-request-carousel" type="button"
                        @click="crItemIndex = index"></button>
              </div>

              <div class="carousel-inner">
                <div v-for="(content, index) in contents" :key="index"
                     :class="crItemIndex === index ? 'active':''" class="carousel-item">
                  <div class="card creator-bonus-card mx-auto py-3">
                    <div v-if="!content.cdnUrl" class="text-center d-block">
                      <img class="img-fluid" src="@/assets/images/stella/public-lock.png">
                    </div>
                    <div class="py-3 px-4">
                      <!--                      <div class="d-flex align-items-center">
                                              <span class="font-family-poppins text-white font-size-24">Guitar Lessons - 5 new lessons each week</span>
                                            </div>-->
                      <template v-if="content.cdnUrl">
                        <img v-if="content.type === CONTENT_TYPE_IMAGE" id="image_1"
                             :src="content.cdnUrl"
                             class="my-2 content-image border-radius-10">
                        <video v-else-if="content.type === CONTENT_TYPE_VIDEO" :id="`video${index}`"
                               :src="content.cdnUrl"
                               controls
                               controlsList="nodownload"
                               oncontextmenu="return false;" style="max-width:100%;height:400px;width:100%;">
                        </video>
                        <div v-else class="d-flex align-items-center">
                          <span class="font-family-poppins text-white font-size-24">{{ content.description }}</span>
                        </div>
                      </template>
                      <template v-else>
                        <div class="d-flex align-items-center">
                          <span class="font-family-poppins text-white font-size-24">{{ content.description }}</span>
                        </div>
                      </template>
                      <button v-if="!content.cdnUrl"
                              class="btn w-100  rounded-pill btn-lg mt-4"
                              :class="isDigis?'btn-special-digis':'btn-special-dark'"
                              @click="subscribe(content)">
                        <span :class="isDigis?'text-white':'font-gradient-a'">Subscribe to unlock</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="row py-3 g-2">
            <div class="font-family-poppins  font-size-24"
             :class="isDigis?'text-dark':'text-white'">Custom Requests</div>
            <div class="font-family-poppins font-dark-grey font-size-16">Send me a custom request!</div>
          </div>

          <div class="w-100 btn-group-vertical creator-side py-3" role="group">
            <button v-for="(customRequestOption, index) in customRequestOptions" :key="index"
                    class="btn" :class="isDigis?'btn-custom-request-digis':'btn-custom-request'" type="button"
                    @click="submitCustomRequest(index)">
              <span class="text-white text-truncate">{{ customRequestOption.title }}</span>
              <span class="text-white">${{ customRequestOption.price }}</span>
            </button>
            <button class="btn" :class="isDigis?'btn-custom-request-digis':'btn-custom-request'" type="button"
                    @click="submitCustomRequest(null)">
              <span class="text-white">Custom</span>
              <span class="text-white">${{ minRequired }} Min. required.</span>
            </button>
          </div>

          <!--          <div class="card creator-card border-gradient-a border-radius-15 mt-4">
                      <div class="creator-card-bg">
                        <div class="text-white mb-3 font-size-25">Get all-access to exclusive content!</div>
                        <div class="font-dark-grey font-size-16">You get access to all exclusive content, ability to submit custom
                          requests, and more!
                        </div>
                        <button class="btn gradient-a w-100 text-dark rounded-pill btn-lg mt-4">Subscribe now!</button>
                      </div>
                    </div>-->

          <div class="card creator-card border-gradient-b border-radius-15 mt-4">
            <div class="creator-card-bg">
              <div class="text-white mb-3 font-size-25">Get all-access to exclusive content!</div>
              <div class="font-dark-grey font-size-16">You get access to all exclusive content, ability to submit custom
                requests, and more!
              </div>
              <button class="btn w-100  rounded-pill btn-lg mt-4" :class="isDigis?'gradient-b-digis text-white':'gradient-b text-dark'"
                      @click="$refs.platform.show()">Full Access
              </button>
            </div>
          </div>

          <div class="text-center my-5">
            <img class="img-fluid zoom-6" :src="getLogoImage()">
            <div class="font-dark-grey mt-3">Powered by Stella</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Model to display influencer platforms  -->
    <model-platform ref="platform"
                    :url-prefix="$route.params.urlPrefix"
                    :invitee-name="inviteeName"
                    :image-u-r-l="imageURL"
                    :platforms="influencerPlatforms"
                    @platformSelected="platformSelected()"
                    @platformNotRegistered="goToPlatform"/>
    <!-- Model to display subscription  -->
    <model-subscription ref="subscription" v-if="getInvitee"
                        :invitee="getInvitee"
                        :image-u-r-l="imageURL"/>

    <!-- Custom request -->
    <model-customer-custom-request-submit
      ref="customRequestConfirm"
      @savedCustomRequest="(customRequest) => {
        $refs.customRequestDone.show(customRequest);
     }"
      @submittedCustomRequestOption="(customRequest) => {
        $refs.customRequestOption.show(customRequest, getUser.id);
      }"/>

    <model-customer-custom-request-option-info
      ref="customRequestOption"
      @savedCustomRequestOption="(customRequest) => {
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

    <model-customer-custom-request-accepted ref="customRequestAccepted"/>

    <model-customer-custom-request-done
      ref="customRequestDone" @doneCustomRequest="() => {
      }"/>

  </div>
</template>

<script>

import {SERVICE_CONTENT, SERVICE_IDENTIY, SERVICE_SUBSCRIPTION} from "@/properties/micro-service";
import {geDecodedToken, getTokenExp, isRole, isTokenExpired} from "@/common/http-common";
import {
  ACCESS_TOKEN, EXCLUSIVE_CUSTOM_REQUEST_INFLUENCERS,
  PLATFORM_INSTAGRAM,
  PLATFORM_SNAPCHAT, PLATFORM_STELLA,
  PLATFORM_TELEGRAM,
  PLATFORM_TIKTOK
} from "@/properties/close-friend";
import {
  CONTENT_TYPE_APPLICATION,
  CONTENT_TYPE_IMAGE,
  CONTENT_TYPE_URL,
  CONTENT_TYPE_VIDEO
} from "@/properties/content-type";
import {customerAccountMixin} from "@/mixin/customer-account/customer-account-mixin";
import {mapActions, mapGetters} from "vuex";
import {isUserActive} from "@/common/comm-service";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import ModelPlatform from "@/components/module/customer/account/ModelPlatform";
import ModelSubscription from "@/components/module/customer/account/ModelSubscription";
import ModelCustomerCustomRequestConfirm
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestConfirm";
import ModelCustomerCustomRequestDone from "@/components/module/customer/custom-request/ModelCustomerCustomRequestDone";
import ModelCustomerCustomRequestSubmit
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestSubmit";
import ModelCustomerCustomRequestOptionInfo
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestOptionInfo";
import ModelCustomerCustomRequestAccepted
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestAccepted";
import {CR_STATUS_ACCEPTED, CR_STATUS_READY} from "@/properties/custom-request-status";
import titleMixin from "../../../../mixin/title-mixin";
import {clone} from '@/common/Utils';
import {AGENCY_DIGIS} from "@/properties/agency";

export default {
  name: "CreatorPage",
  title: 'Creator',
  components: {
    GlobalMessage, ModelPlatform, ModelSubscription,
    ModelCustomerCustomRequestConfirm,
    ModelCustomerCustomRequestDone,
    ModelCustomerCustomRequestSubmit,
    ModelCustomerCustomRequestOptionInfo,
    ModelCustomerCustomRequestAccepted
  },
  mixins: [customerAccountMixin, titleMixin],
  data() {
    return {
      inviteeName: '',
      bio: '',
      influencerPlatforms: [],
      customRequestOptions: [],
      minRequired: 0,
      notificaiton: false,
      contents: [],
      influencerLinks: [],
      selectedContent: null,
      pageNumber: 0,
      noOfItems: 999,
      isUserLoggedIn: false,

      wallImgURLs: [],
      CONTENT_TYPE_IMAGE,
      CONTENT_TYPE_VIDEO,
      crItemIndex: 0,
      wallItemIndex: 0,
      first: true,
      imageVersion: 0,

      CR_STATUS_ACCEPTED,
      CR_STATUS_READY,

    }
  },
  mounted() {
    document.body.style.backgroundColor = '';
  },
  created() {
    this.clearAllStore();
    this.setCustomRequestInfluencer(null);
    this.setCustomRequestIndex(null);
    let tokenExp = getTokenExp(ACCESS_TOKEN);
    if (tokenExp && !isTokenExpired(ACCESS_TOKEN)) {
      if (!isRole('INFLUENCER')) {
        this.isUserLoggedIn = true;
        if (!this.getUser) {
          let customerId = geDecodedToken(ACCESS_TOKEN).id;
          this.getData(`${SERVICE_IDENTIY}/api/v1/customers/${customerId}`, (customer) => {
            this.setUser(customer);
          });
        }
      }
    }

    this.loadAvatarImg();
    this.loadInviteeData();
  },
  computed: {
    isExclCustomRequestInfluencer() {
      return EXCLUSIVE_CUSTOM_REQUEST_INFLUENCERS.includes(this.$route.params.urlPrefix);
    },
    wall1MobileImgURL() {
      let mobileURL = this.wallImgURLs.find(e => e[0].includes('wall1_mobile'));
      if (!mobileURL) {
        mobileURL = this.wallImgURLs.find(e => e[0].includes('wall1')); //Get default
      }
      return mobileURL? mobileURL[0]:null;
    },
    wall1WebImgURL() {
      let webURL = this.wallImgURLs.find(e => e[0].includes('wall1_web'));
      if (!webURL) {
        webURL = this.wallImgURLs.find(e => e[0].includes('wall1')); //Get default
      }
      return webURL? webURL[0]:null;
    },

    wall1ImgURL() {
      if (this.isMobile()) {
        return !this.wall1MobileImgURL ? this.wall2MobileImgURL : this.wall1MobileImgURL;
      } else {
        return !this.wall1WebImgURL ? this.wall2WebImgURL : this.wall1WebImgURL;
      }
    },

    wall2MobileImgURL() {
      let mobileURL = this.wallImgURLs.find(e => e[0].includes('wall2_mobile'));
      if (!mobileURL) {
        mobileURL = this.wallImgURLs.find(e => e[0].includes('wall2')); //Get default
      }
      return mobileURL? mobileURL[0]:null;
    },
    wall2WebImgURL() {
      let webURL = this.wallImgURLs.find(e => e[0].includes('wall2_web'));
      if (!webURL) {
        webURL = this.wallImgURLs.find(e => e[0].includes('wall2')); //Get default
      }
      return webURL? webURL[0]:null;
    },
    wall2ImgURL() {
      if (this.isMobile()) {
        return this.wall1MobileImgURL ? this.wall2MobileImgURL : '';
      } else {
        return this.wall1WebImgURL ? this.wall2WebImgURL : '';
      }
    }
  },
  methods: {
    ...mapActions(['setMessage', 'setUser', 'setInvitee','setAgentName',
      'setPlatform', 'clearAllStore', 'setCustomRequestInfluencer', 'setCustomRequestIndex']),
    ...mapGetters(['getCustomRequestInfluencer']),
    anchorHref(influencerLink) {
      if (influencerLink.url.toLowerCase().includes('http')) {
        return influencerLink.url;
      } else {
        return 'http://' + influencerLink.url;
      }
    },

    getLogoImage() {
      if (this.isDigis) {
        return  require('../../../../assets/images/digis-logo.png');
      }
      return require('../../../../assets/images/stella/logo-stella-white.png');
    },

    getButtonColor(influencerPlatform) {
      if (this.isInstagramPlatform(influencerPlatform)) {
        return 'btn btn-success';
      } else if (this.isTelegramPlatform(influencerPlatform)) {
        return 'btn btn-blue'
      } else if (this.isOtherPlatform(influencerPlatform)) {
        return 'btn btn-success';
      }
      return 'btn btn-black'
    },
    getButtonLabel(influencerPlatform) {
      if (this.isInstagramPlatform(influencerPlatform)) {
        return 'Instagram Close Friends';
      } else if (this.isSnapchatPlatform(influencerPlatform)) {
        return 'Private Snapchat';
      } else if(influencerPlatform.isMessage) {
        return 'Send a message';
      } else if (this.isStellaPlatform(influencerPlatform)) {
        return 'All-Access';
      }
      return `Exclusive ${influencerPlatform.platform.name}`;
    },
    isInstagramPlatform(influencerPlatform) {
      if (influencerPlatform.platform.name.includes(PLATFORM_INSTAGRAM)) {
        return true;
      }
      return false;
    },
    isSnapchatPlatform(influencerPlatform) {
      if (influencerPlatform.platform.name.includes(PLATFORM_SNAPCHAT)) {
        return true;
      }
      return false;
    },
    isStellaPlatform(influencerPlatform) {
      if (influencerPlatform.platform.name.includes(PLATFORM_STELLA)) {
        return true;
      }
      return false;
    },
    isTelegramPlatform(influencerPlatform) {
      if (influencerPlatform.platform.name.includes(PLATFORM_TELEGRAM)) {
        return true;
      }
      return false;
    },
    isOtherPlatform(influencerPlatform) {
      let platform = influencerPlatform.platform.name;
      if (platform === PLATFORM_SNAPCHAT
        || platform === PLATFORM_INSTAGRAM
        || platform === PLATFORM_TIKTOK
        || platform === PLATFORM_TELEGRAM) {
        return false;
      }
      return true;
    },

    checkPlatform(influencerPlatform) {
      let customer = this.getUser;
      //This means it is logged in user
      if (customer) {
        let custPlatform = customer.customerPlatforms
          .find(customerPlatform => customerPlatform.platform.name === influencerPlatform.platform.name);
        //Check if the customer has registered with this platform
        if (custPlatform) {
          this.setPlatform(influencerPlatform);
          this.$router.replace({name: 'CustomerRouter'});
        } else {
          this.goToPlatform(influencerPlatform);
        }
      } else {
        this.goToPlatform(influencerPlatform);
      }
    },
    goToPlatform(influencerPlatform) {
      console.log('influencerPlatform.platform', influencerPlatform.platform);
      this.setPlatform(influencerPlatform);
      if (this.isInstagramPlatform(influencerPlatform)) {
        this.$router.push({path: `/c/${this.$route.params.urlPrefix}`});
      } else if (this.isSnapchatPlatform(influencerPlatform)) {
        this.$router.push({path: `/snapchat/${this.$route.params.urlPrefix}`});
      } else if (this.isExclCustomRequestInfluencer && this.getCustomRequestInfluencer() != null) {
        //If exclusive influencer and the customer has selected a custom request
        this.$router.push({path: `/exclCustomRequest/${this.$route.params.urlPrefix}`});
      } else if (this.isOtherPlatform(influencerPlatform)) {
        this.$router.push({path: `/platform/${this.$route.params.urlPrefix}`});
      } else {
        this.$router.push({path: `/tiktok/${this.$route.params.urlPrefix}`});
      }
    },
    setAgency(invitee) {
      if(invitee.agency && invitee.agency.name.toLowerCase() === AGENCY_DIGIS) {
        this.setAgentName(AGENCY_DIGIS);
      } else {
        this.setAgentName(null);
      }
    },
    loadInviteeData() {
      let invitee = this.$route.params.urlPrefix;
      this.getUnSecureData(`${SERVICE_IDENTIY}/api/v1/influencers/urlSuffix/${invitee}`, (invitee) => {

        if (!isUserActive(invitee)) {
          this.$router.replace({name: 'DisabledAccount'});
        }
        this.inviteeName = invitee.name;
        this.bio = invitee.bio;
        this.minRequired = invitee.customRequestMinPrice;
        this.influencerLinks = invitee.influencerLinks;
        this.setInvitee(invitee);
        this.setTitle();
        this.setAgency(invitee);


        //Get influencer platforms
        this.getUnSecureData(`${SERVICE_SUBSCRIPTION}/api/v1/influencers/${invitee.id}/platform`, (influencerPlatforms) => {
          this.influencerPlatforms = influencerPlatforms;
          let index = this.influencerPlatforms
            .findIndex((infPlatform) => infPlatform.platform.name === PLATFORM_STELLA);
          if (index !== -1 && index !== 0) {
            let stellaPlatform = this.influencerPlatforms[index];
            this.influencerPlatforms.splice(index, 1);
            this.influencerPlatforms.unshift(stellaPlatform);

            //Clone stella platform create clone and mark as message platform
            let sendMessage = clone(stellaPlatform);
            sendMessage.isMessage = true;
            this.influencerPlatforms.push(sendMessage);
          }
        });

        //Get influencer custom request options
        let url = `${SERVICE_CONTENT}/api/v1/public/influencers/${invitee.id}/custom-request-options/`;
        this.getUnSecureData(url, (customRequestOptions) => {
          this.customRequestOptions = customRequestOptions;
        });

        //Get wall images
        url = `${SERVICE_CONTENT}/api/v1/public/influencers/${invitee.id}/wall`;
        this.getUnSecureData(url, (wallImgURLs) => {
          this.wallImgURLs = wallImgURLs;
          this.imageVersion = Math.random();
          this.$nextTick(() => {
            $('.carousel').carousel();
            $('#creator-carousel').on('slide.bs.carousel', (val) => {
              this.wallItemIndex = val.to;
            });
          });
        });

        url = `${SERVICE_CONTENT}/api/v1/public/influencers/${invitee.id}/content/page?pageNumber=${this.pageNumber}&numberOfItems=${this.noOfItems}`;
        this.getUnSecureData(url, (page) => {
          if (!page.empty) {
            this.contents.push(...page.content);
            this.$nextTick(() => {
              $('.carousel').carousel();
              $('#custom-request-carousel').on('slide.bs.carousel', (val) => {
                this.crItemIndex = val.to;
              });
            });
          }
        });

      });
    },
    subscribe(content) {
      this.$refs.platform.show();
      this.selectedContent = content;
    },
    platformSelected() {
      this.$refs.subscription.show();
    },
    submitCustomRequest(index) {

      this.setCustomRequestInfluencer(this.getInvitee);
      this.setCustomRequestIndex(index);

      if (!this.isUserLoggedIn) {
        if (this.isExclCustomRequestInfluencer) {
          let infStellaPlatform = this.influencerPlatforms
            .find(infPlatform => infPlatform.platform.name === PLATFORM_STELLA);
          this.$refs.platform.goToPlatform(infStellaPlatform);
        } else {
          this.$refs.platform.show('Before submitting a custom request');
        }
        return;
      }
      let influencer = this.getInvitee;
      this.$refs.customRequestConfirm.show(influencer.id, this.getUser.id, influencer.customRequestMinPrice);
      if (index === null) {
        this.$refs.customRequestConfirm.chosenCustomRequest();
      } else {
        this.$refs.customRequestConfirm.chosenCustomRequestOption(index);
      }
    }

  }
}
</script>

<style scoped>
button>span{
  margin-left: 5%;
}
</style>
