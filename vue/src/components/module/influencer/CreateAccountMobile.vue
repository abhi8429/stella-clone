<template>
  <section class="container-fluid">

    <div class="row  pb-md-0  h-100">

      <!--        <header-help />-->

      <div class="col-lg-5 col-12  mx-auto">
        <logo></logo>
        <div
          :class="isDigis?'text-dark text-center font-size-18 font-weight-600  mt-1 px-3 px-md-4':'text-white text-center font-size-18 font-weight-600  mt-1 px-3 px-md-4'">
          Create your account
        </div>
        <div
          :class="isDigis?'text-dark text-center font-size-14 text-white  px-3 px-md-4 mb-4':'text-white text-center font-size-14 text-white  px-3 px-md-4 mb-4'">
          <span :class="isDigis?'text-dark font-weight-400':'text-white font-weight-400'">We recommend choosing a handle that’s the same as the one you use on other social platforms.</span>
        </div>
        <div class="login-card">
          <div class="login-body">
            <form method="#" action="#" class="my-1">
              <global-message></global-message>
              <div class="form-group">
                <div class="d-block">
                  <input-label text="Your Name"></input-label>
                </div>
                <required-field v-if="isRequired('name')"/>
                <div :class="isDigis?'stella-group-digis':'stella-group'">
                  <input type="text"
                         :class="isDigis?'form-control-digis stella-group-digis dark-placeholder':'form-control stella-group white-placeholder'"
                         :style="isDigis?'':'color: #fff !important;'" name="name" v-model.lazy="user.name"
                         placeholder="What do we call you?">
                </div>
              </div>
              <div class="form-group">
                <div class="form-group">
                  <div class="d-block">
                    <input-label text="Your Handle"></input-label>
                  </div>
                  <required-field v-if="isRequired('urlSuffix')"/>
                  <div :class="isDigis?'stella-group-digis':'stella-group'">
                    <input type="text"
                           :class="isDigis?'form-control-digis stella-group-digis dark-placeholder':'form-control  stella-group white-placeholder'"
                           name="url" v-model="user.urlSuffix"
                           placeholder="This is your @">
                  </div>
                  <template v-if="!isDigis">
                  <span
                    :class="isDigis?'font-size-14 font-weight-500 text-dark':'font-size-14 font-weight-500 text-white'">Your handle is also your Stella URL</span><br>
                    <input type="text" class="pink-color mt-1 w-100"
                           :style="isDigis?'background:#fff;border:1px solid #fff;color:#b2a0e2':'background: #000;border: 1px solid #000;color:#ff59d4'"
                           name="url-show" readonly
                           :value="`${constructCustomerBaseURL}/${user.urlSuffix ? user.urlSuffix :''}`">
                  </template>
                </div>
              </div>

              <div class="form-group">
                <div class="d-block">
                  <input-label text="Email"></input-label>
                </div>
                <required-field v-if="isRequired('email')"/>
                <invalid-email-field v-if="isValidEmail()"/>
                <div :class="isDigis?'stella-group-digis':'stella-group'">
                  <input id="email" type="text"
                         :class="isDigis?'form-control-digis stella-group-digis dark-placeholder':'form-control stella-group white-placeholder'"
                         name="email"
                         v-model="user.email" placeholder="Enter your email">
                </div>
              </div>
              <div class="form-group">
                <div class="d-block">
                  <input-label text="Password"></input-label>
                </div>
                <required-field v-if="isLoading && !$v.pwd.required"/>
                <div
                  :class="isDigis?'input-group flex-nowrap stella-group-digis2':'input-group flex-nowrap stella-group'">
                  <input autocomplete="false" placeholder="Enter your password" type="password" id="password"
                         name="password"
                         :class="isDigis?'form-control-digis2 stella-group-digis2 dark-placeholder':'form-control stella-group white-placeholder'"
                         v-model="pwd">
                  <!-- onclick="show_password()"                        -->
                  <div :class="isDigis?'input-group-text-digis':'input-group-text'">
                    <i id="show_id" :class="isDigis? 'fa fa-eye text-dark':'fa fa-eye text-white'"
                       @click="showPassword('password')"></i>
                    <i id="hide_id" class="fa fa-eye-slash d-none"></i>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="d-block">
                  <input-label text="Confirm Password"></input-label>
                </div>
                <required-field v-if="isLoading && !$v.repeatPassword.required"/>
                <span v-else-if="isLoading && !$v.repeatPassword.sameAs"
                      class="danger">Passwords must match</span>
                <div
                  :class="isDigis?'input-group flex-nowrap stella-group-digis2':'input-group flex-nowrap stella-group'">
                  <input autocomplete="false" placeholder="Confirm your password" type="password" id="repeat_password"
                         :class="isDigis?'form-control-digis2 stella-group-digis2 dark-placeholder':'form-control stella-group white-placeholder'"
                         name="password"
                         v-model="repeatPassword">
                  <!-- onclick="show_password()"                        -->
                  <div :class="isDigis?'input-group-text-digis':'input-group-text'">
                    <i id="show_id" :class="isDigis? 'fa fa-eye text-dark':'fa fa-eye text-white'"
                       @click="showPassword('repeat_password')"></i>
                    <i id="hide_id" class="fa fa-eye-slash d-none"></i>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="row justify-content-center mx-md-0 mx-1 mb-5">
          <div class="col-md-12 col-12 px-1 ">
            <span class="danger" v-if="this.isLoading &&
            $v.isAgreedToTerms &&
            !this.$v.isAgreedToTerms.required">Accept terms and condition before continuing</span>
            <div :class="isDigis?' custom-control-digis custom-checkbox-digis':'custom-control custom-checkbox'">
              <input type="checkbox" name="agree-to-terms"
                     v-model="isAgreedToTerms"
                     true-value="true"
                     false-value=""
                     :class="isDigis?'custom-control-input-digis':'custom-control-input'" tabindex="3"
                     id="agree-to-terms">
              <label for="agree-to-terms"
                     :class="isDigis?'custom-control-label-digis text-dark':'custom-control-label font-size-12 placbeholder-color text-white'">By
                signing up you
                are agreeing to
                our <a href="" :class="isDigis?'font-weight-500 digis-common-text-color':'font-weight-500 pink-color'"
                       @click.prevent="goTo('TermsOfService')">Terms of
                  Service</a> and <a href=""
                                     :class="isDigis?'font-weight-500 digis-common-text-color':'font-weight-500 pink-color'"
                                     @click.prevent="goTo('PrivacyPolicy')">Privacy Policy</a></label>
            </div>


            <!--              <button type="submit" class="btn stella-btn gradient-a w-100 rounded-pill font-weight-700 mt-4"-->
            <!--                @click="createAccount()">Create an Account-->
            <!--              </button>-->

          </div>
        </div>

      </div>
    </div>

    <div class="col-lg-8  button-media-query d-flex flex-row justify-content-between pt-2 alignment-fix">

      <cancel-button @cancel="$router.push({name: 'HomePage'})"/>
      <!--          <button  type="button" class="gradient-new-class text-dark" disabled>Next Step</button>-->
      <save-button @saved="createAccount()"></save-button>

    </div>
  </section>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import {email, required, requiredIf, sameAs} from "vuelidate/lib/validators";
