<template>
  <div>
    <v-navbar />
    <Nuxt
      id="contentWrapper"
    />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'DefaultLayout',
  components: {
    'v-navbar': Navbar
  }
}
</script>
