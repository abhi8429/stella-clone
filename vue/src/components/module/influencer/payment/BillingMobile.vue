<template>
<section class="container-fluid">
  <div class="row p-md-4 pb-md-0">
    <div class="border-around border-md-1 border-0 p-2">
      <div>

        <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>


        <influencer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></influencer-menu>
        <header-menu @slideMenu="slideBar()" :is-loading="isLoading"> </header-menu>

            <div class="row">

              <div class="col-md-4 col-12 mx-auto">
                <div class="row">

                  <div class="col-12 vertical-center mb-2" v-if="isNeedToAddExists">
                    <!-- Here            -->

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
                  </div>
                  <div class="col-12 vertical-center mb-2">

                    <div class="input-group flex-nowrap stella-group">
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

                  </div>

                  <div class="col-12">

                    <div class="custom-card">
                      <div class="custom-body">
                        <template v-if="isAgency(AGENCY_SOMNIUM)">
                        <br>
                        <b>Please contact info@ramiroproductions.com for payment information</b>
                        </template>
                        <div v-else >
                          <h5 class="text-center font-family-poppins my-3">Billing</h5>
                          <global-message></global-message>
                          <div class="d-md-block d-flex" data-toggle="buttons">
                            <!-- <label
                              class="btn btn-outline btn-light-grey btn-lg mx-md-2 btn-block mt-3 border-radius-15 payment-button w-98"
                              @click="isPayPal = true; isBank = false" :class="isPayPal? 'active': ''">
                              <img src="@/assets/images/paypal.svg" class="img-fluid">
                              <input type="radio" name="options" id="option3" class="d-none" >
                            </label> -->
                            <label
                              class="btn btn-outline btn-light-grey btn-lg mt-3 ml-2 px-3 border-radius-15 payment-button d-md-flex d-block w-98"
                              @click="isBank = true; isPayPal = false" :class="isBank? 'active': ''">
                              <svg class="mr-2 mt-md-0 mt-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                   viewBox="0 0 24 24" fill="none">
                                <path d="M12 1V23" stroke="#313731" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <path
                                  d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
                                  stroke="#313731" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              <p class="m-0 mt-md-0 mt-1">Bank Account</p>
                              <input type="radio" name="options" id="option3" class="d-none">
                            </label>
                          </div>
                          <template v-if="isPayPal">
                            <div class="form-group mt-4 mx-md-2 mx-0" data-paypal>
                              <span class="danger ml-2" v-if="isRequired('paypalEmail')">This is required field</span>
                              <span class="danger ml-2" v-if="isValidEmail('paypalEmail')">Not a valid email address</span>
                              <input type="email" class="form-control" name="email"
                                     placeholder="Paypal Email Address*"
                                     v-model.lazy="paypalEmail">
                            </div>
                          </template>
                          <template v-else>
                            <div class="row bank-payment-form px-1">
                              <div class="col-12 col-md-6" data-bank>
                                <div class="form-group">
                                  <label for="bank_name" class="font-grey">
                                  </label>
                                  <input type="text" name="bank_name" class="form-control stella-group"
                                         placeholder="Bank name" v-model.lazy="bankName">
                                  <span class="error invalid-feedback" v-if="isRequired('bankName')">This is required field</span>
                                </div>
                              </div>
                              <div class="col-12 col-md-6" data-bank>
                                <div class="form-group">
                                  <label for="text" class="font-grey"></label>
                                  <input type="number" class="form-control" placeholder="Bank contact number">
                                </div>
                              </div>
                              <div class="col-12 col-md-6" data-bank>
                                <div class="form-group">
                                  <input type="number" class="form-control" placeholder="Account number"
                                         v-model.lazy="accountNumber">
                                  <span class="error invalid-feedback" v-if="isRequired('accountNumber')">This is required field</span>
                                </div>
                              </div>
                              <div class="col-12 col-md-6" data-bank>
                                <div class="form-group">
                                  <input type="number" class="form-control" placeholder="Re-enter account number"
                                  v-model.lazy="reEnteredAccountNumber">
                                  <span class="error invalid-feedback" v-if="isRequired('reEnteredAccountNumber')">This is required field</span>
                                  <span class="error invalid-feedback" v-else-if="isSameAs('reEnteredAccountNumber')">Account numbers do not match</span>
                                </div>
                              </div>
                              <div class="col-12 col-md-6" data-bank>
                                <div class="form-group">
                                  <input type="number" class="form-control" placeholder="Rouitng number"
                                         v-model.lazy="routingNumber">
                                  <span class="error invalid-feedback" v-if="isRequired('routingNumber')">This is required field</span>
                                </div>
                              </div>
                              <div class="col-12 col-md-6" data-bank>
                                <div class="form-group">
                                  <input type="number" class="form-control" placeholder="Re-enter routing number"
                                  v-model.lazy="reEnteredRoutingNumber">
                                  <span class="error invalid-feedback" v-if="isRequired('reEnteredRoutingNumber')">This is required field</span>
                                  <span class="error invalid-feedback" v-else-if="isSameAs('reEnteredRoutingNumber')">Routing numbers do not match</span>
                                </div>
                              </div>
                            </div>
                          </template>
                          <div class="form-group pt-4">
                            <button type="submit" class="btn rounded-pill text-dark gradient-a btn-lg w-100" @click="save()">save
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>

            </div>

        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

