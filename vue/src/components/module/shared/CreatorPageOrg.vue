<template>
  <div>
  <section class="container-fluid">
    <div class="row p-md-4 pb-md-0 p-3">

      <div class="col-md-5 mx-auto pt-3">
        <div class="creator-top-bar">
          <div>
            <img class="img-fluid float-start" src="@/assets/images/stella/arrow-left.png">
          </div>

          <div>
            <img  v-if="notificaiton == true" class="img-fluid float-end" src="@/assets/images/stella/bell-active.png">
            <img  v-else class="img-fluid float-end" src="@/assets/images/stella/bell.png">
          </div>
        </div>

        <div class="creator-slider" id="creator-carousel">
          <div class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#creator-carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#creator-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#creator-carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
              <button type="button" data-bs-target="#creator-carousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>

            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="img-fluid main-img d-block w-100" src="@/assets/images/stella/creator-2.png">
              </div>
              <div class="carousel-item">
                <img class="img-fluid main-img d-block w-100" src="@/assets/images/stella/creator-1.png">
              </div>
              <div class="carousel-item">
                <img class="img-fluid main-img d-block w-100" src="@/assets/images/stella/creator-2.png">
              </div>
              <div class="carousel-item">
                <img class="img-fluid main-img d-block w-100" src="@/assets/images/stella/creator-1.png">
              </div>
            </div>
          </div>

          <div class="creator-slider-info">

            <img class="img-fluid creator-img rounded-circle mb-2" src="@/assets/images/stella/avatar.png">

            <div class="text-white font-size-24 font-family-poppins mb-2 creator-name">Sommer Ray</div>
            <div class="font-dark-grey font-size-20 font-family-poppins mb-2 creator-tag-line">
              Dreams don't work unless you do ➳
            </div>
            <div class="text-white font-size-24 font-family-poppins mb-2 creator-social-media d-flex flex-wrap ">
              <a href="#" class="text-white font-size-20 text-capitalize font-family-poppins">twitter</a>
              <span class="font-dark-grey mx-2">/</span>
              <a href="#" class="text-white font-size-20 text-capitalize font-family-poppins">instagram</a>
              <span class="font-dark-grey mx-2">/</span>
              <a href="#" class="text-white font-size-20 text-capitalize font-family-poppins">discord</a>
            </div>

          </div>
        </div>


        <div class="row py-3 g-4 w-100 mx-auto">
          <button class="btn border-radius-10 py-3 btn-lg btn-dark text-white">Donate <img src="@/assets/images/stella/emoji-dollar-bag.png"></button>
          <button class="btn border-radius-10 py-3 btn-lg btn-dark text-white">Private Snapchat <img src="@/assets/images/stella/emoji-ghost.png"></button>
          <button class="btn border-radius-10 py-3 btn-lg btn-dark text-white">Private Whatsapp <img src="@/assets/images/stella/emoji-mobile.png"></button>
        </div>

        <div class="row py-3 g-2">
          <div class="font-family-poppins text-white font-size-24">Bonus Content</div>
          <div class="font-family-poppins font-dark-grey font-size-16">Get access to everything below</div>
        </div>



        <div class="py-3">
          <div class="side-slider carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="card creator-bonus-card mx-auto py-3">
                  <div class="text-center d-block">
                    <img class="img-fluid" src="@/assets/images/stella/public-lock.png">
                  </div>
                  <div class="py-3 px-4">
                    <div class="d-flex align-items-center">
                      <span class="font-family-poppins text-white font-size-24">Guitar Lessons - 5 new lessons each week</span>
                    </div>
                    <button @click="open_modal('congrats_modal')" class="btn w-100 btn-special-dark rounded-pill btn-lg mt-4">
                      <span class="font-gradient-a">Subscribe to unlock</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="card creator-bonus-card mx-auto py-3">
                  <div class="creator-bonus-images">
                    <img class="img-fluid" src="@/assets/images/stella/creator-(3).png">
                    <img class="img-fluid" src="@/assets/images/stella/creator-(4).png">
                    <img class="img-fluid" src="@/assets/images/stella/creator-(3).png">
                    <img class="img-fluid" src="@/assets/images/stella/creator-(4).png">
                  </div>
                  <div class="py-3 px-4">
                    <div class="d-flex align-items-center">
                      <span class="font-family-poppins text-white font-size-24">Guitar Lessons</span>
                      <span class="btn tag-gradient-a rounded-pill py-1 mx-2 zoom-8">
                          <span class="font-gradient-a font-family-poppins font-size-16 text-uppercase">HOTTED</span>
                        </span>
                    </div>
                    <div class="font-family-poppins font-dark-grey font-size-16">Unlock it now and access never-seen content posted nowhere else.</div>
                    <button @click="open_modal('subscribe_modal')" class="btn w-100 btn-special-dark rounded-pill btn-lg mt-4">
                      <span class="font-gradient-b">Subscribe to unlock</span>
                    </button>
                    <button @click="open_modal('congrats_modal')" class="btn w-100 btn-special-dark rounded-pill btn-lg mt-4">
                      <span class="font-gradient-a">Subscribe to unlock</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="row py-3 g-2">
          <div class="font-family-poppins text-white font-size-24">Custom Requests</div>
          <div class="font-family-poppins font-dark-grey font-size-16">Send me a custom request!</div>
        </div>

        <div class="w-100 btn-group-vertical creator-side py-3" role="group" >
          <button type="button" class="btn btn-custom-request">
            <span>Happy birthday video!</span>
            <span>$40</span>
          </button>
          <button type="button" class="btn btn-custom-request">
            <span>Greeting with your name</span>
            <span>$40</span>
          </button>
          <button type="button" class="btn btn-custom-request">
            <span>Candid selfie</span>
            <span>$50</span>
          </button>
          <button type="button" class="btn btn-custom-request">
            <span> Custom</span>
            <span class="font-grey font-size-14">$150 min. required.</span>
          </button>
        </div>

        <div class="card creator-card border-gradient-a border-radius-15 mt-4">
          <div class="creator-card-bg">
            <div class="text-white mb-3 font-size-25">Get all-access to exclusive content!</div>
            <div class="font-dark-grey font-size-16">You get access to all exclusive content, ability to submit custom requests, and more!</div>
            <button class="btn gradient-a w-100 text-dark rounded-pill btn-lg mt-4">Subscribe now!</button>
          </div>
        </div>

        <div class="card creator-card border-gradient-b border-radius-15 mt-4">
          <div class="creator-card-bg">
            <div class="text-white mb-3 font-size-25">Get all-access to exclusive content!</div>
            <div class="font-dark-grey font-size-16">You get access to all exclusive content, ability to submit custom requests, and more!</div>
            <button class="btn gradient-b w-100 text-dark rounded-pill btn-lg mt-4">Full Access</button>
          </div>
        </div>

        <div class="text-center my-5">
          <img class="img-fluid zoom-6" src="@/assets/images/stella/logo-stella-white.png">
          <div class="font-dark-grey mt-3">Powered by Stella</div>
        </div>

      </div>

    </div>

  </section>


  <!-- subscribe modal -> subscribe_modal -->
  <div class="modal" id="subscribe_modal" >
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content stella-modal">
        <div class="modal-body text-center py-4">
          <div class="modal-width-340">

            <div class="creator-img rounded-circle">
              <img class="img-fluid" src="@/assets/images/stella/avatar.png">
            </div>
            <div class="d-flex justify-content-between">
              <div class="text-white font-size-24">Subscribe to
                <div class="font-gradient-a font-family-space-grotesk font-size-24">@sommerray</div>
              </div>
              <div>
                <img @click="close_modal('subscribe_modal');" class="img-fluid float-end d-block zoom-12 menu-close" src="@/assets/images/stella/close.png">
              </div>
            </div>

            <div class="text-start font-dark-grey font-size-18 my-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi.
            </div>


            <!-- select custom request  -->
            <div >
              <div class="w-100 btn-group-vertical" role="group">
                <button type="button" class="btn btn-custom-request subscribe">
                  <span class="text-white font-size-18">12 months</span>
                  <span>
                  <span class="rounded-pill price-discount">50% OFF</span>
                </span>
                  <span class="plan-amount font-size-20">$38.97</span>
                </button>
                <button type="button" class="btn btn-custom-request subscribe active">
                  <span class="text-black font-size-18">Per month</span>
                  <span class="plan-amount font-size-20">$12.09</span>
                </button>
              </div>

              <div class="row my-4">
                <div class="col-12">
                  <!-- to disable button add this class -> "btn-disabled" -->
                  <button @click="open_modal('payment_method_modal')" class="btn stella-btn btn-lg gradient-a w-100 rounded-pill font-weight-700">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- subscribe modal -> subscribe_modal -->
