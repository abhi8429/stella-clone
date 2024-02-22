<template>

  <div id="platform" aria-hidden="true" aria-labelledby="exampleModalLiveLabel" class="modal fade" data-backdrop="static"
       data-keyboard="false" role="dialog" style="display: none;" tabindex="-1">
    <loading-modal :is-loading="isLoading"></loading-modal>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-header border-0 align-items-baseline">
          <h4 class="modal-title mx-auto font-size-16 font-weight-bold">Choose platform for subscription</h4>
<!--          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>-->
        </div>
        <div class="modal-body text-center pt-0">
          <div v-for="(influencerPlatform, index) in influencerPlatforms"
               :key="index"
               class="form-group">
            <button :class="getButtonColor(influencerPlatform)"
                    class="btn-mobile btn-lg btn-block mt-3 btn-mobile font-size-15-18"
                    type="submit"
                    @click="chosenPlatform(influencerPlatform)">{{ getButtonLabel(influencerPlatform) }}
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {PLATFORM_INSTAGRAM, PLATFORM_SNAPCHAT, PLATFORM_TELEGRAM, PLATFORM_TIKTOK} from "@/properties/close-friend";
import {SERVICE_SUBSCRIPTION} from "@/properties/micro-service";
import {modelHttpMixin} from "@/mixin/model-http-mixin";

export default {
  name: "ModelPlatform",
  mixins: [modelHttpMixin],
  data() {
    return {
      influencerPlatforms: []
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    ...mapActions(['setPlatform']),
    show() {
      let influencerId = this.getUser.invitee.id;
      this.getUnSecureData(`${SERVICE_SUBSCRIPTION}/api/v1/influencers/${influencerId}/platform`, (influencerPlatforms) => {
         this.influencerPlatforms = influencerPlatforms;
      });
      $('#platform').modal();
    },
    hide() {
      $('#platform').modal('hide');
    },
    isTelegramPlatform(influencerPlatform) {
      if (influencerPlatform.platform.name.includes(PLATFORM_TELEGRAM)) {
        return true;
      }
      return false;
    },
    getButtonColor(influencerPlatform) {
      if (this.isInstagramPlatform(influencerPlatform)) {
        return 'btn btn-success';
      } else if( this.isTelegramPlatform(influencerPlatform)) {
        return 'btn btn-blue'
      } else if (this.isOtherPlatform(influencerPlatform)) {
        return 'btn btn-success';
      }
      return 'btn btn-black'
    },
    getButtonLabel(influencerPlatform) {
      if (this.isInstagramPlatform(influencerPlatform)) {
        return 'Instagram Close Friends';
      } else if (this.isSnapchatPlatform(influencerPlatform)) {
        return 'Private Snapchat';
      }
      return `Exclusive ${influencerPlatform.platform.name}`;
    },
    isInstagramPlatform(influencerPlatform) {
      console.log('influencerPlatform', influencerPlatform);
      if (influencerPlatform.platform.name.includes(PLATFORM_INSTAGRAM)) {
        return true;
      }
      return false;
    },
    isSnapchatPlatform(influencerPlatform) {
      if (influencerPlatform.platform.name.includes(PLATFORM_SNAPCHAT)) {
        return true;
      }
      return false;
    },
    isOtherPlatform(influencerPlatform) {
      let platform = influencerPlatform.platform.name
      if (platform === PLATFORM_SNAPCHAT
        || platform === PLATFORM_INSTAGRAM
        || platform === PLATFORM_TIKTOK) {
        return false;
      }
      return true;
    },
    chosenPlatform(influencerPlatform) {
      this.hide();
      this.setPlatform(influencerPlatform);
      this.$router.replace({name: 'Subscription'});
    }
  }
}
</script>

<style scoped>

</style>
