<template>
  <div class="col-8 col-md-9 d-flex align-items-center justify-content-start">
      <img v-if="!isAvatarMissing"
           :src="imageURL"
           class="account-img" @error="imageLoadError"
           @click="customRequestEvent()">
      <img v-else src="@/assets/images/default_user.png"
           class="account-img" @click="$emit('customRequest')">
      <div class="px-1" @click="customRequestEvent()">{{ influencer.name }}</div>
  </div>
</template>

<script>

import {httpMixin} from "@/mixin/http-mixin";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {isUserActive} from "@/common/comm-service";

export default {
  props: ['influencer'],
  name: "CustomRequestInfluencerAvatar",
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
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.influencer.id}/avatar`;
      this.getUnSecureData(url, (imageURL) => {
        this.imageURL = imageURL.replace('dp', 'dp_150X150');
        this.isAvatarMissing = false;
      });
    },
    imageLoadError(event) {
      this.isAvatarMissing = true;
    },
    customRequestEvent() {
      if (isUserActive(this.influencer)) {
        this.$emit('customRequest');
      }
    }
  }
}
</script>

<style scoped>

</style>
