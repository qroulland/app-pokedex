<template>
  <div
    class="flex flex-col w-full items-center md:mt-20"
  >
    <Hero :prevPokemon="prevPokemon" :pokemon="pokemon" :nextPokemon="nextPokemon" :getColor="getColor" />
    <Details :pokemon="pokemon" :color="getColor ('text', pokemon.types[0])" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPokemonInfo } from '@/services/index'
import Hero from '@/components/PokemonDetails/Hero.vue'
import Details from '@/components/PokemonDetails/Details.vue'

export default {
  name: 'PokemonDetails',
  components: {
    Hero,
    Details
  },
  head () {
    return {
      title: `My Pokedex - ${this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1)}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Build your own squad and inform yourself about all pokemon\'s data.'
        }
      ]
    }
  },
  async asyncData ({ params, error }) {
    try {
      const pokemon = await getPokemonInfo(params.slug)

      if (!pokemon) {
        throw new Error('Not found')
      }

      const prevPokemon = await getPokemonInfo(pokemon.id - 1)
      const nextPokemon = await getPokemonInfo(pokemon.id + 1)

      return {
        prevPokemon,
        pokemon,
        nextPokemon
      }
    } catch (err) {
      return error({ message: err, statusCode: 404 })
    }
  },
  computed: {
    ...mapGetters({
      types: 'getTypes'
    })
  },
  created () {
    this.$nuxt.$emit('ready')
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
