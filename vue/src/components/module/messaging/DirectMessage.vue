<template>
    <div class="container-fluid">
        <div class="row" style="overflow:auto;  position: relative;">
            <div class="col-sm-2 d-none d-sm-block px-3 mb-3">
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

                <div class="row mt-3 d-none d-sm-block d-flex flex-column"
                    style="overflow:auto; height: 80vh; position: relative;" id="content">

                    <div class="col-12 border-gradient-class" style="height: 15%; padding-top: 8px;">
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

                    <div class="col-12" style="height: 15%; padding-top: 8px;">
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

                    <div class="col-12" style="height: 15%; padding-top: 8px;">
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
            <div class="col-sm-10 px-3 border-left">
                <div class="row" style="height: 100vh;">

                    <div class=" col-sm-12 mt-1 border-bottom" style="height: 15vh; position:relative; top: 0;">
                        <div class=" col-sm-3 d-flex flex-row justify-content-start">
                            <img src="https://icones.pro/wp-content/uploads/2021/06/icone-fleche-gauche-jaune.png" alt=""
                                width="24px" height="16px" class="mt-1">
                            <p class="text-white px-2 font-size-14">Back to dashboard</p>
                        </div>
                        <div class="d-flex flex-row justify-content-between">
                            <div class="d-flex flex-row justify-content-between">
                                <img class="rounded-circle" width="50" height="50"
                                    src="@/assets/images/stella/no_avatar.png" alt="">
                                <p class="text-white px-2 mt-2">Calvin Zheng</p>
                            </div>
                            <div class="rounded border border-dark px-4 border-style-class"
                                style="position:relative; top:-1vh;">
                                <p class="text-white font-size-14">Total donated</p>
                                <h5 class="text-white font-weight-500 font-size-16">$5</h5>
                            </div>
                        </div>
                    </div>

                    <div class="mb-5" id="content" style="overflow:auto; height: 75vh; position: relative; ">

                        <div class="d-flex flex-column align-items-start">
                            <p class="chat-paragraph-start">Hey! just wanted to chat. </p>
                            <p class="chat-paragraph-between">Thank you for offering your services.</p>
                            <p class="chat-paragraph-end">I want to be a friend with you.</p>
                            <img src="https://cdn.britannica.com/99/236599-050-1199AD2C/Mark-Zuckerberg-2019.jpg" alt=""
                                width="240" height="135px" class="rounded">
                        </div>

                        <div class=" d-flex flex-column align-items-end">

                            <p class="chat-paragraph-subscriber-start">Hiiii thanks for messaging me.</p>
                            <p class="chat-paragraph-subscriber-between">Happy to chat about anything.</p>
                            <p class="chat-paragraph-subscriber-end">IWhat’s your day to day look like?.</p>
                            <img src="https://cdn.britannica.com/99/236599-050-1199AD2C/Mark-Zuckerberg-2019.jpg" alt=""
                                width="240" height="135px" class="rounded">

                        </div>


                        <div class="d-flex flex-column align-items-start">
                            <p class="chat-paragraph-start">Hey! just wanted to chat. </p>
                            <p class="chat-paragraph-between">Thank you for offering your services.</p>
                            <p class="chat-paragraph-end">I want to be a friend with you.</p>
                            <img src="https://cdn.britannica.com/99/236599-050-1199AD2C/Mark-Zuckerberg-2019.jpg" alt=""
                                width="240" height="135px" class="rounded">
                        </div>

                        <div class=" d-flex flex-column align-items-end">

                            <p class="chat-paragraph-subscriber-start">Hiiii thanks for messaging me.</p>
                            <p class="chat-paragraph-subscriber-between">Happy to chat about anything.</p>
                            <p class="chat-paragraph-subscriber-end">IWhat’s your day to day look like?.</p>
                            <img src="https://cdn.britannica.com/99/236599-050-1199AD2C/Mark-Zuckerberg-2019.jpg" alt=""
                                width="240" height="135px" class="rounded">

                        </div>
                        <div class="d-flex flex-column align-items-start">
                            <p class="chat-paragraph-start">Hey! just wanted to chat. </p>
                            <p class="chat-paragraph-between">Thank you for offering your services.</p>
                            <p class="chat-paragraph-end">I want to be a friend with you.</p>
                            <img src="https://cdn.britannica.com/99/236599-050-1199AD2C/Mark-Zuckerberg-2019.jpg" alt=""
                                width="240" height="135px" class="rounded">
                        </div>

                        <div class=" d-flex flex-column align-items-end">

                            <p class="chat-paragraph-subscriber-start">Hiiii thanks for messaging me.</p>
                            <p class="chat-paragraph-subscriber-between">Happy to chat about anything.</p>
                            <p class="chat-paragraph-subscriber-end">IWhat’s your day to day look like?.</p>
                            <img src="https://cdn.britannica.com/99/236599-050-1199AD2C/Mark-Zuckerberg-2019.jpg" alt=""
                                width="240" height="135px" class="rounded">

                        </div>
                    </div>

                </div>

                <div style="height: 10vh; width: 100%; position: fixed; bottom: 0; overflow: auto;">
                    <div class="d-flex flex-row justify-content-start px-2">
                        <div style="height: 4vh;" class="mt-4 px-2 mr-2">
                            <img src="https://img.icons8.com/?size=64&amp;id=ftzTw4R7hlGW&amp;format=png&amp;color=FFFFFF"
                                alt="" width="28" height="22px" class="mt-2" data-toggle="modal"
                                data-target="#exampleModal">
                        </div>
                        <input type="text" style="height: 4vh; width: 73%;" class="mt-4 coloredInput3">
                        <div class="mt-4 pl-2">
                            <img src="https://cdn-icons-png.flaticon.com/128/9497/9497026.png" alt="" width="28px"
                                height="22px" class="mt-2">
                        </div>
                    </div>

                </div>


            </div>
        </div>
        <!-- <UploadMedia>

        </UploadMedia> -->
        <UnlockMedia>

        </UnlockMedia>
    </div>
</template>

<script>
import '@/assets/styles/direct-message/direct-message-common.css';
import UploadMedia from "@/components/module/messaging/UploadMedia.vue";
import UnlockMedia from "@/components/module/messaging/UnlockMedia.vue";
export default {
    components: {
        UploadMedia,
        UnlockMedia

    }
}
</script>

