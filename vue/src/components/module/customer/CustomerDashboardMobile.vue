<template>
<section class="container-fluid">
  <div class="row p-md-4 pb-md-0">
    <div class="border-around border-md-1 border-0 p-2">
      <div>
        <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>

        <customer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></customer-menu>
        <header-menu @slideMenu="slideBar()" :is-loading="isLoading"></header-menu>

        <section class="closefriend-hero background-white">
          <div class="container mt-3">
            <div class="row px-3">
              <div class="col-12 col-sm-12 col-md-12 p-0">
                <h1 class="font-size-25 text-center font-white">My Account</h1>
              </div>
              <div class="col-12 col-sm-12 col-md-12">
                <global-message></global-message>
                <br>
                <p class="font-grey font-size-16 font-white">Subscriptions</p>
                <pending-custom-requests/>
                <div class="tab-content">
                  <div class="ban" v-for="(customerSubscription, index) in customerSubscriptions" :key="index">
                    <div class="row" v-if="customerSubscription.status !== 'Blocked'">
                      <div class="col-md-10 col-9 p-0 justify-content-start vertical-center">

                        <dashboard-influencer-avatar
                          :customer-subscription="customerSubscription"></dashboard-influencer-avatar>

                        <div>
                          <span class="font-weight-600 font-size-16"
                                style="line-break: anywhere;">{{ getInfluencerName(customerSubscription) }}</span>
                          <button :class="getDesButtonColor(customerSubscription)"
                          class="btn font-black font-weight-bold py-1 px-2 border-radius-6 my-1 mx-md-2 mx-0">
                            ${{ getSubscriptionDetail(customerSubscription) }}
                          </button>
                        </div>
                        <span class="font-grey font-size-12 d-md-block d-none">
                          ({{ getStatusLabel(customerSubscription) }})
                        </span>
                      </div>
                      <div class="col-md-2 col-3 p-0 justify-content-end vertical-center">
                        <div>
                          <button type="button" :id="`toggle_${index}`" :disabled="disabledItems[index]"
                                  :class="getButtonColor(customerSubscription)"
                                  class="float-right"
                                  data-toggle="button" aria-pressed="true" autocomplete="off"
                                  @click="toggle(index)">
                            <div class="handle"></div>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div class="row outline-danger" v-else>
                      <div class="col-md-10 col-9 p-0 justify-content-start vertical-center">
                        <dashboard-influencer-avatar
                          :customer-subscription="customerSubscription"></dashboard-influencer-avatar>
                        <div class="font-size-1 font-weight-600 font-danger">You were banned from
                          @{{ getInfluencerName(customerSubscription) }} user
                          <div class="font-size-12 font-grey">You can't subscribe to it</div>
                        </div>
                      </div>
                      <div class="col-md-2 col-3 p-0 justify-content-end vertical-center">
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
        <model-basic :title="title" :button-color="buttonColor" ref="model"
                     :text="text" @confirm="confirm()" @cancel="cancel()"></model-basic>

        <model-platform ref="platform"/>

      </div>
    </div>
  </div>
</section>
</template>


<script>

import {mapActions, mapGetters} from "vuex";

import {geDecodedToken} from "@/common/http-common";
import {ACCESS_TOKEN, BASE_URL, PLATFORM_SNAPCHAT, PLATFORM_TELEGRAM, PLATFORM_TIKTOK} from "@/properties/close-friend";
import CustomerMenu from "@/components/module/customer/shared/CustomerMenu";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import Model from "@/components/module/shared/Model";
import ModelBasic from "@/components/module/shared/ModelBasic";
import {
  SUBSCRIPTIONS_STATUS_ACTIVE,
  SUBSCRIPTIONS_STATUS_AUTOCANCELLED,
  SUBSCRIPTIONS_STATUS_CANCELLED,
  SUBSCRIPTIONS_STATUS_EXPIRED,
  SUBSCRIPTIONS_STATUS_GRACEPERIOD,
  SUBSCRIPTIONS_STATUS_TOBEEXPIRED,
  SUBSCRIPTIONS_STATUS_UPCOMING,
  SUBSCRIPTIONS_STATUS_WAITINGFORPAYMENT
} from "@/properties/customer-subriptions-status";
import {SERVICE_SUBSCRIPTION} from "@/properties/micro-service";
import {closeFriend} from "../../../properties/close-friend";
import moment from "moment";
import {camelCaseToSentence} from "../../../common/Utils";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {igValidationMixin} from "@/mixin/ig-validation-mixin";
import DashboardInfluencerAvatar from "@/components/module/customer/DashboardInfluencerAvatar";
import PendingCustomRequests from "@/components/module/customer/shared/PendingCustomRequests";
import {USER_STATUS_ACTIVE} from "@/properties/user-status";
import {isUserActive} from "@/common/comm-service";
import ModelPlatform from "@/components/module/customer/ModelPlatform";
import titleMixin from "../../../mixin/title-mixin";

