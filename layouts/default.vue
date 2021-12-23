<template>
  <div>
    <v-navbar />
    <Nuxt
      id="contentWrapper"
    />
    <v-loader :loading="loading" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'DefaultLayout',
  components: {
    'v-navbar': Navbar,
    'v-loader': Loader
  },
  data () {
    return {
      loading: true
    }
  },
  created () {
    this.$nuxt.$on('ready', () => {
      this.loading = false
    })
  }
}
</script>
