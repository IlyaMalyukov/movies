<template>
  <div></div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Notification',
  methods: {
    showNotify({variant, msg, title}) {
      this.$bvToast.toast(msg, {
        title,
        variant,
        solid: true
      })
    }
  },
  computed: {
    ...mapGetters(['messagePool'])
  },
  watch: {
    messagePool: 'showNotify'
  }
}
</script>