<template>
  <section class="container-fluid hv-100">
    <div class="row p-md-4 pb-md-0 p-3 h-100">
      <div class="border-around p-3">

            <header-help :is-loading="isLoading"></header-help>

        <div class="col-md-3 col-12 mx-auto">

          <img class="d-md-none d-block img-fluid mt-5 pt-4" src="@/assets/images/stella/logo-stella-white.png">
          <div class="d-md-none d-block text-white font-size-24 font-family-poppins mt-4">Build your community</div>
          <div class="d-md-block d-none mt-5 py-4 text-white font-size-28 font-family-poppins mt-4">Log In</div>

          <div class="col-md-3 col-12 text-center " v-if="isSuffixCustomRequest">
            <img v-if="!isAvatarMissing"
                 :src="imageURL"
                 class="profile-img" @error="imageLoadError">
            <img v-else src="@/assets/images/default_user.png" class="profile-img">
            <div style="white-space: nowrap;" class="font-black font-weight-600">@{{ inviteeName }}</div>
          </div>
          <div class="login-card">
            <div class="login-header d-none">
              <h2>{{ headerLabel }}</h2>
            </div>
            <global-message></global-message>
            <br>
            <div class="login-body">
              <div class="form-group">
                <label for="email">Your Email</label>
                <!--                    onfocus="this.removeAttribute('readonly');"-->
                <!--                    type="email"-->
                <div>
                <input id="email" type="text" autocomplete="false" placeholder="Enter your email address"
                       class="form-control stella-group"
                       style="color: #212529 !important;"
                       name="username"
                       v-model="username">
                <div class="error invalid-feedback" v-if="isRequired('username')">This is required field</div>
                </div>
              </div>
              <div class="form-group">
                <div class="d-block">
                  <label for="password" class="control-label">Your Password</label>
                </div>
                <div class="input-group flex-nowrap stella-group">
                  <!--                      onfocus="this.removeAttribute('readonly');"-->
                  <input autocomplete="false" placeholder="Enter your password"
                        style="color: #212529 !important;"
                         type="password" class="form-control stella-group" id="password"
                         name="password" v-model="password">
                  <div class="input-group-prepend input-group-text">
                    	<i id="show_id" class="fa fa-eye" @click="showPassword('password')"></i>
                    	<i id="hide_id" class="fa fa-eye-slash d-none"></i>
                  </div>
                </div>
                <div class="error invalid-feedback" v-if="isRequired('password')">This is required field</div>
              </div>
              <div class="form-group mt-4">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" name="remember"
                         class="custom-control-input"
                         tabindex="3" id="remember-me"
                         v-model="isRememberMe" @change="rememberMe">
                  <label class="custom-control-label" for="remember-me">Remember Me</label>
                  <div class="float-right">
                    <a href="" class="font-dark-grey font-size-16 float-end" @click.prevent="$refs.sendOTP.show()">
                      Forgot Password?
                    </a>
                  </div>
                </div>
              </div>
              <div class="form-group pt-4">
                <div class="mt-4 w-100">
                  <button class="btn stella-btn gradient-a w-100 font-weight-900 rounded-pill" @click="login()">Continue
                  </button>
                </div>
                <div class="mt-4 w-100">
                  <button class="btn stella-btn btn-outline-grey font-grey w-100 rounded-pill" @click.prevent="signUp()">Sign Up with Email</button>
                </div>
                <div class="mt-4 w-100 d-none">
                  <button
                      class="btn stella-btn btn-outline-grey text-white w-100 rounded-pill d-flex justify-content-center align-content-center">
                    <img src="@/assets/images/stella/google.png" class="img-fluid me-2">
                    Sign Up with Google
                  </button>
                </div>
              </div>
              <!--                </form>-->
            </div>
          </div>

          <forgot-password-send-o-t-p ref="sendOTP" @otpSent="(changePassword) => {
            $refs.verifyOTP.show(changePassword)
          }"/>
          <forgot-password-verify-o-t-p ref="verifyOTP" @otpVerified="(changePassword) => {
            $refs.changePwd.show(changePassword)
          }"/>
          <forgot-password-change-pwd ref="changePwd"/>

        </div>

      </div>
    </div>
  </section>

