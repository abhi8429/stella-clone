<template>
  <section class="container-fluid">
    <div class="row p-md-4 pb-md-0">
      <div class="border-around border-md-1 border-0 p-2">
        <div>

          <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>


          <InfluencerMenu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"/>
          <header-menu @slideMenu="slideBar()" :is-loading="isLoading"></header-menu>

          <section class="">
            <div class="container mt-3 px-2">

              <div class="row">
                <div class="col-12 col-sm-12 col-md-12" v-if="pendingCustomRequests > 0 || messageCount > 0">
                  <div class="alert alert-warning mb-2">
                    <div class="font-orange d-flex flex-column">
                      <div class="custom-mobile-responsive d-flex flex-row justify-content-between"
                           v-if="pendingCustomRequests > 0"><p>{{ pendingCustomRequests }} Pending Custom Requests</p>
                        <a
                          class=" font-orange custom-mobile-button"
                          @click="$router.replace({name: 'CustomRequestList'})">
                          <p class="ml-1"><u>Review</u></p>
                        </a>
                      </div>
                      <div class="custom-mobile-responsive d-flex flex-row justify-content-between"
                           v-if="messageCount > 0"><p>{{ messageCount }} Message in inbox</p>
                        <a
                          class="font-orange custom-mobile-button"
                          @click="$router.replace({name: 'CreatorDirectMessage'})">
                          <p class="ml-1"><u>Review</u></p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <!--                  <div class="alert alert-warning d-flex mb-2">-->
                  <!--                    <div class="font-orange">-->
                  <!--                      <div>{{ pendingCustomRequests }} Pending Custom Requests-->
                  <!--                        <button-->
                  <!--                          class="alert-btn alert-bg-orange font-orange"-->
                  <!--                          @click="$router.replace({name: 'CustomRequestList'})">-->
                  <!--                          <span><u>Review</u></span>-->
                  <!--                        </button>-->
                  <!--                      </div>-->
                  <!--                    </div>-->
                  <!--                  </div>-->
                </div>
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
                             @click="scroll(NEED_TO_ADD)">
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

                  <!-- <div class="input-group">
                    <input type="text" class="form-control link" name="number" :value="constructCustomerURL(user.urlSuffix)"
                           readonly id="url-suffix">
                    <div class="input-group-prepend">
                                  <span class="input-group-text copy-link">
                                      <span id="copy_id" class="btn btn-copy-link"
                                            @click="copyNow('url-suffix')">{{ copyLabel }}</span>
                                  </span>
                    </div>
                  </div> -->
                </div>
                <div class="col-12"></div>
                <!-- active fiends - begin  -->
                <div class="col-lg-4 col-md-4 col-sm-12">
                  <div class="row">
                    <div class="card-statistic stells-card col-12">
                      <div class="row p-0">
                        <div class="col-6">
                          <h6 class="font-size-14 font-grey text-uppercase card-text">Active Friends</h6>
                          <h2 style="font-size: 46px;">{{ stats.activeFriend }}</h2>
                        </div>
                        <div class="col-6 vertical-center">
                          <canvas id="balance-chart" height="80"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- active fiends - end  -->
                <!-- revenue - begin  -->
                <div class="col-lg-4 col-md-4 col-sm-12">
                  <div class="row">
                    <div class="card-statistic stells-card col-12">
                      <div class="row p-0">
                        <div class="col-12">

                          <h6 class="font-size-12 font-grey text-uppercase card-text vertical-center m-0"
                              style="justify-content: space-between;padding-top: 7px;">
                            <span>{{ revenueLabel }} revenue</span>
                            <button type="button" class="float-right btn btn-toggle-custom active" data-toggle="button"
                                    aria-pressed="true" autocomplete="off" @click="toggle()">
                              <div class="handle"></div>
                            </button>
                          </h6>
                          <h2 style="font-size: 46px;padding-top: 8px;">${{ revenue }}</h2>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- revenue - end  -->
                <!-- bonus content revenue - begin  -->
                <div class="col-lg-4 col-md-4 col-sm-12" v-if="stats.bonusContentRevenue">
                  <div class="row">
                    <div class="card-statistic stells-card col-12">
                      <!-- padding was 23 -->
                      <div class="row p-0">
                        <div class="col-12 ">
                          <h6 class="font-size-12 font-grey text-uppercase card-text vertical-center m-0"
                              style="justify-content: space-between;padding-top: 7px;">
                            <span>One-time Revenue</span>
                          </h6>
                          <h2 style="font-size: 46px;padding-top: 8px;">${{ stats.bonusContentRevenue }}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12" v-else>
                  <div class="row">
                    <div class="card-statistic stells-card col-12">
                      <!-- padding was 23 -->
                      <div class="row p-0">
                        <div class="col-12 ">
                          <h6 class="font-size-12 font-grey text-uppercase card-text vertical-center m-0"
                              style="justify-content: space-between;padding-top: 7px;">
                            <span>Bonus Content revenue</span>
                          </h6>
                          <button @click="$router.replace({name: 'BonusContentAdd'})"
                                  class="btn stella-btn py-2 gradient-a font-weight-900 mt-3 border-radius-12 d-flex justify-content-center align-items-center">
                            <span class="font-size-16 font-family-poppins text-white">Add Bonus Content</span>
                            <img class="mx-1" src="@/assets/images/stella/Create.png">
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- bonus content revenue - end  -->

                <div class="col-12 col-sm-12 col-md-12">
                  <div class="custom-card">
                    <div class="custom-body">
                      <div class="">
                        <div class="form-block blocked-friends-section p-0 p-md-2">
                          <global-message></global-message>

                          <div class="mt-3">
                            <div class="stella-border-bottom pb-2 pb-md-1 px-0 w-100">
                              <div class="row">

                                <div class="col-md-6 col-12 vertical-center order-last order-md-first">

                                  <ul
                                    class="nav nav-pills dashboard-nav d-flex justify-content-md-start justify-content-around align-items-center w-100">
                                    <li class="me-md-3" @click="filterSubscribers(NEED_TO_ADD)"
                                        :class="filterBtnClass(NEED_TO_ADD)">To Add
                                    </li>
                                    <li class="me-md-3" @click="filterSubscribers(NEED_TO_REMOVE)"
                                        :class="filterBtnClass(NEED_TO_REMOVE)">To Remove
                                    </li>
                                    <li class="me-md-3" @click="filterSubscribers(ACTIVE)"
                                        :class="filterBtnClass(ACTIVE)">Active
                                    </li>
                                    <li class="me-md-3" @click="filterSubscribers(INACTIVE)"
                                        :class="filterBtnClass(INACTIVE)">Inactive
                                    </li>
                                  </ul>
                                </div>

                                <div class="col-md-6 col-12 order-first order-md-last mb-md-0 mb-3">
                                  <input placeholder="Search"
                                         type="text"
                                         name="search"
                                         v-model="searchTerm"
                                         @keyup.enter="search()"
                                         class="stella-group form-control search-text ms-md-3">
                                </div>

                              </div>
                            </div>
                          </div>

                          <div class="row py-3 mx-1 mt-3" id="action_section" v-if="showActionSection">
                            <div class="col-md-6 col-12 justify-content-md-start mt-md-0 dashboard-btn-section">
                              <button id="add_btn" v-if="showAction(NEED_TO_ADD)" @click="confirmSave()"
                                      class="btn btn-insta-green rounded-pill font-weight-500 px-4 py-1">Add
                              </button>
                              <button id="remove_btn" v-if="showAction(NEED_TO_REMOVE)" @click="confirmSave()"
                                      class="btn btn-danger rounded-pill font-weight-500 px-4 py-1">
                                Remove
                              </button>
                            </div>
                          </div>

                          <!-- infinite-scroll only works for desktop browser -->
                          <div v-infinite-scroll="loadNonMobileSubscriptions"
                               class="scroll-list mt-3 mobile-scroll-list"
                               infinite-scroll-disabled="busy" infinite-scroll-distance="5"
                               infinite-scroll-throttle-delay=1000>

                            <div class="row header">
                              <div class="col-1 col-md-1 p-0 " v-if="filter !== ''">
                                <div class="custom-checkbox custom-control dashboard-checkbox-global">
                                  <input type="checkbox" data-checkboxes="mygroup"
                                         class="custom-control-input" id="checkbox-all"
                                         v-model="selectAll">
                                  <label for="checkbox-all" class="custom-control-label"
                                         style="color: white">&nbsp;</label>
                                </div>
                              </div>
                              <div
                                class="col-4 col-md-3 p-0 font-grey vertical-center justify-content-start font-size-14">
                                Username
                              </div>
                              <div
                                class="col-3 col-md-2 p-0 font-grey vertical-center justify-content-start font-size-14">
                                Type
                              </div>
                              <div
                                class="col-4 col-md-5 p-0 font-grey vertical-center justify-content-start font-size-14">
                                Friend Since
                              </div>
                              <div class="col-1 col-md-1 p-0 "></div>
                            </div>

                            <div class="row" v-for="(customerSubscription, index) in customerSubscriptions" :key="index"
                                 :id="customerSubscription.status">
                              <div class="col-1 col-md-1 p-0 " v-if="filter !== ''">
                                <div class="custom-checkbox custom-control dashboard-checkbox">
                                  <input type="checkbox" data-checkboxes="mygroup"
                                         class="custom-control-input"
                                         :id="`checkbox-${index}`"
                                         v-model="selectedItems"
                                         :value="index">
                                  <label :for="`checkbox-${index}`" class="custom-control-label"
                                         style="color: white">&nbsp;</label>
                                </div>
                              </div>
                              <div class="col-3 col-md-3 p-0 font-size-14 vertical-center justify-content-start">
                                <span data-toggle="popover" title="" :id="`IG-${index}`" class="me-1"
                                      data-content="Copied" @click="showCopiedPopover(`IG-${index}`)">
                                  {{ customerSubscription.handle }}
                                </span>
                                <img v-if="customerSubscription.invalidHandle"
                                     class="dashboard-action-img question-mark"
                                     src="@/assets/images/stella/flagged.png"
                                     @click="confirmFlagChange(customerSubscription)">
                                <img v-else
                                     class="dashboard-action-img question-mark"
                                     src="@/assets/images/stella/flagged-white.png"
                                     @click="confirmFlagChange(customerSubscription)">
                              </div>
                              <div class="col-4 col-md-2 p-0 font-size-14">
                                <span class="btn rounded-pill btn-sm font-size-12-14"
                                      :class="getPlatformColor(customerSubscription)">
                                  {{ customerSubscription.platform }}
                                </span>
                              </div>
                              <div class="col-3 col-md-5 p-0">
                                <div class="row  d-flex">
                                  <div class="col-12 col-md-2 text-md-left text-center dashboard-date font-weight-bold">
                                    {{ customerSubscription.friendSince | formatDate }}
                                  </div>
                                  <div
                                    class="col-12 col-md-3 text-md-left text-center font-grey font-size-12-14 dashboard-time vertical-center">
                                    {{ customerSubscription.friendSince | formatTime }}
                                  </div>
                                </div>
                              </div>

                              <div class="col-1 col-md-1 p-0 text-right">
                                <el-dropdown trigger="click" class="me-2">
                                  <span class="el-dropdown-link">
                                    <img class="dashboard-action-img " src="@/assets/images/stella/3-dot.png">
                                  </span>
                                  <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item id="add" v-if="isAddOrRemove(customerSubscription)"
                                                      @click.native="confirmSingleSave(customerSubscription, true)">
                                      <img class="dashboard-action-img me-2" src="@/assets/images/stella/plus.png"> ADD
                                    </el-dropdown-item>
                                    <el-dropdown-item id="subtract" v-else
                                                      @click.native="confirmSingleSave(customerSubscription, false)">
                                      <img class="dashboard-action-img me-2" src="@/assets/images/stella/close.png">
                                      REMOVE
                                    </el-dropdown-item>
                                    <el-dropdown-item id="block"
                                                      @click.native="confirmSingleSave(customerSubscription, BLOCKED)">
                                      <img class="dashboard-action-img me-2" src="@/assets/images/stella/block.png">
                                      BLOCK
                                    </el-dropdown-item>
                                  </el-dropdown-menu>
                                </el-dropdown>
                                <!-- here new end  -->
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

          <!-- infinite-loading only works for mobile browser -->
          <infinite-loading v-if="isMobile()"
                            ref="infiniteLoading"
                            @infinite="loadMobileSubscriptions">
            <div slot="no-more"></div>
            <div slot="no-results"></div>
          </infinite-loading>

          <model ref="model" @confirm="nowSave()" @cancel=""/>
          <model-basic ref="modelFlag"
                       title="Can't find this user?"
                       text="Flag it and we will reach out to the user to see if we can get the corrected username"
                       button-color="text-dark btn-danger"
                       confirm-btn-txt="Flag"
                       @confirm="saveFlagChange()"/>

        </div>
      </div>
    </div>
  </section>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

