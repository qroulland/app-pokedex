<template>
  <div
    id="teamBar"
    class="flex fixed bottom-0 w-full justify-around items-center bg-gray-200
    md:h-screen md:sticky md:top-0 z-10 md:pt-24 md:flex-col md:w-1/6 md:-mt-24"
  >
    <div
      v-for="elt in 6"
      :key="elt"
      class="relative flex justify-center items-center w-20 h-20"
    >
      <client-only>
        <img
          v-if="team[elt - 1]"
          :src="team[elt - 1].sprite"
          alt="Pokemon"
          width="75"
          height="75"
          class="z-20 w-12 h-12 md:w-24 md:h-24 cursor-pointer"
          :class="team[elt - 1] ? 'block' : 'hidden'"
          @click="deleteInMyTeam(team[elt - 1])"
        >
      </client-only>
      <img
        :src="require('./../assets/svg/pokeball.svg')"
        alt="Pokeball"
        width="75"
        height="75"
        class="opacity-25 absolute z-10 w-12 h-12 md:w-24 md:h-24"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarTeam',
  props: {
    team: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    deleteInMyTeam (pokemon) {
      this.$nuxt.$emit('deleteInMyTeam', pokemon)
    }
  }
}
</script>

<style scoped>
@media (max-height: 683px) {
  #teamBar {
    position: fixed;
    bottom: 0;
    top: unset;
    width: 100%;
    min-height: unset;
    height: auto;
    flex-direction: row;
    padding-top: 1rem;
  }
}
</style>
