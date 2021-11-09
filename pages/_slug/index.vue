<template>
  <div
    class="flex w-full items-center"
  >
    {{ pokemon }}
  </div>
</template>

<script>
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
  }
}
</script>
