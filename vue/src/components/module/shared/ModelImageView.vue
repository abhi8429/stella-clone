<template>
  <div id="image_view" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="contentViewLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content" style="background:none;border: none;">
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <img style="object-fit: cover;width: 100%;margin: 0;" class="image-responsive" :src="src" alt="" />
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
  name: "ModelImageView",
  data() {
    return {
      src: null
    }
  },
  methods: {
    show(src) {
      this.src = src;
      $('#image_view').modal();
    },
    hide() {
      $('#image_view').modal('hide');
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
  color: white;
  padding: 12px 24px;
  cursor: pointer;
}
</style>
