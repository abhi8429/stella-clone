import {mapActions, mapGetters} from "vuex";
import {httpMixin} from "@/mixin/http-mixin";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {
  PLATFORM_INSTAGRAM,
  PLATFORM_SNAPCHAT,
  PLATFORM_STELLA,
  PLATFORM_TELEGRAM,
  PLATFORM_TIKTOK
} from "@/properties/close-friend";

export const customerAccountMixin = {

  mixins: [httpMixin],
  data() {
    return {
      imageURL: '',
      isAvatarMissing: false,
    }
  },
  mounted() {
    console.log('MOUNTED');
    if (this.isSnapchat) {
      document.body.style.backgroundColor = '#FFFA37';
    }
  },
  unmounted() {
    console.log('UNMOUNTED');
    if (this.isSnapchat) {
      document.body.style.backgroundColor = '';
    }
  },
  beforeDestroy() {
    document.body.style.backgroundColor = '';
  },
  computed: {
    ...mapGetters(['getPlatform', 'getUser', 'getInfluencerPlatformId',
      'getInvitee', 'getCreatePlatform', 'getPlatformId', 'getSource']),
    isSnapchat() {
      if (this.getPlatform) {
        return this.getPlatform === PLATFORM_SNAPCHAT;
      }
      return false;
    },
    isTikTok() {
      if (this.getPlatform) {
        return this.getPlatform === PLATFORM_TIKTOK;
      }
      return false;

    },
    isInstagram() {
      if (this.getPlatform) {
        return this.getPlatform === PLATFORM_INSTAGRAM;
      }
      return false;
    },
    isTelegram() {
      if (this.getPlatform) {
        return this.getPlatform === PLATFORM_TELEGRAM;
      }
      return false;
    },
    isStella() {
      if (this.getPlatform) {
        return this.getPlatform === PLATFORM_STELLA;
      }
      return false;
    },
    isOtherPlatforms() {
      let platform = this.getPlatform;
      if (platform === PLATFORM_SNAPCHAT
        || platform === PLATFORM_INSTAGRAM
        || platform === PLATFORM_TIKTOK
        || platform === PLATFORM_TELEGRAM) {
        return false;
      }
      return true;
    },
    label() {
      if (this.isInstagram) {
        return PLATFORM_INSTAGRAM
      } else if (this.isSnapchat) {
        return PLATFORM_SNAPCHAT
      } else if(this.isTikTok) {
        return PLATFORM_TIKTOK;
      } else {
        return this.getPlatform;
      }
    },
    buttonColor() {
      if (this.isInstagram || this.isOtherPlatforms) {
        return 'btn btn-success';
      } else if (this.isTelegram) {
        return 'btn btn-blue'
      }
      return  'btn btn-black';
    }
  },
  methods: {
    ...mapActions(['setCreatePlatform', 'setPlatform']),
    imageLoadError(event) {
      this.isAvatarMissing = true;
    },
    loadAvatarImg(urlPrefix) {
      if (!urlPrefix) {
        urlPrefix = this.$route.params.urlPrefix;
      }
      let url = `${SERVICE_CONTENT}/api/v1/influencers/urlSuffix/${urlPrefix}/avatar`;
      this.getUnSecureData(url, (imageURL) => {
        this.imageURL = imageURL.replace('dp', 'dp_150X150') + '?ver=' + Math.random();
        this.isAvatarMissing = false;
      });
    },
    showCustomerContent() {
      let url = `${SERVICE_CONTENT}/api/v1/customers/${this.getUser.id}/content/available`;
      this.getData(url, (contentAvailable) => {
        this.setPlatform(null);
        this.setCreatePlatform(null);
        let query = {saved: true};
        if (contentAvailable) {
          this.$router.replace({name: 'CustomerBonusContentList', query});
        } else {
          this.$router.replace({name: 'CustomerDashboardMobile', query});
        }
      });
    },
  }

}
