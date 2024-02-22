<template>
  <div>

    <header class="sticky">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <!--          <a class="navbar-brand" href="#" @click="home()">-->
          <router-link class="navbar-brand" :to="{name: 'HomePage'}" replace>
            <img src="@/assets/images/stella/logo-stella-white.png" class="img-fluid"
                 style="margin-right: 100px; display: inline; pointer-events: none;">
          </router-link>
          <!--          </a>-->
          <span class="float-right" v-if="!isCreatePlatform">
            <button class="btn login-btn" style="" @click="loginPage()">Login</button>
          </span>
        </div>
      </nav>
      <loading-modal :is-loading="isLoading"></loading-modal>
    </header>
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
                      <h2 class="join-title">Join My Custom Request</h2>
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

                  <br>
                  <div class="form-group" v-if="!isCreatePlatform">
                    <required-field v-if="isRequired('name')"/>
                    <input type="text"
                           placeholder="Enter your name"
                           class="form-control"
                           v-model="user.name">
                  </div>
                  <div class="form-group" v-if="!isCreatePlatform">
                    <required-field v-if="isRequired('email')"/>
                    <span class="danger ml-2" v-if="isValidEmail()">Not a valid email address</span>
                    <input type="text"
                           placeholder="Enter your email"
                           class="form-control"
                           v-model="user.email">
                  </div>
                  <div class="form-group">
                    <span class="danger ml-2"
                          v-if="this.isSubmit && !this.$v.pwd.required">This is required field</span>
                    <input type="password" class="form-control "
                           name="handle" :placeholder="`Enter your password`"
                           v-model.trim="pwd"
                    >
                  </div>
                  <div class="form-group">
                    <span class="danger ml-2" v-if="this.isSubmit && !this.$v.repeatPassword.required">This is required field</span>
                    <span class="danger ml-2" v-else-if="this.isSubmit && !this.$v.repeatPassword.sameAs">Password does not match</span>

                    <input type="password" class="form-control "
                           name="handle" :placeholder="`Re-enter your password`"
                           v-model.trim="repeatPassword"
                    >
                  </div>
                  <div class="form-group">
                    <div class="custom-control custom-checkbox">
                      By signing up you are agreeing to our
                      <a href="" class="success-underline" @click.prevent="goTo('TermsOfService')">Terms of
                        Service</a>
                    </div>
                    <button type="submit"
                            class="btn-mobile btn-lg btn-block mt-3 btn-mobile font-size-15-18"
                            :class="buttonColor"
                            @click="beforeCheckout()">Checkout
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

import {mapActions, mapGetters} from 'vuex'
import {email, required, sameAs} from "vuelidate/lib/validators";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import LoadingModal from "@/components/module/shared/LoadingModal";
import {SERVICE_IDENTIY, SERVICE_SUBSCRIPTION} from "@/properties/micro-service";
import {isInstagramPath, isSnapchatPath, isUserActive} from "@/common/comm-service";
import CreatorImage from "@/components/module/shared/CreatorImage";
import {getLoginBody, storeToken} from "@/common/login-service";
import {AXIOS_LOGIN, geDecodedToken, getTokenExp, isRole, isTokenExpired} from "@/common/http-common";
import {commMsg} from "@/properties/common-messages";
import {
  ACCESS_TOKEN,
  EXCLUSIVE_CUSTOM_REQUEST_INFLUENCERS,
  PLATFORM_INSTAGRAM,
  PLATFORM_SNAPCHAT,
  PLATFORM_STELLA
} from "@/properties/close-friend";
import {customerAccountMixin} from "@/mixin/customer-account/customer-account-mixin";
import RequiredField from "@/components/module/shared/RequiredField";
import {
  ROUTE_CREATE_CUSTOMER_INSTAGRAM,
  ROUTE_CREATE_CUSTOMER_PLATFORM, ROUTE_CREATE_CUSTOMER_PLATFORM_EXCL_CUSTOM_REQUEST,
  ROUTE_CREATE_CUSTOMER_SNAPCHAT,
  ROUTE_CREATE_CUSTOMER_TIKTOK
} from "@/router/module/subscriber/customer-routes";
import titleMixin from "../../../../mixin/title-mixin";

