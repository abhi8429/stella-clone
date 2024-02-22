<template>
  <div>
    <loading-modal :is-loading="isLoading"/>
    <!--    <div class="col-12 d-flex flex-row justify-content-center">-->
    <!--      <img src="@/assets/images/stella/logo-stella-white.png" class="img-fluid mt-5">-->
    <!--    </div>-->
    <logo></logo>
    <!--    <HeaderHelp></HeaderHelp>-->
    <section class="closefriend-hero background-white">
      <div class="container mt-1">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
            <div class="custom-card">
              <div class="text-center mb-md-5">
                <h2 :class="isDigis?'font-size-16 text-dark font-weight-500':'font-size-16 text-white font-weight-500'">
                  Set your subscription price</h2>
                <p :class="isDigis?'font-size-14 text-dark font-weight-500':'font-size-14 text-white font-weight-300'">
                  This is what your subscribers will pay to access your
                  bonus content.</p>

              </div>
              <global-message/>
              <div class="custom-body">

                <div class="form-group  margin-padding-class"
                     :class="isDigis?'border-color-class-digis':'border-color-class'">
                  <label for="number"
                         :class="isDigis?'text-dark font-size-14 font-weight-700 mt-2':'text-white font-size-14 font-weight-500 mt-2'">Monthly
                    Price
                    <span class="danger ml-2" v-if="isRequired('monthlyPrice')">This is required field</span>
                  </label>
                  <input type="number"
                         :class="isDigis?'form-control-common-digis font-size-24 dark-placeholder font-weight-500':'form-control-common font-size-24 white-placeholder'"
                         name="monthlyPrice" value="50" v-model="user.monthlyPrice"
                         @focusout="fillAnnualPrice()" placeholder="$0.00">
                </div>
                <div class="form-group  margin-padding-class"
                     :class="isDigis?'border-color-class-digis':'border-color-class'">
                  <div class="d-block d-flex flex-column justify-content-between">
                    <label for="number1"
                           :class="isDigis?'text-dark font-size-14 font-weight-700 mt-2':'text-white font-size-14 font-weight-500 mt-2'">Annual
                      price
                      <!--                      <span class="danger ml-2" v-if="isRequired('annuallyPrice')">This is required field</span>-->
                    </label>
                    <div class="d-flex flex-row justify-content-between pt-2 d-none">
                      <p
                        :class="isDigis?'font-size-14 font-weight-500 text-dark':'font-size-14 font-weight-400 text-white'">
                        Discount annual subscription price</p>
                      <label class="switch mt-1 mr-2">
                        <input type="checkbox">
                        <span class="round" :class="isDigis?'slider-black':'slider'"></span>
                      </label>
                    </div>
                    <input type="number"
                           :class="isDigis?'form-control-common-digis font-size-24 dark-placeholder font-weight-500':'form-control-common font-size-24 white-placeholder'"
                           name="annuallyPrice"
                           v-model="user.annuallyPrice" placeholder="$0.00" readonly>
                    <div class="d-flex flex-row justify-content-between d-none">
                      <p class="time-background text-dark font-size-12 font-weight-500">10%</p>
                      <p
                        :class="isDigis?'text-dark font-size-12 font-weight-500 pt-1':'text-white font-size-12 font-weight-500 pt-1'">
                        15%</p>
                      <p
                        :class="isDigis?'text-dark font-size-12 font-weight-500 pt-1':'text-white font-size-12 font-weight-500 pt-1'">
                        20%</p>
                      <p
                        :class="isDigis?'text-dark font-size-12 font-weight-500 pt-1 mr-4':'text-white font-size-12 font-weight-500 pt-1 mr-4'">
                        Custom</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3 position-bottom ">-->
          <!--            <div class="row justify-content-center mx-md-0 mx-1">-->
          <!--              <div class="col-md-12 col-12 px-1 ">-->
          <!--                <button type="button"-->
          <!--                        class="btn btn-success btn-mobile btn-lg btn-block mt-3 btn-mobile font-size-15-18"-->
          <!--                        @click="next()">Next-->
          <!--                </button>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->

        </div>

        <div class="col-lg-8  button-media-query d-flex flex-row justify-content-between pt-2">

          <cancel-button @cancel="$router.back()"></cancel-button>

          <save-button @saved="next()"></save-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import HeaderHelp from "@/components/module/influencer/shared/HeaderHelp";
