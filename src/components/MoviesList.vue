<template>
  <BContainer>
    <h3 class='list-title'>{{listTitle}}</h3>
    <BRow>
      <template v-if='isExist'>
        <BCol cols='3' v-for='(movie, key) in list' :key='key'>
          <MovieItem 
          :movie='movie'
          @mouseover.native="onMouseOver(movie.Poster)"
          @showModal='showMovieInfo'/>
        </BCol>
      </template>
      <template v-else>
        <div class='no-data'>
          No data
        </div>
      </template>
    </BRow>
    <BModal 
      :id='movieInfoModalId'
      size='xl'
      hide-footer
      hide-header>
      <MovieInfoModalContent
        :movie='selectedMovie'
        @closeModal='closeModal'/>
    </BModal>
  </BContainer>
</template>

<script>
import {mapGetters} from 'vuex'
import MovieItem from './MovieItem'
import MovieInfoModalContent from './MovieInfoModalContent'

export default {
  name: 'MoviesList',
  components: {
    MovieItem,
    MovieInfoModalContent
  },
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    movieInfoModalId: 'movie-info',
    selectedMovieId: ''
  }),
  methods: {
    onMouseOver(poster) {
      this.$emit('changePoster', poster)
    },
    showMovieInfo(id) {
      this.selectedMovieId = id
      this.$bvModal.show(this.movieInfoModalId)
    },
    closeModal() {
      this.selectedMovieID = null;
      this.$bvModal.hide(this.movieInfoModalId);
    }
  },
  computed: {
    ...mapGetters('movies', [
      'isSearch',
      'isNoDataSearch'
      ]),
    isExist() {
      return Boolean(Object.keys(this.list).length) && !this.isNoDataSearch
    },
    listTitle() {
      return this.isSearch ? 'Search result:' : 'IMDB Top 250'
    },
    selectedMovie() {
      return this.selectedMovieId ? this.list[this.selectedMovieId] : null
    }
  },
}
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}

.no-data {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 36px;
}
</style>