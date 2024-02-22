<template>
  <div class="container-fluid">
    <div class="row" style="overflow:auto;  position: relative;">

      <div class="col-sm-12 border-bottom">
        <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>
        <customer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></customer-menu>
        <header-menu @slideMenu="slideBar()"></header-menu>
      </div>

      <div class="col-sm-3 px-3 mb-3" :class="isMobile() && selectedCreator.id ? 'd-none d-sm-block': '' ">
        <div class="row mt-3 border-class d-flex flex-col">
          <div class="col-12 d-flex flex-row justify-content-start">
            <p class=" font-weight-500 font-size-16 text-white">Direct Messages</p>
            <p class="ml-2 background-gradient-color-new px-2 text-center font-weight-500 text-dark font-size-16">
              {{ inboxCount }}
            </p>
          </div>

        </div>


        <div class="row mt-3" style="overflow:auto; height: 80vh; position: relative;"
             id="content">
          <div class="col-12 d-flex flex-column mb-2 pt-1" style="border-radius: 8px"
               @click="changeCreator(creator)"
               v-for="(creator, index) in creators" :key="index">
            <div class="row d-flex flex-row justify-content-between"
                 :class="selectedCreator.id === creator.id ? ' outline-gradient-a' : ''"
                 style="border-radius: 8px;">
              <div class="col-3 mt-2">
                <message-avatar :user-id="creator.id"/>
                <!--                <img class="rounded-circle" width="50" height="50"
                                     src="@/assets/images/stella/no_avatar.png" alt="">-->
              </div>
              <div class="col-9">
                <div class="row">
                  <div class="col-12 d-flex flex-row justify-content-between">
                    <p class="font-weight-500 font-size-14 text-white text-truncate"
                       style="max-width: 90%">{{ creator.name ? creator.name : creator.email }}</p>
                  </div>
                  <div class="col-12 d-flex flex-row justify-content-between"
                       v-if="creator.lastChat">
                    <p class="text-white font-size-12 font-weight-400 text-truncate"
                       style="max-width: 80%">
                      {{ creator.lastChat.message ? creator.lastChat.message : 'N/A' }}
                    </p>
                    <p class="px-1 text-white font-size-12 font-weight-400">
                      {{ (creator.lastChat ? timeSince(creator.lastChat.sentAt) : '') }}
                    </p>
                    <img v-if="!creator.lastChat.read && creator.lastChat.senderId !== getUser.id"
                         src="@/assets/images/unread.png" width="7" height="7">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-9 px-3 border-left" :class="isMobile() && selectedCreator.id ? '' : 'd-none d-sm-block'">
        <div class="row" style="height: 100vh;">
          <global-message/>
          <div class=" col-sm-12 mt-1" style="height: 10vh; position:relative; top: 0;">
            <div class=" col-sm-3 d-flex flex-row justify-content-start" v-if="isMobile()"
                 @click="selectedCreator ={}">
              <img src="https://icones.pro/wp-content/uploads/2021/06/icone-fleche-gauche-jaune.png" alt="" width="24px"
                   height="16px" class="mt-1">
              <p class="text-white px-2 font-size-14 ">Back to Direct Message</p>
            </div>
            <div class="d-flex flex-row justify-content-between">
              <div class="d-flex flex-row justify-content-between">
                <message-avatar :user-id="selectedCreator.id"/>
                <!--                <img class="rounded-circle" width="50" height="50"
                                     src="@/assets/images/stella/no_avatar.png" alt="">-->
                <p class="text-white px-2 mt-2">{{
                    selectedCreator.name ? selectedCreator.name : selectedCreator.email
                  }}</p>
              </div>
            </div>
          </div>

          <div class="mb-5" id="content" style="overflow:auto; height: 80vh; position: relative; ">
            <template v-for="(message, index) in messages">
              <div class="d-flex flex-column mt-1" :id="`message_${index}`"
                   :class="message.senderId === selectedCreator.id ? 'align-items-start': 'align-items-end'">
                <span class="chat-paragraph-start" v-if="message.senderId === selectedCreator.id && message.message">
                  {{ message.message }}
                </span>
                <span class="chat-paragraph-subscriber-start"
                      v-else-if="message.senderId === getUser.id">{{ message.message }}</span>
                <template v-if="message.content && message.senderId === selectedCreator.id">
                  <img v-if="message.content.type === 'IMAGE'"
                       :src="getContentUrl(message)"
                       @click="unlockMedia($event, index)"
                       width="240px" height="220px" class="rounded mt-1 img-fluid">
                  <video v-else-if="message.content.type === 'VIDEO'"
                         @click="unlockMedia($event, index)"
                         :style="message.locked ? 'filter: blur(3px)': ''"
                         oncontextmenu="return false;" controlsList="nodownload"
                         width="240" height="135px"
                         controls :src="message.content.cdnUrl" class="mt-1">
                  </video>
                  <span v-if="message.locked" @click="unlockMedia(index)">
                    Unlock for ${{ message.content.price }}
                  </span>
                </template>
              </div>
            </template>
          </div>
        </div>

        <div class="chat-input-textarea-class">
          <div class="d-flex flex-row justify-content-start px-2">
            <input type="text"  class="mt-2 coloredInput text-white chat-width-fix"
                   v-model="message"
                   placeholder="Type your message"
                   @keyup.enter="checkToSendMessage()">
            <div class="mt-2 pl-2">
              <img src="@/assets/images/stella/send-msg.png" alt="" width="30px"
                   height="30px"
                   @click="checkToSendMessage()" style="margin-top: 3px">
            </div>
          </div>
        </div>
      </div>
    </div>
    <send-message-modal ref="sendMessageModal"
                        @messageSent="messageSent"
                        @editMessage="editMessage"/>
    <unlock-media-message-modal ref="unlockMediaMessageModal"
                                @unlockedMessage="unlockMediaNow"/>

    <model-image-view ref="imageView"/>
    <model-video-view ref="videoView"/>
  </div>
