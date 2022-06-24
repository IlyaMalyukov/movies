<template>
  <div id="app">
    <PosterBg :poster='posterBg'/>
    <MoviesList 
    :list='moviesList'
    @changePoster='onChangePoster'/>
  </div>
</template>

<script>
import MoviesList from '@/components/MoviesList'
import PosterBg from '@/components/PosterBg'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    MoviesList,
    PosterBg
  },
  data: () => ({
    posterBg: ''
  }),
  methods: {
    onChangePoster(poster) {
      this.posterBg = poster
    }
  },
  computed: {
    ...mapGetters('movies', ['moviesList'])
  }
}
</script>

<style>
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}
</style>
