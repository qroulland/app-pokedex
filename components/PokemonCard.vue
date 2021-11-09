<template>
  <div
    class="flex rounded-3xl px-8 items-center my-2 w-4/5"
    :class="getColor('background', pokemon.type)"
  >
    <img
      :src="pokemon.sprite"
      :alt="`Pokemon ${pokemon.id}`"
      width="100"
      height="100"
    >
    <div class="ml-8">
      <div
        class="text-white text-xl font-bold"
      >
        {{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}
      </div>
      <img
        v-if="pokemon.type"
        :src="require(`./../assets/svg/${pokemon.type}.svg`)"
        :alt="`Type pokemon ${pokemon.id}`"
        width="32"
        height="32"
        class="p-2 rounded-full my-2"
        :class="getColor('icon', pokemon.type)"
      >
    </div>
    <div
      class="ml-auto text-white text-3xl font-bold"
    >
      #{{ ('00' + pokemon.id).slice(-3) }}
    </div>
    <div class="flex ml-auto">
      <div>
        <font-awesome-icon :icon="['far', 'eye']" />
        <font-awesome-icon icon="plus" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters({
      types: 'getTypes'
    })
  },
  methods: {
    getColor (elt, pokemonType) {
      const other = {
        background: 'bg-gray-200',
        icon: 'bg-gray-400'
      }

      const type = this.types.find(type => type.type === pokemonType)
      return type ? type[elt] : other[elt]
    }
  }
}
</script>
