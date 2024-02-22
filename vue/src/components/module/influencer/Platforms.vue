<template>
  <div>
    <HeaderHelp></HeaderHelp>
    <section class="closefriend-hero background-white">
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
            <div class="custom-card">
              <div class="py-4">
                <h2>Select your subscriptions</h2>
              </div>
              <div class="row" v-for="(platform, index) in user.influencerPlatforms" :key="index">
                <div class="custom-checkbox custom-control dashboard-checkbox">
                  <input type="checkbox" data-checkboxes="platforms"
                         class="custom-control-input"
                         :id="`checkbox-${platform.platformId}`"
                         true-value="Active"
                         false-value="Inactive"
                         v-model="platform.status"
                         :disabled="platform.platform === PLATFORM_STELLA">
                  <label :for="`checkbox-${platform.platformId}`" class="custom-control-label"
                         >{{platform.platform}}</label>
                </div>
                </div>
            </div>
          </div>
          <div
            class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3 position-bottom ">
            <div class="row justify-content-center mx-md-0 mx-1">
              <div class="col-md-12 col-12 px-1 ">
                <button type="button"
                        class="btn btn-success btn-mobile btn-lg btn-block mt-3 btn-mobile font-size-15-18"
                        @click="next()">Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import HeaderHelp from "@/components/module/influencer/shared/HeaderHelp";
import {httpMixin} from "@/mixin/http-mixin";
import {PLATFORM_STELLA} from "@/properties/close-friend";

export default {
  name: 'Platforms',
  components: {HeaderHelp},
  mixins: [httpMixin],
  data() {
    return {
      user: {},
      isSubmitted: false,
      PLATFORM_STELLA
    }
  },
  created() {
    this.user = this.getUser();
    this.$set(this.user, 'influencerPlatforms', []);
    this.loadPlatforms();
  },
  methods: {
    ...mapActions(['setUser']),
    ...mapGetters(['getUser']),
    next() {
      this.setUser(this.user);
      this.$router.push({name: 'SetPriceMobile'});
    },
    loadPlatforms() {
      this.getUnSecureData('identity/api/v1/lookup/platforms', (data) => {
        data.forEach((platform) => {
          let infPlatform = {platform: platform.name, platformId: platform.id, status: 'Inactive'};
          if (platform.name === this.PLATFORM_STELLA) {
            infPlatform.status = 'Active';
          }
          this.user.influencerPlatforms.push(infPlatform);
        });
      });
    },
  }
}
;
</script>