import {httpMixin} from "@/mixin/http-mixin";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import InfluencerHeader from "@/components/module/influencer/shared/InfluencerHeader";
import {isStringWithOnlySpaces} from '@/common/Utils';
import {email, required, sameAs} from "vuelidate/lib/validators";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {constructCustomerURL} from "@/common/baseURL-service";
import {AGENCY_SOMNIUM} from "@/properties/agency";
import {newSubscriptionMixin} from "@/mixin/new-subscription-mixin";

export default {
  name: 'BillingMobile',
  mixins: [httpMixin, newSubscriptionMixin],
  components: {HeaderMenu, InfluencerMenu, InfluencerHeader, GlobalMessage},
  data() {
    return {
      isPayPal: true,
      isBank: false,
      user: {},
      showSlideBar: false,
      AGENCY_SOMNIUM,

      id: null,
      paypalEmail: null,
      bankName: null,
      accountNumber: '',
      routingNumber: '',
      reEnteredRoutingNumber: null,
      reEnteredAccountNumber: null,

      isSubmitted: false,
    }
  },
  validations() {
    if (this.isPayPal) {
      return {
        paypalEmail: {required, email}
      }
    } else {
      return {
        bankName: {required},
        accountNumber: {required},
        routingNumber: {required},
        reEnteredRoutingNumber: {required, sameAs: sameAs('routingNumber')},
        reEnteredAccountNumber: {required, sameAs: sameAs('accountNumber')},
      }
    }
  },
  created() {
    this.user = this.getUser();
    this.getData(`identity/api/v1/influencers/${this.user.id}/billing`, (data) => {
      if (data) {
        console.log(data);
        this.setBilling(data);
      }
    });
    this.checkNewSubscription(this.user.id);
  },
  computed: {
    copyLabel() {
      return this.copied ? 'Copied' : 'Copy';
    }
  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapActions(['setMessage']),
    isAgency(name) {
       return this.user.agency && this.user.agency.name.toLowerCase() === name;
    },
    constructCustomerURL,
    setBilling(data) {
      if (!data.paypalEmail) {
        this.id = data.id;
        this.isPayPal = false;
        this.isBank = true;
        this.bankName = data.bankName;
        this.accountNumber = data.accountNumber? data.accountNumber.toString(): '';
        this.routingNumber = data.routingNumber? data.routingNumber.toString(): '';
      } else {
        this.id = data.id;
        this.paypalEmail = data.paypalEmail;
      }
    },
    checkPasswordReq() {
      this.isPasswordRequired = isStringWithOnlySpaces(this.user.password);
    },
    isRequired(attrib) {
      return this.isSubmitted && !this.$v[attrib].required;
    },
    isSameAs(attrib) {
      return this.isSubmitted && !this.$v[attrib].sameAs;
    },
    isValidEmail() {
      return this.isSubmitted && !this.$v.paypalEmail.email;
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },
    save() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
       /* console.log(this.$v);*/
        return;
      }

      let userBilling;
      if (this.isPayPal) {
        userBilling = {
          id: this.id,
          bankName: null,
          accountNumber: null,
          routingNumber: null,
          paypalEmail: this.paypalEmail
        }
      } else {
        userBilling = {
          id: this.id,
          bankName: this.bankName,
          accountNumber: this.accountNumber,
          routingNumber: this.routingNumber,
          paypalEmail: null
        }
      }

      this.postData(`identity/api/v1/influencers/${this.user.id}/billing`, userBilling, (data) => {
        this.userBilling = data;
        this.setBilling(data);
        this.setMessage('Saved successfully');
      });
    }

  }
}
;
</script>

