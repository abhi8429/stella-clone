<template>
  <section class="container-fluid">

    <div class="row  pb-md-0  h-100">

      <!--        <header-help />-->

      <div class="col-lg-5 col-12  mx-auto">
        <div class="login-card">
          <div class="login-body">
            <form method="#" action="#" class="my-1">


              <global-message></global-message>
              <div class="form-group">
                <label for="name" class="font-size-12 text-dark font-weight-500">Your Name
                </label>
                <div class="stella-group-digis">
                  <input type="text" class="form-control-digis stella-group-digis" name="name"
                         v-model.lazy="user.name" placeholder="What do we call you?">
                </div>
                <div class="danger invalid-feedback" v-if="isRequired('name')">This is required field</div>
              </div>
              <div class="form-group">
                <div class="form-group">
                  <label for="url" class="font-size-12 text-dark font-weight-500">Your Handle
                  </label>
                  <div class="stella-group-digis">
                    <input type="text" class="form-control-digis  stella-group-digis" name="url" v-model="user.urlSuffix"
                           placeholder="This is your @">
                  </div>
<!--                  <span class="font-size-14 font-weight-400 text-dark font-weight-500">Your handle is also your Stella URL</span><br>-->
<!--                  <input type="text" class="pink-color mt-1 w-100" style="background: #000;border: 1px solid #000;"-->
<!--                         name="url-show" readonly-->
<!--                         :value="`${constructCustomerBaseURL}/${user.urlSuffix ? user.urlSuffix : ''}`">-->
<!--                  <div class="danger invalid-feedback" v-if="isRequired('urlSuffix')">This is required field</div>-->
                </div>
                <!--                    <div class="input-group flex-nowrap stella-group">
                                      &lt;!&ndash; <input type="text"
                                             class="form-control url-input" name="url" v-model="user.urlSuffix">
                                      <input type="text" class="form-control url-input-show" name="url-show" readonly
                                             :value="`${constructCustomerBaseURL}/${user.urlSuffix? user.urlSuffix: ''}`"> &ndash;&gt;
                                      <span class="input-group-text pe-0" >
                                        stella.so/
                                      </span>
                                      <input type="text" class="form-control px-0 font-gradient-a font-weight-bold" v-model="user.urlSuffix" placeholder="">
                                      <span class="input-group-text ps-0 pe-3">
                                        <img class="img-fluid"  src="@/assets/images/stella/green-check.png" style="width:45px">
                                        &lt;!&ndash; <img class="img-fluid"  src="@/assets/images/stella/invalid-check.png" style="width:45px"> &ndash;&gt;
                                      </span>
                                    </div>-->

