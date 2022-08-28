<template>
  <div class="flex w-full pr-20 gap-4 mb-8 flex-wrap justify-between">
    <input
      v-model="searchQuery"
      placeholder="Search..."
      type="text"
      class="rounded-lg w-full border border-gray-300 h-16 px-6"
      @keyup="search"
      @keyup.enter="$router.push(`/${searchQuery.toLowerCase()}`), searchQuery = ''"
    >
    <div
      v-for="{ type } in types"
      :key="type"
      class="flex text-white p-2 rounded-md my-1 cursor-pointer items-center"
      :class="[
        getColor('icon', type),
        `hover:${getColor('hover', type)}`,
        { 'opacity-50': typesArray.length > 0 },
        { 'opacity-100': typesArray.includes(type) }
      ]"
      style="flex-basis: 15%;"
      @click="filterByTypes(type)"
    >
      <img
        :src="require(`@/assets/svg/${type === 'other' ? 'normal' : type}.svg`)"
        :alt="`Type ${type}`"
        width="24"
        height="24"
        class="mr-2"
      >
      {{ type.charAt(0).toUpperCase() + type.slice(1) }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      searchQuery: '',
      typesArray: []
    }
  },
  computed: {
    ...mapGetters({
      types: 'getTypes'
    })
  },
  methods: {
    getColor (elt, pokemonType) {
      const type = this.types.find(type => type.type === pokemonType)
      return type[elt]
    },
    search () {
      this.$nuxt.$emit('filterSearch', this.searchQuery)
    },
    filterByTypes (clicked) {
      if (this.typesArray.includes(clicked)) {
        const index = this.typesArray.indexOf(clicked)
        this.typesArray.splice(index, 1)
      } else {
        this.typesArray.push(clicked)
      }

      this.$nuxt.$emit('filterByTypes', this.typesArray)
    }
  }
}
</script>
