<template>
  <div class="modal" id="platform_modal">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content stella-modal">
        <div class="modal-body text-center py-4">
          <div class="modal-width-340">

            <div class="creator-img rounded-circle">
              <img v-if="imageURL"
                   :src="imageURL"
                   class="img-fluid">
              <img v-else
                   class="img-fluid"
                   src="@/assets/images/default_user.png">
            </div>
            <div class="d-flex justify-content-between">
              <div class="text-white font-size-24">Subscribe to
                <div class="font-gradient-a font-family-space-grotesk font-size-24">
                  {{ inviteeName ? `@${inviteeName}` : '' }}
                </div>
              </div>
              <div>
                <img @click="hide()" class="img-fluid float-end d-block zoom-12 menu-close"
                     src="@/assets/images/stella/close.png">
              </div>
            </div>

            <div class="text-start font-dark-grey font-size-18 my-3">
              {{ title }}
            </div>


            <!-- select platform  -->
            <div>
              <div class="row py-3 g-4 w-100 mx-auto">
                <button v-for="(influencerPlatform, index) in platforms"
                        :key="index" @click="goToPlatform(influencerPlatform)"
                        class="btn border-radius-10 py-3 btn-lg btn-dark text-white">
                  {{ getButtonLabel(influencerPlatform) }}
                </button>
              </div>
              <!--              <div class="row my-4">
                              <div class="col-12">
                                &lt;!&ndash; to disable button add this class -> "btn-disabled" &ndash;&gt;
                                <button @click="open_modal('payment_method_modal')"
                                        class="btn stella-btn btn-lg gradient-a w-100 rounded-pill font-weight-700">Subscribe
                                </button>
                              </div>
                            </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  EXCLUSIVE_CUSTOM_REQUEST_INFLUENCERS,
  PLATFORM_INSTAGRAM,
  PLATFORM_SNAPCHAT,
  PLATFORM_STELLA
} from "@/properties/close-friend";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ModelPlatform",
  props: ['imageURL', 'inviteeName', 'platforms','urlPrefix'],
  data() {
    return {
      title: ''
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getPlatform']),
    isExclCustomRequestInfluencer() {
      return EXCLUSIVE_CUSTOM_REQUEST_INFLUENCERS.includes(this.urlPrefix);
    },
  },
  methods: {
    ...mapActions(['setPlatform']),
    show(title) {
      if (title) {
        this.title = title;
      } else {
        this.title = 'Before submitting a custom request';
      }
      $('#platform_modal').modal();
    },
    hide() {
      $('#platform_modal').modal('hide');
    },
    goToPlatform(influencerPlatform) {
      this.hide();
      let customer = this.getUser;
      //This means it is logged in user
      if (customer) {
        let custPlatform = customer.customerPlatforms
          .find(customerPlatform => customerPlatform.platform.name === influencerPlatform.platform.name);
        //Check if the customer has registered with this platform
        if (custPlatform) {
          this.setPlatform(influencerPlatform);
          this.$emit('platformSelected');
        } else {
          this.$emit('platformNotRegistered', influencerPlatform);
        }
      } else {
        this.$emit('platformNotRegistered', influencerPlatform);
      }
    },
    getButtonLabel(influencerPlatform) {
      if (this.isInstagramPlatform(influencerPlatform)) {
        return 'Instagram Close Friends';
      } else if (this.isSnapchatPlatform(influencerPlatform)) {
        return 'Private Snapchat';
      } else if(influencerPlatform.isMessage) {
        return 'Send a message';
      } else if(this.isStellaPlatform(influencerPlatform)) {
          return 'All-Access';
      }
      return `Exclusive ${influencerPlatform.platform.name}`;
    },
    isInstagramPlatform(influencerPlatform) {
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
    isStellaPlatform(influencerPlatform) {
      if (influencerPlatform.platform.name.includes(PLATFORM_STELLA)) {
        return true;
      }
      return false;
    },

  }
}
</script>

<style scoped>

</style>
