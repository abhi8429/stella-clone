<template>
  <div class="container-fluid">
    <div class="row" style="overflow:auto;  position: relative;">

      <div class="col-sm-12 border-bottom">
        <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>
        <InfluencerMenu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"/>
        <header-menu @slideMenu="slideBar()"></header-menu>
      </div>

      <div class="col-sm-3 px-3 mb-3" :class="isMobile() && selectedSubscriber.id ? 'd-none d-sm-block':'' ">

        <div class="row mt-3 d-flex flex-row justify-content-start">
          <div class=" d-block d-sm-none col-4 d-flex flex-row justify-content-start widht-class"
               @click="$router.push({name:'CreatorMessageDashboard'})">
            <h5 class="text-white font-weight-500 font-size-14 mt-1">Dashboard</h5>
          </div>
          <div class="col-4 d-flex flex-row justify-content-start widht-class">
            <div class="d-flex flex-row" style="border-bottom: 1px solid #FF59D4">
              <h5 class="text-white font-weight-500 font-size-14 mt-1">Inbox</h5>
              <p
                class="ml-2 background-gradient-color px-2 text-center font-weight-500 text-dark font-size-14">
                {{inboxCount}}
              </p>
            </div>
          </div>
          <div class="col-4 ml-md-3 d-flex flex-row justify-content-start widht-class"
               @click="$router.push({ name: 'Announcement', query: {inboxCount} })">
            <h5 class="text-white font-weight-500 font-size-14 mt-1">Announcement</h5>
            <!--            <p-->
            <!--              class="d-none d-sm-block ml-2 background-gradient-color px-2 text-center font-weight-500 text-dark font-size-14">-->
            <!--              4-->
            <!--            </p>-->
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


        <div class="row mt-3" style="overflow:auto; height: 80vh; position: relative;" id="content">

          <div class="col-12 "
               @click="changeSubscriber(subscriber)" v-for="(subscriber, index) in subscribers" :key="index">
            <div class="row d-flex flex-row justify-content-between"
                 :class="selectedSubscriber.id === subscriber.id ? 'outline-gradient-a' : ''"
                 style="border-radius: 8px;">
              <div class="col-3 mt-2">
                <message-avatar :user-id="subscriber.id"/>
<!--                <img class="rounded-circle" width="50" height="50" src="@/assets/images/stella/no_avatar.png" alt="">-->
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
                       style="max-width:74%">
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
      <div class="col-sm-9  px-3 border-left " :class="isMobile() && selectedSubscriber.id ? '' : 'd-none d-sm-block'">
        <div class="row" style="height: 100vh;">

          <div class=" col-sm-12 mt-1" style="height: 15vh; position:relative; top: 0;">
            <div class=" col-sm-3 d-flex flex-row justify-content-start" v-if="!isMobile()"
                 @click="$router.push({ name: 'CreatorMessageDashboard' })">
              <img src="https://icones.pro/wp-content/uploads/2021/06/icone-fleche-gauche-jaune.png" alt="" width="24px"
                   height="16px" class="mt-1">
              <p class="text-white px-2 font-size-14">Back to dashboard</p>
            </div>
            <div class=" col-sm-3 d-flex flex-row justify-content-start" v-else
                 @click="selectedSubscriber ={}">
              <img src="https://icones.pro/wp-content/uploads/2021/06/icone-fleche-gauche-jaune.png" alt="" width="24px"
                   height="16px" class="mt-1">
              <p class="text-white px-2 font-size-14 ">Back to Direct Message</p>
            </div>
            <div class="d-flex flex-row justify-content-between">
              <div class="d-flex flex-row justify-content-between">
                <message-avatar :user-id="selectedSubscriber.id"/>
<!--                <img v-else class="rounded-circle" width="50" height="50" src="@/assets/images/stella/no_avatar.png" alt="">-->
                <p class="text-white px-2 mt-2">{{ selectedSubscriber.name ? selectedSubscriber.name : selectedSubscriber.email }}</p>
              </div>
              <div class="border border-dark px-3 py-2 border-style-class"
                   style="position:relative; top:-1vh; border-radius: 10px">
                <p class="text-white font-size-14">Total spent</p>
                <h5 class="text-white font-weight-500 font-size-16" style="line-height: 0">
                  ${{ selectedSubscriber.spent ? selectedSubscriber.spent : 0 }}
                </h5>
              </div>
            </div>
          </div>

          <div class="mb-5" id="content" style="overflow:auto; height: 75vh; position: relative; ">
            <template v-for="(message, index) in messages">
              <div class="d-flex flex-column mt-1" :id="`message_${index}`"
                   :class="message.senderId === selectedSubscriber.id ? 'align-items-start' : 'align-items-end'">
                <span class="chat-paragraph-start" v-if="message.senderId === selectedSubscriber.id && message.message">
                  {{ message.message }}
                </span>
                <span class="chat-paragraph-subscriber-start" v-else-if="message.message">
                  {{ message.message }}
                </span>
                <template v-if="message.content && message.senderId === getUser.id">
                  <img v-if="message.content.type === 'IMAGE'" @click="showMediaPreview($event, message.content)"
                       :src="message.content.cdnUrl" alt="" width="240px" height="220px" class="rounded mt-1 img-fluid">
                  <video v-else-if="message.content.type === 'VIDEO'" @click="showMediaPreview($event, message.content)"
                         oncontextmenu="return false;" controlsList="nodownload"  controls
                         :src="message.content.cdnUrl" class="mt-1">
                  </video>

                  <span v-if="message.locked">Not yet unlocked by subscriber</span>
                </template>
              </div>
            </template>
          </div>
        </div>

        <div class="chat-input-textarea-class">
          <div class="d-flex flex-row justify-content-start px-2 mr-4">
            <div style="height: 4vh;" class="mt-2 px-2 mr-2">
              <img src="@/assets/images/stella/send-file-img.png"
                   @click="$refs.uploadFile.show(selectedSubscriber.id, null)"
                   alt="" width="30px" height="30px" style="margin-top:3px" class="img-fluid">
            </div>
            <input type="text" style="height: 4vh; width: 73%;" class="mt-2 coloredInput text-white" v-model="message"
                   placeholder="Type your message" @keyup.enter="sendMessage()">
            <div class="mt-2 ml-2">
              <img src="@/assets/images/stella/send-msg.png" alt="" width="30px" height="30px" style="margin-top:3px"
                   @click="sendMessage()" class="img-fluid">
            </div>
          </div>
        </div>
      </div>
    </div>

    <upload-media ref="uploadFile" @messageSent="contentMessageSent"/>
    <model-image-view ref="imageView"/>
    <model-video-view ref="videoView"/>
  </div>
