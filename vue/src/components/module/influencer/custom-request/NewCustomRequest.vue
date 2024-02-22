<template>
  <div class="container-fluid hv-100">
    <div class="row  p-md-4 pb-md-0 h-100">

      <div class="col-lg-4 col-12 mx-auto">

        <!--        <div class="text-center small-device-img-class">-->
        <!--          <img class="img-fluid " src="@/assets/images/stella/logo-stella-white.png">-->
        <!--        </div>-->
        <logo></logo>
        <div
          :class="isDigis?'text-dark text-center font-size-16 font-weight-500 font-family-poppins mt-5':'text-white text-center font-size-16 font-family-poppins mt-5'">
          Set up your custom request menu
        </div>

        <div
          :class="isDigis?'text-center text-dark font-size-12 font-family-poppins mt-1 new-padding-class':'text-center text-white font-size-12 font-family-poppins mt-1 new-padding-class'">
          <span :class="isDigis?'text-dark font-size-12 font-weight-500':'text-white font-size-12'">You can decide what your subscribers can request from you.</span>
        </div>


        <div class="col-sm-12 d-md-flex flex-column justify-content-between mt-5">

          <div class="d-flex flex-row justify-content-between text-center mr-3 col-sm-12 mb-3"
               :class="isDigis?'shout-out-class-digis':'shout-out-class'"
               v-for="(customRequestOption, index) in customRequestOptions" :key="index">
            <span
              :class="isDigis?'text-dark font-size-14 align-items-start font-weight-500':'text-white font-size-14 align-items-start font-weight-500'">{{ customRequestOption.title }}</span>
            <div class="d-flex flex-row justify-content-between">
              <span
                :class="isDigis?'text-dark mr-5 font-size-16':'text-white mr-5 font-size-16'">${{ customRequestOption.price }}</span>
              <img :src="getDotImage()"
                   style="width: 24px;height: 24px"
                   @click="$refs.newCustomRequestModal.show(customRequestOption, index)">
            </div>
          </div>
          <button type="button"
                  :class="isDigis?'gradient-new-class-digis text-white col-sm-12 mt-4':'gradient-new-class text-dark col-sm-12 mt-4'"
                  data-toggle="modal"
                  @click="$refs.newCustomRequestModal.show()">
            Create new request
          </button>

        </div>

      </div>
      <div class="col-lg-8  button-media-query d-flex flex-row justify-content-between pt-2">
                <cancel-button @cancel="$router.back()"></cancel-button>
        <!--        <button type="button" class="btn btn-outline-secondary" style="color: #fff; border: 2px solid #626262">Cancel-->
        <!--        </button>-->
        <!--        &lt;!&ndash;          <button  type="button" class="gradient-new-class text-dark" disabled>Next Step</button>&ndash;&gt;-->
        <!--        <button type="button" class="text-dark dark-disable-button"-->
        <!--        @click="$router.push({name: 'PrivateMessageCharge'})">Next Step</button>-->

        <save-button @saved="$router.push({name: 'PrivateMessageCharge'})"></save-button>
      </div>
    </div>
    <new-custom-request-model
      ref="newCustomRequestModal"
      @created="(customRequestOption) => {
        customRequestOptions.push(customRequestOption);
      }"
      @updated="(customRequestOption, index) => {
         $set(customRequestOptions, index, customRequestOption);
         customRequestOptions[index] = customRequestOption;
      }"
    />
  </div>
</template>
<script>
import NewCustomRequestModel from "@/components/module/influencer/custom-request/NewCustomRequestModel";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {httpMixin} from "@/mixin/http-mixin";
import Logo from "@/components/module/shared/Logo";
import CancelButton from "@/components/module/shared/CancelButton";
import SaveButton from "@/components/module/shared/SaveButton";
import {mapGetters} from "vuex";

export default {
  name: 'NewCustomRequest',
  title: 'New custom request',
  mixins: [httpMixin],
  components: {SaveButton, CancelButton, Logo, NewCustomRequestModel},
  data() {
    return {
      customRequestOptions: []
    }
  },
  created() {
    if (this.getUser().id) {
      this.load();
    }
  },
  methods: {
    ...mapGetters(['getUser']),
    //May be required latter
    load() {
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.getUser().id}/custom-request-options/`;
      this.getData(url, (customRequestOptions) => {
        this.customRequestOptions = customRequestOptions;
      });
    },
    getDotImage() {
      if (this.isDigis) {
        return require('../../../../assets/images/three-dot-dark.png');
      }
      return require('../../../../assets/images/three-dot3.png');
    }
  }
}
</script>


<style scoped>
/*for small mobile device under with 375px*/

@media only screen and (max-width: 378px) {

  .small-device-img-class {
    margin-top: 7rem;
  }

  .new-padding-class {
    padding-left: 2rem;
    padding-right: 2rem;
  }

}

@media only screen and (min-width: 380px) {

  .small-device-img-class {
    margin-top: 7rem;
  }

}

@media only screen and (min-width: 380px) and (max-width: 568px) {

  .small-device-img-class {
    margin-top: 7rem;
  }

  .new-padding-class {
    padding-left: 4rem;
    padding-right: 4rem;
  }
}


@media only screen and (max-width: 768px) {

  .button-media-query {
    position: fixed;
    bottom: 0.8rem;
    left: 0%;
    right: 0%;
    border-top: 2px solid #1f1f1f;
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
}

@media only screen  and (min-width: 1024px) {
  .button-media-query {
    position: fixed;
    bottom: 0.8rem;
    left: 17%;
    right: 17%;
    border-top: 2px solid #1f1f1f;
  }
}
</style>
