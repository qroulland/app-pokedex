<template>
  <div
    class="flex fixed inset-x-0 top-0 bg-gray-100 w-full py-4 z-20 shadow
    md:justify-center flex-col items-center"
  >
    <nuxt-link
      to="/"
      class="navbar-brand pt-lg-0 d-flex"
    >
      <img
        src="./../assets/img/logo.png"
        alt="Logo pokemon"
        width="150"
        class="mb-4 md:mb-0"
      >
    </nuxt-link>
    <input
      v-model="searchQuery"
      placeholder="Search..."
      type="text"
      class="rounded-lg w-1/2 md:w-1/6 border relative border-gray-300 md:absolute h-9 md:right-24 px-4"
      @keyup="search"
      v-on:keyup.enter="$router.push(`/${searchQuery}`), searchQuery = ''"
    >
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchQuery: ''
    }
  },
  methods: {
    search () {
      this.$nuxt.$emit('filterList', this.searchQuery)
    }
  }
}
</script>

<style scoped>
input {
  top: calc(50% - 18px);
}
</style>
