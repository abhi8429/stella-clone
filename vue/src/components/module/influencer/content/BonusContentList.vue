<template>
<section class="container-fluid">
  <div class="row p-md-4 pb-md-0">
    <div class="border-around border-md-1 border-0 p-2">
      <div id="top">

        <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>


        <influencer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></influencer-menu>
        <header-menu @slideMenu="slideBar()"></header-menu>

        <section class="closefriend-hero background-white">
          <div class="container mt-5">
            <div class="row">
              <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
                <div class="login-card">
                  <global-message></global-message>
                  <div class="login-body">

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

                    <div class="input-group my-3 flex-nowrap stella-group">
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

                    <b class="font-size-20">Your Profile</b>
                    <button @click="$router.replace({name: 'BonusContentAdd'})"
                        class="btn stella-btn py-3 gradient-a w-100 font-weight-900 mt-3 border-radius-12 d-flex justify-content-center align-items-center">
                        <span class="font-size-20 font-family-poppins text-white">Add Bonus Content</span>
                        <img class="mx-1" src="@/assets/images/stella/Create.png">
                    </button>
                    <!-- post start -->
                    <template v-for="(content, index) in contents">
                      <div class="mb-3 mx-1">
                        <div v-if="content.pinned" class="col-md-12 mt-3 pindiv"><!-- 21 Oct Change  -->
                          <img class="pinImg" style="filter:grayscale(1);" src="@/assets/images/pin.svg">
                          <span class="pinText font-grey">Pinned Post</span>
                        </div>
                        <span class="bonus-content-locked">
                            <img v-if="content.price !== 0" style="object-fit:contain" src="@/assets/images/stella/swipe-lock.png">
                            <span v-else/>
                            <span class="btn btn-success">${{ content.price }}</span>
                        </span>

                        <span class="archive-section">
                        <img v-if="content.type === 'IMAGE'"
                             class="bonus-content-image" style="" @click="checkEditOrArchive(index);"
                             :src="content.cdnUrl" :style="getOpacity(content)">
                        <video v-else-if="content.type === 'VIDEO'" oncontextmenu="return false;" controlsList="nodownload"
                               class="bonus-content-video" :style="getOpacity(content)"
                               controls :src="content.cdnUrl" @click="checkEditOrArchive(index);">
                        </video>

                        <div v-else class="form-group text-center bonus-content-others"
                             id="upload_image_section">
                          <div @click="checkEditOrArchive(index);">
                            <img src="@/assets/images/download.png" class="mt-4 mb-3"
                                 style="width: 64px;height: 64px;">
                            <div class="font-grey font-size-16 font-weight-bold">download File</div>
                          </div>
                          <div class="mt-1 font-grey font-size-12"><i>
                            <a :href="content.cdnUrl" target="_blank">{{ content.fileName + '.' + content.ext }}</a></i>
                          </div>
                        </div>
                        <p class="text-left mt-3 mx-1 text-white">{{ content.description }}</p>
                            <div class="archive-button">
                              <button v-if="!contents[index].active"
                                      class="btn btn-dark font-size-14"
                                      @click="unArchive(index)">Unarchive</button>
                            </div>
                        </span>
                        <button
                                class="btn rounded-pill text-dark gradient-a btn-lg px-4"
                                style="background: rgba(255, 255, 255, 0.9);"
                                disabled>
                          <img style="width:24px;height: 27px;" src="@/assets/images/stella/like.png"/>
                          {{content.likedCount}}
                        </button>
                      </div>
                    </template>
                    <!-- post end -->

                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        <infinite-loading @infinite="loadData">
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>

        <model-edit-archive ref="editArchive"
                            @archive="archive()"
                            @edit="edit()"/>

      </div>
    </div>
  </div>
</section>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

import InfiniteLoading from 'vue-infinite-loading';
import {httpMixin} from "@/mixin/http-mixin";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import InfluencerHeader from "@/components/module/influencer/shared/InfluencerHeader";
import {constructCustomerURL} from "@/common/baseURL-service";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {newSubscriptionMixin} from "@/mixin/new-subscription-mixin";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import ModelEditArchive from "@/components/module/influencer/content/ModelEditArchive";
import titleMixin from "../../../../mixin/title-mixin";

export default {
  name: 'BonusContentList',
  title: 'Creator bonus contents',
  mixins: [httpMixin, newSubscriptionMixin, titleMixin],
  components: {
    HeaderMenu, InfluencerMenu,
    InfluencerHeader, GlobalMessage,
    ModelEditArchive, InfiniteLoading
  },
  data() {
    return {
      user: {},
      showSlideBar: false,
      isSubmit: false,
      isVideo: false,
      contents: [],
      contentIndex: null,

      pageNumber: 0,
      noOfItems: 10
    }
  },
  created() {
    this.user = this.getUser();
    // document.body.style.overflow = 'auto';
  },
  computed: {
    copyLabel() {
      return this.copied ? 'Copied' : 'Copy';
    }
  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapActions(['setUser', 'setMessage']),
    loadData($state) {
      console.log('loadData');
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/content/page?pageNumber=${this.pageNumber}&numberOfItems=${this.noOfItems}`;
      this.getData(url, (page) => {
        if (this.pageNumber === 0) {
          if (this.$route.params.isSaved) {
            this.setMessage('UPLOADED.SUCCESSFULLY');
          } else if (this.$route.params.isDeleted) {
            this.setMessage('DELETED.SUCCESSFULLY');
          } else if (this.$route.params.isArchived) {
            this.setMessage('ARCHIVED.SUCCESSFULLY');
          }
        }
        if (!page.empty) {
          this.contents.push(...page.content);
          this.pageNumber += 1;
          $state.loaded();
        } else {
          $state.complete();
          console.log('complete');
        }
      });

    },
    constructCustomerURL,
    getOpacity(content) {
      return content.active ? '' : 'opacity: 0.7;';
    },
    archive() {
      this.$refs.editArchive.hide();
      this.changeContentActiveState(false);
    },
    unArchive(index) {
      this.contentIndex = index;
      this.changeContentActiveState(true);
    },
    changeContentActiveState(value) {
      let content = this.contents[this.contentIndex];
      content.active = value;
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/content/${content.id}`;
      this.patchData(url, content, (data) => {
        if (content.active) {
          this.setMessage('UNARCHIVED.SUCCESSFULLY');
        } else {
          this.setMessage('ARCHIVED.SUCCESSFULLY');
        }
      });

    },
    checkEditOrArchive(index) {
      this.contentIndex = index;
      if (this.contents[index].active) {
        //show edit or archive button model
        this.$refs.editArchive.show();
      }

    },
    edit() {
      this.$router.replace({name: 'BonusContentEdit', params: {contentId: this.contents[this.contentIndex].id}});
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },
  }
}

</script>

<style scoped>
.bonus-content-video {
  margin-top: -20px;
  max-width: 100%;
  width: 100%;
}

.bonus-content-others {
  background: #726f6f;
  padding: 40px 60px;
  cursor: pointer;
  margin-top: -20px;
  max-width: 100%;
  width: 100%;
}
button>span{
  margin-left: 5%;
}
</style>