import {numeric, required} from "vuelidate/lib/validators";
import titleMixin from "../../../../mixin/title-mixin";
import {getLoginBody, storeToken} from "@/common/login-service";
import {AXIOS_LOGIN} from "@/common/http-common";
import {commMsg} from "@/properties/common-messages";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {httpMixin} from "@/mixin/http-mixin";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import LoadingModal from "@/components/module/shared/LoadingModal";
import Logo from "@/components/module/shared/Logo";
import CancelButton from "@/components/module/shared/CancelButton";
import SaveButton from "@/components/module/shared/SaveButton";

export default {
  name: 'SetPriceMobile',
  title: 'Subscription price',
  mixins: [httpMixin, titleMixin],
  components: {SaveButton, CancelButton, Logo, LoadingModal, GlobalMessage, HeaderHelp},
  data() {
    return {
      user: {},
      isSubmitted: false
    }
  },
  validations: {
    user: {
      monthlyPrice: {required, numeric},
      /*   annuallyPrice: {required, numeric},*/
    }
  },
  created() {
    this.user = this.getUser();
  },
  methods: {
    ...mapActions(['setUser', 'setImageWall1', 'setImageFile', 'setMessage']),
    ...mapGetters(['getUser', 'getImageFile', 'getImageWall1']),
    next() {

      this.isSubmitted = true;
      this.$v.$touch();
      console.log(this.$v);
      if (this.$v.$invalid) {
        return;
      }
      this.setUser(this.user);
      if (this.user.id) {
        this.patchData(`identity/api/v1/influencers/${this.user.id}`, this.user, (user) => {
          this.setUser(user);
          this.uploadImages(this.user.id);
          this.goTo();
        });
      } else {
        this.postUnsecureData('identity/api/v1/influencers/', this.user, (user) => {
          this.setUser(user);
          this.login(user.id);
        });
      }
    },
    isRequired(attrib) {
      return this.isSubmitted && !this.$v.user[attrib].required;
    },
    fillAnnualPrice() {
      if (!isNaN(this.user.monthlyPrice)) {
        this.$set(this.user, 'annuallyPrice', this.user.monthlyPrice * 10);
      } else {
        this.$set(this.user, 'annuallyPrice', '');
        ;
      }
    },
    login(id) {
      this.isLoading = true;
      let body = getLoginBody(this.user.email, this.user.password);
      AXIOS_LOGIN.post('identity/oauth/token', body)
        .then(response => {
          this.isLoading = false;
          storeToken(response);
          this.uploadImages(id);
          this.goTo();
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
    goTo() {
      // this.setMessage('SAVED.SUCCESSFULLY');
      this.$router.push({name: 'NewCustomRequest', params: {isSaved: true}});
    },
    uploadImages(id) {
      let url;
      if (this.getImageWall1()) {
        url = `${SERVICE_CONTENT}/api/v1/influencers/${id}/wall?wallName=wall1`;
        this.uploadImage(url, this.getImageWall1(), () => {
          this.setImageWall1(null);
        });
      }
      if (this.getImageFile()) {
        url = `${SERVICE_CONTENT}/api/v1/influencers/${id}/avatar`;
        this.uploadImage(url, this.getImageFile());
        this.setImageFile(null);
      }
    },
    uploadImage(url, file, fn) {
      //Add the form data we need to submit
      let formData = new FormData();
      formData.append('file', file);
      this.uploadData(url, formData, (data) => {
        fn();
      });
    },
  }
}
;
</script>
<style scoped>

@media only screen and (max-width: 768px) {

  .button-media-query {
    position: fixed;
    bottom: 0.8rem;
    left: 0%;
    right: 0%;
    border-top: 2px solid #1f1f1f;
  }

  .margin-padding-class {
    /*margin-left: 4rem;*/
    /*margin-right: 4rem;*/
    padding-left: 1rem;
  }

  .button-fixed {
    margin-right: 1px;
  }

}


@media only screen and (min-width: 769px) and (max-width: 1023px) {
  .button-media-query {
    position: fixed;
    bottom: 0.8rem;
    left: 0%;
    right: 0%;
    border-top: 2px solid #1f1f1f;
  }

  .margin-padding-class {
    margin-left: 4rem;
    margin-right: 4rem;
    padding-left: 1rem;
  }
}

@media only screen  and (min-width: 1024px) {
  .button-media-query {
    position: fixed;
    bottom: 0.8rem;
    left: 17%;
    right: 17%;
    border-top: 2px solid #1f1f1f;
  }

  .margin-padding-class {
    margin-left: 4rem;
    margin-right: 4rem;
    padding-left: 1rem;
  }

}
</style>
