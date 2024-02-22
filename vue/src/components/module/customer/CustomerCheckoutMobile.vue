<template>
  <div>

    <HeaderHelp></HeaderHelp>

    <section class="closefriend-hero background-white">
      <div class="container mt-3">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
            <div class="custom-card">
              <div class="custom-body">
                <div class="form-outline mt-3 mb-4 ">
                  <div class="form-block blocked-friends-section p-0 p-md-2">
                    <div class="row py-3 mx-1 d-md-block d-none">
                      <div class="col-md-12 col-12">
                        <h5 class="ml-4 mt-2 font-size-24 font-weight-bold text-center py-3">Checkout</h5>
                      </div>
                    </div>
                    <!--                    <div class="row mx-2">
                                          <div class="alert alert-danger show fade mt-2 mb-0">
                                            <div class="alert-body">
                                              <button class="close">
                                                <span>×</span>
                                              </button>
                                              Invalid card number
                                            </div>
                                          </div>
                                        </div>-->
                    <div class="row  py-md-3 mx-1 pb-0">
                      <div class="col-md-12 col-12 vertical-center justify-content-md-start mt-md-0 mt-3 p-0">
                        <div class="row px-1 checkout-form m-0 p-0">
                          <div class="col-12 col-md-12 px-md-1">
                            <div class="form-group">
                              <label for="">Card number</label>
                              <input type="text" class="form-control" placeholder="4141-4141-4141-4141">
                            </div>
                          </div>

                          <div class="col-6 col-md-6 px-md-1">
                            <div class="form-group">
                              <label for="month">Expiry date</label>
                              <div class="input-group custom-arrow">
                                <select placeholder="mm" class="form-control" name="month">
                                  <option selected disabled>mm</option>
                                  <option>01</option>
                                  <option>02</option>
                                  <option>03</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div class="col-6 col-md-6 px-md-1">
                            <div class="form-group">
                              <label for="" class="invisible">Expiry year</label>
                              <div class="input-group">
                                <select placeholder="yy" class="form-control" name="year">
                                  <option selected disabled>yy</option>
                                  <option>21</option>
                                  <option>22</option>
                                  <option>23</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div class="col-12 col-md-6 px-md-1">
                            <div class="form-group">
                              <label for="">CVC</label>
                              <input type="number" class="form-control" placeholder="***" min="111" max="999">
                            </div>
                          </div>
                          <div class="col-12 col-md-6 px-md-1">
                            <div class="form-group">
                              <label for="">ZIP code</label>
                              <input type="number" class="form-control" placeholder="1234" min="1111" max="9999">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row py-md-3 pb-3 mx-3">
                      <div class="col-md-12 p-0">
                        <button type="button"
                                class="btn btn-success btn-block btn-lg btn-block mt-md-3 mt-3 font-size-16 btn-mobile  btn-payment"
                                @click="save()">Pay
                        </button>
                        <button type="button"
                                         class="btn btn-blue btn-block btn-lg btn-block mt-md-3 mt-3 font-size-16 btn-mobile  btn-payment"
                                         @click="save()">Pay with PayPal
                      </button>
                        <button type="button"
                                class="btn btn-blue btn-block btn-lg btn-block mt-md-3 mt-3 font-size-16 btn-mobile  btn-payment"
                                @click="saveViaStripe()">Pay with Stripe
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
    </section>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

import {httpMixin} from "@/mixin/http-mixin";
import HeaderHelp from "@/components/module/influencer/shared/HeaderHelp";

export default {
  name: 'CustomerCheckoutMobile',
  components: {HeaderHelp},
  mixins: [httpMixin],

  methods: {
    ...mapGetters(['getUser']),
    save() {
      let customerSubscription = this.$route.params.customerSubscription;
      let subscriptionId = customerSubscription.id;
      let URL = `payment/api/v1/stripe/checkout/subscription/${subscriptionId}`
      console.log('subscriptionId', subscriptionId);
    },
    saveViaStripe() {
      let customerSubscription = this.$route.params.customerSubscription;
      let subscriptionId = customerSubscription.id;
      let URL = `payment/api/v1/stripe/subscription/${subscriptionId}`
      console.log('subscriptionId', subscriptionId);
      this.postUnsecureData(URL, {}, (stripeCheckoutData) => {
        this.$router.replace({name: 'CustomerStripeCheckout', params: {customerSubscription, stripeCheckoutData}})
      });
    }
  }
}
;
</script>