import {Dropdown, DropdownItem, DropdownMenu} from 'element-ui';
import {httpMixin} from "@/mixin/http-mixin";
import {geDecodedToken} from "@/common/http-common";
import {ACCESS_TOKEN, PLATFORM_SNAPCHAT, PLATFORM_TELEGRAM, PLATFORM_TIKTOK} from "@/properties/close-friend";
import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import InfluencerHeader from "@/components/module/influencer/shared/InfluencerHeader";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import Model from "@/components/module/shared/Model";
import {copy} from '@/common/Utils';
import {constructCustomerURL} from "@/common/baseURL-service";
import ModelBasic from "@/components/module/shared/ModelBasic";
import {SERVICE_CONTENT, SERVICE_DIRECT_MESSAGE} from "@/properties/micro-service";
import infiniteScroll from "vue-infinite-scroll";
import InfiniteLoading from "vue-infinite-loading";
import titleMixin from "../../../mixin/title-mixin";

const NEED_TO_ADD = 'NeedToAdd';
const NEED_TO_REMOVE = 'NeedToRemove';
const ACTIVE = 'Active';
const INACTIVE = 'Inactive';
const DELETED = 'Removed';
const BLOCKED = 'Blocked';

export default {
  name: 'CreatorDashboardMobile',
  title: 'Creator dashboard',
  components: {
    Model, GlobalMessage, HeaderMenu,
    InfluencerHeader, InfluencerMenu, ModelBasic,
    ElDropdown: Dropdown, ElDropdownMenu: DropdownMenu, ElDropdownItem: DropdownItem,
    InfiniteLoading
  },
  mixins: [httpMixin, titleMixin],

  data() {
    return {
      user: {},
      customerSubscriptions: [],
      customerSubscription: null,
      selectedItems: [],
      searchTerm: '',
      showSlideBar: false,
      filter: NEED_TO_ADD,
      NEED_TO_ADD,
      NEED_TO_REMOVE,
      ACTIVE,
      INACTIVE,
      DELETED,
      pendingCustomRequests: 0,
      messageCount: 0,
      action: false,
      stats: {activeFriend: 0, monthlyRevenue: 0, annualRevenue: 0, bonusContentRevenue: 0},
      copied: false,
      toggled: false,
      subMenu: false,

      pageNumber: 0,
      noOfItems: 11,
      isComplete: false
    }
  },
  directives: {
    infiniteScroll
  },
  created() {
    if (this.$route.params.isSaved) {
      this.setMessage('Saved successfully');
    }
    let redirectTo = null;
    if (this.getRedirectTo()) {
      redirectTo = this.getRedirectTo();
      this.setRedirectTo(null);
    }
    let userId = geDecodedToken(ACCESS_TOKEN).id;
    this.getData(`identity/api/v1/influencers/${userId}`, (data) => {
      this.setUser(data);
      this.user = data;
      if (redirectTo) {
        this.$router.push({name: 'CreatorDirectMessage', params: {customerId: redirectTo.chatMessage}});
      }
    });
    if (!redirectTo) {
      this.getInfluencerStats();
      //Get pending custom request count
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${userId}/custom-request/count`;
      this.getData(url, (count) => {
        this.pendingCustomRequests = count;
      });
      //Get messages not read
      url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/influencers/${userId}/unread-count`
      this.getData(url, (count) => {
        this.messageCount = count;
      });
    }
  },
  computed: {
    revenueLabel() {
      if (this.toggled) {
        return 'MONTHLY';
      } else {
        return 'ANNUALIZED';
      }
    },
    revenue() {
      if (this.toggled) {
        return this.stats.currentMonthlyRevenue;
      } else {
        return this.stats.currentAnnualRevenue;
      }
    },
    isNeedToAddExists() {
      let custSub = this.customerSubscriptions.find(custSub => custSub.status === NEED_TO_ADD);
      return !!custSub;
    },
    showActionSection() {
      return (this.showAction(NEED_TO_ADD) || this.showAction(NEED_TO_REMOVE)) && this.selectedItems.length > 0;
    },
    selectAll: {
      get() {
        return this.customerSubscriptions && this.selectedItems.length > 0 ? this.selectedItems.length === this.customerSubscriptions.length : false;
      },
      set(value) {
        if (value) {
          for (let i = 0; i < this.customerSubscriptions.length; i++) {
            if (!this.customerSubscriptions[i].invalidHandle) {
              this.selectedItems.push(i);
            }
          }
        } else {
          this.selectedItems.splice(0);
          console.log(this.selectedItems);
        }
      }
    },
    copyLabel() {
      return this.copied ? 'Copied' : 'Copy';
    }
  },
  methods: {
    ...mapActions(['setUser', 'pushGlobalError', 'setMessage', 'setRedirectTo']),
    ...mapGetters(['getUser', 'getRedirectTo']),
    /**
     * This is used by infinite scroll component, which works for desktop
     */
    loadNonMobileSubscriptions() {
      if (this.isComplete) {
        return;
      }
      //back up the old value, as it will change once we get new set of subscriptions
      let isSelectedAll = this.selectAll;
      let userId = geDecodedToken(ACCESS_TOKEN).id;
      this.getData(`subscription/api/v1/influencers/${userId}/status/${this.filter}/page?pageNumber=${this.pageNumber}&numberOfItems=${this.noOfItems}`, (page) => {
        if (!page.empty) {
          this.customerSubscriptions.push(...page.content);
          this.scrollToNeedToAddOnce();
          this.selectAllSubscriptions(isSelectedAll);
          this.isComplete = page.last;
        }
      });
    },
    /**
     * This is used by infinite loading component, which works for mobile
     */
    loadMobileSubscriptions($state) {
      //back up the old value, as it will change once we get new set of subscriptions
      let isSelectedAll = this.selectAll;
      let userId = geDecodedToken(ACCESS_TOKEN).id;
      this.getData(`subscription/api/v1/influencers/${userId}/status/${this.filter}/page?pageNumber=${this.pageNumber}&numberOfItems=${this.noOfItems}`, (page) => {
        if (!page.empty) {
          this.customerSubscriptions.push(...page.content);
          this.scrollToNeedToAddOnce();
          this.selectAllSubscriptions(isSelectedAll);
          $state.loaded();
        }
        if (page.last) {
          $state.complete();
        }
      });
    },
    selectAllSubscriptions(value) {
      if (value) {
        this.selectedItems.splice(0);
        for (let i = 0; i < this.customerSubscriptions.length; i++) {
          if (!this.customerSubscriptions[i].invalidHandle) {
            this.selectedItems.push(i);
          }
        }
      }
    },
    scrollToNeedToAddOnce() {
      //Do it only the first time
      if (this.$route.params.scrollToNewSubscription && this.pageNumber === 0) {
        this.$nextTick(() => {
          this.scroll(NEED_TO_ADD);
        });
      }
      this.pageNumber += 1;
    },
    getPlatformColor(customerSubscription) { //btn-bg-purple
      let platform = customerSubscription.platform;
      if (platform === PLATFORM_TIKTOK) {
        return 'btn-bg-purple';
      } else if (platform === PLATFORM_SNAPCHAT) {
        return 'btn-bg-yellow';
      } else if (platform === PLATFORM_TELEGRAM) {
        return 'btn-bg-blue'
      }
      return 'btn-insta-green';
    },
    constructCustomerURL,
    toggle() {
      /* $('toggle').button('toggle');*/
      this.toggled = !this.toggled;
    },
    scroll(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth"
      });
    },
    getInfluencerStats() {
      let userId = geDecodedToken(ACCESS_TOKEN).id;
      //Get active subscribers and revenue
      this.getData(`subscription/api/v1/influencers/${userId}/statistics`, (data) => {
        this.stats = data;
      });
    },
    copyNow(urlSuffix) {
      this.copy(urlSuffix);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    },
    copy,
    getModelTitle(iAdd) {
      if (iAdd) {
        return 'Add?';
      } else if (iAdd === false) {
        return 'Remove?';
      } else {
        return 'Blocked?'
      }
    },
    getModelText(iAdd, insert) {
      if (iAdd) {
        return `Please confirm that ${insert} fans have been added as Close Friend in your Instagram account`;
      } else if (iAdd === false) {
        return `Please confirm that ${insert} fans have been removed as Close Friend in your Instagram account`;
      } else {
        return `Please confirm that ${insert} fans have been blocked as Close Friend in your Instagram account`;
      }

    },
    isAddOrRemove(customerSubscription) {
      let status = customerSubscription.status;
      if (status === NEED_TO_ADD || status === INACTIVE) {
        return true;
      } else if (status === NEED_TO_REMOVE || status === ACTIVE) {
        return false;
      }
    },
    getStatus(customerSubscription) {
      console.log(customerSubscription.status);
      if (customerSubscription.status === NEED_TO_ADD) {
        console.log(customerSubscription.status);
        return 'Need to add';
      } else if (customerSubscription.status === NEED_TO_REMOVE) {
        return 'Need to remove';
      } else {
        return customerSubscription.status;
      }
    },
    showAction(action) {
      return this.filter === action && this.selectedItems.length > 0;
    },
    filterBtnClass(filter) {
      if (this.filter === filter) {
        return 'active';
      } else {
        return '';
      }
    },

    slideBar() {
      this.showSlideBar = !this.showSlideBar;
      console.log('slideBar', this.showSlideBar);
    },
    search() {

      this.filter = '';
      let userId = geDecodedToken(ACCESS_TOKEN).id;
      if (this.searchTerm) {
        this.searchTerm = this.searchTerm.trim();
      } else {
        this.searchTerm = '';
      }
      this.getData(`subscription/api/v1/influencers/${userId}/status/search?name=${this.searchTerm}`, (data) => {
        this.customerSubscriptions = data;
      });
    },
    filterSubscribers(filter) {
      this.filter = filter;
      this.selectedItems.splice(0);
      this.customerSubscriptions.splice(0);
      this.customerSubscription = null;
      this.pageNumber = 0;
      this.isComplete = false;
      if (this.isMobile()) {
        this.$refs.infiniteLoading.stateChanger.reset();
      } else {
        this.loadNonMobileSubscriptions();
      }

      /*  this.getData(`subscription/api/v1/influencers/${userId}/status/${filter}/page?pageNumber=${this.pageNumber}&numberOfItems=${this.noOfItems}`, (page) => {
          this.customerSubscriptions.push(...page.content);
        });*/
    },
    confirmSave() {
      if (this.selectedItems.length === 0) {
        return;
      }

      let count = this.selectedItems.length;
      let insert = '';
      console.log(this.selectedItems);
      if (count > 1) {
        insert = this.selectedItems.length;
      } else if (count === 1) {
        let customerSubscription = this.findSubscriber(this.selectedItems[0]);
        insert = '@' + customerSubscription.name;
      }

      let isAdd = this.filter === NEED_TO_ADD;
      let title = this.getModelTitle(isAdd);
      let text = this.getModelText(isAdd, insert);
      this.$refs.model.show(title, text);
    },

    confirmFlagChange(customerSubscription) {

      this.customerSubscription = customerSubscription;
      if (customerSubscription.invalidHandle) {
        this.saveFlagChange();
      } else {
        this.$refs.modelFlag.show();
      }
    },

    confirmSingleSave(customerSubscription, action) {

      this.customerSubscription = customerSubscription;
      this.action = action;

      let insert = '@' + customerSubscription.name;

      let title = this.getModelTitle(action);
      let text = this.getModelText(action, insert);
      this.$refs.model.show(title, text);
    },

    findSubscriber(selectedItem) {
      return this.customerSubscriptions[selectedItem];
    },
    cancel() {
      console.log(this.selectedItems)
    },
    nowSave() {
      if (this.customerSubscription) {
        this.saveOne()
      } else {
        this.save();
      }
    },
    save() {

      if (this.selectedItems.length === 0) {
        return;
      }
      this.$refs.model.hide();

      let changeStatus = this.filter === NEED_TO_ADD ? ACTIVE : INACTIVE
      for (let selectedItem of this.selectedItems) {
        let customerSubscription = this.findSubscriber(selectedItem);
        customerSubscription.status = changeStatus;
      }

      let userId = geDecodedToken(ACCESS_TOKEN).id;
      let url = `subscription/api/v1/influencers/${userId}/status/`;

      this.patchData(url, this.customerSubscriptions, (data) => {
        // this.customerSubscriptions = data;
        this.afterSave(userId);
      })
    },
    afterSave(userId) {
      let url = `subscription/api/v1/influencers/${userId}/status/${this.filter}`
      this.selectedItems.splice(0);
      this.customerSubscriptions.splice(0);

      this.getData(url, (data) => {
        for (let datum of data) {
          this.customerSubscriptions.push(datum);
        }
        this.setMessage('Saved successfully');
        this.getInfluencerStats();
      });
    },
    saveOne() {

      if (this.action) {
        this.customerSubscription.status = ACTIVE;
      } else if (this.action === false) {
        this.customerSubscription.status = INACTIVE
      } else {
        this.customerSubscription.status = BLOCKED
      }
      this.$refs.model.hide();
      this.patchOne();
    },
    saveFlagChange() {
      this.$refs.modelFlag.hide();
      this.customerSubscription.invalidHandle = !this.customerSubscription.invalidHandle;
      this.patchOne();
    },
    patchOne() {
      let userId = geDecodedToken(ACCESS_TOKEN).id;
      let url = `subscription/api/v1/influencers/${userId}/status/`;

      this.patchData(url, [this.customerSubscription], (data) => {
        this.customerSubscription = null;
        this.afterSave(userId);
      });
    },

    showCopiedPopover(id) {
      $('#' + id).popover('show');

      let copyText = document.getElementById(id);
      let textArea = document.createElement("textarea");
      textArea.value = copyText.textContent.trim();
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      document.execCommand("Copy");
      textArea.remove();

      setTimeout(() => {
        $('#' + id).popover('hide');
      }, 2000);
    },
    doIt() {
      console.log('dropdown');
      this.$nextTick(() => {
        // $('.dropdown').dropdown();
        $('[data-toggle="popover"]').dropdown('toggle');
      });
      // $('#some').dropdown('toggle');
    },
  }
}
;
</script>

