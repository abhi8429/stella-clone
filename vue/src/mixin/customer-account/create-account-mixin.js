import {httpMixin} from "@/mixin/http-mixin";
import {SERVICE_CONTENT, SERVICE_IDENTIY} from "@/properties/micro-service";
import {getTokenExp, isRole, isTokenExpired} from "@/common/http-common";
import {ACCESS_TOKEN} from "@/properties/close-friend";
import {mapActions, mapGetters} from "vuex";
import {isUserActive} from "@/common/comm-service";

const NEED_TO_ADD = 'NeedToAdd';

export const createAccountMixin = {

  mixins: [httpMixin],
  data() {
    return {
      inviteeName: '',
      user: {},

      isSubmit: false,
      imageURL: '',
      isAvatarMissing: false,
    }
  },
  created() {

    /*  this.checkTokenValidity(() => {*/
    this.loadAvatarImg();
    let tokenExp = getTokenExp(ACCESS_TOKEN);
    if (tokenExp && !isTokenExpired(ACCESS_TOKEN)) {
      if (!isRole('INFLUENCER')) {
        this.$router.replace({name: 'CustomerRouter', params: {urlPrefix: this.$route.params.urlPrefix}});
      }
    }
    this.clearAllStore();
    this.loadInviteeName();
    /*   });*/

  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapActions(['clearAllStore','setUser', 'setInvitee']),

    goTo(to) {
      this.$router.push({name: to});
    },
    isRequired(attrib) {
      return this.isSubmit && !this.$v.user[attrib].required;
    },
    isValidEmail() {
      return this.isSubmit && !this.$v.user.email.email;
    },
    loadInviteeName() {
      let invitee = this.$route.params.urlPrefix;
      this.getUnSecureData(`${SERVICE_IDENTIY}/api/v1/influencers/urlSuffix/${invitee}`, (data) => {

        if (!isUserActive(data)) {
          this.$router.replace({name: 'DisabledAccount'});
        }
        this.inviteeName = data.name;
        this.bio = data.bio;
        this.setInvitee(data);

      });
    },
    imageLoadError(event) {
      this.isAvatarMissing = true;
    },
    loadAvatarImg() {
      //${BASE_URL}/content/api/v1/influencers/urlSuffix/${$route.params.urlPrefix}/avatar
      let url = `${SERVICE_CONTENT}/api/v1/influencers/urlSuffix/${this.$route.params.urlPrefix}/avatar`;
      this.getUnSecureData(url, (imageURL) => {
        this.imageURL = imageURL;
        console.log('imageURL', imageURL);
        this.isAvatarMissing = false;
      });
    },
  }
}
