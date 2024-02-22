<template>
  <div class="custom-body" v-else>
    <div class="btn-group btn-group-toggle closefriends-payment-plans" data-toggle="buttons">
      <label class="btn btn-outline customer-pricing-toggle" @click="$emit('monthly',true)">
        <input type="radio" name="options" id="option1">
        <button class="btn btn-bg-light-green font-green font-size-12 border-radius-6 px-3 mb-2 invisible">
          50% OFF
        </button>
        <span class="customer-pricing justify-content-center">$<h1>{{ invitee.monthlyPrice }}</h1></span>
        <p class="font-grey">Charged Monthly</p>
      </label>
      <label class="btn btn-outline customer-pricing-toggle active order-first order-md-last"
             @click="$emit('monthly',false)">
        <input type="radio" name="options" id="option1">
        <button class="btn btn-bg-light-green font-green font-size-12 border-radius-6 px-3 mb-2">2 Months Discount
        </button>
        <span class="customer-pricing justify-content-center">$<h1>{{
            invitee.monthlyPrice * 10
          }}</h1></span>
        <p class="font-grey">Charged Annually</p>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstagramSubscription",
  props: ['invitee']
}
</script>

<style scoped>
@media (min-width: 320px) and (max-width: 575px) { 
  .closefriends-payment-plans{
    transform: scale(0.7);
  }
}
</style>
