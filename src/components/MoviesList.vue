<template>
  <BContainer>
    <h3 class='list-title'>{{listTitle}}</h3>
    <BRow>
      <template v-if='isExist'>
        <BCol cols='3' v-for='(movie, key) in list' :key='key'>
          <MovieItem 
          :movie='movie'
          @mouseover.native="onMouseOver(movie.Poster)"/>
        </BCol>
      </template>
      <template v-else>
        <div class='no-data'>
          No data
        </div>
      </template>
    </BRow>
  </BContainer>
</template>

<script>
import {mapGetters} from 'vuex'
import MovieItem from './MovieItem.vue'

export default {
  name: 'MoviesList',
  components: {
    MovieItem
  },
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onMouseOver(poster) {
      this.$emit('changePoster', poster)
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