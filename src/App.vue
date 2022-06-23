<template>
  <div id="app">
    <MoviesList :list='moviesList'/>
  </div>
</template>

<script>
import MoviesList from '@/components/MoviesList'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    MoviesList
  },
  computed: {
    ...mapGetters('movies', ['moviesList'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
