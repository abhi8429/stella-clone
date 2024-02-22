<template>
  <div>

    <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>

    <template v-if="isRole('INFLUENCER')">
      <influencer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></influencer-menu>
    </template>
    <template v-else>
      <customer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></customer-menu>
    </template>
    <header-menu @slideMenu="slideBar()"></header-menu>

    <section class="closefriend-hero background-white">
      <div class="container mt-5">
        <div class="row">
          <template v-if="isRole('INFLUENCER')">

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
                <input type="text" class="form-control stella-group px-0 font-gradient-a font-weight-bold"
                  :value="constructCustomerURL(user.urlSuffix)" readonly id="url-suffix">
                <span class="input-group-text p-1 pe-2">
                  <button id="copy_id" class="btn py-2 px-3 font-size-18 copy-btn border-radius-12 text-white"
                    @click="copyNow('url-suffix')">{{ copyLabel }}</button>
                </span>
              </div>

            </div>
            <div class="col-12"></div>

          </template>
          <div class="col-12 text-center mt-4">
            <h3 class="faq-name" style="font-family: barlow;">
              <span style="border-bottom: 3px solid;" @click="$router.push({ name: 'FAQ' })">FAQ</span>
            </h3>
            <global-message></global-message>
            <pending-custom-requests v-if="!isInfluencer" />
          </div>
          <div class="col-12 help-icon-section">
            <div class="row justify-content-center">
              <div class="col-md-3 col-12 text-center mt-mb-0 my-4">
                <img src="@/assets/images/help-mail.svg" style="filter:grayscale(1);">
                <p class="font-size-14 mt-3 mb-1 font-grey">Send us an email:</p>
                <h5 class="font-size-18">hello@stella.so</h5>
              </div>
              <!--              <div class="col-md-3 col-12 text-center mt-mb-0 my-4">
                              <img src="../../../assets/images/help-dc.svg">
                              <p class="font-size-14 mt-3 mb-1 font-grey">VIP contact</p>
                              <h5 class="font-size-18">discord.com/closefriendvip</h5>
                            </div>-->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import InfluencerHeader from "@/components/module/influencer/shared/InfluencerHeader";
import CustomerMenu from "@/components/module/customer/shared/CustomerMenu";
import { isRole, } from "@/common/http-common";
import { constructCustomerURL } from "@/common/baseURL-service";
import { newSubscriptionMixin } from "@/mixin/new-subscription-mixin";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import { igValidationMixin } from "@/mixin/ig-validation-mixin";
import PendingCustomRequests from "@/components/module/customer/shared/PendingCustomRequests";
import titleMixin from "../../../mixin/title-mixin";

export default {
  name: 'HelpMobile',
  props: ['helpFor'],
  mixins: [newSubscriptionMixin, igValidationMixin],
  components: {HeaderMenu, InfluencerMenu, InfluencerHeader,
    CustomerMenu, GlobalMessage, PendingCustomRequests},
  data() {
    return {
      user: {},
      showSlideBar: false,
    }
  },
  created() {
    this.user = this.getUser();
    if (this.isInfluencer) {
      this.checkNewSubscription(this.user.id);
    } else {
      this.initIGValidity();
    }
  },
  computed: {
    copyLabel() {
      return this.copied ? 'Copied' : 'Copy';
    },
    isInfluencer() {
      return this.isRole('INFLUENCER');
    }
  },
  methods: {
    ...mapGetters(['getUser']),
    constructCustomerURL,
    isRole,
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },

  }
}
  ;
</script>

