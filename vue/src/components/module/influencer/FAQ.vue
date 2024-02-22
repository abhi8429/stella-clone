<template>
  <div>
    <section class="closefriend-hero background-white">
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 text-center mt-4">
            <h3 class="faq-name" style="font-family: barlow;">
              <span style="border-bottom: 3px solid;">FAQ</span>
            </h3>
          </div>
          <div class="col-12">
            <div>
              <b>What is this?</b>
              <br>
              <p>Instagram has a feature that allows you to share exclusive stories with certain followers. We have
                built a payment system and a CRM to monetize your audience using that feature.</p>
            </div>

            <div>
              <b>How does it work?</b>
              <br>
              <p>Please read this blog post:<a
                href="https://medium.com/@g_24049/how-to-use-closefriend-io-e999d29f97ea">https://medium.com/@g_24049/how-to-use-closefriend-io-e999d29f97ea</a>
              </p>
            </div>

            <div>
              <b>Do I have to follow people in order to add them as CloseFriend?</b>
              <br>
              <p>No, you do not. You simply search for them and add them to your list.</p>
            </div>

            <div>
              <b>How much does it cost?</b>
              <br>
              <p>CloseFriend is completely free to sign up, and there are no monthly fees. We split your subscription
                revenue 80/20 for providing this CRM and payment portal. (example: Your monthly subscription costs $5,
                you would keep $4 for each subscription less credit card processing fees)</p>
            </div>

            <div>
              <b>Is this against Instagram's TOS?</b>
              <br>
              <p>No, we built this as a completely separate tool and do not touch the Instagram API or integrate
                directly with any part of the platform.</p>
            </div>

            <div>
              <b>How quickly do I receive my money?</b>
              <br>
              <p>Payouts typically happen at the beginning of each month to allow for bank processing and possible
                refunds/chargebacks.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div
      class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3 position-bottom ">
      <div class="row justify-content-center mx-md-0 mx-1 mb-md-4">
        <div class="col-md-4 col-6 px-1 ">
          <button type="button" class="btn btn-cancel btn-lg btn-block mt-3 font-black btn-mobile font-size-15-18"
                  @click="$router.back()">Cancel
          </button>
        </div>
        <div class="col-md-4 offset-md-4 col-6 px-1 ">
          <button type="button" class="btn btn-success btn-lg btn-block mt-3 btn-mobile font-size-15-18"
                  @click="$router.back()">Continue
          </button>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: "FAQ"
}
</script>

<style scoped>

</style>