export default {
  name: 'CustomerDashboardMobile',
  title: 'Customer Dashboard',
  components: {
    ModelBasic, Model, HeaderMenu,
    CustomerMenu, GlobalMessage,
    DashboardInfluencerAvatar, PendingCustomRequests,
    ModelPlatform
  },
  mixins: [igValidationMixin, titleMixin],
  data() {
    return {
      customerSubscriptions: [],
      showSlideBar: false,
      selectedItems: [],
      disabledItems: [],
      title: '',
      text: '',
      buttonColor: '',
      index: 0,
      BASE_URL,
      isAvatarMissing: false,
      influencerId: null,
    }
  },
  created() {
    this.getSubscriptions();
  },

  methods: {
    ...mapGetters(['getUser', 'getInvitee']),
    ...mapActions(['setUser', 'setMessage', 'setInvitee', 'setPlatform']),
    goToSubscription(invitee, infPlatform) {
      this.setInvitee(invitee);
      if (invitee.status === USER_STATUS_ACTIVE) {
        if (infPlatform) {
          this.setPlatform(infPlatform);
          this.$router.push({name: 'Subscription', query: {saved: this.$route.query.saved}});
        } else {
          //Ask the user to choose platform
          this.reconcileInfluencerPlatform();
          if (this.$route.query.saved) {
            this.setMessage('SAVED.SUCCESSFULLY');
          }
        }
      }
    },
    getButtonColor(customerSubscription) {
      let platform = customerSubscription.customerInfluencerPlatform.influencerPlatform.platform.name;
      if(platform === PLATFORM_SNAPCHAT) {
        return 'btn btn-toggle-yellow active';
      } else if (platform === PLATFORM_TIKTOK) {
        return 'btn btn-toggle-purple active';
      } else if (platform === PLATFORM_TELEGRAM) {
        return 'btn btn-toggle-blue active';
      }
      return  'btn btn-toggle active';
    },
    getDesButtonColor(customerSubscription) {
      let platform = customerSubscription.customerInfluencerPlatform.influencerPlatform.platform.name;
      if(platform === PLATFORM_SNAPCHAT) {
        return 'btn-bg-light-yellow';
      } else if (platform === PLATFORM_TIKTOK) {
        return 'btn-bg-light-purple';
      } else if (platform === PLATFORM_TELEGRAM) {
        return 'btn-bg-light-blue';
      }
      return  'btn-bg-light-green';
    },
    getInfluencerName(customerSubscription) {
      return this.getInfluencer(customerSubscription).name;
    },
    getInfluencer(customerSubscription) {
      return customerSubscription.customerInfluencerPlatform.influencerPlatform.influencer
    },
    getSubscriptions() {
      let userId = geDecodedToken(ACCESS_TOKEN).id;
      this.getData(`subscription/api/v1/customers/${userId}/subscriptions/`, (data) => {
        this.customerSubscriptions = data;
        if (this.customerSubscriptions.length === 0) {
          this.goToSubscription(this.getUser().invitee);
        }

        for (let i = 0; i < this.customerSubscriptions.length; i++) {

          this.selectedItems.push(true);
          this.disabledItems.push(false);
          if (this.customerSubscriptions[i].status === SUBSCRIPTIONS_STATUS_WAITINGFORPAYMENT
            || this.customerSubscriptions[i].status === SUBSCRIPTIONS_STATUS_TOBEEXPIRED
            || !isUserActive(this.getInfluencer(this.customerSubscriptions[i]))) {
            //disable toggle
            this.disabledItems[i] = true;
            this.switchOffToggle(i);
          } else if (this.isCancelledOrExpired(i)) {
            this.selectedItems[i] = false;
            this.switchOffToggle(i);
            // this.$router.push({name: 'CustomerSubscriptionMobile'});
          }
        }
        this.initIGValidity();

      })
    },
    isCancelledOrExpired(index) {
      return (this.customerSubscriptions[index].status === SUBSCRIPTIONS_STATUS_CANCELLED
        || this.customerSubscriptions[index].status === SUBSCRIPTIONS_STATUS_AUTOCANCELLED
        || this.customerSubscriptions[index].status === SUBSCRIPTIONS_STATUS_EXPIRED);
    },
    switchOffToggle(index) {
      this.$nextTick(() => {
        let toggleId = `#toggle_${index}`;
        $(toggleId).button('toggle');
      });
    },
    deActivateSubscription() {
      if (this.customerSubscriptions[this.index].status === SUBSCRIPTIONS_STATUS_ACTIVE) {
        //api/v1/customers/{customerId}/subscriptions/
        let customerId = geDecodedToken(ACCESS_TOKEN).id;
        let custSubId = this.customerSubscriptions[this.index].id
        let url = `${SERVICE_SUBSCRIPTION}/api/v1/customers/${customerId}/subscriptions/${custSubId}/cancel`
        this.patchData(url, null, (data) => {
          this.customerSubscriptions[this.index] = data;
          this.setMessage('Saved sucessfully');
        })
      }
    },
    getSubscriptionDetail(customerSubscription) {
      if (customerSubscription.type === 'MONTHLY') {
        return `${customerSubscription.price} Per/Month`
      } else {
        return `${customerSubscription.price} Annually`
      }
    },

    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },
    toggle(index) {
      this.index = index;
      if (!this.selectedItems[index]) {
        this.title = 'Confirm Resubscription';
        this.text = 'You will gain access to this user’s exclusive instagram content.';
        this.buttonColor = 'btn-success-closefriend';
      } else {
        this.title = 'Warning';
        this.text = 'You will lose access to this user’s exclusive instagram content if you unsubscribe.';
        this.buttonColor = 'btn-danger-closefriend';

      }
      this.$refs.model.show();
    },
    confirm() {
      if (this.isCancelledOrExpired(this.index)) {
        let invitee = this.getInfluencer(this.customerSubscriptions[this.index]);
        let infPlatform = this.customerSubscriptions[this.index].customerInfluencerPlatform.influencerPlatform
        this.goToSubscription(invitee, infPlatform);
      } else {
        this.deActivateSubscription();
      }
      this.selectedItems[this.index] = !this.selectedItems[this.index];
      this.$refs.model.hide()
    },
    cancel() {
      let toggleId = `#toggle_${this.index}`;
      $(toggleId).button('toggle');
    },
    imageLoadError(event) {
      this.isAvatarMissing = true;
    },
    getStatusLabel(customerSubscription) {
      if (customerSubscription.status === SUBSCRIPTIONS_STATUS_WAITINGFORPAYMENT
        || customerSubscription.status === SUBSCRIPTIONS_STATUS_AUTOCANCELLED
        || customerSubscription.status === SUBSCRIPTIONS_STATUS_CANCELLED
        || customerSubscription.status === SUBSCRIPTIONS_STATUS_UPCOMING
        || customerSubscription.status === SUBSCRIPTIONS_STATUS_EXPIRED) {
        return camelCaseToSentence(customerSubscription.status);
      }
      if (customerSubscription.status === SUBSCRIPTIONS_STATUS_ACTIVE) {
        return "Renews " + moment(customerSubscription.expiryAt).format(closeFriend['DateFormat.Date']);
      }
      if (customerSubscription.status === SUBSCRIPTIONS_STATUS_TOBEEXPIRED) {
        return "To Be Expired " + moment(customerSubscription.expiryAt).format(closeFriend['DateFormat.Date']);
      }
      if (customerSubscription.status === SUBSCRIPTIONS_STATUS_GRACEPERIOD) {
        return "On 1 Week Grace Period";
      }
    },
    reconcileInfluencerPlatform() {
      if (this.getUser().customerPlatforms.length === 1) {
        this.setUpInfluencerPlatform(this.getUser().customerPlatforms[0]);
      } else {
        //Model to select platform
        this.$refs.platform.show();
      }
    },
    setUpInfluencerPlatform(customerPlatform) {
      let influencerId = this.getUser().invitee.id;
      this.getUnSecureData(`${SERVICE_SUBSCRIPTION}/api/v1/influencers/${influencerId}/platform`, (influencerPlatforms) => {
        let infPlatform = influencerPlatforms.find(influencerPlatform => influencerPlatform.platform.name === customerPlatform.platform.name);
        this.setPlatform(infPlatform);
        this.$router.push({name: 'Subscription'});
      });
    }
  }
}
;
</script>

