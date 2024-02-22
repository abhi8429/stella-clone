<template>
  <span>
<!--    &lt;!&ndash;    <span v-if="content.pinned">Pinned post</span>&ndash;&gt;
    <img v-if="!isAvatarMissing"
         :src="imageURL"
         class="profile-image" @error="imageLoadError"
         @click="customRequestEvent()">
    <img v-else src="@/assets/images/default_user.png" class="profile-image"
         @click="customRequestEvent()">-->
    <img v-if="!isAvatarMissing"
         @click="$emit('avatarClicked')"
         @error="imageLoadError"
      class="rounded-circle" width="50" height="50" :src="imageURL" alt="">
     <img v-else @click="$emit('avatarClicked')"
          class="rounded-circle" width="50" height="50"
          src="@/assets/images/stella/no_avatar.png" alt="">
  </span>
</template>

<script>

import {httpMixin} from "@/mixin/http-mixin";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {mapActions, mapGetters} from "vuex";

export default {
  props: ['userId'],
  name: "MessageAvatar",
  mixins: [httpMixin],
  data() {
    return {
      imageURL: '',
      isAvatarMissing: false
    }
  },
  created() {
    this.getCdnBaseUrl();
  },
  computed: {
    ...mapGetters(['cdnBaseUrl'])
  },
  watch: {
    userId: {
      handler(o, n) {
        this.isAvatarMissing = false;
        this.getCdnBaseUrl();
      }
    },
  },
  methods: {
    ...mapActions(['setCdnBaseUrl']),
    getCdnBaseUrl() {
      if (!this.cdnBaseUrl) {
        let url = `${SERVICE_CONTENT}/api/v1/public/cdn/base-url`;
        this.getData(url, (cndBaseUrl) => {
          this.setCdnBaseUrl(cndBaseUrl);
          this.setUpImageUrl();
        });
      } else {
        this.setUpImageUrl();
      }
    },
    setUpImageUrl() {
      this.imageURL = `${this.cdnBaseUrl}user-data/PUBLIC/${this.userId}/PROFILE/dp_50X50.jpg`;
    },
    imageLoadError(event) {
      this.isAvatarMissing = true;
    },
  }
}
</script>

<style scoped>

</style>
