<template>
  <div id="video_view" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="contentViewLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content" style="background:none;border: none;">
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="embed-responsive embed-responsive-16by9">
                <video width="320" height="240"
                       controls
                       oncontextmenu="return false;"
                       controlsList="nodownload"
                       :src="src">
                  <!--<source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4">-->
                </video>
              </div>
              <button type="button"
                      class="close image-close-btn"
                      data-dismiss="modal"
                      aria-hidden="true"
                      @click="$emit('close')">&times;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModelVideoView",
  data() {
    return {
      src: null
    }
  },
  methods: {
    show(src) {
      this.src = src;
      $('#video_view').modal();
    },
    hide() {
      $('#video_view').modal('hide');
    }
  }
}
</script>

<style>
.image-close-btn{
  position: absolute;
  top: 5%;
  right: 4%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  color: Grey;
  padding: 12px 24px;
  cursor: pointer;
}
</style>