</template>
<script>
import {httpMixin} from "@/mixin/http-mixin";
import {mapGetters} from "vuex";
import {SERVICE_CONTENT, SERVICE_DIRECT_MESSAGE} from "@/properties/micro-service";
import UploadMedia from "@/components/module/influencer/direct-message/UploadMedia";
import ModelImageView from "@/components/module/shared/ModelImageView";
import ModelVideoView from "@/components/module/shared/ModelVideoView";
import {CONTENT_TYPE_IMAGE, CONTENT_TYPE_VIDEO} from "@/properties/content-type";
import {scroll} from "@/common/Utils";
import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import '@/assets/styles/direct-message/direct-message-common.css';
import {timeSince} from "@/common/datetime-service";
import MessageAvatar from "@/components/module/shared/direct-message/MessageAvatar";


export default {
  name: "CreatorDirectMessage",
  components: {
    MessageAvatar,
    UploadMedia,
    ModelImageView,
    ModelVideoView,

    InfluencerMenu,
    HeaderMenu
  },
  mixins: [httpMixin],
  data() {
    return {
      subscribers: [],
      selectedSubscriber: {},
      messages: [],
      message: null,
      pollInterval: null,
      showSlideBar: false,
      inboxCount: 0
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  created() {
    this.getSubscribersLatestMessage();
    this.clearGlobalMessages();
  },
  mounted() {
    this.pollInterval = setInterval(() => {
      this.getMessages();
    }, 6000)
  },
  destroyed() {
    clearInterval(this.pollInterval);
  },
  methods: {
    timeSince,
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
          let selectedIndex = 0;
          if (this.$route.params.customerId) {
            selectedIndex = this.subscribers.findIndex((sub) => sub.id === this.$route.params.customerId);
            selectedIndex = selectedIndex === -1 ? 0 : selectedIndex;
          }
          if (!this.isMobile()) {
            this.selectedSubscriber = this.subscribers[selectedIndex];
          }
          this.getMessages();
        }
      });
    },
    contentMessageSent(message) {
      this.messages.push(message);
      this.scrollToMessage(this.messages.length - 1);
    },
    getMessages(isSubChanged) {
      let receiverId = this.selectedSubscriber.id;
      if (!this.selectedSubscriber.id) {
        return;
      }
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/influencers/${this.getUser.id}/receiver/${receiverId}`;
      this.getData(url, (messages) => {
        if (this.messages.length !== messages.length || isSubChanged ) {
          this.messages = messages;
          this.scrollToMessage(this.messages.length - 1);
          this.markAsRead();
        }
      });
    },
    markAsRead() {
      let messageIds = this.messages.filter((msg) => msg.receiverId === this.getUser.id && !msg.read).map(e => e.id);
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/influencers/${this.getUser.id}/read/${messageIds}`;
      if (messageIds.length > 0) {
        this.postData(url, {}, (data) => {
        });
      }
    },
    changeSubscriber(subscriber) {
      this.selectedSubscriber = subscriber;
      this.getMessages(true);
    },
    sendMessage() {
      if (!this.message || !this.message.trim()) return;

      let chatMessage = {
        "message": this.message,
        "senderId": this.getUser.id,
        "receiverId": this.selectedSubscriber.id,
        "contentId": null,
        "status": "S",
        "locked": false,
        "read": false
      }
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/influencers/${this.getUser.id}`;
      this.postData(url, chatMessage, (message) => {
        this.messages.push(message);
        this.message = null;
        this.scrollToMessage(this.messages.length - 1);
      })
    },
    scrollToMessage(num) {
      if (num === -1) {
        return;
      }
      this.$nextTick(() => {
        this.scroll(`message_${num}`);
      });
    },
    scroll,
    showMediaPreview(event, content) {
      if (!this.isMobile()) {
        //If not mobile prevent the video in the background from playing.
        // We want only the video in model to play
        event.preventDefault();
      }
      if (content.type === CONTENT_TYPE_IMAGE && content.cdnUrl) {
        this.$refs.imageView.show(content.cdnUrl);
      } else if (content.type === CONTENT_TYPE_VIDEO && content.cdnUrl) {
        this.$refs.videoView.show(content.cdnUrl);
      }
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },
  }
}
</script>
<style scoped>

@media only screen and (max-width: 767px)  {
  .chat-input-textarea-class{

    height: 8vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    overflow: auto;
    background: #000;
  }
}

@media only screen and (min-width:768px)and (max-width: 1024px) {
  .chat-input-textarea-class{

    height: 8vh;
    width: 85%;
    position: fixed;
    bottom: 0;
    overflow: auto;
    background: #000;
  }
}
@media only screen and (min-width: 1025px) {
  .chat-input-textarea-class{

    height: 8vh;
    width: 90%;
    position: fixed;
    bottom: 0;
    overflow: auto;
    background: #000;
  }
}

</style>
