<template>
    <div class="modal fade" id="filter-group" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background:#000; border: 1px solid #2f2f2f;">
                <div class="modal-header" style="border-bottom: 1px solid #1f1f1f;">
                    <h5 class="modal-title text-white font-weight-500 font-size-16 text-center" id="exampleModalLabel">
                        Select a filter
                        group, or
                        create a new one.</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <!-- <span aria-hidden="true">&times;</span> -->
                    </button>
                </div>
                <div class="modal-body" style="background: #000;">
                    <div class="contianer-fluid">
                        <div class="row">
                            <div data-v-51af0735="" class="col-sm-12 rounded mr-2">
                                <div data-v-51af0735="" class="d-flex flex-column justify-content-between">
                                    <div data-v-51af0735=""
                                        class=" d-flex flex-row justify-content-start py-2"
                                        @click="$emit('create')">
                                        <img data-v-51af0735=""
                                             src="@/assets/images/dollor-img2.png"
                                            width="25" height="25" alt="" class="mr-5">
                                        <p data-v-51af0735="" class="font-size-14 text-white ml-5">New Filter Group</p>
                                        <!-- <p class="font-size-14 text-white">324 subscribers</p> -->
                                    </div>
                                    <div data-v-51af0735="" class="d-flex flex-row justify-content-between py-2"
                                         v-for="(filter, index) in filterSettings"
                                         @click="$emit('edit', filter)">
                                      <img
                                            data-v-51af0735=""
                                            src="@/assets/images/dollor-img2.png"
                                            width="25" height="25" alt="">
                                        <p data-v-51af0735="" class="font-size-14 text-white">{{filter.name}}</p>
                                        <p data-v-51af0735="" class="text-white font-size-12">{{filter.customerCount}} subscribers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import FilterModal from "@/components/module/influencer/direct-message/FilterModal";
export default {
  name:'FilterGroup',
  components: {FilterModal},
  props: ['filterSettings'],
  methods: {
    show() {
      $('#filter-group').modal();
    },
    hide() {
      $('#filter-group').modal('hide');
    }
  }
}
</script>

