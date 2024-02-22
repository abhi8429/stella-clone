function getTitle(vm) {
  const {title} = vm.$options;
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

export default {
  created() {
    this.setTitle();
  },
  methods: {
    setTitle() {
      const title = getTitle(this)
      if (title) {
        if (this.$store.getters.getInvitee) {
          let name = this.$store.getters.getInvitee.urlSuffix;
          document.title = `Stella [${name}]  - ${title}`;
        } else {
          document.title = `Stella - ${title}`;
        }
      }
    },
  }
}
