<template>
  <div>
    <div class="col-12 col-sm-6 col-md-6 vertical-center">
      <div class="alert alert-success alert-has-icon mb-2">
        <div class="alert-icon"><i class="fa fa-star"></i></div>
        <div class="alert-body">
          <div class="alert-title">You have new subscribers
            <button class="article-close"><span>Take a look</span></button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-6 vertical-center">
      <div class="input-group">
        <input type="text" class="form-control link" name="number" :value="`closefriend.io/${user.urlSuffix}`" readonly>
        <div class="input-group-prepend">
                            <span class="input-group-text copy-link">
                                <span id="copy_id" class="btn btn-copy-link">Copy</span>
                            </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "InfluencerHeader",
  props: ['user'],
}
</script>

<style scoped>

</style>
