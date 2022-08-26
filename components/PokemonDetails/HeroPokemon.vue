<template>
  <div class="flex flex-col items-center">
    <img
      :src="pokemon.sprites.front_default"
      :alt="`Pokemon ${pokemon.id}`"
      width="200"
      height="200"
    >
    <div
      class="text-white text-xl font-bold"
    >
      {{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}
      #{{ ('00' + pokemon.id).slice(-3) }}
    </div>
    <div class="flex">
      <img
        v-for="(type, index) in pokemon.types.map(type => type.type.name)"
        :key="type"
        :src="require(`./../../assets/svg/${type}.svg`)"
        :alt="`Type pokemon ${pokemon.id}`"
        width="32"
        height="32"
        class="p-2 rounded-full my-2"
        :class="[getColor('icon', type), {'ml-2': index > 0}]"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroPokemon',
  props: {
    pokemon: {
      type: Object,
      required: true
    },
    getColor: {
      type: Function,
      required: () => {}
    }
  }
}
</script>
