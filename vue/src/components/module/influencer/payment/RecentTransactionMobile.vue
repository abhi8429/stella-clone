<template>
<section class="container-fluid">
  <div class="row p-md-4 pb-md-0">
    <div class="border-around border-md-1 border-0 p-2">
      <div>

        <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>


        <influencer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></influencer-menu>
        <header-menu @slideMenu="slideBar()"></header-menu>

        <section class="closefriend-hero background-white">
          <div class="container mt-3">
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
              <div class="col-12"></div>

              <div class="col-12 col-sm-12 col-md-12">
                <div class="custom-card">
                  <div class="custom-body">
                    <div >
                      <div class="form-block blocked-friends-section">
                        <h5 class="my-2 ml-2">Recent Transactions</h5>
                        <div v-infinite-scroll="loadMore"
                             infinite-scroll-disabled="busy" infinite-scroll-distance="5"
                             infinite-scroll-throttle-delay=1000
                             class="scroll-list mt-3 mobile-scroll-list">
<!--                          <div class="row" v-for="(customerTransaction, index) in customerTransactions" :key="index">-->
                          <div class="col-md-12 media-query-class2 py-2" v-for="(customerTransaction, index) in customerTransactions" :key="index">

<!--                            <div class="col-6 col-md-2 p-0 ">{{ customerTransaction.transactedAt | formatDate }}</div>-->
<!--                            <div class="col-6 col-md-2 p-0">-->
<!--                              <div class="row d-flex">-->
<!--                                <div class="col-12 col-md-6 text-center success vertical-center justify-content-end">-->
<!--                                  ${{ customerTransaction.amount }}-->
<!--                                </div>-->
<!--                              </div>-->
<!--                            </div>-->
                            <div class=" col-md-3 d-flex flex-row justify-content-between">
                              <div class="margin-class" >{{customerTransaction.transactedAt | formatDate }}</div>
                              <div class="success">${{customerTransaction.amount}}</div>
                            </div>

<!--                            <div class="col-12 col-md-8 p-0 font-grey my-md-0 my-1">-->
<!--                              {{ customerTransaction.transactionId }}-->
<!--                            </div>-->
<!--                            <div class="col-12 col-md-8 p-0 font-grey my-md-0 my-1">-->
<!--                              {{ camelCaseToSentence(customerTransaction.status) }}-->
<!--                            </div>-->

                            <div class=" col-md-9  media-query-class">
                              <div >{{ customerTransaction.transactionId }}</div>
                              <div class="font-grey">{{ camelCaseToSentence(customerTransaction.status) }}</div>
                            </div>

                            <div class="col-12 col-md-8 p-0 font-grey my-md-0 my-1">
                              {{ customerTransaction.name }}
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

      </div>
    </div>
  </div>
</section>
</template>

<script>

import {mapGetters} from "vuex";
import {httpMixin} from "@/mixin/http-mixin";
import InfluencerHeader from "@/components/module/influencer/shared/InfluencerHeader";
import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import {camelCaseToSentence} from '@/common/Utils';
import {constructCustomerURL} from "@/common/baseURL-service";
import {newSubscriptionMixin} from "@/mixin/new-subscription-mixin";
import infiniteScroll from 'vue-infinite-scroll'
import titleMixin from "../../../../mixin/title-mixin";

export default {
  name: 'RecentTransactionMobile',
  title: 'Creator recent transaction',
  components: {HeaderMenu, InfluencerMenu, InfluencerHeader},
  mixins: [httpMixin, newSubscriptionMixin, titleMixin],
  data() {
    return {
      user: {},
      customerTransactions: [],
      showSlideBar: false,

      pageNumber: 0,
      noOfItems: 10,
      isComplete: false
    }
  },
  created() {
    this.user = this.getUser();
    this.checkNewSubscription(this.user.id);
  },
  computed: {
    copyLabel() {
      return this.copied ? 'Copied' : 'Copy';
    }
  },
  methods: {
    ...mapGetters(['getUser']),
    loadMore() {
      console.log('load-more');
      if (this.isComplete === true) {
        return;
      }
      let url = `payment/api/v1/influencers/${this.user.id}/page?pageNumber=${this.pageNumber}&numberOfItems=${this.noOfItems}`;
      this.getData(url, (page) => {
        if (!page.empty) {
          this.customerTransactions.push(...page.content);
          this.pageNumber += 1;
        }
        this.isComplete = page.last;
        console.log('complete');
      })
    },
    constructCustomerURL,
    camelCaseToSentence,
    check() {
      this.showSlideBar = !this.showSlideBar;
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },
  },
  directives: {
    infiniteScroll
  }
}
;
</script>
<style scoped>
@media (max-width: 767px) {
  .media-query-class{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

@media (min-width: 768px){
  .media-query-class{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
  }
  .media-query-class2{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
@media (min-width: 768px) and (max-width: 999px){
  .margin-class{
    margin-right: 50px;
  }
}

</style>
