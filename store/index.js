// initial state
const state = () => ({
  pokemons: [],
  team: [],
  types: [
    {
      type: 'grass',
      background: 'bg-green-300',
      icon: 'bg-green-500',
      text: 'text-green-500',
      hover: 'bg-green-700'
    },
    {
      type: 'fire',
      background: 'bg-red-300',
      icon: 'bg-red-500',
      text: 'text-red-500',
      hover: 'bg-red-700'
    },
    {
      type: 'water',
      background: 'bg-blue-300',
      icon: 'bg-blue-500',
      text: 'text-blue-500',
      hover: 'bg-blue-700'
    },
    {
      type: 'bug',
      background: 'bg-green-200',
      icon: 'bg-green-400',
      text: 'text-green-400',
      hover: 'bg-green-600'
    },
    {
      type: 'poison',
      background: 'bg-purple-200',
      icon: 'bg-purple-400',
      text: 'text-purple-400',
      hover: 'bg-purple-600'
    },
    {
      type: 'electric',
      background: 'bg-yellow-200',
      icon: 'bg-yellow-400',
      text: 'text-yellow-400',
      hover: 'bg-yellow-600'
    },
    {
      type: 'ground',
      background: 'bg-yellow-300',
      icon: 'bg-yellow-500',
      text: 'text-yellow-500',
      hover: 'bg-yellow-700'
    },
    {
      type: 'ghost',
      background: 'bg-purple-300',
      icon: 'bg-purple-500',
      text: 'text-purple-500',
      hover: 'bg-purple-700'
    },
    {
      type: 'rock',
      background: 'bg-yellow-600',
      icon: 'bg-yellow-800',
      text: 'text-white',
      hover: 'bg-yellow-900'
    },
    {
      type: 'psychic',
      background: 'bg-pink-400',
      icon: 'bg-pink-600',
      text: 'text-pink-600',
      hover: 'bg-pink-800'
    },
    {
      type: 'fighting',
      background: 'bg-red-200',
      icon: 'bg-red-400',
      text: 'text-red-400',
      hover: 'bg-red-600'
    },
    {
      type: 'normal',
      background: 'bg-gray-200',
      icon: 'bg-gray-400',
      text: 'text-gray-400',
      hover: 'bg-gray-600'
    },
    {
      type: 'fairy',
      background: 'bg-pink-200',
      icon: 'bg-pink-400',
      text: 'text-pink-400',
      hover: 'bg-pink-600'
    },
    {
      type: 'flying',
      background: 'bg-indigo-200',
      icon: 'bg-indigo-400',
      text: 'text-indigo-400',
      hover: 'bg-indigo-600'
    },
    {
      type: 'ice',
      background: 'bg-blue-100',
      icon: 'bg-blue-300',
      text: 'text-blue-300',
      hover: 'bg-blue-500'
    },
    {
      type: 'steel',
      background: 'bg-gray-400',
      icon: 'bg-gray-600',
      text: 'text-gray-600',
      hover: 'bg-gray-800'
    },
    {
      type: 'dragon',
      background: 'bg-indigo-600',
      icon: 'bg-indigo-800',
      text: 'text-indigo-800',
      hover: 'bg-indigo-900'
    },
    {
      type: 'dark',
      background: 'bg-gray-600',
      icon: 'bg-gray-800',
      text: 'text-gray-800',
      hover: 'bg-gray-900'
    }
  ]
})

// getters
const getters = {
  getPokemons: state => state.pokemons,
  getTypes: state => state.types,
  getTeam: state => state.team,
  searchPokemon: state => (search) => {
    return state.pokemons.filter(pokemon =>
      pokemon.name.includes(search)
    )
  },
  getPokemonsByTypes: state => (typesPayload) => {
    if (typesPayload.length === 0) {
      return state.pokemons
    }

    return state.pokemons.filter(pokemon =>
      pokemon.types.some(type => typesPayload.includes(type))
    )
  }
}

// actions
const actions = {
  setValue ({ commit }, object) {
    commit('SET_VALUE', object)
  }
}

// mutations
const mutations = {
  SET_VALUE (state, object) {
    const [key] = Object.keys(object)
    state[key] = object[key]
  }
}

// eslint-disable-next-line no-unused-vars
export default {
  state,
  getters,
  actions,
  mutations
}
