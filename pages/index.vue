<template>
  <div
    v-if="ready"
    class="flex flex-col items-center"
  >
    <Navbar />
    <div class="flex w-full">
      <sidebar-team />
      <div class="flex flex-col w-1/2 md:w-full mt-32 ml-1/4 items-center">
        <pokemon-card
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPokemons, getPokemonInfo } from '@/services/index'
import PokemonCard from '~/components/PokemonCard.vue'
import SidebarTeam from '~/components/SidebarTeam.vue'

export default {
  name: 'Index',
  components: {
    'pokemon-card': PokemonCard,
    'sidebar-team': SidebarTeam
  },
  data () {
    return {
      ready: false
    }
  },
  computed: {
    ...mapGetters({
      pokemons: 'getPokemons'
    })
  },
  created () {
    this.findPokemons()
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
            type: infos.types[0].type.name,
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
      this.ready = true
    }
  }
}
</script>
