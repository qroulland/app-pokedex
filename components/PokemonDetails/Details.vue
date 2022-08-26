<template>
  <div class="w-full flex flex-col items-center">
    <div class="flex w-2/3 justify-around md:my-4">
      <img
        :src="pokemon.sprites.front_shiny"
        :alt="`Sprite pokemon ${pokemon.id}`"
        width="125"
        height="125"
      >
      <img
        :src="pokemon.sprites.back_shiny"
        :alt="`Sprite pokemon ${pokemon.id}`"
        width="125"
        height="125"
      >
    </div>
    <div class="flex flex-col md:flex-row w-full md:w-2/3 justify-around my-4 ">
      <div class="shadow-md w-4/5 md:w-full text-center mb-6 mx-auto md:mb-0 md:mx-4 rounded-lg">
        <div
          class="font-bold text-3xl my-3 px-16"
          :class="color"
        >
          <div class="mb-8" v-html="'Pokedex data'"/>
          <div
            v-for="(value, key) in pokedexData"
            :key="key"
            class="text-black text-base font-normal text-left mb-4 mt-8 flex justify-between"
          >
            {{ value }}:
            <span
              class="font-bold"
              :class="color"
              v-html="pokemon[key]"
            />
          </div>
        </div>
      </div>
      <div class="shadow-md w-4/5 md:w-full text-center mx-auto md:mx-4 rounded-lg">
        <div
          class="font-bold text-3xl my-3 px-16"
          :class="color"
        >
          <div class="mb-8" v-html="'Base Stats'"/>
          <div
            v-for="stat in pokemon.stats"
            :key="stat.stat.name"
            class="text-black text-base font-normal text-left mb-4 flex justify-between"
          >
            {{ stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1) }}:
            <span
              class="font-bold"
              :class="color"
              v-html="stat.base_stat"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Details',
  data () {
    return {
      pokedexData: {
        base_experience: 'Base experience',
        height: 'Height',
        weight: 'Weight'
      }
    }
  },
  props: {
    pokemon: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
}
</script>
