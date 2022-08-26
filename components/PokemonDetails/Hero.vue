<template>
  <div
    class="w-full mt-20 md:mt-0 grid grid-cols-3 items-center py-4"
    :class="getColor('background', pokemon.types[0].type.name)"
  >
    <nuxt-link v-if="prevPokemon" :to="prevPokemon.name" >
      <Pokemon
        :pokemon="prevPokemon"
        class="opacity-50 col-start-1  col-end-2"
        :getColor="getColor"
      />
    </nuxt-link>
    <Pokemon
      :pokemon="pokemon"
      :getColor="getColor"
      class="col-start-2 col-end-3"
    />
    <nuxt-link v-if="nextPokemon" :to="nextPokemon.name" >
      <Pokemon
        v-if="nextPokemon"
        :pokemon="nextPokemon"
        class="opacity-50 col-start-3  col-end-4"
        :getColor="getColor"
      />
    </nuxt-link>
  </div>
</template>

<script>
import Pokemon from './HeroPokemon.vue'

export default {
  name: 'Hero',
  components: {
    Pokemon
  },
  props: {
    prevPokemon: {
      type: Object,
      default: () => ({})
    },
    pokemon: {
      type: Object,
      required: true
    },
    nextPokemon: {
      type: Object,
      default: () => ({})
    },
    getColor: {
      type: Function,
      required: () => {}
    }
  }
}
</script>
