<template>
    <div class="container-fluid">
        <div class="row" style="overflow: auto;">
            <div class="col-sm-2 px-3 mb-3">
                <div class="row mt-3 border-class d-flex flex-col">
                    <div class="col-12 d-block d-sm-none">
                        <p class="text-white">Messages Dashboard</p>
                    </div>
                    <div class="col-12 d-flex flex-row justify-content-start">
                        <p class=" font-weight-500 font-size-16 text-white">Direct Messages</p>
                        <p class="ml-2 background-gradient-color px-2 text-center font-weight-500 text-dark font-size-16">5
                        </p>
                    </div>

                    <div class=" col-12 d-flex flex-row justify-content-start">
                        <h3 class="font-size-16 font-weight-500 mr-2">Announcments</h3>
                        <img src="@/assets/images/bell-icon.png" class="ml-2 fa fa-bell font-weight-500 font-size-16"
                            width="25px" height="25px" />
                    </div>

                </div>

                <div class="row mt-3 d-flex flex-row justify-content-between">
                    <div class="col-md-4 d-flex flex-row justify-content-start widht-class">
                        <h5 class=" d-none d-sm-block text-white font-weight-500 font-size-14 mt-1">Inbox</h5>
                        <p
                            class=" d-none d-sm-block ml-2 background-gradient-color px-2 text-center font-weight-500 text-dark font-size-14">
                            1
                        </p>
                    </div>
                    <div class="col-md-4 d-flex flex-row justify-content-start widht-class">
                        <h5 class=" d-none d-sm-block text-white font-weight-500 font-size-14 mt-1">New</h5>
                        <p
                            class="d-none d-sm-block ml-2 background-gradient-color px-2 text-center font-weight-500 text-dark font-size-14">
                            4
                        </p>
                    </div>
                </div>

                <div class="row mt-3 d-none d-sm-block " style="overflow:auto; height: 80vh; position: relative;"
                    id="content">

                    <div class="col-12">
                        <div class="row d-flex flex-row justify-content-between">
                            <div class="col-3 mt-2">
                                <img class="rounded-circle" width="50" height="50"
                                    src="@/assets/images/stella/no_avatar.png" alt="">
                            </div>
                            <div class="col-9">
                                <div class="row">
                                    <div class="col-12 d-flex flex-row justify-content-between">
                                        <p class="font-weight-500 font-size-14 text-white">Calvin Zheng</p>
                                    </div>
                                    <div class="col-12 d-flex flex-row justify-content-between">
                                        <p class="text-white font-size-12 font-weight-400">That...</p>
                                        <p class="px-4 text-white font-size-12 font-weight-400">.1m</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="row d-flex flex-row justify-content-between">
                            <div class="col-3 mt-2">
                                <img class="rounded-circle" width="50" height="50"
                                    src="@/assets/images/stella/no_avatar.png" alt="">
                            </div>
                            <div class="col-9">
                                <div class="row">
                                    <div class="col-12 d-flex flex-row justify-content-between">
                                        <p class="font-weight-500 font-size-14 text-white">Calvin Zheng</p>
                                    </div>
                                    <div class="col-12 d-flex flex-row justify-content-between">
                                        <p class="text-white font-size-12 font-weight-400">That...</p>
                                        <p class="px-4 text-white font-size-12 font-weight-400">.1m</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="row d-flex flex-row justify-content-between">
                            <div class="col-3 mt-2">
                                <img class="rounded-circle" width="50" height="50"
                                    src="@/assets/images/stella/no_avatar.png" alt="">
                            </div>
                            <div class="col-9">
                                <div class="row">
                                    <div class="col-12 d-flex flex-row justify-content-between">
                                        <p class="font-weight-500 font-size-14 text-white">Calvin Zheng</p>
                                    </div>
                                    <div class="col-12 d-flex flex-row justify-content-between">
                                        <p class="text-white font-size-12 font-weight-400">That...</p>
                                        <p class="px-4 text-white font-size-12 font-weight-400">.1m</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div class="col-sm-10 px-3 border-left vh-100">
                <div class="row">
                    <div class="py-3 px-2 d-none d-sm-block border-bottom">
                        <h5 class="text-white">Messages</h5>
                    </div>
                    <div class="col-12 mt-4 d-flex flex-row justify-content-between align-item-center">
                        <p class="text-white font-size-16 mt-2">At a Glance</p>
                        <button type="button" class="btn button-class text-dark">Send Announcment</button>
                    </div>
                    <div class="flex-class col-12 d-sm-flex flex-sm-row mt-4 mb-4">

                        <div class="mr-2 rounded col-sm-6  border border-dark px-3 margin-classs">
                            <div class="mt-2">
                                <p class="text-white">Top Subscribers</p>
                            </div>
                            <div class="d-flex flex-row justify-content-around">
                                <div class="d-flex flex-column">
                                    <p class="text-white font-size-12 font-weight-400">1st place</p>
                                    <img class="rounded-circle" width="50" height="50"
                                        src="@/assets/images/stella/no_avatar.png" alt="">
                                    <p class="text-white font-size-12">Calvin Zheng</p>
                                    <p class="text-white font-size-20 font-weight-500 font-class-16">$450.00</p>
                                </div>
                                <div class="d-flex flex-column">
                                    <p class="text-white font-size-12 font-weight-400">1st place</p>
                                    <img class="rounded-circle" width="50" height="50"
                                        src="@/assets/images/stella/no_avatar.png" alt="">
                                    <p class="text-white font-size-12">Calvin Zheng</p>
                                    <p class="text-white font-size-20 font-weight-500 font-class-16">$450.00</p>
                                </div>
                                <div class="d-flex flex-column">
                                    <p class="text-white font-size-12 font-weight-400">1st place</p>
                                    <img class="rounded-circle" width="50" height="50"
                                        src="@/assets/images/stella/no_avatar.png" alt="">
                                    <p class="text-white font-size-12 font-weight-400">Calvin Zheng</p>
                                    <p class="text-white font-size-20 font-weight-500 font-class-16">$450.00</p>
                                </div>
                            </div>
                        </div>

                        <div
                            class="col-sm-6 rounded border border-dark d-flex flex-column justify-content-between margin-class">
                            <div class="mt-2">
                                <p class="text-white">Message Revenue</p>
                            </div>
                            <div class="d-flex flex-row">
                                <h2 class="text-white mr-3">$200,333.00</h2>
                                <p class="px-2 mt-1 text-center font-weight-500 text-dark font-size-16 number-background">
                                    +10%
                                </p>
                            </div>
                            <div class="d-flex flex-row justify-content-between">
                                <p class="time-background text-dark">Day</p>
                                <p>Week</p>
                                <p>Month</p>
                                <p>Year</p>
                            </div>
                        </div>
                    </div>
                    <div class="font-weight-500">
                        <p class="text-white">Settings</p>
                    </div>
                    <div class="col-sm-12 d-sm-flex flex-sm-row  justify-content-between">
                        <div class="col-sm-4 rounded border border-dark mr-2">
                            <div class="d-flex flex-row justify-content-between">
                                <p class="text-white mt-2 font-size-12">Filters</p>
                                <button style="color: #E53BB9;" class="btn bg-transparent text-center " data-toggle="modal"
                                    data-target="#exampleModal">+New
                                    Filter</button>

                            </div>

                            <div class="d-flex flex-column justify-content-between">
                                <div class="d-flex flex-row justify-content-between py-2">

                                    <img src="@/assets/images/dollor-img2.png" width="25" height="25" alt="">
                                    <p class="font-size-14 text-white">Under $5 tippers</p>
                                    <p class="text-white font-size-12">324 subscribers</p>
                                    <div class="dropdown dropleft">

                                        <img class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"
                                            src="@/assets/images/three-dot2.png" width="20" height="20" alt="">

                                        <div class="dropdown-menu dropdown-class">
                                            <a class="dropdown-item" href="#">Edit Filter</a>
                                            <a class="dropdown-item " href="#">Delete</a>
                                        </div>

                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-content-between py-2">

                                    <img src="@/assets/images/dollor-img2.png" width="25" height="25" alt="">
                                    <p class="font-size-14 text-white">Longer time subs</p>
                                    <p class="text-white font-size-12">18 subscribers</p>
                                    <div class="dropdown dropleft">

                                        <img class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"
                                            src="@/assets/images/three-dot2.png" width="20" height="20" alt="">

                                        <div class="dropdown-menu dropdown-class">
                                            <a class="dropdown-item" href="#">Edit Filter</a>
                                            <a class="dropdown-item" href="#">Delete</a>
                                        </div>

                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-content-between py-2">

                                    <img src="@/assets/images/dollor-img2.png" width="25" height="25" alt="">
                                    <p class="font-size-14 text-white">Inactive over 3 days</p>
                                    <p class="font-size-12 text-white">12 subscribers</p>
                                    <div class="dropdown dropleft">

                                        <img class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"
                                            src="@/assets/images/three-dot2.png" width="20" height="20" alt="">

                                        <div class="dropdown-menu dropdown-class">
                                            <a class="dropdown-item" href="#">Edit Filter</a>
                                            <a class="dropdown-item" href="#">Delete </a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=" col-sm-4 rounded border border-dark mr-2">
                            <div class="d-flex flex-row justify-content-between pt-2">
                                <p class="text-white font-size-12">Msg Charge</p>
                                <label class="switch">
                                    <input type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                                <p class="text-white font-size-12">price per message</p>

                                <input type="text" class="coloredInput w-100 text-white">


                                <p class="text-white font-size-12 mt-2">price per picture</p>
                                <input type="text" class="w-100 coloredInput  text-white">
                                <p class="text-white font-size-14 mt-2">You can set a custom price before you send
                                    media.
                                </p>

                            </div>
                        </div>
                        <div class=" col-sm-4 rounded border border-dark">
                            <div class="d-flex flex-row justify-content-between pt-2">
                                <p class="text-white font-size-12">Welcome Messages</p>
                                <label class="switch">
                                    <input type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                                <p class="text-white">What to send new subscribers</p>

                                <textarea
                                    class="px-5 py-5 coloredInput text-white">Hi and thanks for subscribing to my Stella!</textarea>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FilterModel>

        </FilterModel>
    </div>
</template>
<script>
import '@/assets/styles/direct-message/direct-message-common.css'
import FilterModel from "@/components/module/messaging/FilterModel.vue";
export default {
    components: { FilterModel }

}
</script>
