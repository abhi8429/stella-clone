<template>
  <div>
    <img v-if="!isAvatarMissing"
         :src="imageURL"
         class="user-list-img" @error="imageLoadError">
    <img v-else src="@/assets/images/default_user.png" class="user-list-img">
  </div>
</template>

<script>

import {httpMixin} from "@/mixin/http-mixin";
import {SERVICE_CONTENT} from "@/properties/micro-service";

export default {
  props: ['customerSubscription'],
  name: "DashboardInfluencerAvatar",
  mixins: [httpMixin],
  data() {
    return {
      imageURL: '',
      isAvatarMissing: false
    }
  },
  created() {
    this.loadAvatarImg();
  },
  methods: {
    loadAvatarImg() {
      let influencerId = this.customerSubscription.customerInfluencerPlatform.influencerPlatform.influencer.id;
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${influencerId}/avatar`;
      this.getUnSecureData(url, (imageURL) => {
        this.imageURL = imageURL.replace('dp', 'dp_150X150');
        this.isAvatarMissing = false;
      });
    },
    imageLoadError(event) {
      this.isAvatarMissing = true;
    },
  }
}
</script>

<style scoped>

</style>
