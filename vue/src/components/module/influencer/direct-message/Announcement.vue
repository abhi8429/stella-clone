<template>
  <div class="container-fluid">
    <div class="row" style="overflow:auto;  position: relative;">
      <loading-modal :is-loading="isLoading"/>
      <influencer-message-header/>
      <div class="col-sm-3  px-3 mb-3" :class="isMobile() && selectedFilter.id ? 'd-none d-sm-block': '' ">
        <div class="row mt-3 d-flex flex-row justify-content-start">
          <div class=" d-block d-sm-none col-4 d-flex flex-row justify-content-start widht-class"
               @click="$router.push({ name: 'CreatorMessageDashboard' })">
            <h5 class="text-white font-weight-500 font-size-14 mt-1">Dashboard</h5>
          </div>
          <div class="col-4 d-flex flex-row justify-content-start widht-class"
               @click="$router.push({ name: 'CreatorDirectMessage' })">
            <h5 class="text-white font-weight-500 font-size-14 mt-1">Inbox</h5>
            <p
              class="ml-2 background-gradient-color px-2 text-center font-weight-500 text-dark font-size-14">
              {{ $route.query.inboxCount }}
            </p>
          </div>
          <div class="col-4 ml-md-3 d-flex flex-row justify-content-start widht-class">
            <h5 class="text-white font-weight-500 font-size-14 mt-1" style="border-bottom: 1px solid #FF59D4">
              Announcement</h5>
          </div>
        </div>
        <div class="row mt-3 d-flex flex-row justify-content-between" @click="$refs.filterGroup.show(filterSettings)">
          <i class="fa fa-pencil-square-o" style="font-size:24px;color:white" data-toggle="modal"
             data-target="#exampleModal"></i>
        </div>
        <div class="row mt-3" style="overflow:auto; height: 80vh; position: relative;"
             id="content">

          <div class="col-12 outline-gradient-a mb-2" style="height: 19%;border-radius: 8px"
               @click="changeFilter(filter)"
               v-for="(filter, index) in activeFilters" :key="index">
            <div class="row d-flex flex-column justify-content-start">
              <div class="col-12 " style="line-height: 0;">
                <div class="row d-flex flex-row justify-content-between">
                  <div class="col-2 mt-2">
                    <img class="rounded-circle mt-3" width="30" height="30"
                         src="@/assets/images/dollor-img2.png" alt="">
                  </div>
                  <div class="col-10 d-flex flex-column justify-content-between mt-2 py-3">
                    <p class="text-white mt-1 font-size-12 font-weight-500 " style="line-height: 0;">{{
                        filter.name
                      }}</p>
                    <p class="text-white  font-size-10 font-weight-400" style="padding-top: 5px;">
                      {{ filter.customerCount }} Subscribers
                    </p>

                  </div>
                </div>
              </div>
              <div class="col-12 d-flex flex-row justify-content-between"
                   style="line-height: 0;" v-if="filter.latestChat">
                <p class="text-white font-size-12 font-weight-400">You: {{ cropMessage(filter.latestChat) }}</p>
                <!--                <p class="px-4 text-white font-size-12 font-weight-400">{{ filter.latestChat | formatDate }}</p>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-9 px-3 border-left" :class="isMobile() && selectedFilter.id ? '' : 'd-none d-sm-block'">
        <div class="row" style="height: 100vh;">
          <div class=" col-sm-12 mt-1 " style="height: 15vh; position:relative; top: 0;">
            <global-message/>
            <div class=" col-sm-3 d-flex flex-row justify-content-start" v-if="!isMobile()"
                 @click="$router.push({ name: 'CreatorMessageDashboard' })">
              <img src="https://icones.pro/wp-content/uploads/2021/06/icone-fleche-gauche-jaune.png" alt=""
                   width="24px" height="16px" class="mt-1">
              <p class="text-white px-2 font-size-14">Back to dashboard</p>
            </div>
            <div class=" col-sm-3 d-flex flex-row justify-content-start" v-else
                 @click="selectedFilter={}">
              <img src="https://icones.pro/wp-content/uploads/2021/06/icone-fleche-gauche-jaune.png" alt=""
                   width="24px" height="16px" class="mt-1">
              <p class="text-white px-2 font-size-14">Back to Announcement</p>
            </div>
            <div class="d-flex flex-row justify-content-between">
              <div class="d-flex flex-row justify-content-between">
                <img class="rounded-circle mt-1" width="50" height="50"
                     src="@/assets/images/dollor-img2.png" alt="">
                <div class="d-flex flex-column justify-content-start py-3 ">
                  <p class="text-white px-2 font-size-16" style="line-height: 0;">{{ selectedFilter.name }}</p>
                  <p class="text-white px-2 font-size-12">{{ selectedFilter.customerCount }} Subscribers</p>
                </div>
              </div>

            </div>
          </div>

          <div class="mb-5" id="content" style="overflow:auto; height: 75vh; position: relative; ">
            <div class=" d-flex flex-column align-items-end" :id="`message_${index}`"
                 v-for="(message, index) in filterMessages" :key="index">
              <span class="chat-paragraph-subscriber-start mt-1">
                {{ message.message }}
              </span>
              <template v-if="message.content">
                <img v-if="message.content.type === 'IMAGE'" @click="showMediaPreview($event, message.content)"
                     :src="message.content.cdnUrl" alt="" width="240px" height="220px" class="rounded img-fluid mt-1">
                <video v-else-if="message.content.type === 'VIDEO'" @click="showMediaPreview($event, message.content)"
                       oncontextmenu="return false;" controlsList="nodownload" controls
                       :src="message.content.cdnUrl" class="mt-1">
                </video>
              </template>
            </div>
          </div>

        </div>

        <div class="chat-input-textarea-class">
          <div class="d-flex flex-row justify-content-start px-2 mr-4">
            <div style="height: 4vh;" class="mt-2 px-2 mr-2">
              <img src="@/assets/images/stella/send-file-img.png"
                   @click="$refs.uploadFile.show(null, selectedFilter.id)"
                   alt="" width="30px" height="30px" data-toggle="modal" class="img-fluid" style="margin-top: 3px"
              >
            </div>
            <input type="text" style="height: 4vh; width: 73%;"
                   class="mt-2 coloredInput text-white"
                   v-model="message"
                   @keyup.enter="sendMessage()">
            <div class="mt-2 ml-2">
              <img src="@/assets/images/stella/send-msg.png"
                   @click="sendMessage()"
                   alt=""  width="30px" height="30px"
                   class="img-fluid" style="margin-top: 3px"
              >
            </div>
          </div>

        </div>

      </div>
    </div>
    <filter-group ref="filterGroup"
                  :filter-settings="filterSettings"
                  @create="$refs.filterModal.show(null)"
                  @edit="(filter) => {
                    changeFilter(filter);
                    $refs.filterGroup.hide();
                  }"/>
    <filter-modal ref="filterModal" @saved="createdFilter"/>

    <upload-media ref="uploadFile"
                  message-type="filterMessage"
                  @messageSent="contentMessageSent"/>

    <model-image-view ref="imageView"/>
    <model-video-view ref="videoView"/>
  </div>