<!--
    <div class="modal" id="subscribe_modal" >
      <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content stella-modal">
          <div class="modal-body text-center py-4">
            <div class="modal-width-340">

              <div class="creator-img rounded-circle">
                <img class="img-fluid" src="@/assets/images/stella/avatar.png">
              </div>
              <div class="d-flex justify-content-between">
                <div class="text-white font-size-24">Subscribe to
                  <div class="font-gradient-a font-family-space-grotesk font-size-24">@sommerray</div>
                </div>
                <div>
                  <img @click="close_modal('subscribe_modal');" class="img-fluid float-end d-block zoom-12 menu-close" src="@/assets/images/stella/close.png">
                </div>
              </div>

              <div class="text-start font-dark-grey font-size-18 my-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi.
              </div>


              &lt;!&ndash; select custom request  &ndash;&gt;
              <div>
                <div class="row py-3 g-4 w-100 mx-auto">
                  <button class="btn border-radius-10 py-3 btn-lg btn-dark text-white">Donate <img src="@/assets/images/stella/emoji-dollar-bag.png"></button>
                  <button class="btn border-radius-10 py-3 btn-lg btn-dark text-white">Private Snapchat <img src="@/assets/images/stella/emoji-ghost.png"></button>
                  <button class="btn border-radius-10 py-3 btn-lg btn-dark text-white">Private Whatsapp <img src="@/assets/images/stella/emoji-mobile.png"></button>
                </div>

                <div class="row my-4">
                  <div class="col-12">
                    &lt;!&ndash; to disable button add this class -> "btn-disabled" &ndash;&gt;
                    <button @click="open_modal('payment_method_modal')" class="btn stella-btn btn-lg gradient-a w-100 rounded-pill font-weight-700">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