</template>

<script>


import {AXIOS, AXIOS_LOGIN, getTokenExp, isRole, setRememberMe} from "@/common/http-common";
import {cleanUpAfterLogout, getLoginBody, storeToken} from '@/common/login-service';
import {ACCESS_TOKEN} from "@/properties/close-friend";
import {mapActions, mapGetters} from "vuex";
import {commMsg} from '@/properties/common-messages';
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {required} from "vuelidate/lib/validators";
import HeaderHelp from "@/components/module/influencer/shared/HeaderHelp";
import {showPassword} from '@/common/Utils'
import ForgotPasswordChangePwd from "@/components/module/shared/ForgotPasswordChangePwd";
import ForgotPasswordSendOTP from "@/components/module/shared/ForgotPasswordSendOTP";
import ForgotPasswordVerifyOTP from "@/components/module/shared/ForgotPasswordVerifyOTP";
import {SERVICE_CONTENT, SERVICE_IDENTIY} from "@/properties/micro-service";
import {httpMixin} from "@/mixin/http-mixin";
import {isSuffixCustomRequest} from "@/common/comm-service";
import {
  ROUTE_CREATE_CUSTOMER_INSTAGRAM,
  ROUTE_CREATE_CUSTOMER_PLATFORM, ROUTE_CREATE_CUSTOMER_PLATFORM_EXCL_CUSTOM_REQUEST,
  ROUTE_CREATE_CUSTOMER_SNAPCHAT,
  ROUTE_CREATE_CUSTOMER_TIKTOK
} from "@/router/module/subscriber/customer-routes";
import titleMixin from "../../../mixin/title-mixin";

