<template>
  <div
    class="flex flex-col w-full items-center md:mt-20"
  >
    <div
      class="w-full flex flex-col justify-center items-center py-4"
      :class="getColor('background', pokemon.types[0].type.name)"
    >
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
    <div class="flex w-2/3 justify-around md:mt-4">
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
    <div class="flex w-2/3 justify-around md:mt-4">
      <div class="shadow w-full text-center mx-4 rounded-lg">
        <div
          class="font-bold text-3xl my-3 px-16"
          :class="getColor('text', pokemon.types[0].type.name)"
        >
          Pokedex data
          <div
            v-for="(value, key) in pokedexData"
            :key="key"
            class="text-black text-base font-normal text-left mb-4 mt-8 flex justify-between"
          >
            {{ value }}:
            <span
              class="font-bold"
              :class="getColor('text', pokemon.types[0].type.name)"
            >
              {{ pokemon[key] }}
            </span>
          </div>
        </div>
      </div>
      <div class="shadow w-full text-center mx-4 rounded-lg">
        <div
          class="font-bold text-3xl my-3 px-16"
          :class="getColor('text', pokemon.types[0].type.name)"
        >
          <div class="mb-8">
            Base Stats
          </div>
          <div
            v-for="stat in pokemon.stats"
            :key="stat.stat.name"
            class="text-black text-base font-normal text-left mb-4 flex justify-between"
          >
            {{ stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1) }}:
            <span
              class="font-bold"
              :class="getColor('text', pokemon.types[0].type.name)"
            >
              {{ stat.base_stat }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPokemonInfo } from '@/services/index'
export default {
  name: 'PokemonDetails',
  components: {},
  async asyncData ({ params, error }) {
    try {
      const pokemon = await getPokemonInfo(params.slug)
      if (!pokemon) {
        throw new Error('Not found')
      }

      return {
        pokemon
      }
    } catch (err) {
      return error({ message: err, statusCode: 404 })
    }
  },
  data () {
    return {
      pokedexData: {
        base_experience: 'Base experience',
        height: 'Height',
        weight: 'Weight'
      }
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
        icon: 'bg-gray-400',
        text: 'text-gray-400'
      }

      const type = this.types.find(type => type.type === pokemonType)
      return type ? type[elt] : other[elt]
    }
  }
}
</script>
