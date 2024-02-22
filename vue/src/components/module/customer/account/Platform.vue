<template>
  <div>

    <header class="sticky" style="visibility: hidden;">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <!--          <a class="navbar-brand" href="#" @click="home()">-->
          <router-link class="navbar-brand" :to="{name: 'HomePage'}" replace>
            <img src="@/assets/images/stella/logo-stella-white.png" class="img-fluid"
                 style="margin-right: 100px; display: inline; pointer-events: none;">
          </router-link>
          <!--          </a>-->
          <!--          <span class="float-right">
                      <button class="btn login-btn" style="" @click.prevent="loginPage()">Login</button>
                    </span>-->
        </div>
      </nav>
    </header>
    <loading-modal :is-loading="isLoading"></loading-modal>
    <section id="slide" class="slide closefriend-hero background-white">
      <div class="content-bottom">
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-md-5 col-sm-12 col-12">
              <div class="login-card">
                <div class="login-body">
                  <!-- use this if bio available for mobile -->

                  <div class="row align-items-center">
                    <div class="col-md-9 col-12 order-last order-md-first text-center text-md-left">
                      <h2 class="join-title">My Exclusive Clubs</h2>
                    </div>
                    <div class="col-md-3 col-12 text-center ">
                      <img v-if="!isAvatarMissing"
                           :src="imageURL"
                           class="profile-image" @error="imageLoadError">
                      <img v-else src="@/assets/images/default_user.png" class="profile-image">
                      <div style="white-space: nowrap;" class="font-black font-weight-600">
                        {{ inviteeName ? `@${inviteeName}` : '' }}
                      </div>
                      <input type="file" class="form-control d-none" id="file_upload" name="file" accept="images/*">
                    </div>
                  </div>
                  <global-message></global-message>

                  <div class="form-group"
                       v-for="(influencerPlatform, index) in influencerPlatforms"
                       :key="index">
                    <button type="submit"
                            :class="getButtonColor(influencerPlatform)"
                            class="btn-mobile btn-lg btn-block mt-3 btn-mobile font-size-15-18"
                            @click="goToPlatform(influencerPlatform)">{{ getButtonLabel(influencerPlatform) }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>

import {mapActions} from 'vuex'
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import LoadingModal from "@/components/module/shared/LoadingModal";
import {SERVICE_IDENTIY, SERVICE_SUBSCRIPTION} from "@/properties/micro-service";
import {isUserActive} from "@/common/comm-service";
import CreatorImage from "@/components/module/shared/CreatorImage";
import {customerAccountMixin} from "@/mixin/customer-account/customer-account-mixin";
import {
  EXCLUSIVE_CUSTOM_REQUEST_INFLUENCERS,
  PLATFORM_INSTAGRAM,
  PLATFORM_SNAPCHAT, PLATFORM_STELLA,
  PLATFORM_TELEGRAM,
  PLATFORM_TIKTOK
} from "@/properties/close-friend";

export default {
  name: 'Platform',
  components: {GlobalMessage, LoadingModal, CreatorImage},
  mixins: [customerAccountMixin],
  data() {
    return {
      inviteeName: '',
      influencerPlatforms: [/*{platform: {name: 'Instagram'}},
        {platform: {name: 'Snapchat'}}*/]

    }
  },
  mounted() {
    document.body.style.backgroundColor = '';
  },
  created() {

    /**
     If the customer has logged in and lands at this page, then take the customer to
     appropriate page. This can happen when the user is trying to subscribe to a new
     creator (influencer)
     */
    //TODO: check we need this here
    /*  let tokenExp = getTokenExp(ACCESS_TOKEN);
      if (tokenExp && !isTokenExpired(ACCESS_TOKEN)) {
        if (!isRole('INFLUENCER')) {
          this.$router.replace({name: 'CustomerRouter', params: {urlPrefix: this.$route.params.urlPrefix}});
        }
      }*/
    this.loadAvatarImg();
    this.loadInviteeName();

  },
  computed: {
    isExclCustomRequestInfluencer() {
      return EXCLUSIVE_CUSTOM_REQUEST_INFLUENCERS.includes(this.$route.params.urlPrefix);
    },
  },
  methods: {
    /* ...mapGetters(['getUser']),*/
    ...mapActions(['clearAllStore', 'setUser', 'setInvitee', 'setPlatform', 'setInfluencerPlatformId']),
    getButtonColor(influencerPlatform) {
      if (this.isInstagramPlatform(influencerPlatform)) {
        return 'btn btn-success';
      } else if (this.isTelegramPlatform(influencerPlatform)) {
        return 'btn btn-blue'
      } else if (this.isOtherPlatform(influencerPlatform)) {
        return 'btn btn-success';
      }
      return 'btn btn-black'
    },
    getButtonLabel(influencerPlatform) {
      if (this.isInstagramPlatform(influencerPlatform)) {
        return 'Instagram Close Friends';
      } else if (this.isSnapchatPlatform(influencerPlatform)) {
        return 'Private Snapchat';
      } else if (this.isStellaPlatform(influencerPlatform)) {
          return 'All-Access';
      }
      return `Exclusive ${influencerPlatform.platform.name}`;
    },
    isInstagramPlatform(influencerPlatform) {
      if (influencerPlatform.platform.name.includes(PLATFORM_INSTAGRAM)) {
        return true;
      }
      return false;
    },
    isSnapchatPlatform(influencerPlatform) {
      if (influencerPlatform.platform.name.includes(PLATFORM_SNAPCHAT)) {
        return true;
      }
      return false;
    },
    isTelegramPlatform(influencerPlatform) {
      if (influencerPlatform.platform.name.includes(PLATFORM_TELEGRAM)) {
        return true;
      }
      return false;
    },
    isOtherPlatform(influencerPlatform) {
      let platform = influencerPlatform.platform.name;
      if (platform === PLATFORM_SNAPCHAT
        || platform === PLATFORM_INSTAGRAM
        || platform === PLATFORM_TIKTOK
        || platform === PLATFORM_TELEGRAM) {
        return false;
      }
      return true;
    },
    goTo(to) {
      this.$router.push({name: to});
    },
    isRequired(attrib) {
      return this.isSubmit && !this.$v.user[attrib].required;
    },
    isValidEmail() {
      return this.isSubmit && !this.$v.user.email.email;
    },
    goToPlatform(influencerPlatform) {
      console.log('influencerPlatform.platform', influencerPlatform.platform);
      this.setPlatform(influencerPlatform);
      if (this.isInstagramPlatform(influencerPlatform)) {
        this.$router.push({path: `/c/${this.$route.params.urlPrefix}`});
      } else if (this.isSnapchatPlatform(influencerPlatform)) {
        this.$router.push({path: `/snapchat/${this.$route.params.urlPrefix}`});
      } else if (this.isOtherPlatform(influencerPlatform)) {
        this.$router.push({path: `/platform/${this.$route.params.urlPrefix}`});
      } else {
        this.$router.push({path: `/tiktok/${this.$route.params.urlPrefix}`});
      }
    },
    loadInviteeName() {
      let invitee = this.$route.params.urlPrefix;
      this.getUnSecureData(`${SERVICE_IDENTIY}/api/v1/influencers/urlSuffix/${invitee}`, (data) => {

        if (!isUserActive(data)) {
          this.$router.replace({name: 'DisabledAccount'});
        }
        this.inviteeName = data.name;
        this.setInvitee(data);

        this.getUnSecureData(`${SERVICE_SUBSCRIPTION}/api/v1/influencers/${data.id}/platform`, (influencerPlatforms) => {
          this.influencerPlatforms = influencerPlatforms;
            let index = this.influencerPlatforms
              .findIndex((infPlatform) => infPlatform.platform.name === PLATFORM_STELLA);
            if (index !== -1 && index !== 0) {
              let stellaPlatform = this.influencerPlatforms[index];
              this.influencerPlatforms.splice(index, 1);
              this.influencerPlatforms.unshift(stellaPlatform);
            }
        });

      });
    },

  }
}
;
</script>

<style scoped>
/*header.sticky {
  visibility: hidden;
}*/

.alert-snapchat-danger {
  border: 0;
  border-radius: 0;
  background: #FF7D7D;
}

.custom-control-label::before {
  background: transparent;
  border: 2px solid black;
}

/*.btn.customer-pricing-toggle:not(:disabled):not(.disabled).active {
  border: 2px solid #ff7d7d;
  background: #000;
}
.btn.customer-pricing-toggle:not(:disabled):not(.disabled).active > .customer-pricing{
  color: #FFFA37;
}
.btn.customer-pricing-toggle:not(:disabled):not(.disabled).active > .per-month{
  color: #FF7D7D !important;
  opacity: 0.5;
}
.btn.customer-pricing-toggle:not(:disabled):not(.disabled) {
  border: 2px solid #000;
}
.btn.focus, .btn:focus {
  outline: 0;
  box-shadow: none;
}
.form-outline {
  border: 1px solid #FFFA37 !important;
  border-radius: 18px;
}
.select-tags.active {
  background: #000;
  border: 0.2px solid #53535363;
  box-sizing: border-box;
  border-radius: 5px;
}*/
</style>