<style scoped>
.btn-bg-light-yellow{
  background: #FFFA37;
  background-color: #FFFA37;
}
.btn-bg-light-purple{
  background: #FF37EB;
  background-color: #FF37EB;
}
.btn-bg-light-blue{
  background: #229ED9;
  background-color: #229ED9;
}

.btn-toggle-yellow.active {
  background-color: #FFFA37;
}
.btn-toggle-purple.active {
  background-color: #FF37EB;
}
.btn-toggle-blue.active {
  background-color: #229ED9;
}
.btn-toggle.active {
  background-color: #55EFC4;
}

.btn-toggle, .btn-toggle-yellow, .btn-toggle-purple, .btn-toggle-blue {
  margin: 0 10px;
  padding: 0;
  position: relative;
  border: none;
  height: 1.5rem;
  width: 3rem;
  border-radius: 1.5rem;
  color: #6b7381;
  background: #bdc1c8;
}

.btn-toggle.active, .btn-toggle-yellow.active, .btn-toggle-purple.active, .btn-toggle-blue.active {
  transition: background-color 0.25s;
}

.btn-toggle.active:before, .btn-toggle-yellow.active:before, .btn-toggle-purple.active:before, .btn-toggle-blue.active:before  {
  opacity: 0.5;
}

.btn-toggle:before, .btn-toggle:after, .btn-toggle-yellow:before, .btn-toggle-yellow:after, .btn-toggle-purple:before, .btn-toggle-purple:after, .btn-toggle-blue:before, .btn-toggle-blue:after {
  color: #6b7381;
}

