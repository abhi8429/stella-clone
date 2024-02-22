<template>
  <div class="col-md-2 col-2 p-0">
    <!--    <span v-if="content.pinned">Pinned post</span>-->
    <img v-if="!isAvatarMissing"
         :src="imageURL"
         class="profile-image" @error="imageLoadError"
         @click="customRequestEvent()">
    <img v-else src="@/assets/images/default_user.png" class="profile-image"
         @click="customRequestEvent()">
  </div>
</template>

<script>

import {httpMixin} from "@/mixin/http-mixin";
import {SERVICE_CONTENT} from "@/properties/micro-service";

export default {
  props: ['content'],
  name: "InfluencerAvatar",
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
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.content.influencer.id}/avatar`;
      this.getUnSecureData(url, (imageURL) => {
        this.imageURL = imageURL.replace('dp', 'dp_150X150');
        this.isAvatarMissing = false;
      });
    },
    imageLoadError(event) {
      this.isAvatarMissing = true;
    },
    customRequestEvent() {
      this.$emit('customRequest');
    }
  }
}
</script>

<style scoped>

</style>
