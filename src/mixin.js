export const loadingMixin = {
  computed: {
    loading () {
      return this.$store.state.loading
    }
  }
}
