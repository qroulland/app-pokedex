<template>
  <div class="flex flex-col justify-around items-center bg-gray-200 w-1/6 h-screen sticky top-0 z-10 pt-28 pb-4">
    <div
      v-for="elt in 6"
      :key="elt"
      class="relative flex justify-center items-center w-32"
    >
      <img
        v-if="team[elt - 1]"
        :src="team[elt - 1].sprite"
        alt="Pokemon"
        width="75"
        height="75"
        class="z-20"
      >
      <img
        :src="require('./../assets/svg/pokeball.svg')"
        alt=""
        width="75"
        height="75"
        class="opacity-25 absolute z-10"
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
