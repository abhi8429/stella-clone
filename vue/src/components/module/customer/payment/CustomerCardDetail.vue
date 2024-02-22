<template>
  <section class="container-fluid">
    <div class="row p-md-4 pb-md-0">
      <div class="border-around border-md-1 border-0 p-2">
        <div>

          <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>

          <customer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></customer-menu>
          <header-menu @slideMenu="slideBar()" @close="close()"
                       is-close="true" :is-loading="isLoading"></header-menu>

          <section class="closefriend-hero background-white">
            <div class="container mt-3">
              <div class="row">
                <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
                  <div class="custom-card">
                    <global-message></global-message>
                    <div class="custom-body">
                      <div class="">
                        <div class="form-block blocked-friends-section p-0 p-md-2">
                          <div class="row  py-md-3 mx-1 pb-0">
                            <div class="col-md-12 col-12 vertical-center justify-content-md-start mt-md-0 mt-3 p-0">
                              <div class="row px-1 checkout-form m-0 p-0">
                                <div class="col-12 col-md-12 px-md-1">
                                  <div class="form-group">
                                    <label for="">Card number<span class="danger ml-1">*</span>
                                      <required-field v-if="isRequired('number') && isNew"/>
                                    </label>
                                    <input v-if="isNew"
                                           v-imask="cardMasks"
                                           class="form-control"
                                           @accept="onAcceptCardType"
                                           :value="card.number"
                                           autofocus
                                           id="cardNumber"
                                           autocomplete="off"
                                           placeholder="4141 4141 4141 4141"
                                    />
                                    <input v-else
                                           type="text"
                                           class="form-control"
                                           :value="`XXXX XXXX XXXX ${card.last4Digit}`"
                                           readOnly>
                                  </div>
                                </div>

                                <div class="col-6 col-md-6 px-md-1 pr-md-3">
                                  <required-field v-if="isExpireDateRequired()"/>
                                  <div class="form-group">
                                    <label for="month">Expiry date<span class="danger ml-1">*</span>
                                      <!--                                <required-field v-if="isRequired('expireMonth')"/>-->
                                    </label>
                                    <div class="input-group custom-arrow">
                                      <select placeholder="mm" class="form-control"
                                              name="month" v-model="card.expMonth">
                                        <option selected disabled>mm</option>
                                        <option v-for="n in 12" :key="n" :value="10 > n ? '0' + n : n">{{
                                            10 > n ? "0" + n : n
                                          }}
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div class="col-6 col-md-6 px-md-1 pl-md-3 expiry-dash">
                                  <br v-if="isExpireDateRequired()">
                                  <div class="form-group">
                                    <label for="year" class="invisible">Expiry year
                                      <required-field v-if="isRequired('expYear')"/>
                                    </label>
                                    <div class="input-group custom-arrow">
                                      <select placeholder="yyyy"
                                              class="form-control"
                                              name="year" v-model="card.expYear">
                                        <option selected disabled>yyyy</option>
                                        <option
                                          v-for="(n, index) in 12"
                                          :value="index + currentYear"
                                          :key="n"
                                        >{{ index + currentYear }}
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div class="col-12 col-md-12 px-md-1" v-if="isNew">
                                  <div class="form-group">
                                    <label for="">CVC<span class="danger ml-1">*</span>
                                      <required-field v-if="isRequired('cvv')"/>
                                    </label>
                                    <input
                                      type="password"
                                      class="form-control" placeholder="****"
                                      id="cardCvv"
                                      :value="card.cvv"
                                      autocomplete="off"
                                      v-imask="cvvMask"
                                      @accept="onAcceptCvv"
                                    />
                                  </div>
                                </div>
                                <!--                          <div class="col-12 col-md-12 px-md-1">
                                                            <div class="form-group">
                                                              <label for="">ZIP code
                                                                &lt;!&ndash;                                <required-field v-if="isRequired('zipCode')"/>&ndash;&gt;
                                                              </label>
                                                              <input
                                                                class="form-control" placeholder="zip code"
                                                                id="zip"
                                                                :value="card.zipCode"
                                                                autocomplete="off"
                                                                v-imask="usZipCode"
                                                                @accept="onAcceptZip"
                                                            />
                                                            </div>
                                                          </div>-->
                              </div>
                            </div>
                          </div>
                          <div class="row py-md-3 pb-3 mx-3">
                            <div class="col-md-12 p-0">
                              <button type="button" @click="save()"
                                      class="btn btn-success btn-block btn-lg btn-block mt-md-3 mt-3 font-size-16 btn-mobile  btn-payment">
                                <i>Save</i></button>
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

