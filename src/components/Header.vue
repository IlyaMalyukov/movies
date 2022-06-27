<template>
  <header class="header">
    <BNavbar
      class='navbar'
      type='dark'
      variant='dark'>
      <BContainer>
        <BNavbarBrand href='#'>MovieDB</BNavbarBrand>
        <BNavForm>
          <BFormInput 
            class='search-input mr-sm-2'
            placeholder='Search'
            v-model='searchValue'
            debounce='500'>
          </BFormInput>
        </BNavForm>
      </BContainer>
    </BNavbar>
  </header>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'Header',
  data: () => ({
    searchValue: ''
  }),
  methods: {
    ...mapActions('movies', [
      'searchMovies', 
      'fetchMovies',
      'toggleSearchState'
      ]),
    onChangeSearchValue(val) {
      if (val) {
        this.searchMovies(val)
        this.toggleSearchState(true)
      } else {
        this.fetchMovies()
        this.toggleSearchState(false)
      }
      
    }
  },
  watch: {
    searchValue: 'onChangeSearchValue'
  }
}
</script>

<style scoped>
.header {
  margin-bottom: 30px;
}

.navbar {
  background-color: rgba(0, 0, 0, .7) !important;
}

.search-input {
  color: #fff;
  background: rgba(255, 255, 255, .1);
  border-color: rgba(0, 0, 0, .6);
}

.search-input:focus {
  box-shadow: none;
  color: #fff;
  background: rgba(255, 255, 255, .2);
  border-color: rgba(0, 0, 0, .6);
}
</style>