</template>


<script>
import '@/assets/styles/direct-message/direct-message-common.css';
import FilterGroup from "@/components/module/influencer/direct-message/FilterGroup";
import FilterModal from "@/components/module/influencer/direct-message/FilterModal";
import InfluencerMessageHeader from "@/components/module/influencer/direct-message/shared/InfluencerMessageHeader";
import {SERVICE_DIRECT_MESSAGE} from "@/properties/micro-service";
import {mapGetters} from "vuex";
import {httpMixin} from "@/mixin/http-mixin";
import UploadMedia from "@/components/module/influencer/direct-message/UploadMedia";
import {CONTENT_TYPE_IMAGE, CONTENT_TYPE_VIDEO} from "@/properties/content-type";
import ModelImageView from "@/components/module/shared/ModelImageView";
import ModelVideoView from "@/components/module/shared/ModelVideoView";
import {cropMessage, scroll} from "@/common/Utils";
import LoadingModal from "@/components/module/shared/LoadingModal";
import GlobalMessage from "@/components/module/shared/GlobalMessage";

export default {
  name: 'Announcement',
  mixins: [httpMixin],
  components: {
    LoadingModal,
    ModelVideoView,
    ModelImageView,
    UploadMedia,
    InfluencerMessageHeader,
    FilterGroup, FilterModal,
    GlobalMessage
  },
  data() {
    return {
      filterSettings: [],
      selectedFilter: {},
      filterMessages: [],
      activeFilters: [],
      message: null,
    }
  },
  created() {
    this.getFilters()
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    getFilters() {
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/filter-settings/influencers/${this.getUser.id}`;
      this.getData(url, (filterSettings) => {
        this.filterSettings = filterSettings;
        if (this.filterSettings.length > 0) {
          if (!this.isMobile()) {
            this.selectedFilter = filterSettings[0];
          }

          this.getFilterMessages();
          this.getLatestFilterMessage();
        }
        if (this.$route.query.newFilter) {
          this.$refs.filterGroup.show();
        }
      });
    },
    getFilterMessages() {
      if (!this.selectedFilter.id) return;
      let infId = this.getUser.id;
      let filterId = this.selectedFilter.id;
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/filter-messages/influencers/${infId}/filter/${filterId}`;
      this.getData(url, (messages) => {
        this.filterMessages = messages;
        this.scrollToMessage(messages.length - 1);
      });
    },
    getLatestFilterMessage() {
      let infId = this.getUser.id;
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/filter-messages/influencers/${infId}/latest`;
      this.getData(url, (latestMessages) => {
        latestMessages.forEach((lm) => {
          this.filterSettings.find((fs) => fs.id === lm.chatFilterSetting.id).latestChat = lm;
        })
        this.filterSettings.forEach((fm) => {
          if (fm.latestChat) {
            this.activeFilters.push(fm);
          }
        });
      });
    },
    changeFilter(filter) {
      this.selectedFilter = filter;
      this.getFilterMessages();
    },
    createdFilter(filter) {
      this.filterSettings.push(filter);
      this.selectedFilter = filter;
    },
    contentMessageSent(message) {
      this.filterMessages.push(message);
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
    sendMessage() {
      if (!this.message || !this.message.trim()) return;
      let filterMessage = {
        "message": this.message,
        "contentId": null,
      }
      let infId = this.getUser.id;
      let filterId = this.selectedFilter.id;
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/filter-messages/influencers/${infId}/filter/${filterId}`;
      this.postData(url, filterMessage, (message) => {
        this.filterMessages.push(message);
        this.message = null;
        this.scrollToMessage(this.filterMessages.length - 1);
      })
    },
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
    cropMessage,
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
