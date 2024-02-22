<template>
  <div class="container">

    <div class="fxHeader">
      <div>
        <div class="text" style="font-size: 16px;">
          <span>CloseFriend</span>
        </div>
      </div>
      <div class="buttons"
           style="flex: 1;margin-right:20px;">
        <box-icon name='x' color="#777" @click="$router.replace({name: 'CreatorDashboardMobile'})"></box-icon>
      </div>
    </div>

    <div class="main">
<!--      <div class="text" style="margin-left: 0px;">
        <span>Menu</span><span style="padding-left: 100px;" @click="close()">X</span>
      </div>-->
      <!-- <div> -->
      <!--      <div class="body">
              &lt;!&ndash;        <global-message></global-message>&ndash;&gt;
              <div class="tabs-header">
                <div class="tab-head" :class="{ active: selectedTab === 'member' }"
                     @click="tabClick('member')">Member Information
                </div>
                <div class="tab-head" :class="{ active: selectedTab === 'family' }"
                     v-if="isFamilySelected"
                     @click="tabClick('family')">Family Details
                </div>
              </div>
            </div>-->
      <!-- {'body' : true, 'disableEdit' : (!auth.edit.member && editMemberInfo.id)} -->
      <div :class="'body'" id="member">

        <div>
<!--          <div class="field">
            <label>Name</label>
          </div>
          <div class="field">
            <label>Customer URL</label>
          </div>
          <div class="field">
            <label>Email</label>
          </div>
          <div class="field">
            <label>Password</label>
          </div>-->
          <table>
            <tr style="height:40px">
              <td style="float:left;">+</td>
              <td style="float:left;"><a>Manage Friends</a></td>
            </tr>
            <tr style="height:40px">
              <td style="float:left;">+</td>
              <td style="float:left;">
                <router-link :to="{ name: 'RecentTransactionMobile'}" replace>Recent Transactions</router-link>
              </td>
            </tr>
            <tr style="height:40px">
              <td style="float:left;">+</td>
              <td style="float:left;">
                <router-link :to="{ name: 'BillingMobile'}" replace>Billing</router-link>
              </td>
            </tr>
            <tr style="height:40px">
              <td style="float:left;">+</td>
              <td style="float:left;">
                <router-link :to="{ name: 'SettingsMobile'}" replace>Account Settings</router-link>
              </td>
            </tr>
            <tr style="height:40px">
              <td style="float:left;">+</td>
              <td style="float:left;">
                <router-link :to="{ name: 'BlockedFriendsMobile'}" replace>Blocked Friends</router-link>
              </td>
            </tr>
            <tr style="height:40px">
              <td style="float:left;">+</td>
              <td style="float:left;">
                <router-link :to="{ name: 'HelpMobile'}" replace>Help</router-link>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'FriendMenuMobile',
  created() {
    /*  this.clearGlobalMessages();
      this.onCreated();*/
  },
  methods: {
    close() {
      this.$router.replace({name: 'CreatorDashboardMobile'})
    },
    blockedFriends() {
      this.$router.replace({name: 'blockedFriendsMobile'})
    }
  }
}
;
</script>

<style scoped>

.container {
  display: flex;
}

.headerComponent {
  display: none;
}

.error {
  color: red !important;
}

.mandatory {
  color: red;
  font-weight: 300;
  font-size: 14px;
  margin-right: 10px;
}

.fxHeader {
  z-index: 9999999;
  position: fixed;
  width: 33%;
  display: flex;
  background-color: #F7F7F7;
  border-bottom: 1px solid #e0e0e0;
  height: 65px;
  justify-content: space-between;
}

.fxHeader .text {
  margin: 20px;
  margin-left: 5px;
}

.fxHeader .buttons {
  display: flex;
  justify-content: flex-end;
  width: 20%;
  height: 60px;
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
}

.agree {
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  font-weight: normal;
  align-items: center;
}

.actions-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions-wrapper .myButton {
  font-size: 14px;
  background-color: #42b983;
  color: white;
  height: 30px;
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  outline: none;
}

.actions-wrapper .myButton:disabled {
  background-color: gray;
}

.main {
  margin-top: 100px;
  margin-left: 30px;
  margin-right: 30px;
}

.body {
  font-size: 15px;
  font-weight: 300;
  margin-top: 10px;
  /* min-height: 500px; */
}

.body .tabs-header {
  display: flex;
  border-bottom: 1px solid #efefef;
  margin-bottom: 12px;
}

.body .tabs-header .tab-head {
  margin-right: 20px;
  cursor: pointer;
}

.body .tabs-header .active {
  color: #42b983;
  border-bottom: 1px solid #42b983;
}

.body .field {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.body .field .pincode {
  display: flex;
  align-items: flex-end;
}

.body .field .pincode .pincodeLeft {
  flex: 3;
}

.body .field .pincode .pincodeRight {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.body .field .pincode .pincodeRight .pcButton {
  background-color: gray;
  cursor: none;
}

.body .field select, .body .field input {
  font-size: 15px;
  font-weight: 300;
  height: 30px;
  background-color: #fff;
  border: 1px solid #66ccf5;
  border-radius: 0px;
  padding-left: 5px;
}

.body .field label {
  display: flex;
  align-items: center;
}

.body .field label span {
  color: red;
  font-size: 20px;
  font-weight: 800;
  margin-left: 5px;
}

.body .field1 {
  display: flex;
  flex-direction: row;
}

.body .field1 .label1 {
  flex: 1;
}

.body .field1 .input1 {
  flex: 3;
  outline: none;
}

.body .family-wrapper {
  border-bottom: 1px solid #efefef;
}

.body .family-wrapper .header {
  font-family: 17px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
}

.body .family-wrapper .header:first-child {
  margin-top: 0px;
}

.button {
  font-size: 14px;
  background-color: #42b983;
  color: white;
  height: 38px;
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}

.familyButtons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.familyButtons .fButton {
  height: 38px;
  margin: 2px;
}

.body .is-invalid {
  color: red;
}

input:disabled {
  color: gray;
}

.disableEdit {
  pointer-events: none;
  /*  color: gray;*/
}
</style>

<style scoped>
@media only screen and (max-width: 480px) and (orientation: portrait) {
  .fxHeader {
    width: 100%;
    /* margin-top: -72px; */
  }

  .main {
    width: 100%;
  }

  .mandatory {
    text-align: right;
    margin-right: 10px;
  }

  .close-button {
    display: none;
  }

  .text {
    font-size: 20px;
    font-weight: 700;
    margin-left: 30px;
  }

  .reviewDialog {
    margin-top: 4px;
    font-size: 15px;
    z-index: 999999999;
  }

  .rTable td.lTd {
    width: 35%;
  }

  /*TODO: ME*/
  .mTitle {
    font-size: 16px;
    font-weight: 600;
  }
}

@media only screen and (max-width: 812px) and (orientation: landscape) {
  .fxHeader {
    width: 100%;
    /* margin-top: -72px; */
  }

  .main {
    width: 100%;
  }

  .mandatory {
    text-align: right;
    margin-right: 10px;
  }

  .close-button {
    display: none;
  }

  .text {
    font-size: 20px;
    font-weight: 700;
    margin-left: 30px;
  }

  .reviewDialog {
    margin-top: 4px;
    font-size: 15px;
    z-index: 999999999;
  }

  .rTable td.lTd {
    width: 35%;
  }

  .mTitle {
    font-size: 16px;
    font-weight: 600;
  }
}

</style>
