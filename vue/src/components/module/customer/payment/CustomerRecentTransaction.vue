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

              <div class="col-12 col-sm-12 col-md-12">
                <div class="custom-card">
                  <div class="custom-body">
                    <global-message></global-message>
                    <pending-custom-requests/>
                    <div class="mt-3 mb-4">
                      <div class="">
                        <h5 class="my-2 ml-2 text-white">Recent Transactions</h5>
                        <div v-infinite-scroll="loadMore"
                             infinite-scroll-disabled="busy" infinite-scroll-distance="5"
                             infinite-scroll-throttle-delay=1000
                             class="scroll-list mt-3 mobile-scroll-list">
<!--                            <div class="row" v-for="(customerTransaction, index) in customerTransactions" :key="index">-->
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

                            <div class=" col-md-9  media-query-class">
                              <div >{{ customerTransaction.transactionId }}</div>
                              <div class="font-grey">{{ camelCaseToSentence(customerTransaction.status) }}</div>
                            </div>
<!--                            <div class="col-12 col-md-8 p-0 font-grey my-md-0 my-1">-->
<!--                              {{ customerTransaction.transactionId }}-->
<!--                            </div>-->
<!--                            <div class="col-12 col-md-8 p-0 font-grey my-md-0 my-1">-->
<!--                              {{ camelCaseToSentence(customerTransaction.status) }}-->
<!--                            </div>-->

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
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import {camelCaseToSentence} from '@/common/Utils';
import CustomerMenu from "@/components/module/customer/shared/CustomerMenu";
import {SERVICE_PAYMENT} from "@/properties/micro-service";
import {igValidationMixin} from "@/mixin/ig-validation-mixin";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import infiniteScroll from 'vue-infinite-scroll'
import PendingCustomRequests from "@/components/module/customer/shared/PendingCustomRequests";
import titleMixin from "../../../../mixin/title-mixin";

export default {
  name: 'RecentTransactionMobile',
  title: 'Recent transaction',
  components: {GlobalMessage, HeaderMenu,
    CustomerMenu, PendingCustomRequests},
  mixins: [igValidationMixin, titleMixin],
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
  },
  methods: {
    ...mapGetters(['getUser']),
    camelCaseToSentence,
    loadMore() {
      console.log('load-more');
      if (this.isComplete === true) {
        return;
      }
      let url = `${SERVICE_PAYMENT}/api/v1/customers/${this.user.id}/page?pageNumber=${this.pageNumber}&numberOfItems=${this.noOfItems}`;
      this.getData(url, (page) => {
        //Do this only once
        if (this.pageNumber === 0) {
          this.initIGValidity();
        }
        if (!page.empty) {
          this.customerTransactions.push(...page.content);
          this.pageNumber += 1;
        }
        this.isComplete = page.last;
        console.log('complete');
      })
    },
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

