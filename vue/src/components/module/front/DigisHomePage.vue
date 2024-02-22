<template>
  <div class="container-fluid bg-image-class hv-100">
    <div class="row">

      <div class="offset-xl-3 offset-lg-2 col-lg-8 col-xl-6 d-flex flex-row justify-content-around" style="background: #b09fdc; padding:0;">
        <div class="pt-2 pb-2 col-3 d-flex flex-row"  style="border-bottom: 3px solid #fff">
          <img src="@/assets/images/search-icon.png" style="width: 24px; height: 24px">
          <span class="text-white font-size-16 font-weight-700">digis</span>
        </div>
        <div class="pt-2 pb-2 col-3 d-flex flex-row">
          <img src="@/assets/images/search-icon.png" style="width: 24px; height: 24px">
          <span class="text-white font-size-16 font-weight-700">chat</span>
        </div>
        <div class="pt-2 pb-2 col-3 d-flex flex-row ">
          <img src="@/assets/images/search-icon.png" style="width: 24px; height: 24px">
          <span class="text-white font-size-16 font-weight-700">tips</span>
        </div>
        <div class="pt-2 pb-2 col-3 d-flex flex-row">
          <img src="@/assets/images/search-icon.png" style="width: 24px; height: 24px">
          <span class="text-white font-size-16 font-weight-700">explore</span>
        </div>
      </div>
      <div class="col-12 d-flex flex-column justify-content-center align-items-center">
          <div class="mt-5 text-center">
            <p class="text-white mt-3 font-weight-700" style="font-size: 4rem">digis</p>
          </div>
        <div class="mt-5 text-center d-flex flex-column">
          <span class="font-weight-700 font-size-24" style="color: #b09fdc;">content creators</span>
          <span class="font-weight-700" style="color: #b09fdc">whats your digis?</span>
        </div>
      </div>
<!--      <div class="offset-xl-3 offset-lg-2 col-lg-8 col-xl-6">-->
      <div class="offset-xl-3 offset-lg-2 col-lg-8 col-xl-6">
        <button class="col-12 submission-btn font-size-14 font-weight-700" style="margin-top:12rem">creator submmisson</button>
<!--       <button class="offset-xl-4 offset-lg-3 col-lg-6 col-xl-4 submission-btn font-size-14 font-weight-700" style="margin-top:12rem">creator submmisson</button>-->
<!--      </div>-->
      </div>
    </div>
  </div>
</template>
<script>

export  default {

  data()
  {
    return {
      cssProps: {
        backgroundImage: `url(${require('../../../assets/images/digis-homepage.png')})`
      }
    }
  }

}
</script>
<style scoped>
.bg-image-class{
  background-image: url('https://images.unsplash.com/photo-1538947378928-4561e14354fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}
.background-class-div{
background: #7699b9;
  border-radius: 4px;
  padding-left: 5px;
  padding-right: 5px;

}
.submission-btn{
  /*margin-left: 2rem;*/
  /*margin-right: 2rem;*/
  padding:8px;
  border-radius: 8px;
  background: #b09fdc;
  border: 1px solid #fff;
  color: #fff;

}
@media screen and (max-width: 768px) {
  .margin-manage-class{
    font-size: 12px;
    font-weight: 700;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .font-manage-class{
    font-size: 12px ;
    font-weight: 500;
  }
}
</style>