<style scoped>
button > span {
  margin-left: 7%;
}

.btn-bg-purple {
  background: #FF37EB;
  background-color: #FF37EB;
  color: black;
}

.btn-bg-blue {
  background: #229ED9;
  background-color: #229ED9;
  color: black;
}

.btn-toggle-custom.active {
  background-color: #55EFC4;
}

.btn-toggle-custom {
  margin: 0 10px;
  padding: 0;
  position: relative;
  border: none;
  height: 15px;
  width: 2.5rem;
  border-radius: 1rem;
  color: #6b7381;
  background: #bdc1c8;
}

.btn-toggle-custom.active {
  transition: background-color 0.25s;
}

.example .btn-toggle-custom {
  top: 50%;
  transform: translateY(-50%);
}

.btn-toggle-custom.active:before {
  opacity: 0.5;
}

.btn-toggle-custom:before, .btn-toggle-custom:after {
  color: #6b7381;
}

.btn-toggle-custom:before {
  left: -4rem;
}

.btn-toggle-custom:before, .btn-toggle-custom:after {
  line-height: 1.5rem;
  width: 4rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: absolute;
  bottom: 0;
  transition: opacity 0.25s;
}

.btn-toggle-custom.active > .handle {
  left: 18px;
  transition: left 0.25s;
}