import {httpMixin} from "@/mixin/http-mixin";
import HeaderHelp from "./shared/HeaderHelp";
import {showPassword} from '@/common/Utils'
import {constructCustomerBaseURL} from "@/common/baseURL-service";
import {SERVICE_IDENTIY} from "@/properties/micro-service";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import titleMixin from "../../../mixin/title-mixin";
import Logo from "@/components/module/shared/Logo";
import InputLabel from "@/components/module/shared/InputLabel";
import CancelButton from "@/components/module/shared/CancelButton";
import SaveButton from "@/components/module/shared/SaveButton";
import {AGENCY_DIGIS} from "@/properties/agency";
import RequiredField from "@/components/module/shared/RequiredField";
import InvalidIntegerField from "@/components/module/shared/InvalidIntegerField";
import InvalidEmailField from "@/components/module/shared/InvalidEmailField";
import {clone} from '@/common/Utils';

export default {
  name: 'CreateAccountMobile',
  title: 'Creator create account',
  components: {
    InvalidEmailField,
    InvalidIntegerField, RequiredField, SaveButton, CancelButton, InputLabel, Logo, HeaderHelp, GlobalMessage
  },
  mixins: [httpMixin, titleMixin],
  data() {
    return {
      pwd: '',
      repeatPassword: '',
      user: {
        influencerPlatforms: [],
        influencerLinks: []
      },
      file: '',
      someValue: '',
      isAgreedToTerms: null,
      prevRoute: null
    }
  },
  validations() {
    let user = {
      name: {required},
      urlSuffix: {required},
      email: {required, email},
    };
    let repeatPassword = {
      required: requiredIf(() => {
        return !!this.repeatPassword
      }),
      sameAs: sameAs(() => {
        return this.pwd;
      })
    };
    let pwd = {required};
    let isAgreedToTerms = null;
    if (!this.isAgreedToTerms) {
      isAgreedToTerms = {required}
      return {user, repeatPassword, pwd, isAgreedToTerms};
    } else {
      return {user, repeatPassword, pwd};
    }
  },
  mounted() {
    this.clearGlobalMessages();
    if (this.getUser() && this.isFromCreatorProfile) {
      this.user = clone(this.getUser());
    }
    if (this.$route.fullPath.includes(AGENCY_DIGIS)) {
      this.setAgentName(AGENCY_DIGIS);
    } else {
      this.setAgentName(null);
    }
    if (this.getAgentName()) {
      this.getUnSecureData(`${SERVICE_IDENTIY}/api/v1/agency/name/${this.getAgentName()}`, (agency) => {
        if (agency) {
          this.user.agency = agency;
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  computed: {
    constructCustomerBaseURL,
    isFromCreatorProfile() {
      return this.prevRoute && this.prevRoute.name === 'CreatorSetUpProfile';
    },
  },
  methods: {
    ...mapActions(['setUser', 'setImageFile', 'clearGlobalMessages', 'setAgentName']),
    ...mapGetters(['getAgentName', 'getUser']),
    goTo(to) {
      this.$router.push({name: to});
    },
    showPassword,
    isRequired(attrib) {
      return this.isLoading && !this.$v.user[attrib].required;
    },
    isValidEmail() {
      return this.isLoading && !this.$v.user.email.email;
    },
    handleFileUpload() {
      console.log(this.$refs.file.files[0]);
      $("#avatar").attr("src", URL.createObjectURL(this.$refs.file.files[0]));
      this.setImageFile(this.$refs.file.files[0]);
    },
    createAccount() {
      this.isLoading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.user.password = this.pwd;
      this.$set(this.user, 'email', this.user.email);
      /*  if (this.user.id) {
          this.setUser(this.user);
          this.$router.push({name: 'CreatorSetUpProfile'});
        } else {*/
      let url = `${SERVICE_IDENTIY}/api/v1/influencers/preCheck`;
      this.postUnsecureData(url, this.user, (data) => {
        this.setUser(this.user);
        this.$router.push({name: 'CreatorSetUpProfile'});
      });
      /*  }*/
    }
  }
}
;
</script>

<style scoped>


.content-creator-container {
  background: #fdf2c9;
  border-radius: 15px;
  width: 100%;

}

.content-creator-p {

  padding-top: 14px;
  padding-bottom: 2px;
  padding-left: 8px;
  font-size: popins;
  padding-right: 8px;

}

.content-creator-p p {

  font-weight: 500;
  font-family: 16px;
  color: #1e1c18;
}

/*for small mobile device under with 375px*/

@media only screen and (max-width: 378px) {

  .small-device-img-class {
    margin-top: 1rem;
  }

}

@media only screen and (min-width: 380px) {

  .small-device-img-class {
    margin-top: 5rem;
  }

}


@media only screen and (max-width: 767px) {
  .alignment-fix {
    padding: 0px;
  }

  .button-media-query {
    /*position:fixed;*/
    bottom: 0.8rem;
    /*left: 17%;*/
    /*right: 17%;*/
    border-top: 2px solid #1f1f1f;
  }
}

@media only screen and (min-width: 768px)and (max-width: 1023px) {

  .button-media-query {
    position: fixed;
    bottom: 0.8rem;
    /*left: 17%;*/
    /*right: 17%;*/
    border-top: 2px solid #1f1f1f;
  }
}

@media only screen  and (min-width: 1024px) {
  .button-media-query {
    /*position:fixed;*/
    bottom: 0.8rem;
    left: 17%;
    right: 17%;
    border-top: 2px solid #1f1f1f;
  }
}

/*input::placeholder {*/
/*  color: #fff;*/
/*}*/


</style>