export default {
  name: 'CreateAccountExclInfluencer',
  title: 'Create account exclusive',
  components: {GlobalMessage, LoadingModal, CreatorImage, RequiredField},
  mixins: [customerAccountMixin, titleMixin],
  data() {
    return {
      inviteeName: '',
      isSubmit: false,
      repeatPassword: null,
      loggedInCreatePlatform: false,
      pwd: null,
      user: {
        name: null,
        email: null,
        handle: null,
      }
    }
  },
  validations() {
    return {
      user: {
        name: {required},
        email: {required, email},
        /*   password: {required}, this does not seem to work, using local variable pwd instead */
      },
      repeatPassword: {
        required, sameAs: sameAs(function () {
          return this.pwd;
        })
      },
      pwd: {
        required
      },
    }
  },
  created() {

    if (!this.isCreatePlatform) {
      /**
       If the customer has logged in and lands at this page, then take the customer to
       appropriate page. This can happen when the user is trying to subscribe to a new
       creator (influencer)
       */
      let tokenExp = getTokenExp(ACCESS_TOKEN);
      if (tokenExp && !isTokenExpired(ACCESS_TOKEN)) {
        if (!isRole('INFLUENCER')) {
          if (this.$route.params.urlPrefix) {
            if (!this.getUser) {
              let customerId = geDecodedToken(ACCESS_TOKEN).id;
              this.getData(`${SERVICE_IDENTIY}/api/v1/customers/${customerId}`, (customer) => {
                this.setUser(customer);
                this.createPlatformForLoggedInUser();
              });
            } else {
              this.createPlatformForLoggedInUser();
            }
          } else {
            this.$router.replace({name: 'CustomerRouter'});
          }
        }
      }
    }

    this.loadInviteeName();
    this.clearAllStore();
    this.loadAvatarImg();

  },
  computed: {
    isCreatePlatform() {
      return (this.$route.query.createPlatform || this.loggedInCreatePlatform);
    },
    isExclCustomRequestInfluencer() {
      return EXCLUSIVE_CUSTOM_REQUEST_INFLUENCERS.includes(this.$route.params.urlPrefix);
    },
  },
  methods: {
    ...mapActions(['clearAllStore', 'setUser', 'setInvitee', 'setPlatform', 'setCreatePlatform']),
    ...mapGetters(['getCustomRequestInfluencer']),
    loginPage() {
      let redirectedFrom;
      if (this.isInstagram) {
        redirectedFrom = ROUTE_CREATE_CUSTOMER_INSTAGRAM
      } else if (this.isSnapchat) {
        redirectedFrom = ROUTE_CREATE_CUSTOMER_SNAPCHAT;
      } else if (this.isTikTok) {
        redirectedFrom = ROUTE_CREATE_CUSTOMER_TIKTOK;
      } else if (this.isExclCustomRequestInfluencer && this.getCustomRequestInfluencer() != null) {
        redirectedFrom = ROUTE_CREATE_CUSTOMER_PLATFORM_EXCL_CUSTOM_REQUEST;
      } else {
        redirectedFrom = ROUTE_CREATE_CUSTOMER_PLATFORM;
      }
      this.$router.push({
        name: 'LoginMobile',
        params: {urlPrefix: this.$route.params.urlPrefix},
        query: {redirectedFrom}
      });
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
    beforeCheckout() {
      if (this.isCreatePlatform) {
        let customerId = geDecodedToken(ACCESS_TOKEN).id;
        this.getData(`${SERVICE_IDENTIY}/api/v1/customers/${customerId}`, (customer) => {
          this.setUser(customer);
          this.checkout();
        });
      } else {
        this.checkout();
      }
    },
    checkout() {

      this.isSubmit = true;
      if (this.isCreatePlatform) {
        this.user.handle = this.getUser.email;
      } else {
        this.user.handle = this.user.email;
        this.user.password = this.pwd;
      }
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      if (this.isCreatePlatform) {
        this.setCreatePlatform(true);
        if (!this.getUser) {
          let customerId = geDecodedToken(ACCESS_TOKEN).id;
          this.getData(`${SERVICE_IDENTIY}/api/v1/customers/${customerId}`, (customer) => {
            this.setUser(customer);
            this.createPlatform();
          });
        } else {
          this.createPlatform();
        }
      } else {
        let invitee = this.$route.params.urlPrefix;
        this.postUnsecureData(`identity/api/v1/customers/${this.getInfluencerPlatformId}/${invitee}`, this.user, (data) => {
          this.setUser(data);
          this.login();
        });

      }
    },
    createPlatform() {
      let customerId = geDecodedToken(ACCESS_TOKEN).id;
      let customer = this.getUser;
      let url = `${SERVICE_IDENTIY}/api/v1/customers/${customerId}/customer-platform/`;
      let location = {name: 'CustomerBonusContentList'};

      let custPlatform = customer.customerPlatforms
        .find(customerPlatform => customerPlatform.platform.name === this.getPlatform);

      if (custPlatform) {
        this.patchData(`${url}${custPlatform.id}`, {handle: this.user.handle}, (data) => {
          this.$router.replace(location);
        });
      } else {
        this.postData(url, {platformId: this.getPlatformId, handle: this.user.handle}, (customerPlatform) => {
          customer.customerPlatforms.push(customerPlatform);
          this.setUser(customer);
          this.$router.replace(location);
        });
      }
    },
    createPlatformForLoggedInUser() {
      let customer = this.getUser;
      let custPlatform = customer.customerPlatforms
        .find(customerPlatform => customerPlatform.platform.name === this.getPlatform);
      //platform exists, go ahead to 'CustomerBonusContentList', where we decide what to do
      if (custPlatform) {
        this.$router.replace({name: 'CustomerBonusContentList'});
      } else {
        this.loggedInCreatePlatform = true;
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
        this.setUpPlatform(data.id);

      });
    },
    setUpPlatform(id) {

      let platform;
      if (isSnapchatPath(this.$route.path)) {
        platform = PLATFORM_SNAPCHAT;
      } else if (isInstagramPath(this.$route.path)) {
        platform = PLATFORM_INSTAGRAM
      }
      /**
       * This can happen when this page is accessed directly by the user, instead from coming
       * from platform page
       * */
      if (!this.getPlatform || !this.getInfluencerPlatformId) {
        this.getUnSecureData(`${SERVICE_SUBSCRIPTION}/api/v1/influencers/${id}/platform`, (influencerPlatforms) => {
          let infPlatform = influencerPlatforms.find(influencerPlatform => influencerPlatform.platform.name === platform);
          this.setPlatform(infPlatform);
        });
      }
    },

    login() {
      this.isLoading = true;
      let body = getLoginBody(this.user.email, this.user.password);
      console.log(this.user);

      AXIOS_LOGIN.post('identity/oauth/token', body)
        .then(response => {
          this.isLoading = false;
          storeToken(response);

          //Create dummy subscription so that the customer can see content and custom request
          //this is done only for exclusive influencer
          let putData = {
            influencerId: this.getInvitee.id,
            type: 'MONTHLY',
            price: this.getInvitee.monthlyPrice,
            influencerPlatformId: this.getInfluencerPlatformId
          }
          let URL = `${SERVICE_SUBSCRIPTION}/api/v1/customers/${this.getUser.id}/subscriptions/`
          this.postUnsecureData(URL, putData, (data) => {
            this.$router.push({name: 'CustomerBonusContentList'});
          });
        })
        .catch(error => {
          this.isLoading = false;
          if (error.response) {
            if (error.response.status === 400) {
              // this.error = commMsg['Login.Invalid'];
              this.pushGlobalError(commMsg['Login.Invalid']);
            } else {
              // this.error = error.response.data;
              this.pushGlobalError(error.response.data);
            }
          } else if (error.request) {
            this.pushGlobalError(commMsg['Login.Invalid']);
          } else {
            // Something happened in setting up the request that triggered an Error
            this.pushGlobalError(error.message);
          }
        })
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