import {IMaskDirective} from "vue-imask";
import {cardMasks, cvvMask, usZipCode} from "@/mixin/masks";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import CustomerMenu from "@/components/module/customer/shared/CustomerMenu";
import {required} from "vuelidate/lib/validators";
import RequiredField from "@/components/module/shared/RequiredField";
import {SERVICE_PAYMENT} from "@/properties/micro-service";
import {igValidationMixin} from "@/mixin/ig-validation-mixin";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import titleMixin from "../../../../mixin/title-mixin";

const URL = `${SERVICE_PAYMENT}/api/v1/stripe/customers`;

export default {
  name: 'CustomerCardDetail',
  title: 'Card detail',
  mixins: [igValidationMixin, titleMixin],
  components: {HeaderMenu, CustomerMenu, RequiredField, GlobalMessage},
  data() {
    return {
      user: {},
      card: {last4Digit: 'XXXX'},

      currentYear: new Date().getFullYear(),
      cardMasks,
      cvvMask,
      usZipCode,

      showSlideBar: false,
      isSubmit: false,
    }
  },
  validations() {
    if (this.isNew) {
      return {
        card: {
          number: {required},
          expMonth: {required},
          expYear: {required},
          cvv: {required}
        }
      }
    } else {
      return {
        card: {
          expMonth: {required},
          expYear: {required},
        }
      }
    }
  },

  created() {
    this.user = this.getUser();
    if (!this.isNew) {
      let url = `${URL}/${this.user.id}/cards/${this.$route.params.cardId}`;
      this.getData(url, (data) => {
        this.initIGValidity();
        this.card = data;
        if (this.card.expMonth < 10) {
          this.card.expMonth = `0${this.card.expMonth}`;
        }
      });
    } else {
      this.initIGValidity();
    }

  },
  computed: {
    isNew() {
      return !this.$route.params.cardId
    }
  },
  directives: {
    imask: IMaskDirective
  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapActions(['setMessage']),
    isRequired(attrib) {
      return this.isSubmit && !this.$v.card[attrib].required;
    },
    isExpireDateRequired() {
      return this.isRequired('expMonth') || this.isRequired('expYear');
    },
    onAcceptCardType(e) {
      const maskRef = e.detail;
      const type = maskRef.masked.currentMask.cardtype;
      console.log(type);
      // this.card.number = maskRef.value;
      this.$set(this.card, 'number', maskRef.value);
    },
    onAcceptCvv(e) {
      const maskRef = e.detail;
      // this.card.cvv = maskRef.value;
      this.$set(this.card, 'cvv', maskRef.value);
    },
    onAcceptZip(e) {
      console.log(e.detail);
      const maskRef = e.detail;
      this.card.zipCode = maskRef.value;
    },
    save() {
      this.isSubmit = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log('failed', this.$v);
        return;
      }
      if (this.isNew) {
        this.card.number = this.card.number.replace(/\s/g, '')
        let url = `${URL}/${this.user.id}/cards`;
        this.postData(url, this.card, (data) => {
          this.card = data;
          this.setMessage('SAVED.SUCCESSFULLY');
          this.close();
        });
      } else {
        let url = `${URL}/${this.user.id}/cards/${this.card.cardId}/`;
        this.patchData(url, this.card, (data) => {
          this.setMessage('SAVED.SUCCESSFULLY');
          this.close();
        });
      }
    },
    close() {
      if (this.$route.query.messageCard) {
        console.log('this.card.cardId', this.card.cardId);
        let query =  {inf: this.$route.query.messageCard, cardAdded: this.card.cardId}
        if (this.$route.query.msgId) {
          query.msgId = this.$route.query.msgId;
        }
        this.$router.replace({name: 'CustomerDirectMessage', query});
      } else {
        this.$router.replace({name: 'PaymentOption'});
      }
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    }
  }
}

</script>

<style scoped>
.expiry-dash:before {
  content: '/';
  position: absolute;
  top: 46px;
  left: -3px;
}
</style>

