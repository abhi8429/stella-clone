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
          <span class="float-right">
            <button class="btn login-btn" style="" @click="loginPage()">Login</button>
          </span>
        </div>
      </nav>
      <loading-modal :is-loading="isLoading"></loading-modal>
    </header>
    <section id="slide" class="slide closefriend-hero background-white">
      <div class="content-bottom">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-5 col-sm-12 col-12">
              <div class="d-md-block d-none">
                <img src="@/assets/images/hero-image.webp" class="img-fluid d-block mx-auto">
              </div>
            </div>
            <div class="col-md-5 offset-md-1 col-sm-12 col-12">
              <div class="login-card">
                <div class="login-body">

                  <!--                  <div class="row">
                                      <div class="col-md-9 col-8">
                                        <h2 class="join-title">Join {{ inviteeName ? `${inviteeName}’s` : '' }} Close Friend</h2>
                                      </div>
                                      <div class="col-md-3 col-4 text-center">
                                        <img v-if="!isAvatarMissing"
                                             :src="`${BASE_URL}/content/api/v1/influencers/urlSuffix/${$route.params.urlPrefix}/avatar`"
                                             class="profile-image" @error="imageLoadError">
                                        <img v-else src="@/assets/images/default_user.png" class="profile-image">
                                        &lt;!&ndash;                           onclick="$('#file_upload').trigger('click')">&ndash;&gt;
                                        <input type="file" class="form-control d-none" id="file_upload" name="file" accept="image/png, image/gif, image/jpeg">
                                      </div>
                                    </div>-->

                  <div class="row" v-if="bio">
                    <div class="col-md-9 col-8">
                      <h2 class="join-title d-none d-md-block m-0">Join Close Friend</h2>
                      <p class="overflow-break font-grey font-size-12">{{ bio }}</p>
                    </div>
                    <div class="col-md-3 col-4 text-center ">
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

                  <!-- use this if bio not available for mobile -->
                  <div v-else class="row align-items-center">
                    <div class="col-md-9 col-12 order-last order-md-first text-center text-md-left">
                      <h2 class="join-title">Join Close Friend</h2>
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
                  <div class="form-group">
                    <label for="name" class="font-grey">Name
                      <span class="danger ml-2" v-if="isRequired('name')">This is required field</span>
                    </label>
                    <input type="text" class="form-control selected-field"
                           name="name" placeholder="Enter your name"
                           v-model.lazy="user.name">
                  </div>
                  <div class="form-group">
                    <label for="handle" class="font-grey">Instagram Handle
                      <span class="danger ml-2" v-if="isRequired('instagramHandle')">This is required field</span>
                    </label>
                    <input type="text" class="form-control " name="handle" placeholder="Enter your instagram handle"
                           v-model.trim="user.instagramHandle">
                  </div>
                  <div class="alert alert-custom-warning show fade mt-2 mb-0">
                    <div class="alert-body">
                                            <span class="alert-span">
                                                <b>Please make sure your instagram handle is correct</b>
                                            </span>
                    </div>
                  </div>
                  <br>
                  <div class="form-group">
                    <label for="handle" class="font-grey">Repeat Instagram Handle
                      <span class="danger ml-2" v-if="this.isSubmit && !this.$v.repeateInstagramHandle.required">This is required field</span>
                      <span class="danger ml-2" v-else-if="this.isSubmit && !this.$v.repeateInstagramHandle.sameAs">Instagram handle does not match</span>
                    </label>
                    <input type="text" class="form-control " name="handle"
                           placeholder="Enter your instagram handle again"
                           v-model.trim="repeateInstagramHandle">
                  </div>
                  <div class="form-group">
                    <label for="handle" class="font-grey">Country
                      <span class="danger ml-2" v-if="isRequired('countryCode')">This is required field</span>
                    </label>
                    <div class="input-group custom-arrow">
                      <select placeholder="Enter your country"
                              class="form-control"
                              name="country"
                              v-model="user.countryCode">
                        <option :value="null" selected disabled>Country</option>
                        <option v-for="country in countries" :value="country.code">
                          {{ country.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="handle" class="font-grey">Phone
                      <span class="danger ml-2" v-if="isRequired('phone')">This is required field</span>
                    </label>
                    <input type="number" class="form-control " name="handle" placeholder="Enter your phone number"
                           v-model.lazy="user.phone">
                  </div>
                  <div class="form-group">
                    <!--                      <label for="email" class="font-grey">Email <span class="danger ml-2">You haven’t filled this field</span> </label>-->
                    <label for="email" class="font-grey">Email
                      <span class="danger ml-2" v-if="isRequired('email')">This is required field</span>
                      <span class="danger ml-2" v-if="isValidEmail()">Not a valid email address</span>
                    </label>
                    <input id="email" type="text" placeholder="example@mail.com"
                           class="form-control" name="email" v-model.lazy="user.email">
                  </div>
                  <div class="form-group">
                    <div class="d-block">
                      <label for="password" class="font-grey">Password
                        <span class="danger ml-2" v-if="isRequired('password')">This is required field</span>
                      </label>
                    </div>
                    <div class="input-group">
                      <input autocomplete="false" placeholder="Enter your password"
                             type="password" class="form-control" id="password"
                             name="password" v-model.lazy="user.password">
                      <div class="input-group-prepend">
                                                <span class="input-group-text eye" id="basic-addon1">
                                                    <i id="show_id" class="fa fa-eye"
                                                       @click="showPassword('password')"></i>
                                                    <i id="hide_id" class="fa fa-eye-slash d-none"></i>
                                                </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="custom-control custom-checkbox">
<!--                      <input type="checkbox" name="remember" class="custom-control-input" tabindex="3" id="remember-me">
                      <label class="custom-control-label font-size-12" >By signing up you are agreeing-->
                      By signing up you are agreeing to our <a href="" class="success-underline" @click.prevent="goTo('TermsOfService')">Terms of
                          Service</a>
                    </div>
                    <button type="button"
                            class="btn btn-success btn-mobile btn-lg btn-block mt-3 btn-mobile font-size-15-18"
                            @click="createAccount()">Create an Account
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
import {httpMixin} from "@/mixin/http-mixin";
import {email, required, sameAs} from "vuelidate/lib/validators";
import {ACCESS_TOKEN} from '@/properties/close-friend';
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {showPassword} from '@/common/Utils'
import LoadingModal from "@/components/module/shared/LoadingModal";
import {AXIOS_LOGIN, getTokenExp, isRole, isTokenExpired} from "@/common/http-common";
import {getLoginBody, storeToken} from '@/common/login-service';
import {commMsg} from "@/properties/common-messages";
import {SERVICE_CONTENT, SERVICE_IDENTIY} from "@/properties/micro-service";
import {isUserActive} from "@/common/comm-service";

export default {
  name: 'CreateCustomerAccountMobile',
  components: {GlobalMessage, LoadingModal},
  mixins: [httpMixin],
  data() {
    return {
      user: {countryCode: 'US'},
      inviteeName: '',
      bio: null,
      isSubmit: false,
      imageURL: '',
      isAvatarMissing: false,
      copied: false,
      country: null,
      countries: [],
      repeateInstagramHandle: null
    }
  },
  validations: {
    user: {
      name: {required},
      instagramHandle: {required},
      email: {required, email},
      password: {required},
      countryCode: {required},
      phone: {required},
    },
    repeateInstagramHandle: {
      required, sameAs: sameAs(function () {
        return this.user.instagramHandle
      })
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
    loginPage() {
      this.$router.push({name: 'LoginMobile', params: {urlPrefix: this.$route.params.urlPrefix}})
    },
    goTo(to) {
      this.$router.push({name: to});
    },
    showPassword,
    home() {
      this.$router.replace({name: 'HomePage'});
    },
    isRequired(attrib) {
      return this.isSubmit && !this.$v.user[attrib].required;
    },
    isValidEmail() {
      return this.isSubmit && !this.$v.user.email.email;
    },
    createAccount() {

      this.isSubmit = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let invitee = this.$route.params.urlPrefix;
      this.postUnsecureData(`identity/api/v1/customers/${invitee}`, this.user, (data) => {
        this.setUser(data);
        this.login();
      });

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
      this.getUnSecureData('identity/api/v1/lookup/countries', (data) => {
        this.countries = data;
      });
    },
    imageLoadError(event) {
      this.isAvatarMissing = true;
    },
    loadAvatarImg() {
      //${BASE_URL}/content/api/v1/influencers/urlSuffix/${$route.params.urlPrefix}/avatar
      let url = `${SERVICE_CONTENT}/api/v1/influencers/urlSuffix/${this.$route.params.urlPrefix}/avatar`;
      this.getUnSecureData(url, (imageURL) => {
        this.imageURL = imageURL.replace('dp', 'dp_150X150');
        console.log('imageURL', imageURL);
        this.isAvatarMissing = false;
      });
    },
    login() {
      this.isLoading = true;
      let body = getLoginBody(this.user.email, this.user.password);
      console.log(this.user);

      AXIOS_LOGIN.post('identity/oauth/token', body)
        .then(response => {
          this.isLoading = false;
          storeToken(response);

          this.$router.push({name: 'CustomerSubscriptionMobile'});
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
    }
  }
}
;
</script>

