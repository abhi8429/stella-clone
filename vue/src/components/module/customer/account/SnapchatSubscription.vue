<template>

  <div class="custom-body">
    <div class="btn-group btn-group-toggle closefriends-payment-plans" data-toggle="buttons">
      <label class="btn btn-outline customer-pricing-toggle" @click="$emit('monthly',true)">
        <input type="radio" name="options" id="option1">
        <!--                    <h3 class="customer-subscribe-title text-center d-md-block d-none">Subscription</h3>-->
        <button class="btn btn-dark font-green font-size-12 border-radius-6 px-3 mb-2 invisible"
        >50% OFF
        </button>
        <span class="customer-pricing justify-content-center">$<h1>{{ invitee.monthlyPrice }}</h1></span>
        <p class="font-grey per-month">Charged Monthly</p>
      </label>
      <label class="btn btn-outline customer-pricing-toggle active order-first order-md-last"
             @click="$emit('monthly',false)">
        <input type="radio" name="options" id="option2" >
        <!--                    <h3 class="customer-subscribe-title text-center d-md-block d-none">Subscription</h3>-->
        <button class="btn btn-dark font-pink font-size-12 border-radius-6 px-3 mb-2">2 Months Discount</button>
        <span class="customer-pricing justify-content-center">$<h1>{{
            invitee.monthlyPrice * 10
          }}</h1></span>
        <p class="font-grey per-month">Charged Annually</p>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "SnapchatSubscription",
  props: ['invitee'],
  data() {
    return {
      isMonthly: false
    }
  }
}
</script>

<style scoped>
.alert-snapchat-danger {
  border: 0;
  border-radius: 0;
  background: #FF7D7D;
}

.custom-control-label::before {
  background: transparent;
  border: 2px solid black;
}

.btn.customer-pricing-toggle:not(:disabled):not(.disabled).active {
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
}
@media (min-width: 320px) and (max-width: 575px) {
  .closefriends-payment-plans{
    transform: scale(0.7);
  }
}
</style>
