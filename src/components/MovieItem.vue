<template>
  <div class="movie-item mb-3">
    <div class="movie-item__poster" :style='posterBg'></div>
    <div class="info">
      <div class="info-text">
        <h3 class="info-text__title">
          {{movie.Title}}
        </h3>
        <span class="info-text__year">
          {{movie.Year}}
        </span>
      </div>
      <div class="controls row no-gutters">
        <div class="col pr-2">
          <BButton size="md" block variant="outline-light">Edit</BButton>
        </div>
        <div class="col pl-2">
          <BButton size="md" block variant="outline-light">Remove</BButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieItem',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    posterBg() {
      return {'background-image': `url(${this.movie.Poster})`}
    }
  }
}
</script>

<style scoped>
.movie-item {
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  border-radius: 5px;
  transition: all .2 ease;
  height: 400px;
}

.movie-item:hover {
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.7);
  transform: scale(1.02);
}

.movie-item__poster {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: -1;
}

.info {
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  opacity: 0;
  transition: all .2 ease;
  color: #fff;
}

.movie-item:hover .info {
  opacity: 1;
  background-color: rgba(0, 0, 0, .7);
}

.info-text {
  text-align: left;
}

.info-text__title {
  font-size: 20px;
}

.info-text__year {
  font-size: 14px;
}
</style>