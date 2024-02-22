<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg ">
            <div class="modal-content" style="background:#000; border: 1px solid #2f2f2f;">
                <div class="modal-header" style="border-bottom: 1px solid #1f1f1f;">
                    <h5 class="modal-title text-white" id="exampleModalLabel">Create New Filter</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <!-- <span aria-hidden="true">&times;</span> -->
                    </button>
                </div>
                <div class="modal-body" style="background: #000;">
                    <div class="contianer-fluid">
                        <div class="row">
                            <div class="col-sm-12 d-flex flex-row justify-content-between">
                                <div style="width: 15%;">
                                    <p>Emoji</p>
                                    <img src="@/assets/images/dollor-img2.png" width="40" height="40" class="my-1" alt="">
                                </div>
                                <div style="width: 85%;">
                                    <p>Filter Name</p>
                                    <input type="text" class="coloredInput2 w-100 text-white"
                                        placeholder="what's is this called?">
                                </div>
                            </div>
                            <div class="col-sm-12 mt-4 d-flex flex-column justify-content-start">
                                <div class="d-flex flex-row justify-content-between">
                                    <p class="text-white">Tipped Over Amount</p>
                                    <label class="switch mt-1">
                                        <input type="checkbox">
                                        <span class="slider round"></span>
                                    </label>

                                </div>
                                <div class="d-flex flex-column">
                                    <p>Tipped Amount</p>
                                    <input type="text" class="coloredInput2 w-100 text-white" placeholder="Amount">
                                </div>
                            </div>
                            <div class="col-sm-12 mt-4 d-flex flex-column justify-content-start">
                                <div class="d-flex flex-row justify-content-between">
                                    <p class="text-white">Spent Over</p>
                                    <label class="switch mt-1">
                                        <input type="checkbox">
                                        <span class="slider round"></span>
                                    </label>

                                </div>
                                <div class="d-flex flex-column">
                                    <p>Spent Amount</p>
                                    <input type="text" class="coloredInput2 w-100 text-white" placeholder="Amount">
                                </div>
                            </div>
                            <div class="col-sm-12 mt-4 d-flex flex-column justify-content-start">
                                <div class="d-flex flex-row justify-content-between">
                                    <p class="text-white">Subscribed Over</p>
                                    <label class="switch mt-1">
                                        <input type="checkbox">
                                        <span class="slider round"></span>
                                    </label>

                                </div>
                                <div class="d-flex flex-row justify-content-between">
                                    <div style="width: 50%;" class="px-2">
                                        <p>Count</p>
                                        <input type="text" class="coloredInput2 text-white" style="width: 100%;"
                                            placeholder="Amount">
                                    </div>
                                    <div style="width: 50%;">
                                        <p>Time</p>
                                        <div class="dropdown" style="background: #333333; border-radius: 8px;">
                                            <input type="text" class="coloredInput2 text-white" placeholder="Week">
                                            <button class="btn dropdown-toggle dropdown-toggle-split" type="button"
                                                data-toggle="dropdown" aria-expanded="false"
                                                style="text-align:end; color: #fff;">

                                                <!-- <span class="dropdown-toggle dropdown-toggle-split"></span> -->
                                            </button>

                                            <div class="dropdown-menu dropdown-class"
                                                style="top: 0px;left: -120px;transform: translate3d(345px, 44px, 0px);">
                                                <a class="dropdown-item" href="#">Week</a>
                                                <a class="dropdown-item" href="#">Months</a>
                                                <a class="dropdown-item" href="#">Year</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-12 mt-4 d-flex flex-column justify-content-start">
                                <div class="d-flex flex-row justify-content-between">
                                    <p class="text-white">Inactive over</p>
                                    <label class="switch mt-1">
                                        <input type="checkbox">
                                        <span class="slider round"></span>
                                    </label>

                                </div>
                                <div class="d-flex flex-row justify-content-between">
                                    <div style="width: 50%;" class="px-2">
                                        <p>Count</p>
                                        <input type="text" class="coloredInput2 text-white" style="width: 100%;"
                                            placeholder="Amount">
                                    </div>
                                    <div style="width: 50%;">
                                        <p>Time</p>
                                        <div class="dropdown" style="background: #333333; border-radius: 8px;">
                                            <input type="text" class="coloredInput2 text-white" placeholder="Week">
                                            <button class="btn dropdown-toggle dropdown-toggle-split" type="button"
                                                data-toggle="dropdown" aria-expanded="false"
                                                style="text-align:end; color: #fff;">

                                                <!-- <span class="dropdown-toggle dropdown-toggle-split"></span> -->
                                            </button>

                                            <div class="dropdown-menu dropdown-class"
                                                style="top: 0px;left: -120px;transform: translate3d(345px, 44px, 0px);">
                                                <a class="dropdown-item" href="#">Week</a>
                                                <a class="dropdown-item" href="#">Months</a>
                                                <a class="dropdown-item" href="#">Year</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="border-top: 1px solid #000;">
                    <button type="button" class="btn  button-class" style="width: 100%;">Save changes</button>
                    <button type="button" class="btn btn-outline-secondary"
                        style="width: 100%; padding: 12px 16px; border-radius: 12px;" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
</script>

<style scoped>
.dropdown-class a {
    color: #fff;
    font-size: 16px;
    background: #000;
}
</style>