<!--                <div class="input-group flex-nowrap stella-group custom-form-control ">-->
<!--                </div>-->
              </div>

              <div class="form-group">
                <label for="email" class="font-size-12 text-dark font-weight-500">Email
                </label>
                <div class="stella-group-digis">
                  <input id="email" type="text" class="form-control-digis stella-group-digis" name="email"
                         v-model.lazy="user.email" placeholder="Enter your email">
                </div>
                <div class="danger invalid-feedback" v-if="isRequired('email')">This is required field</div>
                <div class="danger invalid-feedback" v-if="isValidEmail()">Not a valid email address</div>
              </div>
              <div class="form-group">
                <div class="d-block">
                  <label for="password" class="font-size-12 text-dark font-weight-500">Password
                  </label>
                </div>
                <div class="input-group flex-nowrap stella-group-digis2">
                  <input autocomplete="false" placeholder="Enter your password" type="password" id="password"
                         class="form-control-digis2 stella-group-digis2" name="password"
                         v-model.lazy="user.password">
                  <!-- onclick="show_password()"                        -->
                  <div class="input-group-text-digis">
                    <i id="show_id" class="fa fa-eye text-dark" @click="showPassword('password')"></i>
                    <i id="hide_id" class="fa fa-eye-slash d-none"></i>
                  </div>
                </div>
                <div class="danger invalid-feedback" v-if="isRequired('password')">This is required field</div>
              </div>

              <div class="form-group">
                <div class="d-block">
                  <label for="password" class="font-size-12 text-dark font-weight-500">Confirm Password
                  </label>
                </div>
                <div class="input-group flex-nowrap stella-group-digis2 text-white">
                  <input autocomplete="false" placeholder="Confirm your password" type="password" id="password"
                         class="form-control-digis2 text-dark stella-group-digis2" name="password"
                         v-model.lazy="user.password">
                  <!-- onclick="show_password()"                        -->
                  <div class="input-group-text-digis">
                    <i id="show_id" class="fa fa-eye text-dark" @click="showPassword('password')"></i>
                    <i id="hide_id" class="fa fa-eye-slash d-none"></i>
                  </div>
                </div>
                <div class="danger invalid-feedback" v-if="isRequired('password')">This is required field</div>
              </div>
            </form>
          </div>
        </div>
        <div class="row justify-content-center mx-md-0 mx-1 mb-5">
          <div class="col-md-12 col-12 px-1 ">
            <div class="custom-control-digis custom-checkbox-digis">
              <input type="checkbox" name="agree-to-terms" class="custom-control-input-digis" tabindex="3"
                     id="agree-to-terms">
              <label for="agree-to-terms" class="custom-control-label-digis font-size-12 placeholder-color text-dark font-weight-500">By signing up you
                are agreeing to
                our <a href="" class="font-weight-500 digis-common-text-color" @click.prevent="goTo('TermsOfService')">Terms of
                  Service</a> and <a href="" class="font-weight-500 digis-common-text-color"
                                     @click.prevent="goTo('PrivacyPolicy')">Privacy Policy</a></label>
            </div>


            <!--              <button type="submit" class="btn stella-btn gradient-a w-100 rounded-pill font-weight-700 mt-4"-->
            <!--                @click="createAccount()">Create an Account-->
            <!--              </button>-->

          </div>
        </div>

      </div>
    </div>

    <div class="col-lg-8  button-media-query d-flex flex-row justify-content-between pt-2">

      <button type="button" class="btn btn-outline-secondary text-dark font-weight-500" >Cancel
      </button>
                <button  type="button" class="digis-btn-class text-white" disabled>Next Step</button>
<!--      <button type="button" class="text-dark dark-disable-button" @click="createAccount()">Next Step</button>-->

    </div>
  </section>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import {email, required} from "vuelidate/lib/validators";
import {httpMixin} from "@/mixin/http-mixin";
import HeaderHelp from "./shared/HeaderHelp";
import {showPassword} from '@/common/Utils'
import {constructCustomerBaseURL} from "@/common/baseURL-service";
import {SERVICE_IDENTIY} from "@/properties/micro-service";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import titleMixin from "../../../mixin/title-mixin";

export default {
  name: 'CreateAccountMobile',
  title: 'Creator create account',
  components: {HeaderHelp, GlobalMessage},
  mixins: [httpMixin, titleMixin],
  data() {
    return {
      user: {},
      file: '',
      someValue: ''
    }
  },
  validations: {
    user: {
      name: {required},
      urlSuffix: {required},
      email: {required, email},
      password: {required}
    }
  },
  created() {
    console.log(this.$refs.file);
    this.clearGlobalMessages();
    console.log(this.getAgentName());
    if (this.getAgentName()) {
      this.getUnSecureData(`${SERVICE_IDENTIY}/api/v1/agency/name/${this.getAgentName()}`, (data) => {
        console.log(data);
        this.user.agency = data;
      });
    }

  },
  computed: {
    constructCustomerBaseURL
  },
  methods: {
    ...mapActions(['setUser', 'setImageFile', 'clearGlobalMessages']),
    ...mapGetters(['getAgentName']),
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

      let url = `${SERVICE_IDENTIY}/api/v1/influencers/preCheck`;
      this.postUnsecureData(url, this.user, (data) => {
        this.setUser(this.user);
        this.$router.push({name: 'Platforms'});
      });


    }
  }
}
;
</script>

<style scoped>



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

input::placeholder {
  color: #000;
}

</style>