-->


  <!-- congrats modal -> congrats_modal -->
  <div class="modal" id="congrats_modal" >
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content stella-modal">
        <div class="modal-body text-center py-4">
          <div class="modal-width-340">

            <div class="creator-img rounded-circle">
              <img class="img-fluid" src="@/assets/images/stella/avatar.png">
            </div>
            <div class="d-flex justify-content-between">
              <div class="text-white font-size-24">
                <div class="font-gradient-a font-family-space-grotesk font-size-24">Congrats!</div>
              </div>
              <div>
                <img @click="close_modal('congrats_modal');" class="img-fluid float-end d-block zoom-12 menu-close" src="@/assets/images/stella/close.png">
              </div>
            </div>

            <div class="text-start font-family-poppins font-dark-grey font-size-18 my-3">
              <span class="text-white font-family-poppins">@sommerray</span> has been notified and will add you soon!
            </div>


            <div class="row my-4">
              <div class="col-12">
                <button class="btn stella-btn btn-lg gradient-a w-100 rounded-pill font-weight-700">Go to my profile</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>



  <!-- payment method -->
  <div class="modal right fade" id="payment_method_modal" tabindex="-1" style="display: none; z-index: 2060 !important;" data-keyboard="false" data-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-md pt-md-4 pe-md-4" role="document">
      <div class="modal-content menu-bg">
        <div class="modal-body" style="overflow-y:auto;">
          <div class="row mt-2 me-2 ms-3">

            <div class="col-12 text-center my-4">
              <img
                @click="close_modal('payment_method_modal');"
                class="img-fluid float-start d-block zoom-15 menu-back-arrow menu-close" src="@/assets/images/stella/arrow-left.png"
              >
              <div class="font-size-20 text-white font-family-poppins">Payment methods</div>
            </div>

            <div
              @click="open_modal('paypal_modal');"
              class="col-12 d-flex align-items-center justify-content-between payment-card">
              <div class="d-flex align-items-center">
                <div>
                  <img class="img-fluid payment-img-bg" src="@/assets/images/stella/paypal.png">
                </div>
                <div class="text-white ms-3">Paypal</div>
              </div>
              <div>
                <a href="">
                  <img class="img-fluid" src="@/assets/images/stella/arrow-simple-right.png">
                </a>
              </div>
            </div>

            <div
              @click="open_modal('paypal_modal');"
              class="col-12 d-flex align-items-center justify-content-between payment-card">
              <div class="d-flex align-items-center">
                <div>
                  <img class="img-fluid payment-img-bg simple" src="@/assets/images/stella/creditcard.png">
                </div>
                <div>
                  <div class="text-white ms-3">Visa ... 4564</div>
                  <div class="ms-3">Expires 9/22</div>
                </div>
              </div>
              <div>
                <a href="#">
                  <img class="img-fluid flip-x" src="@/assets/images/stella/edit.png">
                </a>
              </div>
            </div>

            <div
              class="col-12 d-flex align-items-center justify-content-between payment-card"
              @click="open_modal('credit_card_modal');"
            >
              <div class="d-flex align-items-center">
                <div>
                  <img class="img-fluid payment-img-bg simple" src="@/assets/images/stella/creditcard.png">
                </div>
                <div class="text-white ms-3">Credit Card</div>
              </div>
              <div>
                <a href="">
                  <img class="img-fluid" src="@/assets/images/stella/arrow-simple-right.png">
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- payment method -->


  <!-- bank account -->
  <div class="modal right fade" id="credit_card_modal" tabindex="-1" style="display: none; z-index: 2060 !important;" data-keyboard="false" data-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-md pt-md-4 pe-md-4" role="document">
      <div class="modal-content menu-bg">
        <div class="modal-body" style="overflow-y:auto;">
          <div class="row mt-2 me-2 ms-3">

            <div class="col-12 text-center my-4">
              <img
                @click="close_modal('bank_account_modal');"
                class="img-fluid float-start d-block zoom-15 menu-back-arrow menu-close" src="@/assets/images/stella/arrow-left.png"
              >
              <div class="font-size-24 text-white font-family-poppins">Credit Card</div>
            </div>

            <div class="col-12 font-size-16 font-family-poppins">
              The Payouts occur monthly and $50 minimum is required.
            </div>


            <div class="col-12 mt-3">
              <label class="form-label mb-2">Card number *</label>
              <div class="input-group flex-nowrap stella-group">
                <input type="text" class="form-control stella-group" placeholder="1234 5678 1234 5678">
                <span class="input-group-text px-3" >
                      <img class="img-fluid" src="@/assets/images/stella/Camera.png">
                    </span>
              </div>
              <div class="invalid-feedback">You haven't filled this filled</div>
            </div>

            <div class="col-12 mt-3">
              <label class="form-label mb-2">Cardholder</label>
              <div class="stella-group">
                <input type="text" class="form-control stella-group" placeholder="John Doe">
              </div>
              <div class="invalid-feedback">You haven't filled this filled</div>
            </div>

            <div class="col-12 mt-3">
              <label class="form-label mb-2">Expires</label>
              <div class="stella-group">
                <input type="text" class="form-control stella-group" placeholder="MM / YY">
              </div>
              <div class="invalid-feedback">You haven't filled this filled</div>
            </div>

            <div class="col-12 mt-3">
              <label class="form-label mb-2">CVC</label>
              <div class="stella-group">
                <input type="text" class="form-control stella-group" placeholder="XXX">
              </div>
              <div class="invalid-feedback">You haven't filled this filled</div>
            </div>

            <div class="col-12 mt-3">
              <label class="form-label mb-2">Zipcode</label>
              <div class="stella-group">
                <input type="text" class="form-control stella-group" placeholder="12345">
              </div>
              <div class="invalid-feedback">You haven't filled this filled</div>
            </div>

            <div class="col-12 mt-3">
              <label class="form-label mb-2">Re enter routing number</label>
              <div class="stella-group">
                <input type="text" class="form-control stella-group" placeholder="Enter your Re enter routing number">
              </div>
              <div class="invalid-feedback">You haven't filled this filled</div>
            </div>

            <div class="col-12 my-5">
              <button type="submit" class="btn rounded-pill text-dark gradient-a btn-lg w-100">Save</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- bank account -->



  <!-- paypal -->
  <div class="modal right fade" id="paypal_modal" tabindex="-1" style="display: none; z-index: 2060 !important;" data-keyboard="false" data-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-md pt-md-4 pe-md-4" role="document">
      <div class="modal-content menu-bg">
        <div class="modal-body" style="overflow-y:auto;">
          <div class="row mt-2 me-2 ms-3">

            <div class="col-12 text-center my-4">
              <img
                @click="close_modal('paypal_modal');"
                class="img-fluid float-start d-block zoom-15 menu-back-arrow menu-close" src="@/assets/images/stella/arrow-left.png"
              >
              <div class="font-size-20 text-white font-family-poppins">Paypal</div>
            </div>

            <div class="col-12 mt-3">
              <label class="form-label mb-2">Your Email</label>
              <div class="stella-group">
                <input type="text" class="form-control stella-group" placeholder="Enter your email address">
              </div>
              <div class="invalid-feedback">You haven't filled this filled</div>
            </div>
            <div class="col-12 my-5">
              <!-- add btn-disabled to make button disabled & remove it if not in use  -->
              <button type="submit" class="btn rounded-pill text-dark gradient-a btn-lg w-100 btn-disabled">Save</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- paypal -->

  <div id="modal_backdrop" class="modal-backdrop fade d-none"></div>
  </div>

</template>

<script>

export default {
  name: "CreatorPage",
  data() {
    return {
      notificaiton: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      $('.carousel').carousel();
      /* $('.carousel').on('slide.bs.carousel', () => {
         this.crItemIndex = null;
       });*/
    });
  },
  methods: {
    open_modal(passed_id){
      document.querySelector('#' + passed_id).classList.add('d-block');
      document.querySelector('#' + passed_id).classList.add('show');
      document.querySelector('#modal_backdrop').classList.add('show');
      document.querySelector('#modal_backdrop').classList.remove('d-none');
    },
    close_modal(passed_id){
      document.querySelector('#'+passed_id).classList.remove('d-block');
      document.querySelector('#'+passed_id).classList.remove('show');
      document.querySelector('#modal_backdrop').classList.remove('show');
      document.querySelector('#modal_backdrop').classList.add('d-none');
    },
  }
}
</script>

<style scoped>

</style>