</template>
<script>
import {httpMixin} from "@/mixin/http-mixin";
import {mapActions, mapGetters} from "vuex";
import {SERVICE_CONTENT, SERVICE_DIRECT_MESSAGE, SERVICE_PAYMENT} from "@/properties/micro-service";
import SendMessageModal from "@/components/module/customer/direct-message/SendMessageModal";
import UnlockMediaMessageModal from "@/components/module/customer/direct-message/UnlockMediaMessageModal";
import ModelImageView from "@/components/module/shared/ModelImageView";
import ModelVideoView from "@/components/module/shared/ModelVideoView";
import {CONTENT_TYPE_IMAGE, CONTENT_TYPE_VIDEO} from "@/properties/content-type";
import {scroll} from "@/common/Utils";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import CustomerMenu from "@/components/module/customer/shared/CustomerMenu";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {BONUS_CONTENT, MESSAGE, paymentCancelled, paymentPaid} from "@/common/analytics-service";

import '@/assets/styles/direct-message/direct-message-common.css'
import {timeSince} from "@/common/datetime-service";
import MessageAvatar from "@/components/module/shared/direct-message/MessageAvatar";

export default {
  name: "CreatorDirectMessage",
  mixins: [httpMixin],
  components: {
    MessageAvatar,
    GlobalMessage,
    SendMessageModal,
    UnlockMediaMessageModal,
    ModelImageView,
    ModelVideoView,
    HeaderMenu,
    CustomerMenu
  },
  data() {
    return {
      creators: [],
      selectedCreator: {},
      message: null,
      pollInterval: null,
      messages: [],
      draftMessage: null,
      messageSetting: null,
      inboxCount: 0,
      showSlideBar: false
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    isfirstMessageFree() {
      let exists = this.messages.some(msg => msg.senderId === this.getUser.id);
      if (this.messageSetting && this.messageSetting.firstMessageFree && !exists) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {

    this.getCreators();
    if (this.$route.query.status === 'success') {
      this.setMessage('MESSAGE.SENT');
      paymentPaid(this, MESSAGE, this.getPayInfluencer());
    } else if (this.$route.query.status === 'cancelled') {
      this.setMessage('PAYMENT.CANCELLED.RETRY');
      let clientReferenceId = this.$route.query.clientReferenceId;
      let URL = `${SERVICE_PAYMENT}/api/v1/stripe/checkout/cancel/${clientReferenceId}`
      this.postUnsecureData(URL, {}, (data) => {
        // this.setMessage('PAYMENT.CANCELLED');
      });
      paymentCancelled(this, MESSAGE, this.getPayInfluencer());
    }
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
    ...mapActions(['setMessage', 'setWarning']),
    ...mapGetters(['getPayInfluencer']),
    getContentUrl(message) {
      if (message.locked) {
        if (message.content.blurCdnUrl) {
          return message.content.blurCdnUrl;
        }
      }
      return message.content.cdnUrl;
    },
    timeSince,
    getMessageSetting() {
      let receiverId = this.selectedCreator.id;
      if (!this.selectedCreator.id) return;
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/message-settings/influencers/${receiverId}`;
      this.getData(url, (messageSetting) => {
        this.messageSetting = messageSetting;
      })
    },
    getCreators() {
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/customers/${this.getUser.id}/senders`;
      this.getData(url, (creators) => {
        this.creators.splice(0);
        this.creators.push(...creators);
        if (this.creators.length > 0) {
          if (!this.isMobile() || this.$route.query.inf || this.$route.params.customerId)  {
            if (this.$route.params.customerId) {
              let index = creators.findIndex(e => e.id == this.$route.params.customerId);
              this.selectedCreator = creators[index];
            } else if (this.$route.query.inf) {
              let index = creators.findIndex(e => e.id == this.$route.query.inf);
              this.selectedCreator = creators[index];
            } else {
              this.selectedCreator = creators[0];
            }
          }

          this.getDraftMessage();
          this.getMessages();
          this.getMessageSetting();
          this.getCreatorsLatestMessage();
        }
      })
    },
    getCreatorsLatestMessage() {
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/customers/${this.getUser.id}/latest`;
      this.getData(url, (lastChatData) => {
        let lastChats = lastChatData.chatMessages ? lastChatData.chatMessages : [];
        this.inboxCount = lastChatData.unreadMessageCount;
        lastChats.forEach((lastChat) => {
          let index = this.creators.findIndex((sub) => sub.id === lastChat.senderId || sub.id === lastChat.receiverId);
          if (index !== -1) {
            let creator = this.creators[index];
            creator.lastChat = lastChat;
            this.$set(this.creators, index, creator);
          }
          if (this.$route.query.msgId) {
            let index = this.messages.findIndex(e => e.id == this.$route.query.msgId);
            this.showUnlockMediaModal(this.messages[index]);
          } else if (this.$route.query.inf) {
            this.showSendMsgModal(this.draftMessage);
          }
        });
      });
    },
    getDraftMessage() {
      if (!this.selectedCreator.id) return;
      let receiverId = this.selectedCreator.id;
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/customers/${this.getUser.id}/draft/${receiverId}`;
      this.getData(url, (draftMessage) => {
        this.draftMessage = draftMessage;
        if (this.draftMessage !== null) {
          this.message = this.draftMessage.message;
        }
      })
    },
    getMessages() {
      if (!this.selectedCreator.id) return;
      let receiverId = this.selectedCreator.id;
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/customers/${this.getUser.id}/receiver/${receiverId}`;
      this.getData(url, (messages) => {
        if (this.messages.length !== messages.length) {
          this.messages = messages;
          this.scrollToMessage(messages.length - 1);
          this.markAsRead();
        }
      })
    },
    markAsRead() {
      let messageIds = this.messages.filter((msg) => msg.receiverId === this.getUser.id && !msg.read).map(e => e.id);
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/customers/${this.getUser.id}/read/${messageIds}`;
      if (messageIds.length > 0) {
        this.postData(url, {}, (data) => {
        });
      }
    },
    showMediaPreview(content) {
      if (content.type === CONTENT_TYPE_IMAGE && content.cdnUrl) {
        this.$refs.imageView.show(content.cdnUrl);
      } else if (content.type === CONTENT_TYPE_VIDEO && content.cdnUrl) {
        this.$refs.videoView.show(content.cdnUrl);
      }
    },
    changeCreator(creator) {
      this.selectedCreator = creator;
      this.getMessages();
      this.getDraftMessage();
      this.getMessageSetting();
    },
    checkToSendMessage() {
      if (!this.message || !this.message.trim()) return;
     if (this.messageSetting && this.messageSetting.pricePerMessage > 0 && !this.isfirstMessageFree) {
        if (this.draftMessage) {
          this.updateMessage((draftMessage) => {
            this.showSendMsgModal(draftMessage);
          });
        } else {
          this.sendMessage('D', (draftMessage) => {
            this.draftMessage = draftMessage;
            this.showSendMsgModal(draftMessage);
          });
        }
      } else {
        if (this.draftMessage) { //This may not happen
          this.draftMessage.status = 'S';
          this.updateMessage((_) => {
          });
        } else {
          this.sendMessage('S', (_) => {
          });
        }
      }
    },
    showSendMsgModal(draftMessage) {
      let influencerId = this.selectedCreator.id;
      let customerid = this.getUser.id;
      let msgPrice = this.messageSetting.pricePerMessage;
      this.$refs.sendMessageModal.show(influencerId, customerid, draftMessage, msgPrice);
    },
    editMessage() {
    },
    messageSent(sentMessage) {
      this.message = '';
      let index = this.messages.findIndex((msg) => msg.id === sentMessage.id);
      this.setMessage('MESSAGE.SENT');
      //If not found then push the new message. It can be so, that the msg was loaded by polling
      if (index === -1) {
        this.messages.push(sentMessage);
        this.draftMessage = null;
        this.scrollToMessage(this.messages.length - 1);
      }
    },
    unlockMedia(event, index) {
      if (this.messages[index].content.price > 0 && this.messages[index].locked) {
        this.showUnlockMediaModal(this.messages[index]);
      } else {
        if (!this.isMobile()) {
          //If not mobile prevent the video in the background from playing.
          // We want only the video in model to play
          event.preventDefault();
        }
        this.showMediaPreview(this.messages[index].content);
      }
    },
    showUnlockMediaModal(message) {
      let influencerId = this.selectedCreator.id;
      let customerId = this.getUser.id;
      let msgPrice = this.messageSetting.pricePerFile;
      this.$refs.unlockMediaMessageModal.show(influencerId, customerId,
        message, msgPrice);
    },
    unlockMediaNow(unlockedMessage) {
      let index = this.messages.findIndex((msg) => msg.id === unlockedMessage.id);
      this.messages[index].locked = false;
      this.messages[index].content.cdnUrl = unlockedMessage.content.cdnUrl;
      this.setMessage('UNLOCKED.MEDIA');
      this.scrollToMessage(this.messages.length - 1);
    },
    sendMessage(status, fn) {
      let chatMessage = {
        "message": this.message,
        "senderId": this.getUser.id,
        "receiverId": this.selectedCreator.id,
        "contentId": null,
        "status": status,
        "locked": false,
        "read": false
      };
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/customers/${this.getUser.id}`;
      this.postData(url, chatMessage, (message) => {
        fn(message);
        if (status === 'S') {
          this.message = '';
          this.draftMessage = null;
          this.messages.push(message);
          this.scrollToMessage(this.messages.length - 1);
        }
      });
    },
    updateMessage(fn) {
      this.draftMessage.message = this.message;
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/customers/${this.getUser.id}`;
      this.patchData(url, this.draftMessage, (draftMessage) => {
        this.draftMessage = draftMessage;
        fn(draftMessage);
      });
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
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },
  }
}
</script>
<style>

@media only screen and (max-width: 767px)  {
  .chat-input-textarea-class{

    height: 8vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    overflow: auto;
    background: #000;
  }
  .chat-width-fix{
    height: 4vh;
    width: 85%;
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
  .chat-width-fix{
    height: 4vh;
    width: 78%;
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
  .chat-width-fix{
    height: 4vh;
    width: 78%;
  }
}


</style>