export default {
  name: 'LoginMobile',
  title: 'Login',
  components: {
    HeaderHelp, GlobalMessage, ForgotPasswordChangePwd,
    ForgotPasswordSendOTP, ForgotPasswordVerifyOTP
  },
  mixins: [httpMixin, titleMixin],
  comments: {
    GlobalMessage
  },
  data() {
    return {
      username: null,
      password: null,
      inviteeName: null,
      isSubmit: false,
      isRememberMe: false,

      imageURL: null,
      isAvatarMissing: false,

    }

  },
  validations: {
    username: {required},
    password: {required},
  },
  created() {
    //Remove old token if it exists
    cleanUpAfterLogout();
    this.clearAllStore();
    if (this.$route.params.isSaved) {
      this.setMessage('Saved successfully, you can login now');
    }
    this.loadAvatarImgAndName();
  },
  mounted() {
    /*    this.$loadScript("/assets/js/bootstrap.min.js")
          .then(() => {
            console.log("loaded - bootstrap");
            this.$loadScript("/assets/js/main.js")
              .then(() => {
                console.log("loaded - main");
              })
              .catch(() => {
                console.log("error");
              });
          })
          .catch(() => {
            console.log("error");
          });*/

  },
  computed: {
    ...mapGetters(['getRedirectedFrom']),
    headerLabel() {
      return this.isSuffixCustomRequest ? 'Sign up or Login' : 'Welcome back';
    },
    isSuffixCustomRequest() {
      return isSuffixCustomRequest(this.getRedirectedFrom);
    },
    isFromCreateAccount() {
      let redirectedFrom = this.$route.query.redirectedFrom;
      return (redirectedFrom === ROUTE_CREATE_CUSTOMER_SNAPCHAT
        || redirectedFrom === ROUTE_CREATE_CUSTOMER_INSTAGRAM
        || redirectedFrom === ROUTE_CREATE_CUSTOMER_TIKTOK
        || redirectedFrom === ROUTE_CREATE_CUSTOMER_PLATFORM);
    }
  },
  methods: {
    ...mapActions(['clearAllStore']),
    ...mapActions(['setMessage']),
    rememberMe() {
      setRememberMe(this.isRememberMe);
    },
    showPassword,
    isRequired(attrib) {
      return this.isSubmit && !this.$v[attrib].required;
    },
    isValidEmail() {
      return this.isSubmit && !this.$v.username.email;
    },
    signUp() {
      if (this.isSuffixCustomRequest) {
        let urlPrefix = this.$route.params.urlPrefix;
        this.$router.replace({name: 'Platform', params: {urlPrefix}})
      } else {
        cleanUpAfterLogout();
        this.$router.replace({name: 'HomePage'})
      }
    },
    login() {

      this.isSubmit = true;
      this.rememberMe();
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      console.log(`${this.username} ${this.password}`);
      const body = getLoginBody(this.username, this.password);

      console.log(body);
      this.isLoading = true
      AXIOS_LOGIN.post(`${SERVICE_IDENTIY}/oauth/token`, body)
        .then(response => {

          storeToken(response);
          this.clearAllStore();
          // this.refreshToken(); //This is for testing remove latter
          console.log('Expiry: ', getTokenExp(ACCESS_TOKEN));

          if (isRole('INFLUENCER')) {
            this.$router.replace({name: 'CreatorDashboardMobile'});
          } else {
            let urlPrefix = this.$route.params.urlPrefix;
            if (this.isSuffixCustomRequest) {
              this.$router.replace({name: 'CustomerCustomRequestList1', params: {urlPrefix}});
            } else if(this.$route.query.redirectedFrom === ROUTE_CREATE_CUSTOMER_PLATFORM_EXCL_CUSTOM_REQUEST ) {
              this.$router.replace({name: 'CustomerBonusContentList'});
            } else if (this.isFromCreateAccount) {
              this.$router.replace({
                name: this.$route.query.redirectedFrom,
                params: {urlPrefix},
                query: {createPlatform: true}
              });
            } else if(this.getRedirectedFrom) {
              this.$router.replace({
                path: this.getRedirectedFrom
              });
            } else {
              this.$router.replace({name: 'CustomerRouter', params: {urlPrefix}});
            }
          }
        })
        .catch(e => {
          this.catchError3(e);
        })
    },
    catchError3(error) {
      this.isLoading = false;
      if (error.response) {
        if (error.response.status === 400) {
          // this.error = commMsg['Login.Invalid'];
          this.pushGlobalError(commMsg['Login.Invalid']);
        } else {
          // this.error = error.response.data;
          this.pushGlobalError(error.response.data);
        }
        if (this.username) {
          console.log('catchError3');
          this.pushGlobalError('Not a valid username')
        }
      } else if (error.request) {
        this.error = commMsg['Network.Error'];
      } else {
        // Something happened in setting up the request that triggered an Error
        this.error = error.message;
      }
    },
    imageLoadError(event) {
      this.isAvatarMissing = true;
    },
    loadAvatarImgAndName() {
      if (!this.isSuffixCustomRequest) {
        return;
      }
      let invitee = this.$route.params.urlPrefix;
      let url = `${SERVICE_CONTENT}/api/v1/influencers/urlSuffix/${invitee}/avatar`;
      this.getUnSecureData(url, (imageURL) => {
        this.imageURL = imageURL.replace('dp', 'dp_150X150');
        this.isAvatarMissing = false;
      });

      this.getUnSecureData(`${SERVICE_IDENTIY}/api/v1/influencers/urlSuffix/${invitee}`, (data) => {
        console.log(data);
        this.inviteeName = data.name;

      });
    },
    setBuildInfoLastOne() {
      AXIOS().get('buildInfo')
        .then(response => {
          if (response.data.buildInfo) {
            this.buildInfo = response.data.buildInfo;
          }
          this.setFocus();
        })
        .catch(e => {
          this.catchError3(e);
        })
    }
  }

}
;
</script>

<style scoped>

.profile-img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

</style>
