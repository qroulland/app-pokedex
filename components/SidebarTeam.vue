<template>
  <div
    class="flex fixed bottom-0 w-full justify-around items-center bg-gray-200
    md:h-screen md:sticky md:top-0 z-10 md:pt-28 md:pb-4 md:flex-col md:w-1/6">
    <div
      v-for="elt in 6"
      :key="elt"
      class="relative flex justify-center items-center w-24 h-24"
    >
      <img
        v-if="team[elt - 1]"
        :src="team[elt - 1].sprite"
        alt="Pokemon"
        width="75"
        height="75"
        class="z-20 w-12 h-12 md:w-24 md:h-24"
      >
      <img
        :src="require('./../assets/svg/pokeball.svg')"
        alt=""
        width="75"
        height="75"
        class="opacity-25 absolute z-10 w-12 h-12 md:w-24 md:h-24"
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarTeam',
  computed: {
    ...mapGetters({
      team: 'getTeam'
    })
  }
}
</script>
