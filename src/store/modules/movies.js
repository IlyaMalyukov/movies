import axios from '@/plugins/axios'

const moviesStore = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async fetchMovies() {
      const response = await axios.get('/', {
        params: {
          i:'tt0111161'
        }
      })
      console.log(response)
    }
  }
}

export default moviesStore