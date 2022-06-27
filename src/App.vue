<template>
  <div id="app">
    <PreLoader/>
    <Notification/>
    <PosterBg :poster='posterBg'/>
    <Header/>
    <MoviesList 
    :list='moviesList'
    @changePoster='onChangePoster'/>
    <MoviesPagination
      v-if='paginationVisible'
      :current-page='currentPage'
      :per-page='moviesPerPage'
      :total='moviesLength'
      @onChangePage='changePage'
    />
  </div>
</template>

<script>
import MoviesList from '@/components/MoviesList'
import PosterBg from '@/components/PosterBg'
import MoviesPagination from '@/components/MoviesPagination'
import PreLoader from '@/components/PreLoader'
import Header from '@/components/Header'
import Notification from '@/components/Notification'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    MoviesList,
    PosterBg,
    MoviesPagination,
    PreLoader,
    Header,
    Notification
  },
  data: () => ({
    posterBg: ''
  }),
  methods: {
    ...mapActions('movies', ['changeCurrentPage']),
    onChangePageQuery({page = 1}) {
      this.changeCurrentPage(Number(page))
    },
    onChangePoster(poster) {
      this.posterBg = poster
    },
    changePage(page) {
      this.$router.push({query: {page}})
    }
  },
  computed: {
    ...mapGetters('movies', [
      'moviesList', 
      'currentPage', 
      'moviesPerPage',
      'moviesLength',
      'isSearch'
    ]),
    paginationVisible() {
      if (Object.keys(this.moviesList).length && !this.isSearch) {
        return true
      }

      return false
    }
  },
  watch: {
    '$route.query': {
      handler: 'onChangePageQuery',
      immediate: true,
      deep: true
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
