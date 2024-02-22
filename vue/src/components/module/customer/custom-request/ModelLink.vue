<template>
  <div id="custom_request_link" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="edit_archive_modelLabel" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal m-4">
        <div class="modal-body text-center p-4">
          <button type="button"  @click="$emit('cancel' )"
                  style=" margin: -18px -8px 0px 0; font-size: 30px; " class="close"
                  data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <div class="my-3">
            <p class="font-size-14"><b>{{linkLabel}}</b></p>
            <a :href="anchorHref" target="_blank">{{ anchor}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {CONTENT_TYPE_APPLICATION, CONTENT_TYPE_URL} from "@/properties/content-type";

export default {
  name: "ModelLink",
  data() {
    return {
      content: {}
    }
  },
  computed: {
    linkLabel() {
      if(this.content.type === CONTENT_TYPE_APPLICATION) {
        return 'Download from link';
      } else if(this.content.type === CONTENT_TYPE_URL) {
        return 'Redirect to link';
      }  else {
        return 'Not a valid content type';
      }
    },
    anchor() {
      if(this.content.type === CONTENT_TYPE_APPLICATION) {
        return this.content.fileName + '.' + this.content.ext;
      } else if(this.content.type === CONTENT_TYPE_URL) {
        return this.content.fileName;;
      }
    },
    anchorHref() {
      if(this.content.type === CONTENT_TYPE_APPLICATION) {
        return this.content.cdnUrl;
      } else if(this.content.type === CONTENT_TYPE_URL) {
        if (this.content.fileName.toLowerCase().includes('http')) {
          return this.content.fileName;
        } else {
          return 'http://' + this.content.fileName;
        }
      } else {
        return '';
      }
    }
  },
  methods: {
    show(content) {
      this.content = content;
      $('#custom_request_link').modal();
    },
    hide() {
      $('#custom_request_link').modal('hide');
    }
  }
}
</script>

<style scoped>

</style>
