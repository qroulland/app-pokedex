<template>
  <div v-if="ready" class="flex w-full">
    <sidebar-team :team="team" />
    <div class="flex flex-col w-full mb-24 md:mb-8 ml-1/4 items-center mt-8 px-8">
      <v-filters />
      <div
        v-for="pokemon in pokemonList"
        :key="pokemon.id"
        class="flex w-full justify-between items-center container-card"
      >
        <pokemon-card :pokemon="pokemon" class="order-2 md:order-1 w-full" />
        <img
          :src="
            inMyTeam(pokemon)
              ? require('@/assets/svg/pokeball.svg')
              : 'https://img.icons8.com/color/48/000000/open-pokeball--v2.png'
          "
          alt="Pokeball"
          class="order-1 md:order-2 ml-8"
          width="50"
          height="50"
          @click="
            inMyTeam(pokemon) ? deleteInMyTeam(pokemon) : addInMyTeam(pokemon)
          "
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPokemons, getPokemonInfo } from '@/services/index'
import PokemonCard from '~/components/Home/PokemonCard.vue'
import SidebarTeam from '~/components/SidebarTeam.vue'
import Filters from '~/components/Home/Filters.vue'

export default {
  name: 'Index',
  components: {
    'pokemon-card': PokemonCard,
    'sidebar-team': SidebarTeam,
    'v-filters': Filters
  },
  data () {
    return {
      ready: false,
      pokemonList: []
    }
  },
  head () {
    return {
      title: 'My Pokedex',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Build your own squad and inform yourself about all pokemon\'s data.'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      pokemons: 'getPokemons',
      team: 'getTeam',
      searchPokemon: 'searchPokemon',
      getPokemonsByTypes: 'getPokemonsByTypes'
    })
  },
  created () {
    if (process.client) {
      if (this.pokemons.length === 0) {
        this.findPokemons()
      } else {
        this.pokemonList = this.pokemons
        this.ready = true
        this.$nuxt.$emit('ready')
      }

      this.$nuxt.$on('filterSearch', (payload) => {
        this.pokemonList = this.searchPokemon(payload)
      })

      this.$nuxt.$on('filterByTypes', (payload) => {
        this.pokemonList = this.getPokemonsByTypes(payload)
      })

      this.$nuxt.$on('deleteInMyTeam', (payload) => {
        this.deleteInMyTeam(payload)
      })
    }
  },
  methods: {
    async findPokemons () {
      const pokemons = await getPokemons()
      const promises = []

      // loop all pokemon to retrieve single info of a pokemon
      pokemons.forEach((pokemon, index) => {
        const promise = async () => {
          const infos = await getPokemonInfo(index + 1)
          Object.assign(pokemon, {
            id: index + 1,
            types: infos.types.map(type => type.type.name),
            sprite: infos.sprites.front_default
          })
          return pokemon
        }
        // push the promise to the promises array
        promises.push(promise)
      })

      // wait all pokemons to be fetch
      await Promise.all(promises.map(asyncFn => asyncFn()))
      await this.$store.dispatch('setValue', { pokemons })
      // app is ready to be displayed !
      this.pokemonList = this.pokemons
      this.ready = true
      this.$nuxt.$emit('ready')
    },
    inMyTeam (pokemon) {
      return this.team.some(e => e.id === pokemon.id)
    },
    async addInMyTeam (pokemon) {
      await this.$store.dispatch('setValue', { team: [...this.team, pokemon] })
    },
    async deleteInMyTeam (pokemon) {
      const myTeam = [...this.team]
      const index = await myTeam.indexOf(pokemon)
      myTeam.splice(index, 1)

      await this.$store.dispatch('setValue', { team: myTeam })
    }
  }
}
</script>

<style scoped>
.container-card img {
  opacity: 25%;
  transition: 0.3s all;
}

.container-card:hover img {
  opacity: 100%;
  cursor: pointer;
}
</style>
