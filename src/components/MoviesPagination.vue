<template>
  <div class="movies-pagination">
    <BPagination
      v-model='currentPageModel'
      :per-page='perPage'
      :total-rows='total'
      prev-text='Prev'
      next-text='Next'
    />
  </div>
</template>

<script>
export default {
  name: 'MoviesPagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    currentPageModel: {
      get() {
        return this.currentPage
      },
      set(value) {
        this.$emit('onChangePage', value)
      }
    }
  }
}
</script>

<style scoped>
.movies-pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.movies-pagination >>> .pagination .page-item .page-link {
  background-color: transparent;
  font-size: 12px;
  color: #fff;
  box-shadow: none;
}

.movies-pagination >>> .pagination .page-item.active .page-link {
  border-color: #fff;
  background-color: #fff;
  color: #000;
}

.movies-pagination >>> .pagination .page-item.disabled .page-link {
  color: gray;
}
</style>