import IDs from '@/store/mock/imdb_top250'
import mutations from '@/store/mutations'
import axios from '@/plugins/axios'

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie
    return acc
  }, {})
}

const {
  MOVIES,
  CURRENT_PAGE,
  TOGGLE_SEARCH,
  TOGGLE_SEARCH_NO_DATA
} = mutations

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
    isSearch: false,
    isNoDataSearch: false,
  },
  getters: {
    moviesList: ({movies}) => movies,
    slicedIDs: ({top250IDs}) => (from, to) => top250IDs.slice(from, to),
    currentPage: ({currentPage}) => currentPage,
    moviesPerPage: ({moviesPerPage}) => moviesPerPage,
    moviesLength: ({top250IDs}) => Object.keys(top250IDs).length,
    isSearch: ({isSearch}) => isSearch,
    isNoDataSearch: ({isNoDataSearch}) => isNoDataSearch
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value
    },
    [TOGGLE_SEARCH](state, bool) {
      state.isSearch = bool
    },
    [TOGGLE_SEARCH_NO_DATA](state, bool) {
      state.isNoDataSearch = bool
    }
  },
  actions: {
    initMoviesStore: {
      handler({dispatch}) {
        dispatch('fetchMovies')
      },
      root: true
    },
    async fetchMovies({getters, commit, dispatch}) {
      try {
        dispatch('toggleLoader', true, {root: true})
        const {currentPage, moviesPerPage, slicedIDs} = getters
        const from = currentPage * moviesPerPage - moviesPerPage
        const to = currentPage * moviesPerPage
        const moviesToFetch = slicedIDs(from, to)
  
        const requests = moviesToFetch.map(id => axios.get(`/?i=${id}`))
        const response = await Promise.all(requests)
        const movies = serializeResponse(response)
        commit(MOVIES, movies)
        dispatch('toggleSearchNoData', false)
      } catch(err) {
          console.log(err)
      } finally {
        dispatch('toggleLoader', false, {root: true})
      }
    },
    changeCurrentPage({commit, dispatch}, page) {
      commit(CURRENT_PAGE, page)
      dispatch('fetchMovies')
    },
    async searchMovies({commit, dispatch}, query) {
      try {
        dispatch('toggleLoader', true, {root: true})

        const response = await axios.get(`/?s=${query}`)

        if (response.Error) {
          throw Error(response.Error)
        }

        const movies = serializeResponse(response.Search)
        commit(MOVIES, movies)
        dispatch('toggleSearchNoData', false)
      } catch(err) {
        console.log(err.message)
        dispatch('toggleSearchNoData', true)
        dispatch('showNotify', {
          msg: err.message,
          title: 'Error',
          variant: 'danger'
        }, {root: true})
      } finally {
        dispatch('toggleLoader', false, {root: true})
      }
    },
    toggleSearchState({commit}, bool) {
      commit(TOGGLE_SEARCH, bool)
    },
    toggleSearchNoData({commit}, bool) {
      commit(TOGGLE_SEARCH_NO_DATA, bool)
    }
  }
}

export default moviesStore