.btn-toggle:before, .btn-toggle-yellow:before, .btn-toggle-purple:before, .btn-toggle-blue:before{
  left: -4rem;
}

.btn-toggle:before, .btn-toggle:after, .btn-toggle-yellow:before, .btn-toggle-yellow:after, .btn-toggle-purple:before, .btn-toggle-purple:after, .btn-toggle-blue:before, .btn-toggle-blue:after {
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

.btn-toggle.active > .handle {
  left: 1.6875rem;
  transition: left 0.25s;
}

.btn-toggle-yellow.active > .handle {
  left: 1.6875rem;
  transition: left 0.25s;
}

.btn-toggle-purple.active > .handle {
  left: 1.6875rem;
  transition: left 0.25s;
}

.btn-toggle-blue.active > .handle {
  left: 1.6875rem;
  transition: left 0.25s;
}

.btn-toggle > .handle {
  position: absolute;
  top: 0.1875rem;
  left: 0.1875rem;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 1.125rem;
  background: #fff;
  transition: left 0.25s;
}

.btn-toggle-yellow > .handle {
  position: absolute;
  top: 0.1875rem;
  left: 0.1875rem;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 1.125rem;
  background: #fff;
  transition: left 0.25s;
}

.btn-toggle-purple > .handle {
  position: absolute;
  top: 0.1875rem;
  left: 0.1875rem;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 1.125rem;
  background: #fff;
  transition: left 0.25s;
}

.btn-toggle-blue > .handle {
  position: absolute;
  top: 0.1875rem;
  left: 0.1875rem;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 1.125rem;
  background: #fff;
  transition: left 0.25s;
}

.btn-toggle.active:after {
  opacity: 1;
}
.btn-toggle-yellow.active:after {
  opacity: 1;
}
.btn-toggle-purple.active:after {
  opacity: 1;
}
.btn-toggle-blue.active:after {
  opacity: 1;
}

.btn-toggle:before, .btn-toggle:after {
  color: #6b7381;
}
.btn-toggle-yellow:before, .btn-toggle-yellow:after {
  color: #6b7381;
}
.btn-toggle-purple:before, .btn-toggle-purple:after {
  color: #6b7381;
}
.btn-toggle-blue:before, .btn-toggle-blue:after {
  color: #6b7381;
}

.btn-toggle:after {
  right: -4rem;
  opacity: 0.5;
}
.btn-toggle-yellow:after {
  right: -4rem;
  opacity: 0.5;
}
.btn-toggle-purple:after {
  right: -4rem;
  opacity: 0.5;
}
.btn-toggle-blue:after {
  right: -4rem;
  opacity: 0.5;
}

</style>
