import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2'

async function getPokemons () {
  const { data: { results } } = await axios.get(`${API_URL}/pokemon?limit=100`)
  return results
}

async function getPokemonInfo (id) {
  try {
    const { data } = await axios.get(`${API_URL}/pokemon/${id}`)
    return data
  } catch (err) {
    console.log('Error when fetching details of pokemon with id: ' + id)
    return null
  }
}

export {
  getPokemons,
  getPokemonInfo
}
