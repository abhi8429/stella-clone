import {mapGetters} from "vuex";

export const snapchatMixin = {

  mounted() {
    if (this.isSnapchat) {
      document.body.style.backgroundColor = '#FFFA37';
    }
  },
  unmounted() {
    if (this.isSnapchat) {
      document.body.style.backgroundColor = '';
    }
  },
  computed: {
    ...mapGetters(['getPlatForm']),
    isSnapchat() {
      return this.getPlatForm === 'snapchat';
    },
    label() {
      return this.isSnapchat ? 'Snapchat' : 'Instagram';
    },
    buttonColor() {
      return this.isSnapchat ? 'btn btn-black' : 'btn btn-success';
    }
  }

}
