<template>
  <div
    v-if="ready"
    class="flex flex-col items-center"
  >
    <Navbar />
    <div class="flex w-full">
      <sidebar-team />
      <div class="flex flex-col w-1/2 md:w-full mt-32 ml-1/4 items-center">
        <div
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          class="flex w-full justify-center items-center container-card"
        >
          <pokemon-card
            :pokemon="pokemon"
          />
          <img
            :src="inMyTeam(pokemon) ? require('./../assets/svg/pokeball.svg') : 'https://img.icons8.com/color/48/000000/open-pokeball--v2.png'"
            alt="Pokeball"
            class="ml-5"
            width="50"
            height="50"
            @click="inMyTeam(pokemon) ? deleteInMyTeam(pokemon) : addInMyTeam(pokemon)"
          >
        </div>
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
      pokemons: 'getPokemons',
      team: 'getTeam'
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
    },
    inMyTeam (pokemon) {
      return this.team.some(e => e.id === pokemon.id)
    },
    async addInMyTeam (pokemon) {
      await this.$store.dispatch('setValue', { team: [...this.team, pokemon] })
    },
    async deleteInMyTeam (pokemon) {
      const myTeam = [...this.team]
      const index = await this.team.indexOf(pokemon)
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
