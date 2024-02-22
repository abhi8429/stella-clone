<template>
  <div>

    <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>

    <customer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></customer-menu>
    <header-menu @slideMenu="slideBar()"></header-menu>
    <section class="closefriend-hero background-white">
      <div class="container mt-5">
        <global-message></global-message>
        <br>
      </div>
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
            <div class="custom-card">
              <div class="custom-body">
                <div class="form-outline pb-md-0 pb-3 mb-3">
                  <div class="form-block p-0 p-md-2">
                    <div class="row py-3 mx-1">
                      <div class="col-md-12 col-12">
                        <div class="congrets-center">
                          <br>
                          <div class="text-center">
                            <img v-if="!isAvatarMissing"
                                 :src="imageURL"
                                 class="customer-checkout-image" @error="imageLoadError">
                            <img v-else src="@/assets/images/default_user.png" class="customer-checkout-image">
                            <div style="white-space: nowrap;" class="font-black font-weight-600 py-3">@{{
                                invitee.name
                              }}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div class="row py-md-3 mx-1 pb-0">
                      <div class="col-md-12 col-12 vertical-center justify-content-md-start mt-md-0 mt-3 p-0">
                        <div class="row px-1 checkout-form m-0 p-0">
                          <div class="col-md-12 text-center">
                            <img src="@/assets/images/congrets.png">
                            <h1>Congrats!</h1>
                            <h5 class="font-size-14">You’re subscribed to {{ invitee.name }}!</h5>
                            <p class="font-size-12 font-grey">@{{ invitee.name }} has been notified and will add you
                              soon!</p>
                          </div>
                          <!--                          <div class="col-12 col-md-12 px-md-1">
                                                      <div class="input-group mt-3">
                                                        <input type="text" :value="link" class="form-control font-blue btn-bg-white-important">
                                                      </div>
                                                    </div>-->

                          <div class="col-md-12 p-0 mx-md-0 mx-3">
                            <button type="button"
                                    class="btn btn-success btn-block btn-lg btn-block mt-md-3 mt-3 font-size-16 btn-mobile  btn-payment"
                                    @click="onContinue()">
                              Continue
                            </button>
                          </div>
                          <div class="col-md-12 col-12 px-1 text-center" v-if="isSuffixCustomRequest">
                            <button type="button"
                                    class="btn btn-bg-white-important mt-3 btn-outline-grey py-1 font-size-15-18"
                                    @click="showCustomerContent()">Skip
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
        </div>
      </div>
    </section>

    <!-- Custom request -->
    <!--    <model-customer-custom-request-submit
          ref="customRequestConfirm"
          @submittedCustomRequest="(customRequest) => {
          $refs.customRequestSubmit.show(customRequest, getUser().id);
         }"/>
        <model-customer-custom-request-confirm
          ref="customRequestSubmit"
          @savedCustomRequest="(customRequest) => {
            $refs.customRequestDone.show(customRequest);
          }"
          @back="() => {
             $refs.customRequestConfirm.simpleShow();
          }"/>
        <model-customer-custom-request-done
          ref="customRequestDone" @doneCustomRequest="() => {
            $router.replace({name: 'CustomerCustomRequestList'});
          }"/>-->

    <!-- Custom request -->
    <!-- New  -->
    <model-customer-custom-request-submit
      ref="customRequestConfirm"
      @savedCustomRequest="(customRequest) => {
        $refs.customRequestDone.show(customRequest);
     }"
      @submittedCustomRequestOption="(customRequest) => {
        $refs.customRequestOption.show(customRequest, getUser().id);
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
        $router.replace({name: 'CustomerCustomRequestList'});
      }"/>


  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import CustomerMenu from "@/components/module/customer/shared/CustomerMenu";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {igValidationMixin} from "@/mixin/ig-validation-mixin";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {isSuffixCustomRequest} from "@/common/comm-service"
import ModelCustomerCustomRequestConfirm
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestConfirm";
import ModelCustomerCustomRequestDone from "@/components/module/customer/custom-request/ModelCustomerCustomRequestDone";
import ModelCustomerCustomRequestSubmit
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestSubmit";
import ModelCustomerCustomRequestOptionInfo
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestOptionInfo";
import {CR_STATUS_ACCEPTED, CR_STATUS_READY} from "@/properties/custom-request-status";
import ModelCustomerCustomRequestAccepted
  from "@/components/module/customer/custom-request/ModelCustomerCustomRequestAccepted";

export default {
  name: 'HelpMobile',
  components: {
    GlobalMessage, HeaderMenu, CustomerMenu,
    ModelCustomerCustomRequestConfirm,
    ModelCustomerCustomRequestDone,
    ModelCustomerCustomRequestSubmit,
    ModelCustomerCustomRequestOptionInfo,
    ModelCustomerCustomRequestAccepted

  },
  mixins: [igValidationMixin],
  data() {
    return {
      invitee: {},
      showSlideBar: false,
      isAvatarMissing: false,
      imageURL: '',

      CR_STATUS_ACCEPTED,
      CR_STATUS_READY
    }
  },
  created() {
    this.invitee = this.getInvitee();
    this.setMessage('SAVED.SUCCESSFULLY');

    this.loadAvatarImg();
    /*  if (!this.isSuffixCustomRequest) {
        this.showCustomerContent();
      } else {
        this.initIGValidity();
      }*/

  },
  computed: {
    link() {
      return `closefriend.io/${this.invitee.urlSuffix}`;
    },
    isSuffixCustomRequest() {
      return isSuffixCustomRequest(this.getRedirectedFrom());
    },
  },
  methods: {
    ...mapGetters(['getUser', 'getInvitee', 'getRedirectedFrom']),
    ...mapActions(['pushGlobalError', 'setMessage']),
    showCustomerContent() {
      let url = `${SERVICE_CONTENT}/api/v1/customers/${this.getUser().id}/content/available`;
      this.getData(url, (contentAvailable) => {
        //Check if their are contents, if yes, then show contents
        if (contentAvailable) {
          this.$router.replace({name: 'CustomerBonusContentList'});
        } else {
          this.$router.replace({name: 'CustomerDashboardMobile'});
        }
      });
    },
    submitCustomRequest(influencer) {
      this.$refs.customRequestConfirm.show(influencer.id, this.getUser().id, influencer.customRequestMinPrice);
    },
    onContinue() {
      if (this.isSuffixCustomRequest) {
        this.submitCustomRequest(this.invitee);
      } else {
        this.$router.replace({name: 'CustomerTip'});
      }
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },
    imageLoadError(event) {
      this.isAvatarMissing = true;
    },
    loadAvatarImg() {
      //${BASE_URL}/content/api/v1/influencers/urlSuffix/${invitee.urlSuffix}/avatar
      let url = `${SERVICE_CONTENT}/api/v1/influencers/urlSuffix/${this.invitee.urlSuffix}/avatar`;
      this.getUnSecureData(url, (imageURL) => {
        this.imageURL = imageURL.replace('dp', 'dp_150X150');
        this.isAvatarMissing = false;
      });
    },

  }
}
;
</script>

<style scoped>

.customer-checkout-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  cursor: pointer;
}

</style>

