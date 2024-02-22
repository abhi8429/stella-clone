<template>
<section class="container-fluid">
  <div class="row p-md-4 pb-md-0">
    <div class="border-around border-md-1 border-0 p-2">
      <div>

        <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>


        <influencer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></influencer-menu>
        <header-menu @slideMenu="slideBar()" :is-loading="isLoading"></header-menu>

            <div class="row">
              <div class="col-12 col-sm-12 col-md-12">
                <div class="custom-card">
                  <div class="custom-body">
                    <global-message></global-message>
                    <div >
                      <div class="form-block blocked-friends-section">
                        <h5 class="my-2 ml-2">Blocked Friends</h5>
                        <div class="scroll-list mt-3 mobile-scroll-list">
                          <div v-infinite-scroll="loadNonMobileSubscriptions"
                               class="scroll-list mt-3 mobile-scroll-list"
                               infinite-scroll-disabled="busy" infinite-scroll-distance="5"
                               infinite-scroll-throttle-delay=1000>

                          <div class="row" v-for="(customerSubscription, index) in customerSubscriptions" :key="index"
                               :id="customerSubscription.status">
                            <div class="col-4 p-0 ">{{ customerSubscription.handle }}</div>
                            <div class="col-4 p-0">
                              <div class="row  d-flex">
                                <div class="col-12 col-md-6 text-center">{{customerSubscription.friendSince | formatDate}}</div>
                                <div class="col-12 col-md-6 text-center font-grey font-size-14 vertical-center font-size-12-14">{{ customerSubscription.friendSince | formatTime }}</div>
                              </div>
                            </div>
                            <div class="col-4 p-0 justify-content-end">
                              <button class="btn rounded-pill text-dark btn-dark-grey btn-lg" @click.prevent="confirmSingleSave(customerSubscription, 'unblock')">Unblock</button>
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
    </div>
  </div>
  <infinite-loading v-if="isMobile()"
                    ref="infiniteLoading"
                    @infinite="loadMobileSubscriptions">
    <div slot="no-more"></div>
    <div slot="no-results"></div>
  </infinite-loading>
  <model ref="model" @confirm="unblock()" @cancel=""/>
</section>
</template>

<script>


import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import InfluencerHeader from "@/components/module/influencer/shared/InfluencerHeader";
import {httpMixin} from "@/mixin/http-mixin";
import {geDecodedToken} from "@/common/http-common";
import {ACCESS_TOKEN} from "@/properties/close-friend";
import infiniteScroll from "vue-infinite-scroll";
import Model from "@/components/module/shared/Model";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {mapActions} from "vuex";

export default {
  name: 'BlockedFriendsMobile',
  components: {HeaderMenu, InfluencerMenu, InfluencerHeader, Model, GlobalMessage},
  mixins: [httpMixin],
  data() {
    return {
      user: {},
      showSlideBar: false,
      pageNumber: 0,
      noOfItems: 11,
      isComplete: false,
      customerSubscriptions: [],
    }
  },
  directives: {
    infiniteScroll
  },
  created() {
  },
  methods: {
    ...mapActions(['pushGlobalError', 'setMessage']),
    close() {
      this.$router.replace({name: 'FriendMenuMobile'})
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },

    loadMobileSubscriptions($state) {
      let userId = geDecodedToken(ACCESS_TOKEN).id;
      this.getData(`subscription/api/v1/influencers/${userId}/status/Blocked/page?pageNumber=${this.pageNumber}&numberOfItems=${this.noOfItems}`, (page) => {
        if (!page.empty) {
          this.customerSubscriptions.push(...page.content);
          this.pageNumber += 1;
          $state.loaded();
        }
        if (page.last) {
          $state.complete();
        }
      });
    },
    loadNonMobileSubscriptions() {
      if (this.isComplete) {
        return;
      }
      let userId = geDecodedToken(ACCESS_TOKEN).id;
      this.getData(`subscription/api/v1/influencers/${userId}/status/Blocked/page?pageNumber=${this.pageNumber}&numberOfItems=${this.noOfItems}`, (page) => {
        if (!page.empty) {
          this.customerSubscriptions.push(...page.content);
          this.pageNumber += 1;
          this.isComplete = page.last;
        }
      });
    },

    confirmSingleSave(customerSubscription, action) {
      this.customerSubscription = customerSubscription;
      this.action = action;
      let insert = '@' + customerSubscription.name;
      let text = this.getModelText(action, insert);
      this.$refs.model.show(action+'?', text);
    },

    unblock() {
      this.customerSubscription.status = 'Inactive'
      let userId = geDecodedToken(ACCESS_TOKEN).id;
      let url = `subscription/api/v1/influencers/${userId}/status/`;

      this.patchData(url, [this.customerSubscription], (data) => {
        this.pageNumber = 0;
        this.isComplete = false;
        this.customerSubscriptions = [];
        this.$refs.model.hide();
        this.loadNonMobileSubscriptions();
        this.setMessage('Saved successfully');
      });
    },
    getModelText(action, insert) {
        return `Please confirm that ${insert} fans have been ${action} as Close Friend`;
    },
  }
}
;
</script>
