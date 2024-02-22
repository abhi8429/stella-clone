<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg ">
            <div class="modal-content" style="background:#000; border: 1px solid #2f2f2f;">
                <div class="modal-header" style="border-bottom: 1px solid #1f1f1f;">
                    <h5 class="modal-title text-white font-weight-500 font-size-20" id="exampleModalLabel">Upload Media</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <!-- <span aria-hidden="true">&times;</span> -->
                    </button>
                </div>
                <div class="modal-body" style="background: #000;">
                    <div class="contianer-fluid">
                        <div class="row">
                            <div class="col-sm-12 ml-2 border border-dark mt-3 mb-3 d-flex flex-row justify-content-between rounded"
                                style="width: 95%; height: 20vh;">
                                <div class="rounded" style="width: 94px ; height: 82px;">
                                    <img src="https://cdn.britannica.com/99/236599-050-1199AD2C/Mark-Zuckerberg-2019.jpg"
                                        alt="image" style="width: 110px;" height="95px" class="rounded mt-4">
                                </div>
                                <div class="upload-file-class col-6">
                                    <input type="file" class="upload-file-input" />
                                    <a href="#0" class="input-file-btn btn-dark btn-sm remove">
                                        <span class="glyphicon glyphicon-upload"></span>Browse for Media
                                    </a>
                                </div>

                            </div>
                            <div class="col-sm-12">
                                <p>Price to unlock media</p>
                                <input type="text" class="coloredInput2 w-100 text-white" placeholder="Amount">
                            </div>
                            <div class="col-sm-12">
                                <p>Price to unlock media</p>
                                <input type="text" class="coloredInput2 w-100 text-white" placeholder="Amount">
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
.upload-file-class {
    position: relative;
    /* width: 102px; */
    /* height: 10px; */
    overflow: hidden;
    cursor: pointer;
}

.upload-file-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 10;
    background: #000;
}

.input-file-btn {
    display: block;
    position: absolute;
    top: 29%;
    left: 50%;
    /* width: 100%; */
    /* padding: 10px 8px; */
    background-color: #000;
    color: #E53BB9;
    text-decoration: none;
    cursor: pointer;
    /* font-size: 20px; */
}

@media only screen and (min-width:1024px) {
    .dropdown>input {
        width: 90%;
    }

    .input-file-btn {
        display: block;
        position: absolute;
        top: 30%;
        left: 0;
        /* width: 100%; */
        /* padding: 10px 8px; */
        background-color: #000;
        color: #E53BB9;
        text-decoration: none;
        cursor: pointer;
        font-size: 20px;
    }
}
</style>