.btn-toggle-custom > .handle {
  position: absolute;
  top: -5px;
  left: -5px;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 1.125rem;
  background: #fff;
  transition: left 0.25s;
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIwLjAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4xIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g) #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  display: inline-block;
  width: 25px;
  height: 25px;
  position: absolute;
  background-size: 100%;
  background-image: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0, rgba(255, 255, 255, 0)), color-stop(100%, rgba(0, 0, 0, .1)));
  background-image: -moz-linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, .1));
  background-image: -webkit-linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, .1));
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, .1));
  -moz-box-shadow: 0 0 8px rgba(0, 0, 0, .3);
  -webkit-box-shadow: 0 0 8px rgb(255 255 255 / 30%);
  box-shadow: 0 0 8px rgb(255 255 255 / 30%);
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.btn-toggle-custom > .handle:after {
  content: "";
  display: block;
  width: 11px;
  height: 11px;
  margin: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjEzIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjAuMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==);
  background-size: 100%;
  background-image: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0, rgba(0, 0, 0, .13)), color-stop(100%, rgba(255, 255, 255, 0)));
  background-image: -moz-linear-gradient(rgba(0, 0, 0, .13), rgba(255, 255, 255, 0));
  background-image: -webkit-linear-gradient(rgba(0, 0, 0, .13), rgba(255, 255, 255, 0));
  background-image: linear-gradient(rgba(0, 0, 0, .13), rgba(255, 255, 255, 0));
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.btn-toggle-custom.active:after {
  opacity: 1;
}

.btn-toggle-custom:before, .btn-toggle-custom:after {
  color: #6b7381;
}

.btn-toggle-custom:after {
  right: -4rem;
  opacity: 0.5;
}

.btn-toggle-custom:before, .btn-toggle-custom:after {
  line-height: 1.5rem;
  width: 4rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: absolute;
  bottom: 0;
  transition: opacity 0.25s;
}

img.dashboard-action-img.question-mark {
  width: 15px;
  margin: 0 3px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: -70px;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 10rem;
  padding: .5rem 0;
  margin: .125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: .25rem;
}

.add-bonus-btn {
  background-color: #55EFC4;
  border-radius: 7px;
  color: white;
  font-weight: 500;
  font-size: 12px;
  padding: 5px 8px 5px 32px;
  margin-top: 15px;
  font-family: inherit;
}

.add-bonus-btn span img {
  height: 40px;
  text-align: right;
  padding: 0px 0px 0px 15px;
}
</style>

