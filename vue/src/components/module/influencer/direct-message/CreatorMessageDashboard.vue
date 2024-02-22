<template>
  <div class="container-fluid pb-2">

    <div class="row" style="overflow: auto;">

      <div class="col-sm-12 border-bottom">
        <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>
        <InfluencerMenu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"/>
        <header-menu @slideMenu="slideBar()" :is-loading="isLoading"></header-menu>
      </div>

      <div class="col-sm-3 px-3" style="border-right: 1px solid #fff">

        <div class="row mt-3 d-flex flex-row justify-content-start">
          <div class=" d-block d-sm-none col-4 d-flex flex-row justify-content-start widht-class"
               style="border-bottom: 1px solid #FF59D4">
            <h5 class="text-white font-weight-500 font-size-14 mt-1">Dashboard</h5>
          </div>
          <div class="col-4 d-flex flex-row justify-content-start widht-class"
               @click="$router.push({ name: 'CreatorDirectMessage' })">

            <h5 class="text-white font-weight-500 font-size-14 mt-1">Inbox</h5>
            <p class="ml-2 background-gradient-color px-2 text-center font-weight-500 text-dark font-size-14">
              {{ inboxCount }}</p>
          </div>
          <div class="ml-md-3 col-4 d-flex flex-row justify-content-start widht-class"
               @click="$router.push({ name: 'Announcement', query: {inboxCount} })">
            <h5 class="text-white font-weight-500 font-size-14 mt-1">Announcement</h5>
          </div>
        </div>
        <!--  uncomment for future use and put d-none d-sm-block in img ,h5 tag-->
        <div class="row mt-3 d-flex flex-row justify-content-start d-none">
          <div class="col-12 d-flex flex-row justify-content-start widht-class">
            <img src="@/assets/images/filter.png" width="22" height="22"
                 class="text-center font-weight-500 text-dark font-size-14"/>
            <h5 class=" text-white font-weight-500 font-size-14 mt-1">Filter Message</h5>
          </div>
        </div>

        <div class="row mt-3 d-none d-sm-block" style="overflow:auto; height: 80vh; position: relative;" id="content">

          <div class="col-12" v-for="(subscriber, index) in  subscribers" :key="index">
            <div class="row d-flex flex-row justify-content-between"
                 @click="$router.push({ name: 'CreatorDirectMessage', params: { customerId: subscriber.id } })">
              <div class="col-3 mt-2">
                <!--                <img class="rounded-circle" width="50" height="50" src="@/assets/images/stella/no_avatar.png" alt="">-->
                <message-avatar :user-id="subscriber.id"/>
              </div>
              <div class="col-9">
                <div class="row">

                  <div class="col-12 d-flex flex-row justify-content-between">
                    <p class="font-weight-500 font-size-14 text-white text-truncate">{{ subscriber.name ? subscriber.name: subscriber.email }}</p>
                    <template v-if="subscriber.lastChat">
                      <div style="width:42px;" v-if="subscriber.lastChat.new">
                      <span
                        style="background: #55EFC4;  padding: 2px 7px;font-size: 12px;color: #000;border-radius: 4px;">
                        New
                      </span>
                      </div>
                      <img v-else-if="!subscriber.lastChat.read && subscriber.lastChat.senderId !== getUser.id"
                           src="@/assets/images/unread.png" width="7" height="7">
                    </template>
                  </div>
                  <div class="col-12 d-flex flex-row justify-content-between"
                       v-if="subscriber.lastChat">
                    <p class="text-white font-size-12 font-weight-400 text-truncate"
                       style="max-width: 80%">
                      {{ subscriber.lastChat.message ? subscriber.lastChat.message : 'N/A' }}
                    </p>
                    <p class="px-1 text-white font-size-12 font-weight-400">
                      {{ (subscriber.lastChat ? timeSince(subscriber.lastChat.sentAt) : '') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-9 px-3" style="height: 100%;">
        <div class="row">
          <div class="py-3 px-2 d-none d-sm-block ">
            <h5 class="text-white">Messages</h5>
          </div>
          <global-message/>
          <div class="col-12 mt-4 d-flex flex-row justify-content-between align-item-center">
            <!--   this paragraph is not in use at this time,so please don't delete this one         -->
            <p class="text-white font-size-16 mt-2"></p>
            <button type="button" class="btn button-class text-dark"
                    @click="$router.push({name: 'Announcement', query: {newFilter: true, inboxCount}})"
            >Send Announcement
            </button>
          </div>
          <div class="flex-class col-12 d-sm-flex flex-sm-row mt-4 mb-4">

            <div class="mr-2 rounded col-sm-6  border border-dark px-3 margin-class">
              <div class="mt-2">
                <p class="text-white">Top Subscribers</p>
              </div>
              <div class="d-flex flex-row justify-content-around">
                <div class="d-flex flex-column"
                     @click="$router.push({ name: 'CreatorDirectMessage', params: { customerId: topFan.customerId } })"
                     v-for="(topFan, index) in topFans" :key="index">
                  <p class="text-white font-size-12 font-weight-400">{{ index + 1 }}{{ getFanPlace(index + 1) }}
                    place</p>
                  <img class="rounded-circle" width="50" height="50" src="@/assets/images/stella/no_avatar.png" alt="">
                  <p class="text-white font-size-12">{{ topFan.name }}</p>
                  <p class="text-white font-size-20 font-weight-500 font-class-16">${{ topFan.spent }}</p>
                </div>
              </div>
            </div>

            <div class="col-sm-6 rounded border border-dark d-flex flex-column justify-content-between margin-class">
              <div class="mt-2">
                <p class="text-white">Message Revenue</p>
              </div>
              <div class="d-flex flex-row">
                <h2 class="text-white mr-3">${{ revenue.revenue }}</h2>
                <p class="px-2 mt-1 text-center font-weight-500 text-dark font-size-16
                number-background" :style="revenue.growthPercentage < 0? 'background: red;': ''">
                  {{ revenue.growthPercentage > 0 ? '+' : '' }}{{ revenue.growthPercentage }}%
                </p>
              </div>
              <div class="d-flex flex-row justify-content-between">
                <p :class="revenueType === 'DAY' ? 'time-background text-dark' : ''"
                   @click="getRevenue('DAY')">Day</p>
                <p :class="revenueType === 'WEEK' ? 'time-background text-dark' : ''"
                   @click="getRevenue('WEEK')">Week</p>
                <p :class="revenueType === 'MONTH' ? 'time-background text-dark' : ''"
                   @click="getRevenue('MONTH')">Month</p>
                <p :class="revenueType === 'YEAR' ? 'time-background text-dark' : ''"
                   @click="getRevenue('YEAR')">Year</p>
              </div>
            </div>
          </div>
          <div class="font-weight-500">
            <p class="text-white">Settings</p>
          </div>
          <div class="col-sm-12 d-sm-flex flex-sm-row  justify-content-between">
            <div class="col-sm-4 rounded border border-dark mr-1 margin-class">
              <div class="d-flex flex-row justify-content-between">
                <p class="text-white mt-2 font-size-12">Filters</p>
                <button style="color: #E53BB9;" class="btn bg-transparent text-center " data-toggle="modal"
                        @click="$refs.filterModal.show(null)">+New
                  Filter
                </button>

              </div>

              <div class="d-flex flex-column justify-content-between" v-if="filterSettings.length > 0">
                <div class="d-flex flex-row justify-content-between mt-3"
                     v-for="(filterSetting, index) in filterSettings"
                     :key="index">

                  <img src="@/assets/images/dollor-img2.png" width="25" height="25" alt="">
                  <div class="col-8 d-flex flex-column justify-content-between"
                       style="align-items: start;line-height: 0;">
                    <p class="font-size-14 text-white font-weight-600">{{
                        filterSetting.name
                      }}</p>
                    <p class="text-white font-size-12 mt-2 font-weight-300">{{ filterSetting.customerCount }}
                      subscribers</p>
                  </div>

                  <div class="dropdown dropleft">

                    <img v-if="filterSetting.userDefined" class="dropdown-toggle" data-toggle="dropdown"
                         aria-expanded="false"
                         src="@/assets/images/three-dot2.png" width="20" height="20" alt="">
                    <div v-else><p style="width: 20px; height: 20px"></p></div>

                    <div class="dropdown-menu dropdown-class"
                         style="background: #000; border: 1px solid rgb(213, 202, 215)">
                      <a class="dropdown-item" style="background: #000;color: #fff" href=""
                         @click.prevent="$refs.filterModal.show(filterSetting)">Edit
                        Filter</a>
                      <a class="dropdown-item" style="background: #000;color: #fff" href=""
                         @click.prevent="deleteFilter(filterSetting)">Delete</a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class=" col-sm-4 rounded border border-dark mr-1 margin-class">
              <div class="d-flex flex-row justify-content-between pt-2">
                <!--                <p class="text-white font-size-12">Charge for message</p>
                                <label class="switch">
                                  <input type="checkbox" @change="messageChargeRequiredChanged"
                                         v-model="chatSetting.messageChargeRequired" disabled>
                                  <span class="slider round"></span>
                                </label>-->
              </div>
              <div class="d-flex flex-column justify-content-center">
                <required-field
                  v-if="isSubmitted && chatSetting.messageChargeRequired && !$v.chatSetting.pricePerMessage.required"/>
                <p class="text-white font-size-12">price per message</p>
                <input type="number" class="coloredInputClass  w-100 text-white"
                       :disabled="!chatSetting.messageChargeRequired"
                       @keyup.enter="saveChatSetting"
                       @focusout="saveChatSetting"
                       v-model="chatSetting.pricePerMessage">

                <required-field
                  v-if="isSubmitted && chatSetting.messageChargeRequired && !$v.chatSetting.pricePerFile.required"/>
                <p class="text-white font-size-12 mt-2">price per picture</p>
                <input type="number" class="w-100 coloredInputClass   text-white"
                       :disabled="!chatSetting.messageChargeRequired"
                       @keyup.enter="saveChatSetting"
                       @focusout="saveChatSetting"
                       v-model="chatSetting.pricePerFile">
                <p class="text-white font-size-14 mt-2">You can set a custom price before you send
                  media.
                </p>

              </div>
            </div>
            <div class=" col-sm-4 rounded border border-dark margin-class mobile-fix-width">
              <div class="d-flex flex-row justify-content-between pt-2">
                <p class="text-white font-size-12">Welcome Messages</p>
                <label class="switch">
                  <input type="checkbox" @change="welcomeMessageRequiredChanged"
                         v-model="chatSetting.welcomeMessageRequired">
                  <span class="slider round"></span>
                </label>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <required-field
                  v-if="isSubmitted && chatSetting.welcomeMessageRequired && !$v.chatSetting.welcomeMessage.required"/>
                <p class="text-white">What to send to new subscribers</p>

                <textarea class="px-5 py-5 coloredInputClass  text-white"
                          :disabled="!chatSetting.welcomeMessageRequired"
                          @focusout="saveChatSetting"
                          v-model="chatSetting.welcomeMessage">"Hi and thanks for subscribing to my Stella!</textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <filter-modal ref="filterModal" @saved="createdOrUpdatedFilter"/>
  </div>
</template>

<script>
import FilterModal from '@/components/module/influencer/direct-message/FilterModal';
import {SERVICE_CONTENT, SERVICE_DIRECT_MESSAGE, SERVICE_SUBSCRIPTION} from "@/properties/micro-service";
import {mapActions, mapGetters} from "vuex";
import {httpMixin} from "@/mixin/http-mixin";
import {required} from "vuelidate/lib/validators";
import RequiredField from "@/components/module/shared/RequiredField";

import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import '@/assets/styles/direct-message/direct-message-common.css';
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {timeSince} from "@/common/datetime-service";
import MessageAvatar from "@/components/module/shared/direct-message/MessageAvatar";


export default {
  name: "CreatorMessageDashboard",
  components: {MessageAvatar, RequiredField, FilterModal, InfluencerMenu, HeaderMenu, GlobalMessage},
  mixins: [httpMixin],
  data() {
    return {
      subscribers: [],
      filterSettings: [],
      chatSetting: {},
      isSubmitted: false,
      topFans: [],
      revenue: {},
      revenueType: 'DAY',
      inboxCount: 0,

      showSlideBar: false
    }
  },
  validations() {
    let chatSetting = {};
    if (this.chatSetting.messageChargeRequired) {
      chatSetting.pricePerMessage = {required};
      chatSetting.pricePerFile = {required};
    }
    if (this.chatSetting.welcomeMessageRequired) {
      chatSetting.welcomeMessage = {required};
    }
    return {chatSetting};
  },
  created() {
    this.clearGlobalMessages();
    this.getSubscribersLatestMessage();
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    ...mapActions(['setMessage']),
    timeSince,
    getTopFans() {
      let url = `${SERVICE_SUBSCRIPTION}/api/v1/influencers/${this.getUser.id}/message-top-fan`;
      this.getData(url, (topFans) => {
        this.topFans = topFans;
      });
    },
    getFanPlace(place) {
      if (place === 1) {
        return 'st';
      } else if (place === 2) {
        return 'nd'
      } else if (place === 3) {
        return 'rd';
      } else {
        return 'th';
      }
    },
    getRevenue(revenueType) {
      this.revenueType = revenueType;
      let url = `${SERVICE_SUBSCRIPTION}/api/v1/influencers/${this.getUser.id}/message-revenue?revenueType=${revenueType}`;
      this.getData(url, (revenue) => {
        this.revenue = revenue;
      });
    },
    getSubscribersLatestMessage() {
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/influencers/${this.getUser.id}/latest`;
      this.getData(url, (lastChatData) => {
        let lastChats = lastChatData.chatMessages ? lastChatData.chatMessages : [];
        this.inboxCount = lastChatData.unreadMessageCount;
        let users = lastChatData.users ? lastChatData.users: [];
        lastChats.forEach((lastChat) => {
          let index = users.findIndex(sub => sub.id === lastChat.senderId || sub.id === lastChat.receiverId);
          if (index !== -1) {
            let sub = users[index];
            sub.lastChat = lastChat;
            this.subscribers.push(sub);
          }
        });
        if (this.subscribers.length > 0) {
          this.selectedSubscriber = this.subscribers[0];
        }
        this.getFilter();
        this.getChatSetting();
        this.getTopFans();
        this.getRevenue('DAY');
      });
    },
    getFilter() {
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/filter-settings/influencers/${this.getUser.id}`;
      this.getData(url, (filterSettings) => {
        this.filterSettings = filterSettings;
      });
    },
    createdOrUpdatedFilter(filter) {
      let index = this.filterSettings.findIndex((item) => item.id === filter.id);
      if (index !== -1) {
        this.$set(this.filterSettings, index, filter);
      } else {
        this.filterSettings.push(filter);
      }
    },
    messageChargeRequiredChanged(event) {
      if (!event.target.checked) {
        this.chatSetting.pricePerMessage = null;
        this.chatSetting.pricePerFile = null;
        this.saveChatSetting();
      }
    },
    welcomeMessageRequiredChanged(event) {
      if (!event.target.checked) {
        this.chatSetting.welcomeMessage = null;
        this.saveChatSetting();
      }
    },
    getChatSetting() {
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/message-settings/influencers/${this.getUser.id}`;
      this.getData(url, (chatSetting) => {
        if (chatSetting) {
          this.chatSetting = chatSetting;
        }
      });
    },
    saveChatSetting() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/message-settings/influencers/${this.getUser.id}`;
      this.chatSetting.influencerId = this.getUser.id;
      this.putData(url, this.chatSetting, (chatSetting) => {
        this.chatSetting = chatSetting;
        this.isSubmitted = false;
      });
    },
    deleteFilter(filter) {
      let filterId = filter.id;
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/filter-settings/influencers/${this.getUser.id}/filters/${filterId}`;
      this.getDelete(url, (_) => {
        this.filterSettings.splice(this.filterSettings.indexOf(filter), 1);
      });
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
      console.log('slideBar', this.showSlideBar);
    },
  }

}

</script>


/* Hiding scrollbar for Chrome, Safari and Opera */
#content::-webkit-scrollbar {
display: none;
}

/* Hiding scrollbar for IE, Edge and Firefox */
#content {
scrollbar-width: none;
/* Firefox */
-ms-overflow-style: none;
/* IE and Edge */
}


.coloredInput {
background-color: #333333;
padding: 10px 15px;
border-radius: 8px;
border: 0px solid;

}

input::placeholder {
color: #fff;
}

button>span {
margin-left: 85%;
}


.coloredInput2 {

background-color: #333333;
padding: 12px 16px;
border-radius: 8px;
border: 0px solid;
}

.border-bottom-class {
border-bottom: 1px solid #b2b2b2;
}

.dropdown-class {
border: 1px solid #b2b2b2;
background: #000;
border-radius: 8px;
}

.dropdown-class a {
text-align: end;
color: #fff;
font-size: 12px;
background: #000;
}


.switch {
position: relative;
display: inline-block;
width: 44px;
height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
opacity: 0;
width: 0;
height: 0;
}

/* The slider */
.slider {
position: absolute;
cursor: pointer;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: #ccc;
-webkit-transition: .4s;
transition: .4s;
}

.slider:before {
position: absolute;
content: "";
height: 20px;
width: 18px;
/* left: 4px; */
/* bottom: 4px; */
background-color: white;
-webkit-transition: .4s;
transition: .4s;
}

input:checked+.slider {
background-color: #55efc4;
}

input:focus+.slider {
box-shadow: 0 0 1px #55efc4;
}

input:checked+.slider:before {
-webkit-transform: translateX(26px);
-ms-transform: translateX(26px);
transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
border-radius: 34px;
}

.slider.round:before {
border-radius: 50%;
}

.background-gradient-color {
background: linear-gradient(90deg, #F3DA6B 0%, #E53BB9 100%);
border-radius: 8px;
width: 24px;
height: 24px;
}

.button-class {
width: 194px;
height: 48px;
border-radius: 12px;
padding: 12px 16px;
background: linear-gradient(90deg, #F3DA6B 0%, #E53BB9 100%);
font-weight: 500;
}

.button-class2 {
width: 194px;
height: 48px;
border-radius: 8px;
padding: 12px 16px;
/* background: linear-gradient(90deg, #F3DA6B 0%, #E53BB9 100%); */
font-weight: 500;
}

.number-background {
background: #55efc4;
border-radius: 8px;
}

.time-background {
background: linear-gradient(90deg, #F3DA6B 0%, #E53BB9 100%);
padding: 5px 10px;
border-radius: 16px;
font-weight: 500;
}

/* media query------------------ */

@media only screen and (min-width: 720px) {
.widht-class {
width: 50%;
display: flex;
flex-direction: row;
justify-content: space-between;
}


}

@media only screen and (min-width: 1200px) {
.widht-class {
width: 30%;
display: flex;
flex-direction: row;
justify-content: space-between;
}


}

@media only screen and (max-width: 719px) {
.border-class {
border-top: 1px solid #b2b2b2;
border-bottom: 1px solid #b2b2b2;
}

.margin-class {
margin-top: 8px;
}


}

@media only screen and (max-width: 1023px) {
.font-class-16 {
font-weight: 500;
font-size: 16px;
}

.dropdown>input {
width: 70%;
}

}

@media only screen and (min-width: 1024px) {
.dropdown>input {
width: 90%;
}
}-->
<style>
@media only screen and (max-width: 768px) {
  .mobile-fix-width {
    /*width: 300px;*/
    height: 260px;
  }
}
</style>
