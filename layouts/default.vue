<template>
  <div>
    <v-navbar />
    <Nuxt
      id="contentWrapper"
      class="mt-24"
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
      console.log('Disable loader')
      this.loading = false
    })
  }
}
</script>
