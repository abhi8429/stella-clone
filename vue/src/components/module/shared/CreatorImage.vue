<template>
  <div class="col-md-3 col-4 text-center ">
    <img v-if="!isAvatarMissing"
         :src="imageURL"
         class="profile-image" @error="imageLoadError">
    <img src="@/assets/images/default_user.png" class="profile-image">
    <div style="white-space: nowrap;" class="font-black font-weight-600">
      {{ inviteeName ? `@${inviteeName}` : '' }}
    </div>
    <input type="file" class="form-control d-none" id="file_upload" name="file" accept="images/*">
  </div>
</template>

<script>
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {httpMixin} from "@/mixin/http-mixin";

export default {
  props: ['inviteeName'],
  name: "CreatorImage",
  mixins: [httpMixin],
  data() {
    return {
      imageURL: '',
      isAvatarMissing: false,
    }
  },
  created() {
    // this.loadAvatarImg();
  },
  methods: {
    imageLoadError(event) {
      this.isAvatarMissing = true;
    },
    loadAvatarImg() {
      //${BASE_URL}/content/api/v1/influencers/urlSuffix/${$route.params.urlPrefix}/avatar
      let url = `${SERVICE_CONTENT}/api/v1/influencers/urlSuffix/${this.$route.params.urlPrefix}/avatar`;
      this.getUnSecureData(url, (imageURL) => {
        this.imageURL = imageURL.replace('dp', 'dp_150X150');
        console.log('imageURL', imageURL);
        this.isAvatarMissing = false;
      });
    },
  }
}
</script>

<style scoped>

</style>
